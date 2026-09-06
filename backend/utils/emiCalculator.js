
export const calculateMonthlyInstallment = (principal, plan) => {
  const { tenureMonths, interestRatePercent, isNoCost, processingFee } = plan;

  if (isNoCost || !interestRatePercent) {
    return {
      monthlyAmount: Math.ceil(principal / tenureMonths),
      totalPayable: principal + processingFee,
      totalInterest: 0,
    };
  }

  const monthlyRate = interestRatePercent / 12 / 100;
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  const totalPayable = Math.round(emi * tenureMonths + processingFee);

  return {
    monthlyAmount: Math.round(emi),
    totalPayable,
    totalInterest: Math.round(totalPayable - principal - processingFee),
  };
};

export const buildEmiOptions = (finalPrice, plans) =>
  plans
    .map((plan) => {
      if (finalPrice < (plan.minOrderValue || 0)) return null;
      const { monthlyAmount, totalPayable, totalInterest } =
        calculateMonthlyInstallment(finalPrice, plan);
      return {
        planId: plan.planId,
        tenureMonths: plan.tenureMonths,
        isNoCost: plan.isNoCost,
        interestRatePercent: plan.interestRatePercent,
        processingFee: plan.processingFee,
        monthlyAmount,
        totalPayable,
        totalInterest,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.tenureMonths - b.tenureMonths);
