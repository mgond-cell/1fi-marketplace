import { formatINR } from "./ProductCard";

export default function EMIPlanSelector({ emiOptions, selectedPlanId, onSelect }) {
  if (!emiOptions?.length) {
    return <p className="description-text">No EMI plans available for this product.</p>;
  }

  return (
    <div className="emi-plan-list">
      {emiOptions.map((plan) => (
        <div
          key={plan.planId}
          className={`emi-plan-card ${selectedPlanId === plan.planId ? "active" : ""}`}
          onClick={() => onSelect(plan.planId)}
        >
          <div className="emi-plan-card__left">
            <span className="emi-plan-card__radio" />
            <div>
              <div className="emi-plan-card__tenure">
                {plan.tenureMonths} months
                {plan.isNoCost && <span className="no-cost-badge">NO-COST</span>}
              </div>
              <div className="emi-plan-card__meta">
                {plan.isNoCost
                  ? "0% interest"
                  : `${plan.interestRatePercent}% p.a. interest`}
                {plan.processingFee > 0 && ` · ₹${plan.processingFee} processing fee`}
              </div>
            </div>
          </div>
          <div className="emi-plan-card__amount">{formatINR(plan.monthlyAmount)}/mo</div>
        </div>
      ))}
    </div>
  );
}
