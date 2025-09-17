"use client";
import BillingDetails from '@/components/resources/payment/BillingDetails'
import PaymentInformation from '@/components/resources/payment/PaymentInformation'
import { RootState } from "@/redux/store";
import { setAmountState } from "@/redux/features/amountSlice"; // Adjust path as needed
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseBillingDetailsSkeleton from "@/components/skeleton/CourseBillingDetailsSkeleton";
import { useGetResourceByIdQuery } from '@/redux/api/resourceApi';
import FreeResourcePayment from '@/components/payment/free-resource-payment';


export default function ResourcePaymentPage() {
   const params = useParams();
    const dispatch = useDispatch();
    const { data: resource, isLoading } = useGetResourceByIdQuery(params.id);
    const amount = useSelector((state: RootState) => state.amount.amount);
    console.log(amount, "payment pages");
  
    // Update amount in Redux store when course data is available
    useEffect(() => {
      if (resource && !isLoading) {
        const coursePrice = resource?.data?.price || 0;
        // const courseDiscount = course?.data?.discount || 0;
        const discountedPrice = resource?.data?.discountedPrice || coursePrice;
        dispatch(setAmountState({ amount: discountedPrice }));
      }
    }, [resource, isLoading, dispatch]);
  
    if (isLoading) {
      return <CourseBillingDetailsSkeleton />;
    }
  
  return (
    <div className="pt-40 pb-24 container mx-auto flex flex-col md:flex-row gap-16">
      <BillingDetails />

      {amount === 0 ? <FreeResourcePayment /> : <PaymentInformation />}
    </div>
  );
}
