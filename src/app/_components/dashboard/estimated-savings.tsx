"use client"

import { TrendingUp } from "lucide-react"
import { LabelList, PolarGrid, RadialBar, RadialBarChart } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Opportunities",
  },
  chrome: {
    label: "<= 1 Lakh",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: ">1 and <=5 Lakh",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: ">5 and <=10 Lakh	",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: ">10 and <=15 Lakh	",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: ">15 Lakh",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function EstimatedSavingsOpportunities() {
  return (
    <Card className="border-primary/50">
      <CardHeader className=" pb-0">
        <CardTitle>Opprtunities By Estimated Savings</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[340px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="browser" />}
            />

            <RadialBar dataKey="visitors" background />
             
            
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="flex-wrap w-full  gap-2 [&>*]:basis-[40%] [&>*]:justify-center"
            />
          </RadialBarChart>
       
        </ChartContainer>
      </CardContent>
     
    </Card>
  )
}
