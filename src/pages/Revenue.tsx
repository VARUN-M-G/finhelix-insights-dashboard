import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, BarChart3, PieChart, Activity } from "lucide-react"
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
import { useRevenueGrowth } from "@/hooks/useFinancialData"

// Sample data for revenue analysis
const revenueGrowthData = [
  { quarter: 'Q1 2023', revenue: 1000000, growth_qoq: 0, growth_yoy: 0 },
  { quarter: 'Q2 2023', revenue: 1100000, growth_qoq: 10, growth_yoy: 15 },
  { quarter: 'Q3 2023', revenue: 1200000, growth_qoq: 9.1, growth_yoy: 20 },
  { quarter: 'Q4 2023', revenue: 1300000, growth_qoq: 8.3, growth_yoy: 18 },
  { quarter: 'Q1 2024', revenue: 1400000, growth_qoq: 7.7, growth_yoy: 40 },
  { quarter: 'Q2 2024', revenue: 1500000, growth_qoq: 7.1, growth_yoy: 36.4 },
  { quarter: 'Q3 2024', revenue: 1600000, growth_qoq: 6.7, growth_yoy: 33.3 },
  { quarter: 'Q4 2024', revenue: 1700000, growth_qoq: 6.3, growth_yoy: 30.8 },
]

const revenueComposition = [
  { name: 'Product Revenue', value: 60, amount: 1020000 },
  { name: 'Service Revenue', value: 35, amount: 595000 },
  { name: 'Other Revenue', value: 5, amount: 85000 },
]

export default function Revenue() {
  const { data: revenueData, loading, error } = useRevenueGrowth()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Revenue Analytics
          </h1>
          <p className="text-muted-foreground">
            Comprehensive revenue performance and growth analysis
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="glass-card">
            <TrendingUp className="h-4 w-4 mr-1" />
            Growth Analysis
          </Badge>
        </div>
      </div>

      {/* Revenue Growth Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QoQ Growth */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Quarter-over-Quarter Growth</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={revenueGrowthData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="growth_qoq" fill="hsl(var(--primary))" />
                <Line 
                  type="monotone" 
                  dataKey="growth_qoq" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* YoY Growth */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Year-over-Year Growth</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueGrowthData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="quarter" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="growth_yoy" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary)/0.3)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Composition */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="h-5 w-5" />
            <span>Revenue Composition</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {revenueComposition.map((item, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-secondary/20">
                <div className="text-2xl font-bold text-primary">{item.value}%</div>
                <div className="text-sm text-muted-foreground">{item.name}</div>
                <div className="text-lg font-semibold mt-1">
                  ${(item.amount / 1000000).toFixed(1)}M
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Trends Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Revenue Growth Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3">Period</th>
                  <th className="text-right p-3">Revenue</th>
                  <th className="text-right p-3">QoQ Growth</th>
                  <th className="text-right p-3">YoY Growth</th>
                  <th className="text-right p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {revenueGrowthData.slice(-4).map((item, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="p-3 font-medium">{item.quarter}</td>
                    <td className="p-3 text-right">${(item.revenue / 1000000).toFixed(1)}M</td>
                    <td className="p-3 text-right">
                      <Badge variant={item.growth_qoq > 5 ? "default" : "secondary"}>
                        {item.growth_qoq.toFixed(1)}%
                      </Badge>
                    </td>
                    <td className="p-3 text-right">
                      <Badge variant={item.growth_yoy > 20 ? "default" : "secondary"}>
                        {item.growth_yoy.toFixed(1)}%
                      </Badge>
                    </td>
                    <td className="p-3 text-right">
                      <span className={`text-sm ${item.growth_yoy > 20 ? 'text-green-500' : 'text-yellow-500'}`}>
                        {item.growth_yoy > 20 ? 'Strong' : 'Moderate'}
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