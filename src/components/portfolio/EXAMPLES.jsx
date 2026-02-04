/**
 * Portfolio Components - Implementation Examples
 *
 * This file demonstrates how to use each portfolio component
 * in real application scenarios. Reference these patterns
 * when integrating components into your app.
 */

// ============================================
// EXAMPLE 1: Basic Individual Components
// ============================================

export const BasicExample = () => {
  return (
    <div className="space-y-6">
      {/* DeltaIndicator - Simple change display */}
      <div>
        <h3 className="font-semibold mb-2">Delta Indicator Examples</h3>
        <div className="flex gap-4">
          <DeltaIndicator current={65.5} baseline={60} label="MER change" />
          <DeltaIndicator current={1300} baseline={1500} format="currency" label="Fee savings" />
          <DeltaIndicator current={70} baseline={70} label="No change" />
        </div>
      </div>

      {/* VolatilityMeter - Risk display */}
      <div>
        <h3 className="font-semibold mb-2">Volatility Meter Examples</h3>
        <div className="grid grid-cols-2 gap-4">
          <VolatilityMeter growthAllocation={25} defensiveAllocation={75} />
          <VolatilityMeter growthAllocation={75} defensiveAllocation={25} />
        </div>
      </div>

      {/* GrowthDefensiveBar - Quick allocation view */}
      <div>
        <h3 className="font-semibold mb-2">Growth/Defensive Bar Examples</h3>
        <div className="space-y-3">
          <GrowthDefensiveBar growth={60} defensive={40} colorScheme="teal" />
          <GrowthDefensiveBar growth={80} defensive={20} colorScheme="gradient" />
          <GrowthDefensiveBar growth={30} defensive={70} colorScheme="default" />
        </div>
      </div>
    </div>
  );
};

// ============================================
// EXAMPLE 2: Portfolio Comparison Dashboard
// ============================================

