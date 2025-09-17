/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Group from "@/assets/dashboard/Group.png";
import { useGetAllUserQuery } from "@/redux/api/authApi";
import {
  useGetMonthSalesReportQuery,
  useGetRecentPaymentsQuery,
  useGetSalesReportQuery,
  useGetToSellingCoursesQuery,
  useGetTotalEnrollmentsQuery,
} from "@/redux/api/statisticsApi";
import { CreditCard, GraduationCap, Users } from "lucide-react";
import Image from "next/image";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ReportingAnalyticsDashboard() {
  const { data: users } = useGetAllUserQuery({ limit: 30000 });
  const { data: enrollment } = useGetTotalEnrollmentsQuery({});
  console.log(enrollment, "total enrollments");

  // API calls
  const { data: recentPayments, isLoading: paymentsLoading } =
    useGetRecentPaymentsQuery({});
  console.log(recentPayments, "recent payments");
  const { data: topCourses, isLoading: coursesLoading } =
    useGetToSellingCoursesQuery({});
  console.log(topCourses, "top courses");
  const { data: salesReport, isLoading: salesLoading } = useGetSalesReportQuery(
    {}
  );
  const { data: monthlySales, isLoading: monthlyLoading } =
    useGetMonthSalesReportQuery({});
    console.log(monthlySales, "monthly sales");
    // 

  // Process payment data for monthly sales chart
  const processMonthlySalesData = (payments: any[] | undefined) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Create default data with all months set to 0
    const defaultData = months.map((month, index) => ({
      month,
      sales: 0,
      transactions: 0,
      monthIndex: index,
    }));

    if (!payments || payments.length === 0) {
      return defaultData;
    }

    // Group payments by month
    const monthlyData = new Map<
      number,
      { sales: number; transactions: number }
    >();

    payments.forEach((payment) => {
      if (
        payment.paymentDate &&
        payment.amount !== undefined &&
        payment.status === "SUCCEEDED"
      ) {
        const paymentDate = new Date(payment.paymentDate);
        const month = paymentDate.getMonth(); // 0-11
        const amount = payment.amount || 0;

        const current = monthlyData.get(month) || { sales: 0, transactions: 0 };
        monthlyData.set(month, {
          sales: current.sales + amount,
          transactions: current.transactions + 1,
        });
      }
    });

    // Update the default data with actual values where available
    return defaultData.map((monthData) => {
      const salesData = monthlyData.get(monthData.monthIndex);
      return salesData
        ? {
            ...monthData,
            sales: salesData.sales,
            transactions: salesData.transactions,
          }
        : monthData;
    });
  };

  const chartData = processMonthlySalesData(recentPayments?.data);

  const getNiceYMax = (value: number): number => {
    if (value === 0) return 1000; // fallback
    const order = Math.pow(10, Math.floor(Math.log10(value)));
    const normalized = value / order;
    let rounded;
    if (normalized <= 1) {
      rounded = 1;
    } else if (normalized <= 2) {
      rounded = 2;
    } else if (normalized <= 5) {
      rounded = 5;
    } else {
      rounded = 10;
    }
    return Math.ceil(rounded * order * 1.2); // 20% padding and round up
  };

  // Calculate max value and apply nice scaling
  const maxSalesValue = Math.max(...chartData.map((item) => item.sales), 0);
  const yAxisDomain = [0, getNiceYMax(maxSalesValue)];

  // Calculate statistics
  const totalRevenue = salesReport?.data?.totalRevenue || 0;

  interface Course {
    id: string;
    title: string;
    totalRevenue: number;
    totalEnrollments: number;
  }

  interface TopCoursesResponse {
    data: Course[];
  }

  // Format top courses data
  interface FormattedCourse {
    rank: string;
    name: string;
    sales: string;
    enrollments: number;
    color: string;
  }

  const formatTopCourses = (
    courses: TopCoursesResponse | undefined
  ): FormattedCourse[] => {
    const defaultCourses = [
      {
        rank: "1st",
        name: "Power electronics & embedded systems",
        sales: "€7,000",
        enrollments: 45,
        color: "text-green-600",
      },
      {
        rank: "2nd",
        name: "C & Assembly for Engineers",
        sales: "€5,000",
        enrollments: 32,
        color: "text-gray-500",
      },
      {
        rank: "3rd",
        name: "Converters Modeling",
        sales: "€3,000",
        enrollments: 28,
        color: "text-orange-500",
      },
    ];

    if (!courses?.data || courses.data.length === 0) {
      return defaultCourses;
    }

    const filteredCourses = courses.data.filter(
      (course: Course) => course.totalRevenue > 0
    );

    return filteredCourses.map(
      (course: Course, index: number): FormattedCourse => ({
        rank: index === 0 ? "1st" : index === 1 ? "2nd" : "3rd",
        name: course.title,
        sales: `€${course.totalRevenue.toLocaleString()}`,
        enrollments: course.totalEnrollments,
        color:
          index === 0
            ? "text-green-600"
            : index === 1
            ? "text-gray-500"
            : "text-orange-500",
      })
    );
  };

  const topCoursesData = formatTopCourses(topCourses);

  if (paymentsLoading || coursesLoading || salesLoading || monthlyLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Reporting & Analytics
          </h1>
        </div>

        {/* Top Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* New Registration */}
          <div
            className="bg-white rounded-lg
          flex flex-col justify-center items-center gap-1
          p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl text-nowrap text-gray-600 font-medium text-center">
                New Registration
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {users?.data?.meta?.total || 0}
              </span>
            </div>
          </div>

          {/* Total Revenue */}
          <div
            className="bg-white rounded-lg
          flex flex-col justify-center items-center gap-1
          p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl text-nowrap text-gray-600 font-medium text-center">
                Total Revenue
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                €{totalRevenue.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Total Enrollments */}
          <div
            className="bg-white rounded-lg 
          flex flex-col justify-center items-center gap-1
          p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl text-nowrap text-gray-600 font-medium text-center">
                Total Enrollments
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                {enrollment?.data || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Sales Report */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Monthly sales report
              </h3>
            </div>

            {/* Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop
                        offset="95%"
                        stopColor="#10B981"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6B7280" }}
                    domain={yAxisDomain}
                    tickFormatter={(value) => {
                      if (value >= 1000000)
                        return `€${(value / 1000000).toFixed(1)}M`;
                      if (value >= 1000)
                        return `€${(value / 1000).toFixed(0)}k`;
                      return `€${value}`;
                    }}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => {
                      if (name === "sales") {
                        return [`€${value.toLocaleString()}`, "Sales"];
                      }
                      return [value, "Transactions"];
                    }}
                    labelFormatter={(label) => `Month: ${label}`}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                    labelStyle={{ color: "#000", fontWeight: "500" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#10B981"
                    strokeWidth={2}
                    fill="url(#colorGreen)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Selling Course */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Image
                  src={Group}
                  alt="Top Course Icon"
                  width={1000}
                  height={1000}
                  className="w-9 h-9"
                />
                <h3 className="text-2xl font-medium text-gray-900 ml-3">
                  Top Selling Course
                </h3>
              </div>
            </div>

            <div className="space-y-2">
              {topCoursesData.map((course: any, index: number) => {
                // Function to convert number to ordinal (1st, 2nd, 3rd, etc.)
                const getOrdinal = (n: number) => {
                  const s = ["th", "st", "nd", "rd"];
                  const v = n % 100;
                  return n + (s[(v - 20) % 10] || s[v] || s[0]);
                };

                return (
                  <div key={index} className="relative">
                    <div
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        index < 2 ? "pb-6" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-semibold ${
                            index === 0
                              ? " text-yellow-600"
                              : index === 1
                              ? " text-gray-600"
                              : " text-orange-600"
                          }`}
                        >
                          {getOrdinal(index + 1)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-base max-w-[200px]">
                            {course.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {course.enrollments} enrollments
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">
                          Total Sales
                        </p>
                        <p className=" text-gray-900 text-base font-semibold">
                          {course.sales}
                        </p>
                      </div>
                    </div>
                    {/* Bar below 1st and 2nd courses */}
                    {index < 2 && (
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-[2px] w-[90%] mx-auto ${
                          index === 0 ? "bg-black" : "bg-black/80"
                        } rounded-b-lg`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
