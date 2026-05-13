// 2026 federal tax brackets (IRS Revenue Procedure 2025-32)
export const FED_BRACKETS = {
  single: [
    [12400, 0.10],
    [50400, 0.12],
    [105700, 0.22],
    [201775, 0.24],
    [256225, 0.32],
    [640600, 0.35],
    [Infinity, 0.37],
  ],
  mfj: [
    [24800, 0.10],
    [100800, 0.12],
    [211400, 0.22],
    [403550, 0.24],
    [512450, 0.32],
    [768700, 0.35],
    [Infinity, 0.37],
  ],
};

// 2026 federal standard deduction (post-OBBBA)
export const FED_STD_DED = { single: 16100, mfj: 32200 };

// California 2025 FTB-published brackets — used because FTB has not yet released
// finalized 2026 brackets at time of build. Inflation drift is ~3%, well within
// the noise of the estimate. Standard deduction uses the 2026 EDD figures.
export const CA_BRACKETS = {
  single: [
    [10756, 0.01],
    [25499, 0.02],
    [40245, 0.04],
    [55866, 0.06],
    [70606, 0.08],
    [360659, 0.093],
    [432787, 0.103],
    [721314, 0.113],
    [Infinity, 0.123],
  ],
  mfj: [
    [21512, 0.01],
    [50998, 0.02],
    [80490, 0.04],
    [111732, 0.06],
    [141212, 0.08],
    [721318, 0.093],
    [865574, 0.103],
    [1442628, 0.113],
    [Infinity, 0.123],
  ],
};

// CA standard deduction for 2026 (per EDD Withholding Schedules 2026)
export const CA_STD_DED = { single: 5706, mfj: 11412 };

// CA Mental Health Services Tax: extra 1% on income over $1M
export const CA_MHST_THRESHOLD = 1000000;
export const CA_MHST_RATE = 0.01;

// FICA 2026
export const SS_WAGE_BASE = 184500; // SSA 2026 announcement
export const SS_RATE = 0.062;
export const MEDICARE_RATE = 0.0145;
export const ADDL_MEDICARE_RATE = 0.009;
export const ADDL_MEDICARE_THRESHOLD = { single: 200000, mfj: 250000 };

// CA SDI: 1.1% on all wages, no cap (since 2024)
export const CA_SDI_RATE = 0.011;

// 401(k) elective deferral cap 2026 (IRS Notice 2025-67)
export const RETIREMENT_401K_LIMIT = 24500;
