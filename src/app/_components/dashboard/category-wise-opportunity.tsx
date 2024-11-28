"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "BB", desktop: 186, mobile: 80 },
  { month: "GB", desktop: 305, mobile: 200 },
  { month: "SMED", desktop: 237, mobile: 120 },
  { month: "3M", desktop: 73, mobile: 190 },
  { month: "SITG", desktop: 209, mobile: 130 },
  { month: "Poka-Yoke", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Opened",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Completed",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function CategoryWiseOpportunity() {
  return (
    <Card className="border-primary/50">
      <CardHeader>
        <CardTitle>Category Wise Opportunities</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    
    </Card>
  )
}
