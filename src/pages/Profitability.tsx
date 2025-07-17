import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, DollarSign, Activity } from "lucide-react"
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
  ComposedChart,
  Area,
  AreaChart
} from 'recharts'
import { useEbitdaMargins } from "@/hooks/useFinancialData"

// Sample data for profitability analysis
const ebitdaData = [
  { quarter: 'Q1 2023', ebitda_margin: 18.5, gross_margin: 65.2, net_margin: 12.3 },
  { quarter: 'Q2 2023', ebitda_margin: 19.2, gross_margin: 66.1, net_margin: 13.1 },
  { quarter: 'Q3 2023', ebitda_margin: 20.1, gross_margin: 67.0, net_margin: 14.2 },
  { quarter: 'Q4 2023', ebitda_margin: 21.3, gross_margin: 68.2, net_margin: 15.1 },
  { quarter: 'Q1 2024', ebitda_margin: 22.1, gross_margin: 69.1, net_margin: 16.0 },
  { quarter: 'Q2 2024', ebitda_margin: 23.0, gross_margin: 70.0, net_margin: 16.8 },
  { quarter: 'Q3 2024', ebitda_margin: 23.8, gross_margin: 71.2, net_margin: 17.5 },
  { quarter: 'Q4 2024', ebitda_margin: 24.5, gross_margin: 72.1, net_margin: 18.2 },
]

const costBreakdown = [
  { category: 'Cost of Goods Sold', amount: 450000, percentage: 45 },
  { category: 'R&D', amount: 150000, percentage: 15 },
  { category: 'Sales & Marketing', amount: 120000, percentage: 12 },
  { category: 'General & Admin', amount: 80000, percentage: 8 },
  { category: 'Other Operating', amount: 50000, percentage: 5 },
]

export default function Profitability() {
  const { data: ebitdaMargins, loading, error } = useEbitdaMargins()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Profitability Analysis
          </h1>
          <p className="text-muted-foreground">
            Detailed analysis of profit margins and cost efficiency
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="glass-card">
            <Target className="h-4 w-4 mr-1" />
            Margin Analysis
          </Badge>
        </div>
      </div>

      {/* Profitability Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* EBITDA Margin Trend */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>EBITDA Margin Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={ebitdaData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="ebitda_margin" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary)/0.3)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Margin Comparison */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Margin Comparison</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ebitdaData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="gross_margin" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Gross Margin"
                />
                <Line 
                  type="monotone" 
                  dataKey="ebitda_margin" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  name="EBITDA Margin"
                />
                <Line 
                  type="monotone" 
                  dataKey="net_margin" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={2}
                  name="Net Margin"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Cost Breakdown */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Cost Breakdown Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {costBreakdown.map((item, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-secondary/20">
                <div className="text-2xl font-bold text-primary">{item.percentage}%</div>
                <div className="text-sm text-muted-foreground">{item.category}</div>
                <div className="text-lg font-semibold mt-1">
                  ${(item.amount / 1000).toFixed(0)}K
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Profitability Metrics Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Quarterly Profitability Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3">Quarter</th>
                  <th className="text-right p-3">Gross Margin</th>
                  <th className="text-right p-3">EBITDA Margin</th>
                  <th className="text-right p-3">Net Margin</th>
                  <th className="text-right p-3">Performance</th>
                </tr>
              </thead>
              <tbody>
                {ebitdaData.slice(-4).map((item, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="p-3 font-medium">{item.quarter}</td>
                    <td className="p-3 text-right">
                      <Badge variant="outline">
                        {item.gross_margin.toFixed(1)}%
                      </Badge>
                    </td>
                    <td className="p-3 text-right">
                      <Badge variant={item.ebitda_margin > 20 ? "default" : "secondary"}>
                        {item.ebitda_margin.toFixed(1)}%
                      </Badge>
                    </td>
                    <td className="p-3 text-right">
                      <Badge variant="outline">
                        {item.net_margin.toFixed(1)}%
                      </Badge>
                    </td>
                    <td className="p-3 text-right">
                      <span className={`text-sm ${item.ebitda_margin > 20 ? 'text-green-500' : 'text-yellow-500'}`}>
                        {item.ebitda_margin > 20 ? 'Excellent' : 'Good'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}