"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
    { month: "July", desktop: 150, mobile: 100 },
    { month: "August", desktop: 160, mobile: 110 },
    { month: "September", desktop: 170, mobile: 120 },
    { month: "October", desktop: 280, mobile: 180 },
    { month: "November", desktop: 220, mobile: 230 },
    { month: "December", desktop: 200, mobile: 180 },
  ];
const chartConfig = {
  desktop: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Opened",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function CompletedVsOpened() {
  return (
    <Card className="border-primary/50"> 
      <CardHeader>
        <CardTitle>Total Project Completed vs Opened</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="desktop"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="mobile"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
     
    </Card>
  )
}
