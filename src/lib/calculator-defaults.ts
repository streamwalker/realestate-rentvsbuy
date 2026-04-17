// Default values + per-loan presets for the calculator
export type LoanType = "fha" | "conventional" | "va" | "usda" | "dpa";

export interface BuyerState {
  loanType: LoanType;
  conventionalDownPct: 3 | 5 | 10 | 20;
  vaStatus: "active" | "separated";
  vaRating: "none" | "10-29" | "30-49" | "50-69" | "70-99" | "100";
  vaAge: number;
  offerPrice: number;
  interestRate: number;
  downPaymentPct: number;
  annualTaxPct: number;
  monthlyInsurance: number;
  monthlyHOA: number;
  monthlyUtilities: number;
  termYears: 5 | 15 | 20 | 30;
  // Saved tax rate when VA 100% zeros it
  savedTaxPct: number | null;
}

export interface RenterState {
  monthlyRent: number;
  utilities: number;
  pets: number;
  petRent: number;
  insurance: number;
  parking: number;
  valetTrash: number;
  pestControl: number;
  // Move-in
  firstMonth: boolean;
  lastMonth: boolean;
  securityDeposit: number;
  adminFee: number;
  applicationFee: number;
  petDeposit: number;
  nonRefundablePetFee: number;
  // Lease break
  monthsRemaining: number;
  reletFee: number;
}

export const DEFAULT_RENTER: RenterState = {
  monthlyRent: 1495,
  utilities: 175,
  pets: 0,
  petRent: 30,
  insurance: 15,
  parking: 40,
  valetTrash: 25,
  pestControl: 8,
  firstMonth: true,
  lastMonth: false,
  securityDeposit: 500,
  adminFee: 175,
  applicationFee: 75,
  petDeposit: 300,
  nonRefundablePetFee: 300,
  monthsRemaining: 6,
  reletFee: 1495,
};

export const DEFAULT_BUYER: BuyerState = {
  loanType: "fha",
  conventionalDownPct: 5,
  vaStatus: "separated",
  vaRating: "none",
  vaAge: 35,
  offerPrice: 201999,
  interestRate: 4.5,
  downPaymentPct: 3.5,
  annualTaxPct: 1.8,
  monthlyInsurance: 150,
  monthlyHOA: 51,
  monthlyUtilities: 275,
  termYears: 30,
  savedTaxPct: null,
};

export function applyLoanTypeDefaults(state: BuyerState, newType: LoanType): BuyerState {
  let next: BuyerState = { ...state, loanType: newType };
  switch (newType) {
    case "fha":
      next.downPaymentPct = 3.5;
      break;
    case "conventional":
      next.downPaymentPct = state.conventionalDownPct;
      break;
    case "va":
      next.downPaymentPct = 0;
      break;
    case "usda":
      next.downPaymentPct = 0;
      break;
    case "dpa":
      next.downPaymentPct = 0;
      // DPA programs typically run ~1% above prevailing rate
      next.interestRate = +(state.interestRate + 1).toFixed(3);
      break;
  }
  return next;
}
