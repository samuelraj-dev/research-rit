import { Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart"

const chartConfig = {
  values: {
    label: "Values",
  },
  AIDS: {
    label: "AIDS",
    color: "hsl(var(--chart-1))",
  },
  MECH: {
    label: "MECH",
    color: "hsl(var(--chart-2))",
  },
  CSE: {
    label: "CSE",
    color: "hsl(var(--chart-3))",
  },
  CSBS: {
    label: "CSBS",
    color: "hsl(var(--chart-4))",
  },
  ECE: {
    label: "ECE",
    color: "hsl(var(--chart-5))",
  },
  VLSI: {
    label: "VLSI",
    color: "hsl(var(--chart-6))",
  },
  HNS: {
    label: "H&S",
    color: "hsl(var(--chart-7))",
  },
  AIML: {
    label: "AIML",
    color: "hsl(var(--chart-8))",
  },
  CCE: {
    label: "CCE",
    color: "hsl(var(--chart-9))",
  },
  BT: {
    label: "BT",
    color: "hsl(var(--chart-10))",
  },
} satisfies ChartConfig
export function UserChart({ data }: { data: any }) {

  const chartData = [
    { name: "CSE", values: data?.CSE || 0, fill: "var(--color-CSE)" },
    { name: "AIML", values: data?.VLSI || 0, fill: "var(--color-AIML)" },
    { name: "AIDS", values: data?.AIDS || 0, fill: "var(--color-AIDS)" },
    { name: "MECH", values: data?.MECH || 0, fill: "var(--color-MECH)" },
    { name: "ECE", values: data?.ECE || 0, fill: "var(--color-ECE)" },
    { name: "CCE", values: data?.CCE || 0, fill: "var(--color-CCE)" },
    { name: "CSBS", values: data?.CSBS || 0, fill: "var(--color-CSBS)" },
    { name: "VLSI", values: data?.VLSI || 0, fill: "var(--color-VLSI)" },
    { name: "BT", values: data?.BT || 0, fill: "var(--color-BT)" },
    { name: "HNS", values: data?.HNS || 0, fill: "var(--color-HNS)" },
  ]

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Users By Department</CardTitle>
        <CardDescription>All users</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="value" hideLabel />}
            />
            <Pie data={chartData} dataKey="values" nameKey="name">
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="name" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}