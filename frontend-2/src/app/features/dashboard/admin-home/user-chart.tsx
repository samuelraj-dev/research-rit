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
  journal: {
    label: "Journal",
    color: "hsl(var(--chart-1))",
  },
  book: {
    label: "Book",
    color: "hsl(var(--chart-2))",
  },
  bookChapter: {
    label: "Book Chapter",
    color: "hsl(var(--chart-3))",
  },
  conference: {
    label: "Conference",
    color: "hsl(var(--chart-4))",
  },
  patent: {
    label: "Patent",
    color: "hsl(var(--chart-5))",
  },
  copyright: {
    label: "Copyright",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig
export function UserChart({ data }: { data: any }) {

  const chartData = [
    { name: "journal", values: data.journal, fill: "var(--color-journal)" },
    { name: "book", values: data.book, fill: "var(--color-book)" },
    { name: "bookChapter", values: data.bookChapter, fill: "var(--color-bookChapter)" },
    { name: "conference", values: data.conference, fill: "var(--color-conference)" },
    { name: "patent", values: data.patent, fill: "var(--color-patent)" },
    { name: "copyright", values: data.copyright, fill: "var(--color-copyright)" },
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