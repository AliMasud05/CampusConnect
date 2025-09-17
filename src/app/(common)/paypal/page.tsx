// import { useState } from "react";
// import { useRouter } from "next/router";
// import { toast } from "sonner";
// import Head from "next/head";
// import Link from "next/link";
// import { usePaypalPaymentMutation } from "@/redux/api/paymentsApi";

// const PayPalPaymentPage = () => {
//   const router = useRouter();
//   const { courseId } = router.query;
//   const [paypalPayment, { isLoading }] = usePaypalPaymentMutation();

//   const [isProcessing, setIsProcessing] = useState(false);
//   const [paypalLoading, setPaypalLoading] = useState(false);

//   const handlePaypalPayment = async () => {
   

//     try {
//       setIsProcessing(true);
//       setPaypalLoading(true);

//       // Create PayPal order on your server
//       const response = await fetch("/api/create-paypal-order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount: 10,
//           userId: ,
//         }),
//       });

//       const order = await response.json();

//       if (!order.orderId || !order.approvalLink) {
//         throw new Error("Failed to create PayPal order");
//       }

//       // Redirect to PayPal approval page
//       window.location.href = order.approvalLink;
//     } catch (error) {
//       console.error("PayPal error:", error);
//       toast.error("Failed to initiate PayPal payment");
//     } finally {
//       setIsProcessing(false);
//       setPaypalLoading(false);
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>PayPal Payment | Level Up Motorcycle Training</title>
//         <meta name="description" content="Complete your payment using PayPal" />
//       </Head>

//       <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
//           <div className="p-8">
//             <div className="flex justify-center mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">
//                 Complete Your Payment
//               </h2>
//             </div>

//             <div className="mb-8">
//               <h3 className="text-lg font-medium text-gray-700 mb-2">
//                 Course Details
//               </h3>
//               <div className="bg-gray-100 p-4 rounded-lg">
//                 <p className="text-gray-800 font-medium">{course?.title}</p>
//                 <p className="text-gray-600 mt-1">${course?.price}</p>
//               </div>
//             </div>

//             <div className="mb-8">
//               <h3 className="text-lg font-medium text-gray-700 mb-4">
//                 Payment Method
//               </h3>

//               <div className="border rounded-lg overflow-hidden">
//                 <button
//                   onClick={handlePaypalPayment}
//                   disabled={isProcessing || paypalLoading}
//                   className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//                     isProcessing || paypalLoading
//                       ? "opacity-70 cursor-not-allowed"
//                       : ""
//                   }`}
//                 >
//                   {paypalLoading ? (
//                     <span className="flex items-center">
//                       <svg
//                         className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Processing...
//                     </span>
//                   ) : (
//                     <span className="flex items-center">
//                       <svg
//                         className="h-5 w-5 mr-2"
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 24 24"
//                         fill="currentColor"
//                       >
//                         <path d="M20.145 8.27l1.563-1.563-1.414-1.414L18.586 7c-1.05-.63-2.274-1-3.586-1-3.859 0-7 3.14-7 7s3.141 7 7 7 7-3.14 7-7c0-1.312-.37-2.536-1-3.586l1.145-1.144zM15 18c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z" />
//                       </svg>
//                       Pay with PayPal
//                     </span>
//                   )}
//                 </button>
//               </div>

//               <p className="mt-3 text-center text-sm text-gray-500">
//                 You'll be redirected to PayPal to complete your payment
//                 securely.
//               </p>
//             </div>

//             <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
//               <Link href={`/courses/${courseId}`} passHref>
//                 <a className="text-sm font-medium text-blue-600 hover:text-blue-500">
//                   &larr; Back to course
//                 </a>
//               </Link>

//               <p className="text-sm text-gray-500">
//                 Secure payment processed by PayPal
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PayPalPaymentPage;

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page
