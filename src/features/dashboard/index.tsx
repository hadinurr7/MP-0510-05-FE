"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import DashboardLayout from "./DashboardLayout";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Dashboard Utama</h1>
        <p className="mb-8">Selamat datang di halaman utama Dashboard.</p>

        <div className="grid gap-6 text-center md:grid-cols-3 lg:grid-cols-3">
          <Card className="border rounded-none">
            <CardHeader>
              <CardTitle>Total Acara</CardTitle>
              <CardDescription>Jumlah semua acara</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">15</p>
              <p className="text-sm text-muted-foreground">
                5 Aktif, 10 Selesai
              </p>
            </CardContent>
          </Card>

          <Card className="border rounded-none">
            <CardHeader>
              <CardTitle>Total Peserta</CardTitle>
              <CardDescription>Jumlah seluruh peserta</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1,230</p>
              <p className="text-sm text-muted-foreground">
                120 Peserta Baru bulan ini
              </p>
            </CardContent>
          </Card>

          <Card className="border rounded-none">
            <CardHeader>
              <CardTitle>Total Tiket Terjual</CardTitle>
              <CardDescription>
                Penjualan tiket dari semua acara
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">2,450</p>
              <p className="text-sm text-muted-foreground">Naik 8% bulan ini</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 border md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Bar Chart - Multiple</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <BarChart data={chartData} accessibilityLayer>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)} // tiga huruf nama bulan
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dashed" />}
                    />
                    <Bar
                      dataKey="desktop"
                      fill="hsl(var(--chart-1))"
                      radius={4}
                    />
                    <Bar
                      dataKey="mobile"
                      fill="hsl(var(--chart-2))"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                  <span className="inline-block h-4 w-4 rounded-full bg-green-500"></span>
                  Trending up by 5.2% this month
                </div>
                <div className="leading-none text-muted-foreground">
                  Showing total visitors for the last 6 months
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
