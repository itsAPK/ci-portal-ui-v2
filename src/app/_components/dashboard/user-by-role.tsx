"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

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
  { month: "Project Leader", desktop: 186 },
  { month: "CI Head", desktop: 285 },
  { month: "CS Head", desktop: 237 },
  { month: "LOF", desktop: 203 },
  { month: "HOD", desktop: 209 },
  { month: "Admin", desktop: 24 },
]

const chartConfig = {
  desktop: {
    label: "Employee",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig

export function TotalEmployees() {
  return (
    <Card className="rounded-xl shadow-none h-[350px] border-primary/50 overflow-y-auto">
      <CardHeader className=" pb-4">
        <CardTitle>Total Employees</CardTitle>
      
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[280px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarGrid
              className="fill-[--color-desktop] opacity-20"
              gridType="circle"
            />
            <PolarAngleAxis dataKey="month" />
            <Radar
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
     
    </Card>
  )
}
