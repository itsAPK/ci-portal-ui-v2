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
import api from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { DateRange } from "react-day-picker"
import { categories } from "@/lib/data"
import { Loading } from "@/components/ui/loading"


const chartConfig = {
  ongoing: {
    label: "Ongoing",
    color: "hsl(var(--chart-1))",
  },
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface CategoryData {
  category: string;
  ongoing: number;
  completed: number;
}
function generateCompleteCategoryData(inputData: CategoryData[]): CategoryData[] {
  

  const dataMap: Record<string, CategoryData> = {};
  inputData.forEach(item => {
      dataMap[item.category] = { category: item.category, ongoing: item.ongoing, completed: item.completed };
  });

  return categories.map(category => {
      const categoryData = dataMap[category] || { category, ongoing: 0, completed: 0 };
      return categoryData;
  });
   
}

export function CategoryWiseOpportunity({dateRange,selectedCompany,selectedPlant}: { dateRange?: DateRange,selectedCompany?: string,selectedPlant?: string }) {
  const category = useQuery({
    queryKey: ['category-wise-opportunity', dateRange,selectedCompany, selectedPlant],
    queryFn: async () => {
      const match: any = {
        formatted_date: {
          ...(dateRange?.from && { $gte: new Date(dateRange.from) }),
          ...(dateRange?.to && { $lte: new Date(dateRange.to) }),
        },
        ...(selectedPlant && { 'plant.name': { $regex: selectedPlant, $options: 'i' } }), // Regex for plant.name
        ...(selectedCompany && { company: { $regex: selectedCompany, $options: 'i' } }),
      };
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
              "$group": {
                "_id": {
                  "category": "$category",
                  "status": "$status"
                },
                "count": { "$sum": 1 }
              }
            },
            {
              "$project": {
                "category": "$_id.category",
                "status": "$_id.status",
                "count": 1,
                "_id": 0
              }
            },
            {
              "$group": {
                "_id": "$category",
                "completed": {
                  "$sum": {
                    "$cond": [
                      { "$eq": ["$status", "Opportunity Completed"] },
                      "$count",
                      0
                    ]
                  }
                },
                "ongoing": {
                  "$sum": {
                    "$cond": [
                      { "$ne": ["$status", "Opportunity Completed"] },
                      "$count",
                      0
                    ]
                  }
                }
              }
            },
            {
              "$project": {
                "category": "$_id",
                "completed": 1,
                "ongoing": 1,
                "_id": 0
              }
            }
        ],
      }).then((res) => {
        if (!res.data.success) {
          throw new Error(res.data.message);
        }
        return res.data.data.data;
      });
    
    },
  });
  return (
    <Card className="border-primary/50">
      <CardHeader>
        <CardTitle>Category Wise Opportunities</CardTitle>
      </CardHeader>
      <CardContent>
        {!category.isLoading ? <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={category.data ? generateCompleteCategoryData(category.data) : generateCompleteCategoryData([])}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="ongoing" fill="var(--color-ongoing)" radius={4} />
            <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
          </BarChart>
        </ChartContainer> : <Loading />}
      </CardContent>
    
    </Card>
  )
}
