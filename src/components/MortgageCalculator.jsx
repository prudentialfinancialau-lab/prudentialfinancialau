import { useState } from 'react';

const MortgageCalculator = ({ data = {} }) => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [repaymentType, setRepaymentType] = useState('principal-interest');
  const [repaymentFrequency, setRepaymentFrequency] = useState('monthly');

  // Default values
  const title = data?.title || 'Mortgage Calculator';
  const description = data?.description || 'Calculate your home loan repayments with our Australian mortgage calculator. Get instant estimates for principal and interest or interest-only loans.';

  // Calculate repayments
  const calculateRepayment = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const years = parseFloat(loanTerm);

    if (!principal || !annualRate || !years) return { payment: 0, totalPayment: 0, totalInterest: 0 };

    let periodsPerYear, numberOfPayments, periodicRate, payment;

    // Determine frequency
    switch (repaymentFrequency) {
      case 'weekly':
        periodsPerYear = 52;
        break;
      case 'fortnightly':
        periodsPerYear = 26;
        break;
      case 'monthly':
      default:
        periodsPerYear = 12;
        break;
    }

    numberOfPayments = years * periodsPerYear;
    periodicRate = annualRate / periodsPerYear;

    if (repaymentType === 'interest-only') {
      // Interest-only calculation
      payment = principal * periodicRate;
    } else {
      // Principal + Interest calculation
      if (periodicRate === 0) {
        payment = principal / numberOfPayments;
      } else {
        payment = principal * (periodicRate * Math.pow(1 + periodicRate, numberOfPayments)) /
                  (Math.pow(1 + periodicRate, numberOfPayments) - 1);
      }
    }

    const totalPayment = payment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    return {
      payment: payment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2)
    };
  };

  const results = calculateRepayment();

  // Format currency for display (Australian)
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatCurrencyDecimal = (value) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const getFrequencyLabel = () => {
    switch (repaymentFrequency) {
      case 'weekly': return 'week';
      case 'fortnightly': return 'fortnight';
      case 'monthly':
      default: return 'month';
    }
  };

  return (
    <section id="calculator" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {/* Calculator Form */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Loan Details</h3>

            {/* Loan Amount */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Loan Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none text-lg font-semibold"
                  step="10000"
                />
              </div>
              <input
                type="range"
                min="50000"
                max="2000000"
                step="10000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full mt-3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$50K</span>
                <span>$2M</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Interest Rate (% p.a.)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none text-lg font-semibold"
                step="0.1"
                min="0"
                max="20"
              />
              <input
                type="range"
                min="1"
                max="15"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full mt-3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1%</span>
                <span>15%</span>
              </div>
            </div>

            {/* Loan Term */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Loan Term (years)
              </label>
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none text-lg font-semibold"
                step="1"
                min="1"
                max="40"
              />
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full mt-3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 year</span>
                <span>40 years</span>
              </div>
            </div>

            {/* Repayment Type */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Repayment Type
              </label>
              <select
                value={repaymentType}
                onChange={(e) => setRepaymentType(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none text-base font-medium"
              >
                <option value="principal-interest">Principal & Interest</option>
                <option value="interest-only">Interest Only</option>
              </select>
            </div>

            {/* Repayment Frequency */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Repayment Frequency
              </label>
              <select
                value={repaymentFrequency}
                onChange={(e) => setRepaymentFrequency(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none text-base font-medium"
              >
                <option value="monthly">Monthly</option>
                <option value="fortnightly">Fortnightly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
          </div>

          {/* Results Panel */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl sm:rounded-2xl shadow-2xl p-6 sm:p-8 text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-6">Your Repayments</h3>

            {/* Main Repayment Amount */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
              <p className="text-emerald-100 text-sm mb-2 uppercase tracking-wide">
                {repaymentFrequency.charAt(0).toUpperCase() + repaymentFrequency.slice(1)} Repayment
              </p>
              <div className="text-4xl sm:text-5xl font-bold mb-1">
                {formatCurrencyDecimal(results.payment)}
              </div>
              <p className="text-emerald-100 text-sm">
                per {getFrequencyLabel()}
              </p>
            </div>

            {/* Breakdown */}
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/20">
                <span className="text-emerald-100">Loan Amount</span>
                <span className="font-bold text-lg">{formatCurrency(loanAmount)}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-white/20">
                <span className="text-emerald-100">Total Interest</span>
                <span className="font-bold text-lg">{formatCurrency(results.totalInterest)}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-white/20">
                <span className="text-emerald-100">Total Repayment</span>
                <span className="font-bold text-lg">{formatCurrency(results.totalPayment)}</span>
              </div>

              <div className="flex justify-between items-center py-3">
                <span className="text-emerald-100">Loan Term</span>
                <span className="font-bold text-lg">{loanTerm} years</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <a
                href="#contact"
                className="block w-full bg-white text-emerald-600 text-center py-4 rounded-lg font-bold text-lg hover:bg-emerald-50 transition-colors shadow-lg"
              >
                Get Expert Advice
              </a>
              <p className="text-emerald-100 text-xs text-center mt-3">
                * This calculator provides estimates only. Actual repayments may vary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MortgageCalculator;
