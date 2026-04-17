import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Minus, Plus, ShieldCheck } from "lucide-react";
import {
  monthlyPI,
  amortizationByYear,
  totalInterest,
  fmt$,
  texasVAExemption,
  VA_RATING_OPTIONS,
} from "@/lib/finance";
import {
  DEFAULT_BUYER,
  DEFAULT_RENTER,
  applyLoanTypeDefaults,
  type BuyerState,
  type RenterState,
  type LoanType,
} from "@/lib/calculator-defaults";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface Props {
  initialBuyer?: Partial<BuyerState>;
  initialRenter?: Partial<RenterState>;
  lockedLoanType?: LoanType;
}

export const RentVsBuyCalculator = ({ initialBuyer, initialRenter, lockedLoanType }: Props) => {
  const [renter, setRenter] = useState<RenterState>({ ...DEFAULT_RENTER, ...initialRenter });
  const [buyer, setBuyer] = useState<BuyerState>({ ...DEFAULT_BUYER, ...initialBuyer });

  useEffect(() => {
    if (lockedLoanType) {
      setBuyer((b) => applyLoanTypeDefaults(b, lockedLoanType));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lockedLoanType]);

  // ---- RENTER MATH ----
  const renterMonthly = useMemo(() => {
    const petCost = renter.pets * renter.petRent;
    return (
      renter.monthlyRent +
      renter.utilities +
      petCost +
      renter.insurance +
      renter.parking +
      renter.valetTrash +
      renter.pestControl
    );
  }, [renter]);

  const renterMoveIn = useMemo(() => {
    const base =
      (renter.firstMonth ? renter.monthlyRent : 0) +
      (renter.lastMonth ? renter.monthlyRent : 0) +
      renter.securityDeposit +
      renter.adminFee +
      renter.applicationFee;
    const petUpfront = renter.pets * (renter.petDeposit + renter.nonRefundablePetFee);
    return base + petUpfront;
  }, [renter]);

  const renterY1 = renterMonthly * 12 + renterMoveIn;

  const leaseBuyout = renter.monthlyRent * 2 + renter.reletFee;
  const leaseFull = renter.monthsRemaining * renter.monthlyRent;

  // ---- BUYER MATH ----
  const downPayment = buyer.offerPrice * (buyer.downPaymentPct / 100);
  const loanAmount = Math.max(0, buyer.offerPrice - downPayment);
  const piPerMonth = monthlyPI(loanAmount, buyer.interestRate, buyer.termYears);

  const vaExemption = useMemo(
    () => texasVAExemption(buyer.vaRating, buyer.vaAge),
    [buyer.vaRating, buyer.vaAge],
  );
  const isVA = buyer.loanType === "va";
  const isVAFullExempt = isVA && buyer.vaStatus === "separated" && vaExemption.fullExemption;

  // VA 100% disabled → annual tax = 0
  const effectiveTaxPct = isVAFullExempt ? 0 : buyer.annualTaxPct;
  const taxableValue = isVA && buyer.vaStatus === "separated" && !vaExemption.fullExemption
    ? Math.max(0, buyer.offerPrice - vaExemption.exemption)
    : buyer.offerPrice;
  const monthlyTax = (taxableValue * (effectiveTaxPct / 100)) / 12;

  const buyerMonthly =
    piPerMonth + monthlyTax + buyer.monthlyInsurance + buyer.monthlyHOA + buyer.monthlyUtilities;

  const amort = useMemo(
    () => amortizationByYear(loanAmount, buyer.interestRate, buyer.termYears),
    [loanAmount, buyer.interestRate, buyer.termYears],
  );
  const y1Equity = amort[0]?.principal ?? 0;
  const totalInt = totalInterest(loanAmount, buyer.interestRate, buyer.termYears);

  // Auto-zero tax on VA 100%, restore on change
  useEffect(() => {
    if (isVAFullExempt && buyer.savedTaxPct === null) {
      setBuyer((b) => ({ ...b, savedTaxPct: b.annualTaxPct, annualTaxPct: 0 }));
    } else if (!isVAFullExempt && buyer.savedTaxPct !== null) {
      setBuyer((b) => ({ ...b, annualTaxPct: b.savedTaxPct ?? b.annualTaxPct, savedTaxPct: null }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVAFullExempt]);

  const wealthAdvantage = renterY1 - (buyerMonthly * 12 - y1Equity);

  // ---- CHARTS ----
  const donutData = [
    { name: "Principal", value: Math.round(piPerMonth - (loanAmount * (buyer.interestRate / 100 / 12))), fill: "hsl(var(--buy-green))" },
    { name: "Interest", value: Math.round(loanAmount * (buyer.interestRate / 100 / 12)), fill: "hsl(var(--gold))" },
    { name: "Taxes", value: Math.round(monthlyTax), fill: "hsl(var(--navy))" },
    { name: "Insurance", value: Math.round(buyer.monthlyInsurance), fill: "hsl(217 30% 50%)" },
    { name: "HOA", value: Math.round(buyer.monthlyHOA), fill: "hsl(44 30% 65%)" },
    { name: "Utilities", value: Math.round(buyer.monthlyUtilities), fill: "hsl(217 20% 70%)" },
  ].filter((d) => d.value > 0);

  const amortChartData = amort.map((y) => ({
    year: `Y${y.year}`,
    Principal: Math.round(y.principal),
    Interest: Math.round(y.interest),
  }));

  const setNum = <K extends keyof BuyerState>(key: K, v: number) => setBuyer((b) => ({ ...b, [key]: v as any }));
  const setRNum = <K extends keyof RenterState>(key: K, v: number) =>
    setRenter((r) => ({ ...r, [key]: v as any }));

  const handleLoanType = (t: LoanType) => setBuyer((b) => applyLoanTypeDefaults(b, t));

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* RENTER PANEL */}
        <Card className="p-6 border-rent/40 bg-rent-soft/40">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-serif text-2xl text-rent font-bold">Renting</h3>
            <span className="text-xs uppercase tracking-wider text-rent/80 font-semibold">$0 equity built</span>
          </div>

          <div className="space-y-4">
            <Field label="Monthly Rent">
              <Input type="number" value={renter.monthlyRent} onChange={(e) => setRNum("monthlyRent", +e.target.value || 0)} />
            </Field>
            <Field label="Monthly Utilities" hint={<button className="text-xs text-rent underline" onClick={() => setRNum("utilities", 175)}>Use average</button>}>
              <Input type="number" value={renter.utilities} onChange={(e) => setRNum("utilities", +e.target.value || 0)} />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Pets">
                <div className="flex items-center gap-2">
                  <Button type="button" size="icon" variant="outline" className="h-9 w-9" onClick={() => setRNum("pets", Math.max(0, renter.pets - 1))}><Minus className="h-3 w-3" /></Button>
                  <span className="w-8 text-center font-semibold">{renter.pets}</span>
                  <Button type="button" size="icon" variant="outline" className="h-9 w-9" onClick={() => setRNum("pets", renter.pets + 1)}><Plus className="h-3 w-3" /></Button>
                </div>
              </Field>
              <Field label="Pet Rent (each / mo)">
                <Input type="number" value={renter.petRent} onChange={(e) => setRNum("petRent", +e.target.value || 0)} />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Renter's Insurance"><Input type="number" value={renter.insurance} onChange={(e) => setRNum("insurance", +e.target.value || 0)} /></Field>
              <Field label="Parking"><Input type="number" value={renter.parking} onChange={(e) => setRNum("parking", +e.target.value || 0)} /></Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Valet Trash"><Input type="number" value={renter.valetTrash} onChange={(e) => setRNum("valetTrash", +e.target.value || 0)} /></Field>
              <Field label="Pest Control"><Input type="number" value={renter.pestControl} onChange={(e) => setRNum("pestControl", +e.target.value || 0)} /></Field>
            </div>

            <div className="rounded-lg bg-white border border-rent/30 p-4 space-y-3">
              <h4 className="font-semibold text-rent text-sm uppercase tracking-wider">Move-In Costs</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Field label="Security Deposit"><Input type="number" value={renter.securityDeposit} onChange={(e) => setRNum("securityDeposit", +e.target.value || 0)} /></Field>
                <Field label="Admin Fee"><Input type="number" value={renter.adminFee} onChange={(e) => setRNum("adminFee", +e.target.value || 0)} /></Field>
                <Field label="Application Fee"><Input type="number" value={renter.applicationFee} onChange={(e) => setRNum("applicationFee", +e.target.value || 0)} /></Field>
                <Field label="Pet Deposit (each)"><Input type="number" value={renter.petDeposit} onChange={(e) => setRNum("petDeposit", +e.target.value || 0)} /></Field>
                <Field label="Non-Refundable Pet Fee (each)"><Input type="number" value={renter.nonRefundablePetFee} onChange={(e) => setRNum("nonRefundablePetFee", +e.target.value || 0)} /></Field>
              </div>
            </div>

            <div className="rounded-lg bg-white border border-rent/30 p-4">
              <h4 className="font-semibold text-rent text-sm uppercase tracking-wider mb-3">Early Lease Break</h4>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <Field label="Months Remaining"><Input type="number" value={renter.monthsRemaining} onChange={(e) => setRNum("monthsRemaining", +e.target.value || 0)} /></Field>
                <Field label="Reletting Fee"><Input type="number" value={renter.reletFee} onChange={(e) => setRNum("reletFee", +e.target.value || 0)} /></Field>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-md bg-rent-soft p-3">
                  <div className="text-xs text-rent/80 font-semibold uppercase">Buyout Clause</div>
                  <div className="text-xl font-bold text-rent mt-1">{fmt$(leaseBuyout)}</div>
                  <div className="text-[11px] text-foreground/60 mt-1">2 months rent + relet fee</div>
                </div>
                <div className="rounded-md bg-rent-soft p-3">
                  <div className="text-xs text-rent/80 font-semibold uppercase">Full Obligation</div>
                  <div className="text-xl font-bold text-rent mt-1">{fmt$(leaseFull)}</div>
                  <div className="text-[11px] text-foreground/60 mt-1">remaining × rent</div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-rent text-white p-5 mt-4">
              <div className="text-xs uppercase tracking-wider opacity-80">Monthly Obligation</div>
              <div className="text-4xl font-serif font-bold mt-1">{fmt$(renterMonthly)}</div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div><div className="opacity-70 text-xs">Move-in</div><div className="font-bold">{fmt$(renterMoveIn)}</div></div>
                <div><div className="opacity-70 text-xs">Year 1 Total</div><div className="font-bold">{fmt$(renterY1)}</div></div>
              </div>
              <div className="mt-3 text-sm font-semibold">Equity built: $0</div>
            </div>
          </div>
        </Card>

        {/* BUYER PANEL */}
        <Card className="p-6 border-buy/40 bg-buy-soft/40">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-serif text-2xl text-buy font-bold">Buying</h3>
            <span className="text-xs uppercase tracking-wider text-buy/80 font-semibold">{fmt$(y1Equity)} year-1 equity</span>
          </div>

          <div className="space-y-4">
            {!lockedLoanType && (
              <Field label="Loan Type">
                <Select value={buyer.loanType} onValueChange={(v) => handleLoanType(v as LoanType)}>
                  <SelectTrigger className="border-gold/60 bg-gold/10 font-semibold"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fha">FHA (3.5% Down)</SelectItem>
                    <SelectItem value="conventional">Conventional</SelectItem>
                    <SelectItem value="va">VA Loan</SelectItem>
                    <SelectItem value="usda">USDA</SelectItem>
                    <SelectItem value="dpa">Down Payment Assistance</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}

            {buyer.loanType === "conventional" && (
              <div className="flex flex-wrap gap-2">
                {([3, 5, 10, 20] as const).map((p) => (
                  <Button
                    key={p}
                    size="sm"
                    variant={buyer.conventionalDownPct === p ? "default" : "outline"}
                    onClick={() => setBuyer((b) => ({ ...b, conventionalDownPct: p, downPaymentPct: p }))}
                    className={buyer.conventionalDownPct === p ? "bg-buy text-white" : ""}
                  >
                    {p}% down
                  </Button>
                ))}
              </div>
            )}

            {buyer.loanType === "va" && (
              <div className="rounded-lg bg-navy text-cream p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="VA Status" labelClass="text-cream/80">
                    <Select value={buyer.vaStatus} onValueChange={(v) => setBuyer((b) => ({ ...b, vaStatus: v as any }))}>
                      <SelectTrigger className="bg-navy-deep border-cream/20 text-cream"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active Duty</SelectItem>
                        <SelectItem value="separated">Separated / Retired</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  {buyer.vaStatus === "separated" && (
                    <Field label="Disability Rating" labelClass="text-cream/80">
                      <Select value={buyer.vaRating} onValueChange={(v) => setBuyer((b) => ({ ...b, vaRating: v as any }))}>
                        <SelectTrigger className="bg-navy-deep border-cream/20 text-cream"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {VA_RATING_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                </div>
                {buyer.vaStatus === "separated" && (
                  <Field label="Veteran Age" labelClass="text-cream/80">
                    <Input type="number" value={buyer.vaAge} onChange={(e) => setNum("vaAge", +e.target.value || 0)}
                      className="bg-navy-deep border-cream/20 text-cream" />
                  </Field>
                )}

                {buyer.vaStatus === "separated" && (
                  <div className="rounded-md bg-navy-deep border border-gold/30 p-3 text-xs text-cream/85 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-gold font-semibold uppercase tracking-wider"><ShieldCheck className="h-3.5 w-3.5" /> TX Property Tax Exemption</div>
                    <div>{vaExemption.description}</div>
                    {!vaExemption.fullExemption && vaExemption.exemption > 0 && (
                      <>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          <div><div className="opacity-60 text-[10px]">Home Value</div><div>{fmt$(buyer.offerPrice)}</div></div>
                          <div><div className="opacity-60 text-[10px]">Exemption</div><div>−{fmt$(vaExemption.exemption)}</div></div>
                          <div><div className="opacity-60 text-[10px]">Taxable</div><div className="text-gold">{fmt$(taxableValue)}</div></div>
                        </div>
                      </>
                    )}
                    {isVAFullExempt && <div className="text-gold font-semibold mt-1">Annual property tax: $0 (100% disabled veteran)</div>}
                    <div className="text-[10px] opacity-60 pt-2 border-t border-cream/10 mt-2">Apply at your county appraisal district. Veterans 65+ qualify for additional exemptions.</div>
                  </div>
                )}
              </div>
            )}

            <Field label={`Offer Price — ${fmt$(buyer.offerPrice)}`}>
              <Input type="number" value={buyer.offerPrice} onChange={(e) => setNum("offerPrice", +e.target.value || 0)} />
            </Field>

            <Field label={`Interest Rate — ${buyer.interestRate.toFixed(2)}%`}>
              <Slider value={[buyer.interestRate]} min={2} max={10} step={0.05} onValueChange={(v) => setNum("interestRate", v[0])} />
            </Field>

            <div>
              <Label className="text-xs font-medium text-foreground/70 uppercase tracking-wider">
                Down Payment — {buyer.downPaymentPct.toFixed(1)}% ({fmt$(downPayment)})
              </Label>
              <Slider className="mt-2" value={[buyer.downPaymentPct]} min={0} max={50} step={0.5} onValueChange={(v) => setNum("downPaymentPct", v[0])} />
            </div>

            <Field label={`Annual Tax Rate — ${effectiveTaxPct.toFixed(2)}%`}>
              <Slider value={[effectiveTaxPct]} min={0} max={4} step={0.05} disabled={isVAFullExempt}
                onValueChange={(v) => setNum("annualTaxPct", v[0])} />
            </Field>

            <div className="grid grid-cols-3 gap-3">
              <Field label="Insurance / mo"><Input type="number" value={buyer.monthlyInsurance} onChange={(e) => setNum("monthlyInsurance", +e.target.value || 0)} /></Field>
              <Field label="HOA / mo"><Input type="number" value={buyer.monthlyHOA} onChange={(e) => setNum("monthlyHOA", +e.target.value || 0)} /></Field>
              <Field label="Utilities / mo" hint={<button className="text-xs text-buy underline" onClick={() => setNum("monthlyUtilities", 275)}>Avg</button>}>
                <Input type="number" value={buyer.monthlyUtilities} onChange={(e) => setNum("monthlyUtilities", +e.target.value || 0)} />
              </Field>
            </div>

            <div>
              <Label className="text-xs font-medium text-foreground/70 uppercase tracking-wider">Loan Term</Label>
              <div className="flex gap-2 mt-2">
                {([5, 15, 20, 30] as const).map((y) => (
                  <Button key={y} size="sm" variant={buyer.termYears === y ? "default" : "outline"}
                    onClick={() => setBuyer((b) => ({ ...b, termYears: y }))}
                    className={buyer.termYears === y ? "bg-buy text-white flex-1" : "flex-1"}>
                    {y}yr
                  </Button>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-buy text-white p-5 mt-4">
              <div className="text-xs uppercase tracking-wider opacity-80">Monthly Obligation</div>
              <div className="text-4xl font-serif font-bold mt-1">{fmt$(buyerMonthly)}</div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <div><div className="opacity-70">P&amp;I</div><div className="font-semibold">{fmt$(piPerMonth)}</div></div>
                <div><div className="opacity-70">Tax</div><div className="font-semibold">{fmt$(monthlyTax)}</div></div>
                <div><div className="opacity-70">Ins</div><div className="font-semibold">{fmt$(buyer.monthlyInsurance)}</div></div>
                <div><div className="opacity-70">HOA</div><div className="font-semibold">{fmt$(buyer.monthlyHOA)}</div></div>
                <div><div className="opacity-70">Util</div><div className="font-semibold">{fmt$(buyer.monthlyUtilities)}</div></div>
                <div><div className="opacity-70">Y1 Equity</div><div className="font-semibold text-gold">{fmt$(y1Equity)}</div></div>
              </div>
              <div className="mt-3 pt-3 border-t border-white/20 text-xs opacity-80">
                Total interest over {buyer.termYears} years: <span className="font-semibold opacity-100">{fmt$(totalInt)}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="rounded-lg bg-white border p-4">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-foreground/70 mb-3">Monthly Breakdown</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={donutData} dataKey="value" innerRadius={45} outerRadius={75} paddingAngle={2}>
                      {donutData.map((d, i) => <Cell key={i} fill={d.fill} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => fmt$(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="rounded-lg bg-white border p-4">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-foreground/70 mb-3">Principal vs Interest</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={amortChartData}>
                    <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v: number) => fmt$(v)} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="Principal" stackId="a" fill="hsl(var(--buy-green))" />
                    <Bar dataKey="Interest" stackId="a" fill="hsl(var(--gold))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* VERDICT */}
      <Card className="bg-gradient-hero text-cream p-8 border-0 shadow-elegant">
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-center mb-6">The Verdict</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Stat label="Rent — Year 1" value={fmt$(renterY1)} tone="rent" bar={100} />
          <Stat label="Buy — Year 1" value={fmt$(buyerMonthly * 12)} tone="buy"
            bar={Math.min(100, ((buyerMonthly * 12) / Math.max(renterY1, 1)) * 100)} />
          <Stat label="Wealth Advantage" value={fmt$(Math.max(0, wealthAdvantage + y1Equity))} tone="gold"
            sub="vs. renting (incl. equity built)" bar={100} />
        </div>
      </Card>
    </div>
  );
};

const Field = ({ label, hint, children, labelClass = "" }: { label: string; hint?: React.ReactNode; children: React.ReactNode; labelClass?: string }) => (
  <div>
    <div className="flex items-center justify-between mb-1.5">
      <Label className={`text-xs font-medium uppercase tracking-wider text-foreground/70 ${labelClass}`}>{label}</Label>
      {hint}
    </div>
    {children}
  </div>
);

const Stat = ({ label, value, tone, sub, bar }: { label: string; value: string; tone: "rent" | "buy" | "gold"; sub?: string; bar: number }) => {
  const colorMap = {
    rent: "bg-rent",
    buy: "bg-buy",
    gold: "bg-gold",
  };
  const textMap = {
    rent: "text-rent",
    buy: "text-buy",
    gold: "text-gold",
  };
  return (
    <div className="bg-white/5 rounded-lg p-5 border border-cream/10">
      <div className="text-xs uppercase tracking-wider opacity-70">{label}</div>
      <div className={`text-3xl font-serif font-bold mt-1 ${textMap[tone]}`}>{value}</div>
      {sub && <div className="text-xs opacity-60 mt-1">{sub}</div>}
      <div className="mt-3 h-1.5 rounded-full bg-cream/10 overflow-hidden">
        <div className={`h-full ${colorMap[tone]} transition-all duration-1000`} style={{ width: `${bar}%` }} />
      </div>
    </div>
  );
};
