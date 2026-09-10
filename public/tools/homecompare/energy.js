(function(root){
'use strict';
const catalog=[
['audit','Energy audit & blower-door test','project',1,500,300,800,'Find air leakage, insulation gaps, duct leakage and moisture issues before specifying work.'],
['air','Air sealing & weatherstripping','project',1,1500,700,3000,'Seal attic penetrations, top plates and accessible gaps; weatherstrip doors. Include combustion-safety checks where needed.'],
['attic','Attic insulation top-up','sq ft',2000,2,1.25,3.5,'Blown cellulose or fiberglass over the ceiling after air sealing. Measure existing depth; preserve ventilation and safe clearances. Target R-value depends on climate and assembly.'],
['walls','Exterior-wall insulation','wall sq ft',1800,4,2.5,7,'Dense-pack cellulose or fiberglass in suitable accessible cavities. Inspect moisture, wiring and wall condition first. Wall area is not floor area.'],
['windows','Low-E window replacement','window',15,900,550,1600,'Installed double-pane low-E windows with climate-appropriate U-factor and solar heat-gain coefficient; include flashing and air sealing. Count and measure actual openings.'],
['hvac','High-efficiency HVAC / heat pump','system',1,12000,8000,18000,'Load calculation, matched equipment, installation and commissioning. Size after envelope improvements; tonnage cannot be determined from age alone. Duct work is separate.'],
['ducts','Duct improvement','project',1,4500,2500,8000,'Replace damaged or poorly designed ducts; seal, insulate, balance and leakage-test the system. Replacement includes sealing; do not buy both alternatives.'],
['water','Heat-pump water heater','unit',1,3500,2200,5500,'Include condensate drainage and suitable air volume/location. Electrical circuit changes are separate.'],
['controls','Thermostat & controls','project',1,350,150,700,'Compatible controls, scheduling and installation; avoid duplicate charges if included in HVAC quote.'],
['vent','Ventilation / humidity measures','project',1,2000,800,4000,'Assess fresh-air and humidity needs after tightening the envelope. Equipment must fit climate and occupancy.'],
['electrical','Electrical circuits / panel allowance','project',1,2500,800,5000,'Only if an electrician identifies needed circuits, service or panel capacity. May be unnecessary for like-for-like replacements.'],
['permits','Permits & final testing','project',1,800,300,1800,'Permits, inspections and verification; remove this allowance if already included in contractor quotes.'],
['finish','Access, drywall & finish repair','project',1,2500,800,6000,'Patching and paint after cavity access. Exterior cladding work belongs in the exterior-wall option, not here again.'],
['other','Other scope / site conditions','project',1,0,0,0,'Doors, floor/crawlspace insulation, appliances, hazardous-material handling or other inspected needs. Enter a separate quote; solar and roof replacement are not assumed.']
];
function freshEnergy(){return {basis:'estimate',annual:3000,other:0,hers:100,reference:100,referenceAnnual:3000,fixedAnnual:360,condition:'unknown',saving:0,contingency:15,rebate:0,pay:'cash',financeRate:8,financeYears:10,financedPercent:100,include:false,wallOption:'cavity',ductOption:'replace',items:catalog.map(x=>({id:x[0],enabled:false,qty:x[3],unit:x[4]}))};}
function payment(principal,rate,years){const r=rate/1200,n=years*12;return principal<=0?0:r?principal*r/(1-Math.pow(1+r,-n)):principal/n;}
function energyCalc(e){const annual=e.basis==='hers'?e.fixedAnnual+Math.max(0,e.referenceAnnual-e.fixedAnnual)*e.hers/e.reference:e.annual;const subtotal=e.items.reduce((sum,x)=>sum+(x.enabled?x.qty*x.unit:0),0),gross=Math.round(subtotal*(1+e.contingency/100)*100)/100,rebate=Math.min(e.rebate,gross),net=gross-rebate,financed=e.pay==='finance'?net*e.financedPercent/100:0,cash=net-financed,loanPayment=payment(financed,e.financeRate,e.financeYears),annualSaving=annual*e.saving/100,afterAnnual=annual-annualSaving;return {annual,afterAnnual,annualSaving,monthlySaving:annualSaving/12,subtotal,gross,rebate,net,cash,financed,loanPayment,monthlyBefore:annual/12+e.other,monthlyAfter:afterAnnual/12+e.other,netMonthlyBenefit:annualSaving/12-loanPayment,payback:annualSaving>0?net/annualSaving:null,tenYearNet:annualSaving*10-net};}
root.HomeEnergy={catalog,freshEnergy,energyCalc,payment};
})(globalThis);
