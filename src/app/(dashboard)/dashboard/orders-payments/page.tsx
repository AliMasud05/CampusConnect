/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetAllUserQuery } from "@/redux/api/authApi"
import { useGetAllRefundRequestsQuery, useUpdateRefundRequestMutation } from "@/redux/api/refundApi"
import { useGetRecentPaymentsQuery, useGetSalesReportQuery } from "@/redux/api/statisticsApi"
import { ChevronDown, Download } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"


// interface EnrollmentData {
//   id: number;
//   name: string;
//   enrolledCourse: string;
//   paidAmount: string;
//   timeRemains: string;
//   status: "PENDING" | "APPROVED" | "REJECTED";
// }




export default function ReportingAnalyticsDashboard() {

  const {data:refundData} = useGetAllRefundRequestsQuery({});
  const { data: users } = useGetAllUserQuery({ limit: 30000 });
interface Enrollment {
  Amount: number;
  user: {
    name: string;
  };
  course: {
    title: string;
  };
  enrolledAt?: string;
}

interface RefundRequest {
  id: number;
  refundStatus: "PENDING" | "APPROVED" | "REJECTED";
  enrollment: Enrollment;
  invoice?: string;
}

interface RefundDataResponse {
  data?: RefundRequest[];
}

const totalApprovedAmount = (refundData as RefundDataResponse | undefined)?.data?.reduce(
  (total: number, refund: RefundRequest) => {
    if (refund.refundStatus === "APPROVED") {
      return total + (refund.enrollment?.Amount || 0);
    }
    return total;
  },
  0
);
  const [updateRefundRequest] = useUpdateRefundRequestMutation();


  // Provide an initial value for the data state
    // const initialData: EnrollmentData[] = [];
    // const [, setData] = useState<EnrollmentData[]>([]);

const updateStatus = async (
  id: number,
  newStatus: "PENDING" | "APPROVED" | "REJECTED"
) => {
  console.log("Updating status with:", { id, newStatus });
  try {
    const result = await updateRefundRequest({
      id,
      data: { status: newStatus },
    }).unwrap();
    console.log("Update successful:", result);
    toast.success(`Refund request ${newStatus.toLowerCase()}`);
  } catch (error) {
    console.error("Update failed:", error);
    toast.error(`Failed to update refund request`);
  }
};

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "text-green-600 bg-green-50";
      case "REJECTED":
        return "text-red-600 bg-red-50";
      case "PENDING":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  // const getStatusText = (status: string) => {
  //   return status.charAt(0).toUpperCase() + status.slice(1);
  // };
  const selectedPeriod: "This month" | "Total" = "This month";
  
  // API calls with period parameter
  const { data: recentPayments, isLoading: paymentsLoading } = useGetRecentPaymentsQuery({
    period: selectedPeriod === "This month" ? "monthly" : "total"
  });
  // const { data: topCourses, isLoading: coursesLoading } = useGetToSellingCoursesQuery({
  //   period: selectedPeriod === "This month" ? "monthly" : "total"
  // });
  const { data: salesReport, isLoading: salesLoading } = useGetSalesReportQuery({
    period: selectedPeriod === "This month" ? "monthly" : "total"
  });

  // Calculate statistics
  const totalRevenue = salesReport?.data?.totalRevenue || 0;
  
  // interface Course {
  //   id: string;
  //   title: string;
  //   totalRevenue: number;
  //   totalEnrollments: number;
  // }

  // interface TopCoursesResponse {
  //   data: Course[];
  // }

  // const totalEnrollments = (topCourses as TopCoursesResponse | undefined)?.data?.reduce(
  //   (sum: number, course: Course) => sum + course.totalEnrollments,
  //   0
  // ) || 0;

  if (paymentsLoading  || salesLoading) {
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
    <div className="min-h-screen  p-6 mb-10">
      <div className="max-w-5xl md:ml-20">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Manage Payment
        </h1>

        {/* Tabs */}
        <Tabs defaultValue="orders-payments" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 bg-transparent h-auto p-0 mb-8">
            <TabsTrigger
              value="orders-payments"
              className="px-0 py-3 mr-8 font-medium border-b-2 border-transparent
               data-[state=active]:border-gray-900 data-[state=active]:text-gray-900
                text-gray-500 bg-transparent shadow-none rounded-none justify-start
                text-3xl"
            >
              Orders & Payments
            </TabsTrigger>
            <TabsTrigger
              value="refund-request"
              className="px-0 py-3 font-medium border-b-2
               border-transparent data-[state=active]:border-gray-900
                data-[state=active]:text-gray-900 text-gray-500 bg-transparent
                 shadow-none rounded-none justify-start text-3xl"
            >
              <p>Refund Requests</p>
            </TabsTrigger>
          </TabsList>

          {/* Edit Profile Tab Content */}
          <TabsContent value="orders-payments" className="mt-0">
            <div className="min-h-screen  p-6">
              <div className="max-w-6xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      Reporting & Analytics
                    </h1>
                    <p className="text-gray-600 mt-1">
                      Track your course performance and revenue
                    </p>
                  </div>
                </div>

                {/* Top Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Total Enrollments */}
                  <div
                    className="bg-white rounded-xl
                  flex flex-col justify-center items-center gap-1
                  px-10 py-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="">
                      <span className="text-xl text-nowrap text-gray-600 font-medium text-center">
                        Total Enrollments
                      </span>
                    </div>
                    <div className="flex items-center gap-1 justify-center">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 48 49"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.9982 12.5C14.9982 10.1131 15.9465 7.82387 17.6343 6.13604C19.3221 4.44821 21.6113 3.5 23.9982 3.5C26.3852 3.5 28.6744 4.44821 30.3622 6.13604C32.05 7.82387 32.9982 10.1131 32.9982 12.5C32.9982 14.8869 32.05 17.1761 30.3622 18.864C28.6744 20.5518 26.3852 21.5 23.9982 21.5C21.6113 21.5 19.3221 20.5518 17.6343 18.864C15.9465 17.1761 14.9982 14.8869 14.9982 12.5ZM7.50024 40.71C7.56768 36.3789 9.33552 32.2481 12.4222 29.2092C15.5088 26.1702 19.6667 24.4669 23.9982 24.4669C28.3298 24.4669 32.4877 26.1702 35.5743 29.2092C38.661 32.2481 40.4288 36.3789 40.4962 40.71C40.5014 41.0016 40.4215 41.2883 40.2663 41.5352C40.1111 41.7821 39.8873 41.9783 39.6222 42.1C34.7206 44.3474 29.3906 45.5073 23.9982 45.5C18.4262 45.5 13.1322 44.284 8.37424 42.1C8.10921 41.9783 7.88539 41.7821 7.73016 41.5352C7.57494 41.2883 7.49504 41.0016 7.50024 40.71Z"
                            fill="#017F00"
                          />
                        </svg>
                      </div>
                      <div>
                        <span className="text-3xl font-bold text-gray-900">
                          {users?.data?.meta?.total || 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Total Payment */}
                  <div
                    className="bg-white rounded-xl
                  flex flex-col justify-center items-center gap-1
                  px-8 py-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="">
                      <span className="text-xl text-nowrap text-gray-600 font-medium text-center">
                        Total Payment
                      </span>
                    </div>
                    <div className="flex items-center gap-2 justify-center text-center">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 49 48"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_192_704)">
                            <path
                              d="M21.5 14.9993V11.9993H3.5C1.847 11.9993 0.5 13.3463 0.5 14.9993V20.9993H22.133C21.716 19.1663 21.5 17.1923 21.5 14.9993ZM48.377 26.9993C46.331 30.1523 43.211 32.8343 38.741 35.4023C38.054 35.7953 37.28 35.9993 36.5 35.9993C35.72 35.9993 34.946 35.7953 34.268 35.4083C29.798 32.8343 26.678 30.1493 24.629 26.9993H0.5V41.9993C0.5 43.6553 1.847 44.9993 3.5 44.9993H45.5C47.156 44.9993 48.5 43.6553 48.5 41.9993V26.9993H48.377ZM14 35.9993H8C7.172 35.9993 6.5 35.3273 6.5 34.4993C6.5 33.6713 7.172 32.9993 8 32.9993H14C14.828 32.9993 15.5 33.6713 15.5 34.4993C15.5 35.3273 14.828 35.9993 14 35.9993Z"
                              fill="#017F00"
                            />
                            <path
                              d="M47.591 7.62223L37.091 3.12223C36.9038 3.04207 36.7022 3.00073 36.4985 3.00073C36.2948 3.00073 36.0932 3.04207 35.906 3.12223L25.406 7.62223C24.857 7.85623 24.5 8.39923 24.5 8.99923V14.9992C24.5 23.2522 27.551 28.0762 35.753 32.8012C35.984 32.9332 36.242 32.9992 36.5 32.9992C36.758 32.9992 37.016 32.9332 37.247 32.8012C45.449 28.0882 48.5 23.2642 48.5 14.9992V8.99923C48.5 8.39923 48.143 7.85623 47.591 7.62223ZM42.173 14.4382L36.173 21.9382C35.885 22.2922 35.453 22.4992 35 22.4992H34.937C34.7011 22.4889 34.4709 22.4233 34.2651 22.3076C34.0592 22.1919 33.8834 22.0294 33.752 21.8332L30.752 17.3332C30.293 16.6432 30.479 15.7132 31.169 15.2542C31.853 14.7982 32.786 14.9782 33.248 15.6712L35.111 18.4642L39.827 12.5662C40.346 11.9212 41.291 11.8192 41.936 12.3322C42.584 12.8452 42.686 13.7902 42.173 14.4382Z"
                              fill="#017F00"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_192_704">
                              <rect
                                width="48"
                                height="48"
                                fill="white"
                                transform="translate(0.5)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div>
                        <span className="text-2xl font-bold text-gray-900">
                          €{totalRevenue.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Total Refunds */}
                  {/* <div className="bg-white rounded-xl px-8 py-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex flex-row md:flex-col gap-2 lg:flex-row items-center justify-between mb-4">
                      <span className="text-xl text-nowrap text-gray-600 font-medium">
                        Total Refunds
                      </span>                    
                    </div>
                    <div className="flex items-center gap-3 justify-center">
                      <div className="w-10 h-10  rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 48 48"
                          fill="none"
                        >
                          <g clipPath="url(#clip0_194_1174)">
                            <path
                              d="M39.9772 10.3388C36.5147 6.75713 32.0334 4.47966 27.1701 3.78685L28.5562 2.40066C29.1054 1.85147 29.1054 0.96113 28.5562 0.411942C28.0072 -0.137151 27.1167 -0.137151 26.5675 0.411942L23.0063 3.97313C22.4571 4.52222 22.4571 5.41266 23.0063 5.96185L26.5674 9.52304C26.842 9.79763 27.2019 9.93497 27.5618 9.93497C27.9216 9.93497 28.2816 9.79763 28.5561 9.52304C29.1053 8.97394 29.1053 8.0835 28.5561 7.53432L27.7597 6.73791C31.6234 7.494 35.167 9.40969 37.9549 12.2934C41.471 15.9306 43.4074 20.7204 43.4074 25.7806C43.4076 36.4816 34.7016 45.1875 24.0007 45.1875C13.2998 45.1875 4.59375 36.4816 4.59375 25.7807C4.59375 21.6974 5.84691 17.7914 8.21784 14.485C10.5396 11.2472 13.7402 8.83116 17.474 7.49822C18.2054 7.23704 18.5866 6.43247 18.3255 5.70094C18.0644 4.9695 17.2597 4.58832 16.5282 4.84941C12.2529 6.37575 8.58891 9.141 5.93213 12.8461C3.21656 16.6332 1.78125 21.1059 1.78125 25.7808C1.78125 31.7158 4.09247 37.2955 8.28919 41.4923C12.4859 45.6887 18.0656 48 24.0007 48C29.9357 48 35.5154 45.6888 39.7121 41.4922C43.9088 37.2954 46.2201 31.7157 46.2201 25.7807C46.2201 19.9871 44.0029 14.503 39.9772 10.3388Z"
                              fill="#017F00"
                            />
                            <path
                              d="M9.55078 25.7807C9.55078 33.7475 16.0323 40.229 23.9992 40.229C31.9659 40.229 38.4474 33.7475 38.4474 25.7807C38.4474 17.814 31.9659 11.3323 23.9992 11.3323C16.0322 11.3323 9.55078 17.8139 9.55078 25.7807ZM24.8624 27.0324C22.8382 26.3168 21.6653 25.7528 20.8145 25.0854C19.7673 24.2641 19.2879 22.8455 19.5634 21.3835C19.8622 19.7974 20.9683 18.5348 22.45 18.0885C22.4706 18.0823 22.4907 18.0773 22.5112 18.0713V17.5051C22.5112 16.7284 23.1408 16.0988 23.9174 16.0988C24.694 16.0988 25.3237 16.7284 25.3237 17.5051V17.9818C26.3055 18.2117 26.9908 18.6605 27.2678 18.8676C27.8899 19.3327 28.0172 20.2139 27.5522 20.836C27.0871 21.4581 26.2061 21.5852 25.5838 21.1203C25.2861 20.8978 24.4642 20.4189 23.2612 20.7813C22.5505 20.9955 22.3667 21.6949 22.3272 21.9043C22.2493 22.3177 22.3388 22.7069 22.5501 22.8724C23.2857 23.4493 24.6055 23.9586 25.7996 24.3807C27.984 25.1528 29.1986 27.1764 28.8221 29.416C28.6373 30.5156 28.0841 31.5359 27.2644 32.2891C26.7007 32.8069 26.0437 33.1752 25.3237 33.3829V34.0562C25.3237 34.8329 24.694 35.4625 23.9174 35.4625C23.1408 35.4625 22.5112 34.8329 22.5112 34.0562V33.5212C21.5756 33.4112 20.795 33.1231 19.7451 32.4363C19.0951 32.0112 18.9129 31.1396 19.3381 30.4896C19.7632 29.8396 20.6349 29.6575 21.2848 30.0827C22.2582 30.7195 22.6263 30.778 23.908 30.7691C25.17 30.7607 25.9022 29.8201 26.0485 28.9497C26.1202 28.5246 26.1476 27.4867 24.8624 27.0324Z"
                              fill="#017F00"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_194_1174">
                              <rect width="48" height="48" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div>
                        <span className="text-2xl font-bold text-gray-900">
                          {topCourses?.data?.length || 0}
                        </span>
                      </div>
                    </div>
                  </div> */}
                </div>

                {/* Recent Payments Section */}
                <div className="mt-6  rounded-xl p-6  ">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Recent Payments
                    </h3>
                  </div>

                  <div className="overflow-x-auto flex flex-col gap-4 bg- pb-4 rounded-lg">
                    {/* <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">Student</th>
                          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">Course</th>
                          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">Amount</th>
                          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">Date</th>
                          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {recentPayments?.data?.map((payment: any) => (
                          <tr key={payment.id} className="hover:bg-gray-50">
                            <td className="py-4">
                              <div className="flex items-center gap-3">
                                <Image
                                  src={payment.profileImage || 'https://avatar.iran.liara.run/public'} 
                                  alt={payment.name}
                                  width={32}
                                  height={32}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                                <span className="font-medium text-gray-900">{payment.name}</span>
                              </div>
                            </td>
                            <td className="py-4 text-gray-900">{payment.course}</td>
                            <td className="py-4 font-medium text-gray-900">€{payment.amount}</td>
                            <td className="py-4 text-gray-500">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                            <td className="py-4">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                payment.status === 'SUCCEEDED' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {payment.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table> */}
                    {recentPayments?.data?.map((payment: any) => (
                      <div
                        key={payment.id}
                        className="flex items-center justify-between px-4 py-2 shadow-xl gap-3 bg-white rounded-lg "
                      >
                        <div className="flex items-center gap-4">
                          <Image
                            src={
                              payment.profileImage ||
                              "https://avatar.iran.liara.run/public"
                            }
                            alt={payment.name}
                            width={500}
                            height={500}
                            className="w-14 h-14 rounded-full object-cover"
                          />
                          <div className="flex flex-col">
                            <span className="text-2xl font-medium text-gray-900">
                              {payment.name}
                            </span>
                            <span className="text-sm text-gray-900">
                              {payment.course}
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date(
                                payment.paymentDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className="text-2xl font-bold text-gray-900">
                            €{payment.amount}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Change Password Tab Content */}
          <TabsContent value="refund-request" className="mt-0">
            <div className="w-full max-w-7xl mx-auto p-4">
              {/* Desktop Table */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-green-600 hover:bg-green-600">
                      <TableHead className="text-white font-semibold">
                        Name
                      </TableHead>
                      <TableHead className="text-white font-semibold">
                        Enrolled Course
                      </TableHead>
                      <TableHead className="text-white font-semibold">
                        Paid Amount
                      </TableHead>
                      <TableHead className="text-white font-semibold">
                        Invoice
                      </TableHead>
                      <TableHead className="text-white font-semibold">
                        Status
                      </TableHead>
                      <TableHead className="text-white font-semibold">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {refundData?.data?.map((item: any) => (
                      <TableRow key={item.id} className="border-b">
                        <TableCell className="font-medium">
                          {item.enrollment.user.name}
                        </TableCell>
                        <TableCell>{item.enrollment.course.title}</TableCell>
                        <TableCell> €{item.enrollment.Amount}</TableCell>
                        <TableCell>
                          <a
                            href={item.invoice}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                          >
                            <Download className="h-4 w-4" />
                            Download invoice
                          </a>
                        </TableCell>
                        <TableCell>
                          {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                className={`w-32 justify-between ${getStatusColor(
                                  item.refundStatus.toLowerCase()
                                )}`}
                              >
                                {item.refundStatus.charAt(0) +
                                  item.refundStatus.slice(1).toLowerCase()}
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => updateStatus(item.id, "pending")}
                              >
                                Pending
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  updateStatus(item.id, "accepted")
                                }
                              >
                                Accepted
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  updateStatus(item.id, "rejected")
                                }
                              >
                                Rejected
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu> */}
                          {item?.refundStatus.charAt(0) +
                            item?.refundStatus.slice(1).toLowerCase()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-900 text-white cursor-pointer"
                              onClick={() => updateStatus(item.id, "APPROVED")}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="cursor-pointer hover:bg-amber-200"
                              onClick={() => updateStatus(item.id, "REJECTED")}
                            >
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <hr className="border-gray-200 my-4" />
                <div className="flex items-center gap-4  mb-6">
                  <h3 className="text-lg  text-gray-900">
                    Total Refund Approved Amount
                  </h3>
                  <p className="text-black font-semibold  mt-1">
                    €{totalApprovedAmount}
                  </p>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                <div className="bg-green-600 text-white p-4 rounded-t-lg">
                  <h2 className="text-lg font-semibold">Refund Requests</h2>
                </div>
                {refundData?.data?.map((item: any) => (
                  <div
                    key={item.id}
                    className="bg-white border rounded-lg p-4 shadow-sm"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {item.enrollment.user.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {item.enrollment.course.title}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className={`${getStatusColor(
                                item.refundStatus.toLowerCase()
                              )}`}
                            >
                              {item.refundStatus.charAt(0) +
                                item.refundStatus.slice(1).toLowerCase()}
                              <ChevronDown className="h-4 w-4 ml-1" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onClick={() => updateStatus(item.id, "PENDING")}
                            >
                              Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => updateStatus(item.id, "APPROVED")}
                            >
                              Accepted
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => updateStatus(item.id, "REJECTED")}
                            >
                              Rejected
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Paid Amount:</span>
                          <p className="font-medium">
                            ${item.enrollment.Amount}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Enrolled At:</span>
                          <p className="font-medium">
                            {new Date(
                              item.enrollment.enrolledAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2">
                        <a
                          href={item.invoice}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm mb-3"
                        >
                          <Download className="h-4 w-4" />
                          Download invoice
                        </a>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white flex-1"
                            onClick={() => updateStatus(item.id, "APPROVED")}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => updateStatus(item.id, "REJECTED")}
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}