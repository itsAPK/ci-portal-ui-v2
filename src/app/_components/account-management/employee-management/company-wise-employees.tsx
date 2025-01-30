"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LabelList } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import api from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { Loading } from "@/components/ui/loading"

const chartConfig = {
  employee_count: {
    label: "Total",
    color: "#f5600a",
  },
} satisfies ChartConfig

interface CompanyData {
  _id: string
  employee_count: number
}

export function CompanyWiseEmployee() {
  const employeeQuery = useQuery({
    queryKey: ["company-wise-employee"],
    queryFn: async () => {
      return await api
        .post(`/employee/export`, {
          filter: [
            
              {
                $group: {
                  _id: "$company",
                  employee_count: {
                    $sum: 1,
                  },
                },
              },
              {
                "$sort": { "employee_count": -1 }
              }
            
          ],
        })
        .then((res) => {
          if (!res.data.success) {
            throw new Error(res.data.message)
          }
          return res.data.data.data as CompanyData[]
        })
    },
  })

  return (
    <Card className="border-primary/50 mb-10">
      <CardHeader>
        <CardTitle>Company Wise Employees</CardTitle>
      </CardHeader>
      <CardContent>
        {!employeeQuery.isLoading ? (
          <ChartContainer config={chartConfig} className="h-[200px] w-full ">
            <BarChart
              accessibilityLayer
              data={employeeQuery.data || []}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="employee_count" fill="var(--color-employee_count)" radius={4} barSize={30} ><LabelList
                position="top"
               
                className="fill-foreground"
                fontSize={12}
              /></Bar>
            </BarChart>
          </ChartContainer>
        ) : (
          <Loading />
        )}
      </CardContent>
    </Card>
  )
}

