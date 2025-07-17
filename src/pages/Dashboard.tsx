import { MetricCard } from "@/components/ui/metric-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Banknote,
  Target,
  Activity,
  AlertCircle,
  CheckCircle
} from "lucide-react"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { useDashboardMetrics } from "@/hooks/useFinancialData"

// Sample data for charts (will be replaced with real data)
const revenueData = [
  { quarter: 'Q1 2023', revenue: 1000000 },
  { quarter: 'Q2 2023', revenue: 1100000 },
  { quarter: 'Q3 2023', revenue: 1200000 },
  { quarter: 'Q4 2023', revenue: 1300000 },
  { quarter: 'Q1 2024', revenue: 1400000 },
  { quarter: 'Q2 2024', revenue: 1500000 },
  { quarter: 'Q3 2024', revenue: 1600000 },
  { quarter: 'Q4 2024', revenue: 1700000 },
]

const cashFlowData = [
  { name: 'Operating', value: 500000, color: '#8b5cf6' },
  { name: 'Investing', value: -200000, color: '#a855f7' },
  { name: 'Financing', value: -100000, color: '#c084fc' },
  { name: 'Net Cash Flow', value: 200000, color: '#d8b4fe' },
]

const companyPerformance = [
  { name: 'TechCorp Inc.', growth: 15.2, revenue: 6800000 },
  { name: 'DataSystems LLC', growth: 12.8, revenue: 4500000 },
  { name: 'CloudWorks Ltd.', growth: 8.4, revenue: 3200000 },
]

export default function Dashboard() {
  const { data: metrics, loading, error } = useDashboardMetrics()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard metrics...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <p className="text-destructive">Error loading dashboard data</p>
          <p className="text-sm text-muted-foreground mt-2">{error}</p>
        </div>
      </div>
    )
  }

  // Calculate aggregated metrics
  const totalRevenue = metrics.reduce((sum, m) => sum + (m.total_revenue || 0), 0)
  const avgEbitdaMargin = metrics.reduce((sum, m) => sum + (m.ebitda_margin || 0), 0) / metrics.length
  const totalCashFlow = metrics.reduce((sum, m) => sum + (m.operating_cash_flow || 0), 0)
  const avgCurrentRatio = metrics.reduce((sum, m) => sum + (m.current_ratio || 0), 0) / metrics.length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Financial Dashboard
          </h1>
          <p className="text-muted-foreground">
            Executive overview of key financial metrics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="glass-card">
            <CheckCircle className="h-4 w-4 mr-1" />
            Live Data
          </Badge>
          <Badge variant="outline" className="glass-card">
            Q4 2024
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={`$${(totalRevenue / 1000000).toFixed(1)}M`}
          subtitle="Current Quarter"
          trend="up"
          trendValue="12.5%"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <MetricCard
          title="EBITDA Margin"
          value={`${avgEbitdaMargin.toFixed(1)}%`}
          subtitle="Average Margin"
          trend="up"
          trendValue="2.3%"
          icon={<Target className="h-5 w-5" />}
        />
        <MetricCard
          title="Operating Cash Flow"
          value={`$${(totalCashFlow / 1000000).toFixed(1)}M`}
          subtitle="Current Quarter"
          trend="up"
          trendValue="8.7%"
          icon={<Banknote className="h-5 w-5" />}
        />
        <MetricCard
          title="Current Ratio"
          value={avgCurrentRatio.toFixed(2)}
          subtitle="Liquidity Health"
          trend="neutral"
          trendValue="0.1"
          icon={<Activity className="h-5 w-5" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Revenue Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${(value as number / 1000000).toFixed(1)}M`, 'Revenue']}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cash Flow Analysis */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Cash Flow Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${(value as number / 1000000).toFixed(1)}M`, 'Cash Flow']}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Company Performance Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Top Performing Companies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3">Company</th>
                  <th className="text-right p-3">Revenue</th>
                  <th className="text-right p-3">Growth Rate</th>
                  <th className="text-right p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {companyPerformance.map((company, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="p-3 font-medium">{company.name}</td>
                    <td className="p-3 text-right">${(company.revenue / 1000000).toFixed(1)}M</td>
                    <td className="p-3 text-right">
                      <Badge variant={company.growth > 10 ? "default" : "secondary"}>
                        {company.growth}%
                      </Badge>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Healthy</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5" />
            <span>Recent Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Revenue target exceeded</p>
                <p className="text-xs text-muted-foreground">TechCorp Inc. exceeded Q4 revenue target by 15%</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <Activity className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Cash flow improved</p>
                <p className="text-xs text-muted-foreground">Operating cash flow increased by 8.7% this quarter</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium">Margin compression</p>
                <p className="text-xs text-muted-foreground">DataSystems LLC margin decreased by 1.2%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}