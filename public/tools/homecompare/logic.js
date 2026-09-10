(function(root){
'use strict';
const presets={fha:{down:3.5,mip:.55,upfrontRate:1.75},conventional:{down:5,mip:.5,upfrontRate:0},va:{down:0,mip:0,upfrontRate:2.15},usda:{down:0,mip:.35,upfrontRate:1},cash:{down:100,mip:0,upfrontRate:0}};
const defaults={price:300000,address:'',sqft:0,beds:0,baths:0,year:0,url:'',loan:'fha',term:30,down:3.5,rate:6.5,mode:'none',assist:10500,dpaPayment:0,closing:9500,credit:0,commission:3,warranty:0,inspection:500,repairs:0,tax:2.2,insurance:2400,hoa:50,utilities:250,maintenance:200,mip:.55,upfrontRate:1.75,feePayment:'finance',vaUse:'first'};

function parseNumber(value){const t=String(value).trim().replace(/[$%,\s]/g,'');return /^(?:\d+(?:\.\d*)?|\.\d+)$/.test(t)?Number(t):NaN;}
function formatNumber(value,digits=6){return Number.isFinite(value)?new Intl.NumberFormat('en-US',{minimumFractionDigits:0,maximumFractionDigits:digits}).format(value):'';}
function vaFee(h){return h.vaUse==='exempt'?0:h.down>=10?1.25:h.down>=5?1.5:h.vaUse==='subsequent'?3.3:2.15;}
function calc(h){const energy=h.energy&&globalThis.HomeEnergy?globalThis.HomeEnergy.energyCalc(h.energy):null;const utilities=energy?(h.energy.include?energy.monthlyAfter:energy.monthlyBefore):h.utilities;const retrofitCash=energy&&h.energy.include?energy.cash:0,retrofitMonthly=energy&&h.energy.include?energy.loanPayment:0;const cashPurchase=h.loan==='cash',dp=h.price*(cashPurchase?1:h.down/100),base=h.price-dp,upfrontRate=h.loan==='va'?vaFee(h):h.upfrontRate,upfront=cashPurchase?0:base*upfrontRate/100,financed=h.feePayment==='finance'?upfront:0,loan=base+financed,r=h.rate/1200,n=h.term*12,pi=cashPurchase||!loan?0:r?loan*r/(1-Math.pow(1+r,-n)):loan/n;
const assistance=cashPurchase||h.mode==='none'?0:Math.min(dp,h.assist),credits=Math.min(h.closing,h.credit),fee=h.price*h.commission/100,close=dp-assistance+h.closing-credits+fee+(h.feePayment==='cash'?upfront:0),cash=close+h.warranty+h.inspection+h.repairs+retrofitCash,mip=cashPurchase||h.loan==='va'||(h.loan==='conventional'&&h.down>=20)?0:base*h.mip/1200,tax=h.price*h.tax/1200,insurance=h.insurance/12,dpa=!cashPurchase&&h.mode==='repay'?h.dpaPayment:0,payment=pi+mip+tax+insurance,monthly=payment+h.hoa+utilities+h.maintenance+dpa+retrofitMonthly;
return {energy,utilities,retrofitCash,retrofitMonthly,dp,base,upfront,financed,upfrontRate,loan,rate:h.rate,pi,assistance,credits,fee,close,cash,mip,tax,insurance,dpa,payment,monthly,perSqft:h.sqft?h.price/h.sqft:null};}
root.HomeCompareLogic={presets,defaults,parseNumber,formatNumber,calc,vaFee};
})(globalThis);
