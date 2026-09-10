(function(root){
'use strict';
const labels={price:'Listing price',address:'Property address / location',sqft:'Interior square footage',beds:'Bedrooms',baths:'Bathrooms',year:'Year built',rate:'Advertised interest rate',hoa:'Monthly HOA dues',credit:'Closing-cost credit',annualTax:'Reported annual property tax'};
function decode(t){return String(t).replace(/&(?:quot|#34);/g,'"').replace(/&(?:apos|#39);/g,"'").replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(+n));}
function extractListing(raw){const fields={},warnings=[];const add=(key,value,evidence)=>{if(key==='address'){value=String(value).trim().slice(0,300);if(!value)return;}else{value=Number(String(value).replace(/[$,]/g,''));if(!Number.isFinite(value)||value<=0)return;const bounds={price:[10000,100000000],sqft:[100,100000],beds:[1,100],baths:[.5,100],year:[1700,2100],rate:[0,25],hoa:[0,50000],credit:[0,1000000],annualTax:[0,1000000]};if(value<bounds[key][0]||value>bounds[key][1])return;}if(key==='address'&&fields.address){const normalize=a=>a.toLowerCase().replace(/[^a-z0-9]/g,'');const old=normalize(fields.address.value),next=normalize(value);if(old===next)return;if(next.startsWith(old)){fields.address={value,evidence:String(evidence).slice(0,240)};return;}if(old.startsWith(next))return;}if(fields[key]&&fields[key].value!==value){delete fields[key];warnings.push(`Multiple ${labels[key].toLowerCase()} values found. Enter the correct value manually.`);return;}if(!warnings.some(w=>w.startsWith(`Multiple ${labels[key].toLowerCase()}`)))fields[key]={value,evidence:String(evidence).slice(0,240)};};
const scripts=[...raw.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
for(const script of scripts){let data;try{data=JSON.parse(script[1]);}catch{continue;}const nodes=[];function walk(x,depth=0){if(!x||typeof x!=='object'||depth>12)return;if(Array.isArray(x)){x.forEach(n=>walk(n,depth+1));return;}const types=[].concat(x['@type']||[]);if(types.some(t=>/^(SingleFamilyResidence|House|Apartment|Residence|RealEstateListing)$/.test(t)))nodes.push(x);Object.values(x).forEach(n=>walk(n,depth+1));}walk(data);
for(const x of nodes){const offer=Array.isArray(x.offers)?x.offers.length===1?x.offers[0]:{}:x.offers||{};if(offer.price&&(!offer.priceCurrency||offer.priceCurrency==='USD'))add('price',offer.price,'Listing structured data: offers.price');if(x.address){const a=x.address;add('address',typeof a==='string'?a:[a.streetAddress,a.addressLocality,a.addressRegion,a.postalCode].filter(Boolean).join(', '),'Listing structured data: address');}if(x.floorSize?.value&&/^(FTK|SQFT|SQ FT|FT2|FT²|SQUARE FEET)$/i.test(x.floorSize.unitCode||x.floorSize.unitText||''))add('sqft',x.floorSize.value,'Listing structured data: floorSize (square feet)');if(x.numberOfBedrooms)add('beds',x.numberOfBedrooms,'Listing structured data: bedrooms');if(x.numberOfBathroomsTotal)add('baths',x.numberOfBathroomsTotal,'Listing structured data: bathrooms');if(x.yearBuilt)add('year',x.yearBuilt,'Listing structured data: year built');}}
const text=decode(raw.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,'\n')).replace(/[ \t]+/g,' ');
function unique(key,re){if(fields[key])return;const matches=[...text.matchAll(re)];const values=[...new Set(matches.map(m=>m[1].replace(/,/g,'')))];if(values.length===1)add(key,values[0],matches[0][0]);else if(values.length>1)warnings.push(`Multiple ${labels[key].toLowerCase()} values found. Enter the correct value manually.`);}
unique('price',/(?:listing price|asking price|sale price|price)\s*[:\-]?\s*\$\s*([\d,]+(?:\.\d{1,2})?)/gi);
if(!fields.price&&!warnings.some(w=>w.startsWith('Multiple listing price'))){const m=[...text.matchAll(/\$\s*((?:\d{1,3}(?:,\d{3})+|\d{5,8})(?:\.\d{1,2})?)(?!\d)/g)].filter(x=>Number(x[1].replace(/,/g,''))>=10000);if(m.length===1)add('price',m[0][1],m[0][0]);else if(m.length>1)warnings.push('Several dollar amounts found; no price was guessed.');}
unique('sqft',/([\d,]+(?:\.\d+)?)\s*(?:sq\.?\s*ft\.?|square feet|sqft|ft²)\b/gi);unique('beds',/(\d+(?:\.\d+)?)\s*(?:bedrooms?|beds?|bd)\b/gi);unique('baths',/(\d+(?:\.\d+)?)\s*(?:bathrooms?|baths?|ba)\b/gi);unique('year',/(?:year built|built in|built)\s*[:\-]?\s*(\d{4})\b/gi);unique('rate',/(?:interest rate|fixed rate)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*%/gi);unique('hoa',/(?:HOA(?: dues| fee)?)\s*[:\-]?\s*\$\s*([\d,]+(?:\.\d{1,2})?)\s*(?:\/\s*mo(?:nth)?|per month|monthly)/gi);
unique('credit',/(?:closing[- ]cost (?:credit|incentive)|seller credit|builder credit)\s*[:\-]?\s*\$\s*([\d,]+(?:\.\d{1,2})?)/gi);unique('annualTax',/(?:annual property tax(?:es)?|property tax(?:es)? per year)\s*[:\-]?\s*\$\s*([\d,]+(?:\.\d{1,2})?)/gi);

// Address candidates come from property data and prominent listing content,
// never an arbitrary brokerage/footer address or the URL slug.
const cleanAddress=value=>decode(value).replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').replace(/\s*,\s*/g,', ').trim();
const states='AL|AK|AZ|AR|CA|CO|CT|DE|DC|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY';
const locality=new RegExp('^[A-Za-z][A-Za-z .\\\'-]{1,65},?\\s+(?:'+states+')\\b(?:\\s*,?\\s*\\d{5}(?:-\\d{4})?)?$', 'i');
const candidates=[];
const candidate=(value,evidence)=>{value=cleanAddress(value).split(/\s+[|•]\s+|\s+-\s+(?:Zillow|Realtor|Redfin|D\.R\.|Homes? for|For Sale)/i)[0];if(/^\d{1,6}[A-Za-z]?\s+/.test(value))candidates.push({value,evidence});};
const lines=text.split(/\n+/).map(x=>x.trim()).filter(Boolean);
for(let i=0;i<lines.length;i++){
 const labeled=lines[i].match(/^(?:property address|street address|address|location)\s*:\s*(.*)$/i);
 if(labeled){let value=labeled[1]||lines[i+1]||'',next=i+(labeled[1]?1:2);if(locality.test(lines[next]||''))value+=', '+lines[next];candidate(value,'Labeled property address: '+value);}
}
for(const match of raw.matchAll(/<(h1|title)\b[^>]*>([\s\S]*?)<\/\1>/gi)){
 let value=cleanAddress(match[2]);const line=lines.findIndex(x=>x===value);if(line>=0&&locality.test(lines[line+1]||''))value+=', '+lines[line+1];candidate(value,'Listing '+match[1]+': '+value);
}
for(const match of raw.matchAll(/<meta\b[^>]*>/gi)){
 const attrs={};for(const a of match[0].matchAll(/([\w:-]+)\s*=\s*(["'])([\s\S]*?)\2/g))attrs[a[1].toLowerCase()]=decode(a[3]);
 if(['og:title','twitter:title'].includes((attrs.property||attrs.name||'').toLowerCase()))candidate(attrs.content||'','Listing title metadata');
}
// Unlabeled copied text: require a street line followed by a city/state line,
// or a full street/city/state line; accept street suffixes for partial addresses.
if(!fields.address&&!candidates.length){
 for(let i=0;i<lines.length;i++){
  if(!/^\d{1,6}[A-Za-z]?\s+[A-Za-z]/.test(lines[i]))continue;
  if(locality.test(lines[i+1]||''))candidate(lines[i]+', '+lines[i+1],'Copied listing address');
  else if(new RegExp(',\\s*[A-Za-z .\\\'-]+,?\\s+(?:'+states+')\\b','i').test(lines[i])||/\b(?:Street|St|Road|Rd|Drive|Dr|Lane|Ln|Way|Court|Ct|Circle|Cir|Boulevard|Blvd|Avenue|Ave|Trail|Trl|Parkway|Pkwy|Place|Pl)\b/i.test(lines[i]))candidate(lines[i],'Copied listing address');
 }
}
if(!fields.address){for(const c of candidates)add('address',c.value,c.evidence);}
else {
 // Enrich a structured street-only address with matching city/state evidence.
 const norm=x=>x.toLowerCase().replace(/[^a-z0-9]/g,'');
 for(const c of candidates)if(norm(c.value).startsWith(norm(fields.address.value)))add('address',c.value,c.evidence);
}
if(!fields.address)warnings.push('Property address/location was not identified unambiguously. Enter the street, city, state and ZIP manually before comparing; any existing address is unchanged.');

return {fields,warnings:[...new Set(warnings)],extractedAt:new Date().toISOString()};}
root.HomeListingImport={extractListing,labels};
})(globalThis);
