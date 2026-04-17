// Mortgage & calculator math helpers — all client-side, no server calls

export function monthlyPI(loanAmount: number, annualRatePct: number, termYears: number): number {
  if (loanAmount <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  const n = termYears * 12;
  if (r === 0) return loanAmount / n;
  return (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function totalInterest(loanAmount: number, annualRatePct: number, termYears: number): number {
  return monthlyPI(loanAmount, annualRatePct, termYears) * termYears * 12 - loanAmount;
}

export interface AmortYear {
  year: number;
  principal: number;
  interest: number;
  balance: number;
}

export function amortizationByYear(loanAmount: number, annualRatePct: number, termYears: number): AmortYear[] {
  const r = annualRatePct / 100 / 12;
  const n = termYears * 12;
  const pmt = monthlyPI(loanAmount, annualRatePct, termYears);
  let balance = loanAmount;
  const out: AmortYear[] = [];
  for (let y = 1; y <= termYears; y++) {
    let yp = 0;
    let yi = 0;
    for (let m = 0; m < 12; m++) {
      const interest = balance * r;
      const principal = pmt - interest;
      yp += principal;
      yi += interest;
      balance -= principal;
    }
    out.push({ year: y, principal: yp, interest: yi, balance: Math.max(0, balance) });
  }
  return out;
}

export function year1Equity(loanAmount: number, annualRatePct: number, termYears: number): number {
  const amort = amortizationByYear(loanAmount, annualRatePct, termYears);
  return amort[0]?.principal ?? 0;
}

export const fmt$ = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const fmt$2 = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

export const fmtPct = (n: number, digits = 2) => `${n.toFixed(digits)}%`;

// Texas VA disability tax exemption tiers (Tax Code §11.131-11.133)
// Returns dollar-amount property tax exemption for the disability rating
export interface VAExemption {
  exemption: number;
  description: string;
  fullExemption: boolean;
}

export function texasVAExemption(rating: string, age?: number): VAExemption {
  switch (rating) {
    case "100":
      return {
        exemption: Infinity,
        description: "100% disability rating: total property tax exemption on residence homestead",
        fullExemption: true,
      };
    case "70-99":
      return { exemption: 12000, description: "70%–99% rating: $12,000 exemption", fullExemption: false };
    case "50-69":
      return { exemption: 10000, description: "50%–69% rating: $10,000 exemption", fullExemption: false };
    case "30-49":
      return { exemption: 7500, description: "30%–49% rating: $7,500 exemption", fullExemption: false };
    case "10-29":
      return { exemption: 5000, description: "10%–29% rating: $5,000 exemption", fullExemption: false };
    default: {
      // Veterans 65+ with any disability get the 10–29% tier minimum
      if (age && age >= 65) {
        return { exemption: 12000, description: "Age 65+ veteran with disability: $12,000 exemption", fullExemption: false };
      }
      return { exemption: 0, description: "No disability rating: no exemption", fullExemption: false };
    }
  }
}

export const VA_RATING_OPTIONS = [
  { value: "none", label: "No Rating" },
  { value: "10-29", label: "10% – 29%" },
  { value: "30-49", label: "30% – 49%" },
  { value: "50-69", label: "50% – 69%" },
  { value: "70-99", label: "70% – 99%" },
  { value: "100", label: "100%" },
] as const;
