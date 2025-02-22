"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import api from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { Loading } from "@/components/ui/loading"
import type { DateRange } from "react-day-picker"
import { formatToIndianNumber } from "@/lib/utils"

const chartConfig = {
  total_estimated_savings: {
    label: "Estimated Savings",
  },
  "black-belt": {
    label: "Black Belt",
    color: "#393939ff",
  },
  "green-belt": {
    label: "Green Belt",
    color: "#119b1d",
  },
  sitg: {
    label: "SITG",
    color: "hsl(var(--chart-1))",
  },
  kaizen: {
    label: "Kaizen",
    color: "hsl(var(--destructive))",
  },
  "poka-yoke": {
    label: "Poka-Yoke",
    color: "hsl(var(--chart-3))",
  },
  "3m": {
    label: "3M",
    color: "hsl(var(--chart-4))",
  },
  smed: {
    label: "SMED",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export const OverallReport = ({
  dateRange,
  selectedCompany,
  selectedPlant,
}: {
  dateRange?: DateRange
  selectedCompany?: string
  selectedPlant?: string
}) => {
  const chartData: any = [
    {
      status: "opened",
      count: 33,
      fill: "var(--color-opened)",
    },
    {
      status: "completed",
      count: 33,
      fill: "var(--color-completed)",
    },
    {
      status: "ongoing",
      count: 54,
      fill: "var(--color-ongoing)",
    },
    {
      status: "waiting_for_closuer",
      count: 22,
      fill: "var(--color-waiting_for_closuer)",
    },
  ]



  const totalOpportunities = useQuery({
    queryKey: ["estimated-savings-by-categroy", dateRange, selectedCompany, selectedPlant],
    queryFn: async () => {
      const match: any = {
        formatted_date: {
          ...(dateRange?.from && { $gte: new Date(dateRange.from) }),
          ...(dateRange?.to && { $lte: new Date(dateRange.to) }),
        },
        ...(selectedPlant && { "plant.name": { $regex: selectedPlant, $options: "i" } }),
        ...(selectedCompany && { company: { $regex: selectedCompany, $options: "i" } }),
      }
      return await api
        .post(`/opportunity/export`, {
          filter: [
            {
              $addFields: {
                formatted_date: {
                  $dateToString: {
                    format: '%Y-%m-%d',
                    date: '$created_at',
                  },
                },
              },
            },
            {
              $match: match,
            },
            {
              $group: {
                _id: "$category",
                total_estimated_savings: { $sum: "$estimated_savings" },
              },
            },
          ],
        })
        .then((res) => {
          if (!res.data.success) {
            throw new Error(res.data.message)
          }
          return res.data.data
        })
    },
  })

  console.log("API Response:", totalOpportunities.data)

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc: any, curr: { count: any }) => acc + curr.count, 0)
  }, [])
  return (
    <Card className="flex min-h-[420px] flex-col rounded-xl border-primary/50 shadow-none">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg">Estimated Savings by Category</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0 pt-10">
        {!totalOpportunities.isLoading ? (
          <ChartContainer config={chartConfig} className="aspect-square max-h-[290px] w-full">
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[200px]"
                    formatter={(value, name) => (
                      <>
                        <div
                          className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                          style={
                            {
                              "--color-bg": `var(--color-${name})`,
                            } as React.CSSProperties
                          }
                        />
                        <div className="flex gap-10 justify-between items-center w-[100px] text-xs text-muted-foreground">
                          {chartConfig[name as keyof typeof chartConfig]?.label || name}

                          <div className=" flex flex-col items-center gap-5 font-mono font-medium tabular-nums text-foreground">
                          ₹{formatToIndianNumber(Number(value))}
                          </div>
                        </div>
                      </>
                    )}
                  />
                }
              />
              <Pie
                data={
                  Array.isArray(totalOpportunities.data?.data)
                    ? totalOpportunities.data?.data?.map((item: any) => ({
                        status: item._id.toLowerCase().replace(/\s+/g, "-"),
                        count: item.total_estimated_savings,
                        fill: `var(--color-${item._id.toLowerCase().replace(/\s+/g, "-")})`,
                      }))
                    : []
                }
                dataKey="count"
                nameKey="status"
                innerRadius={60}
                strokeWidth={30}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      const total = Array.isArray(totalOpportunities.data?.data)
                        ? totalOpportunities.data?.data?.reduce(
                            (acc: number, curr: any) => acc + curr.total_estimated_savings,
                            0,
                          )
                        : 0
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-[16px] font-bold">
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              maximumFractionDigits: 0,
                            }).format(total)}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                            Total Savings
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="status" />}
                className="-translate-y-2 flex-wrap gap-2"
              />
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="max-h-[290px]">
            <Loading />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

