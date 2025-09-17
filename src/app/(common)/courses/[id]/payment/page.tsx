"use client";
import CourseBillingDetails from "@/components/courses/payment/CourseBillingDetails";
import CoursePaymentInfo from "@/components/courses/payment/CoursePaymentInfo";
import FreePayment from "@/components/payment/free-payment";
import { useGetCourseByIdQuery } from "@/redux/api/courseApi";
import { RootState } from "@/redux/store";
import { setAmountState } from "@/redux/features/amountSlice"; // Adjust path as needed
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseBillingDetailsSkeleton from "@/components/skeleton/CourseBillingDetailsSkeleton";

export default function CoursePaymentPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const { data: course, isLoading } = useGetCourseByIdQuery(params.id);
  const amount = useSelector((state: RootState) => state.amount.amount);
  console.log(amount, "payment pages");

  // Update amount in Redux store when course data is available
  useEffect(() => {
    if (course && !isLoading) {
      const coursePrice = course?.data?.price || 0;
      // const courseDiscount = course?.data?.discount || 0;
      const discountedPrice = course?.data?.discountedPrice || coursePrice;
      dispatch(setAmountState({ amount: discountedPrice }));
    }
  }, [course, isLoading, dispatch]);

  if (isLoading) {
    return <CourseBillingDetailsSkeleton />;
  }

  return (
    <div className="pt-40 pb-24 container mx-auto flex flex-col md:flex-row gap-16">
      <CourseBillingDetails />
      {amount === 0 ? <FreePayment /> : <CoursePaymentInfo />}
    </div>
  );
}