export const ComparisonDashboard = ({
  currentPortfolio,
  baselinePortfolio
}) => {
  const currentMetrics = {
    totalAllocation: 100,
    weightedMER: 0.0065,
    totalGrowth: 70,
    totalDefensive: 30,
    totalFees: 1300
  };

  const baselineMetrics = {
    totalAllocation: 100,
    weightedMER: 0.0085,
    totalGrowth: 65,
    totalDefensive: 35,
    totalFees: 1700
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold">Portfolio Comparison</h2>

      {/* Main comparison banner */}
      <ComparisonSummary
        current={currentMetrics}
        baseline={baselineMetrics}
        compact={false}
      />

      {/* Side-by-side detailed view */}
      <div className="grid grid-cols-2 gap-6">
        {/* Current portfolio */}
        <div>
          <h3 className="font-semibold mb-4">Current Portfolio</h3>
          <div className="space-y-4">
            <VolatilityMeter
              growthAllocation={currentMetrics.totalGrowth}
              defensiveAllocation={currentMetrics.totalDefensive}
              detailed={true}
            />
            <GrowthDefensiveBar
              growth={currentMetrics.totalGrowth}
              defensive={currentMetrics.totalDefensive}
              detailed={true}
              colorScheme="teal"
            />
          </div>
        </div>

        {/* Baseline portfolio */}
        <div>
          <h3 className="font-semibold mb-4">Baseline Portfolio</h3>
          <div className="space-y-4">
            <VolatilityMeter
              growthAllocation={baselineMetrics.totalGrowth}
              defensiveAllocation={baselineMetrics.totalDefensive}
              detailed={true}
            />
            <GrowthDefensiveBar
              growth={baselineMetrics.totalGrowth}
              defensive={baselineMetrics.totalDefensive}
              detailed={true}
              colorScheme="default"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// EXAMPLE 3: Account Panel Integration
// ============================================

export const AccountPanelWithValidation = ({
  account,
  investments,
  onUpdate
}) => {
  // Calculate metrics using utilities
  const metrics = calculateAccountTotals(
    account.allocations,
    account.balance,
    investments
  );

  const isValid = Math.abs(metrics.totalAllocation - 100) < 0.5;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-fs-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-fs-teal-600 to-fs-teal-700 px-6 py-4">
        <h3 className="text-lg font-semibold text-white">{account.name}</h3>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick status check */}
        <div>
          <h4 className="font-semibold mb-3">Portfolio Status</h4>
          <ValidationWarnings
            allocations={account.allocations}
            portfolioMER={metrics.weightedMER}
            totalFees={metrics.totalFees}
            hasInvestments={Object.keys(account.allocations).length > 0}
            verbose={false}
          />
        </div>

        {/* Metrics display */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-fs-slate-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-fs-teal-600">
              {(metrics.weightedMER * 100).toFixed(2)}%
            </div>
            <div className="text-xs text-fs-slate-500">Portfolio MER</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {metrics.totalGrowth.toFixed(1)}%
            </div>
            <div className="text-xs text-fs-slate-500">Growth</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {metrics.totalDefensive.toFixed(1)}%
            </div>
            <div className="text-xs text-fs-slate-500">Defensive</div>
          </div>
        </div>

        {/* Allocation visualization */}
        <div>
          <h4 className="font-semibold mb-3">Asset Allocation</h4>
          <GrowthDefensiveBar
            growth={metrics.totalGrowth}
            defensive={metrics.totalDefensive}
            detailed={true}
            colorScheme="teal"
          />
        </div>

        {/* Risk assessment */}
        <div>
          <h4 className="font-semibold mb-3">Risk Profile</h4>
          <VolatilityMeter
            growthAllocation={metrics.totalGrowth}
            defensiveAllocation={metrics.totalDefensive}
            detailed={true}
          />
        </div>

        {/* Detailed validation */}
        <div>
          <h4 className="font-semibold mb-3">Validation Checklist</h4>
          <ValidationWarnings
            allocations={account.allocations}
            portfolioMER={metrics.weightedMER}
            totalFees={metrics.totalFees}
            hasInvestments={Object.keys(account.allocations).length > 0}
            verbose={true}
          />
        </div>

        {/* Action button */}
        <button
          disabled={!isValid}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            isValid
              ? 'bg-fs-teal-600 text-white hover:bg-fs-teal-700'
              : 'bg-fs-slate-100 text-fs-slate-400 cursor-not-allowed'
          }`}
        >
          {isValid ? 'Submit Portfolio' : 'Fix Validation Issues'}
        </button>
      </div>
    </div>
  );
};

// ============================================
// EXAMPLE 4: Compact Mobile View
// ============================================

export const MobilePortfolioView = ({ portfolio }) => {
  const metrics = portfolio.metrics;
  const allocations = portfolio.allocations;

  return (
    <div className="space-y-4 p-4">
      {/* Status badge */}
      <div>
        <ValidationWarnings
          allocations={allocations}
          portfolioMER={metrics.weightedMER}
          hasInvestments={Object.keys(allocations).length > 0}
          verbose={false}
        />
      </div>

      {/* Compact metrics */}
      <div className="bg-fs-slate-50 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-bold">{metrics.totalGrowth.toFixed(0)}%</div>
            <div className="text-xs text-gray-600">Growth</div>
          </div>
          <div>
            <div className="text-lg font-bold">{(metrics.weightedMER * 100).toFixed(2)}%</div>
            <div className="text-xs text-gray-600">MER</div>
          </div>
          <div>
            <div className="text-lg font-bold">${(metrics.totalFees / 1000).toFixed(1)}k</div>
            <div className="text-xs text-gray-600">Annual</div>
          </div>
        </div>
      </div>

      {/* Compact allocation bar */}
      <GrowthDefensiveBar
        growth={metrics.totalGrowth}
        defensive={metrics.totalDefensive}
        colorScheme="teal"
        height="h-4"
      />

      {/* Risk meter */}
      <VolatilityMeter
        growthAllocation={metrics.totalGrowth}
        defensiveAllocation={metrics.totalDefensive}
      />
    </div>
  );
};

// ============================================
// EXAMPLE 5: Comparison with Delta Indicators
// ============================================

export const DetailedMetricsComparison = ({
  current,
  baseline
}) => {
  return (
    <div className="bg-white rounded-lg border border-fs-slate-200 p-6 space-y-4">
      <h3 className="text-lg font-semibold">Metrics Comparison</h3>

      {/* MER Comparison */}
      <div className="flex items-center justify-between p-3 bg-fs-slate-50 rounded-lg">
        <div>
          <div className="text-sm font-medium text-fs-slate-700">Portfolio MER</div>
          <div className="text-xs text-fs-slate-600">Annual management expense ratio</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="font-bold">{(current.weightedMER * 100).toFixed(2)}%</div>
            <div className="text-xs text-gray-600">vs {(baseline.weightedMER * 100).toFixed(2)}%</div>
          </div>
          <DeltaIndicator
            current={current.weightedMER * 100}
            baseline={baseline.weightedMER * 100}
            format="number"
            size="small"
            label="bps"
          />
        </div>
      </div>

      {/* Fee Comparison */}
      <div className="flex items-center justify-between p-3 bg-fs-slate-50 rounded-lg">
        <div>
          <div className="text-sm font-medium text-fs-slate-700">Annual Fees</div>
          <div className="text-xs text-fs-slate-600">Estimated annual cost</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="font-bold">${(current.totalFees || 0).toLocaleString()}</div>
            <div className="text-xs text-gray-600">vs ${(baseline.totalFees || 0).toLocaleString()}</div>
          </div>
          <DeltaIndicator
            current={current.totalFees || 0}
            baseline={baseline.totalFees || 0}
            format="currency"
            size="small"
          />
        </div>
      </div>

      {/* Growth Allocation Comparison */}
      <div className="flex items-center justify-between p-3 bg-fs-slate-50 rounded-lg">
        <div>
          <div className="text-sm font-medium text-fs-slate-700">Growth Allocation</div>
          <div className="text-xs text-fs-slate-600">Growth vs Defensive split</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="font-bold">{current.totalGrowth.toFixed(1)}%</div>
            <div className="text-xs text-gray-600">vs {baseline.totalGrowth.toFixed(1)}%</div>
          </div>
          <DeltaIndicator
            current={current.totalGrowth}
            baseline={baseline.totalGrowth}
            format="percent"
            size="small"
          />
        </div>
      </div>
    </div>
  );
};

// ============================================
// EXAMPLE 6: Complete App Integration Pattern
// ============================================

export const CompletePortfolioApp = ({ portfolioData }) => {
  const [current, setCurrent] = React.useState(portfolioData.current);
  const [baseline, setBaseline] = React.useState(portfolioData.baseline);

  const currentMetrics = calculateAccountTotals(
    current.allocations,
    current.balance,
    current.investments
  );

  const baselineMetrics = calculateAccountTotals(
    baseline.allocations,
    baseline.balance,
    baseline.investments
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Portfolio Builder</h1>
        <p className="text-gray-600">Manage and compare your investment portfolio</p>
      </header>

      {/* Main comparison section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Portfolio Overview</h2>
        <ComparisonSummary current={currentMetrics} baseline={baselineMetrics} />
      </section>

      {/* Detailed metrics grid */}
      <section className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Current Portfolio</h3>
          <div className="space-y-4">
            <VolatilityMeter
              growthAllocation={currentMetrics.totalGrowth}
              defensiveAllocation={currentMetrics.totalDefensive}
              detailed={true}
            />
            <GrowthDefensiveBar
              growth={currentMetrics.totalGrowth}
              defensive={currentMetrics.totalDefensive}
              detailed={true}
              colorScheme="teal"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Baseline Portfolio</h3>
          <div className="space-y-4">
            <VolatilityMeter
              growthAllocation={baselineMetrics.totalGrowth}
              defensiveAllocation={baselineMetrics.totalDefensive}
              detailed={true}
            />
            <GrowthDefensiveBar
              growth={baselineMetrics.totalGrowth}
              defensive={baselineMetrics.totalDefensive}
              detailed={true}
              colorScheme="default"
            />
          </div>
        </div>
      </section>

      {/* Validation section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Portfolio Validation</h2>
        <ValidationWarnings
          allocations={current.allocations}
          portfolioMER={currentMetrics.weightedMER}
          totalFees={currentMetrics.totalFees}
          hasInvestments={Object.keys(current.allocations).length > 0}
          verbose={true}
        />
      </section>

      {/* Detailed comparison */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Detailed Metrics</h2>
        <DetailedMetricsComparison current={currentMetrics} baseline={baselineMetrics} />
      </section>
    </div>
  );
};

// ============================================
// EXPORTS FOR TESTING
// ============================================

export default {
  BasicExample,
  ComparisonDashboard,
  AccountPanelWithValidation,
  MobilePortfolioView,
  DetailedMetricsComparison,
  CompletePortfolioApp
};
