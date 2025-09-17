/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CourseBillingDetailsSkeleton from "@/components/skeleton/CourseBillingDetailsSkeleton";
import { useApplyCouponMutation } from "@/redux/api/couponApi";
import { useGetCourseByIdQuery } from "@/redux/api/courseApi";
import { setAmountState } from "@/redux/features/amountSlice";
import { setCouponState } from "@/redux/features/couponSlice";
import getUserInfo from "@/utils/getUserInfo";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const CourseBillingDetails: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const myprofile = getUserInfo();
  const { data: courses, isLoading } = useGetCourseByIdQuery(params.id);
  const [applyCoupon, { isLoading: isCouponLoading }] =
    useApplyCouponMutation();
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponData, setCouponData] = useState<{
    discountType: string;
    discountValue: number;
    minPurchase?: number;
    maxDiscount?: number;
    couponId: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Calculate initial discount and price
  const coursePrice = courses?.data?.price || 0;
  const courseDiscount = courses?.data?.discount || 0;

  // Calculate the initial discounted price
  const calculateDiscountedPrice = () => {
    if (courseDiscount >= 100) {
      return 0;
    }
    return coursePrice - (coursePrice * courseDiscount) / 100;
  };

  const initialDiscountedPrice = calculateDiscountedPrice();

  // Handle coupon application
  const handleApplyCoupon = async () => {
    setErrorMessage("");

    // Check if course already has 100% discount
    if (courseDiscount >= 100) {
      setErrorMessage("You already have 100% discount on this course");
      return;
    }

    try {
      const response = await applyCoupon({
        code: couponCode,
        userId: myprofile?.id as string,
      }).unwrap();

      dispatch(setCouponState({ coupon: response?.data.code }));
      setCouponData(response.data);
    } catch (err: any) {
      setErrorMessage(err?.data?.message || "Failed to apply coupon");
      setCouponData(null);
    }
  };

  // Calculate final price based on course discount and coupon
  let finalPrice = initialDiscountedPrice;
  let totalDiscountPercentage = courseDiscount;
  let couponDiscountValue = 0;

  if (couponData && courseDiscount < 100) {
    if (couponData.discountType === "PERCENTAGE") {
      // Calculate maximum allowed discount (up to 100%)
      const maxAllowedDiscount = 100 - courseDiscount;
      couponDiscountValue = Math.min(
        maxAllowedDiscount,
        couponData.discountValue
      );

      // Calculate total discount percentage
      totalDiscountPercentage = Math.min(
        100,
        courseDiscount + couponDiscountValue
      );

      // Calculate final price
      finalPrice = coursePrice - (coursePrice * totalDiscountPercentage) / 100;
    } else if (couponData.discountType === "FIXED") {
      // For fixed discount, subtract from the already discounted price
      finalPrice = Math.max(
        0,
        initialDiscountedPrice - couponData.discountValue
      );
      couponDiscountValue = couponData.discountValue;
    }
  }

  // Update the amount in Redux state whenever the finalPrice changes
  useEffect(() => {
    dispatch(setAmountState({ amount: finalPrice }));
  }, [finalPrice, dispatch]);

  if (isLoading) return <CourseBillingDetailsSkeleton />;

  return (
    <div className="w-full md:w-1/2">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Billing Details
      </h2>
      <div className="flex flex-col mb-6 gap-6">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <Image
            src={courses?.data?.thumnail}
            alt="Course Thumbnail"
            width={150}
            height={100}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="w-full">
          <h3 className="text-xl font-medium text-gray-900">
            {courses?.data?.title}
          </h3>
          <p className="text-gray-600 mt-1">{courses?.data?.subtitle}</p>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4 md:pl-6">
        <h4 className="text-lg font-medium text-gray-700 mb-4">
          Payment Details
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Course Price</span>
            <span className="text-gray-900">€{coursePrice.toFixed(2)}</span>
          </div>

          {courseDiscount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Course Discount</span>
              <span className="text-black">{courseDiscount}%</span>
            </div>
          )}

          {couponData && (
            <div className="flex justify-between">
              <span className="text-gray-600">Coupon Discount</span>
              <span className="text-black">
                {couponData.discountType === "PERCENTAGE"
                  ? `${couponDiscountValue}%`
                  : `€${couponDiscountValue.toFixed(2)}`}
              </span>
            </div>
          )}

          {(courseDiscount > 0 || couponData) && (
            <div className="flex justify-between">
              <span className="text-gray-600">Total Savings</span>
              <span className="text-black">
                {couponData && couponData.discountType === "PERCENTAGE"
                  ? `${totalDiscountPercentage}% (€${(
                      coursePrice - finalPrice
                    ).toFixed(2)})`
                  : `€${(coursePrice - finalPrice).toFixed(2)}`}
              </span>
            </div>
          )}

          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between font-semibold text-lg">
              <span className="text-gray-800">Total Payment</span>
              <span
                className={
                  finalPrice === 0 ? "text-green-600" : "text-gray-900"
                }
              >
                €{finalPrice.toFixed(2)}
                {finalPrice === 0 && (
                  <span className="ml-2 text-sm font-normal">(FREE)</span>
                )}
              </span>
            </div>
          </div>
        </div>

        {courseDiscount < 100 ? (
          <div className="mt-6">
            <label htmlFor="coupon" className="text-gray-600 mb-2 block">
              Coupon Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="coupon"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter coupon code"
                disabled={isCouponLoading}
              />
              <button
                onClick={handleApplyCoupon}
                disabled={isCouponLoading || !couponCode}
                className={`px-4 py-2 rounded-lg text-white ${
                  isCouponLoading || !couponCode
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-text-secondary text-white py-2 px-4 rounded-full hover:bg-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
                }`}
              >
                {isCouponLoading ? "Applying..." : "Apply"}
              </button>
            </div>
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
          </div>
        ) : (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            {/* <p className="text-green-700 font-medium">
              🎉 You already have 100% discount on this course!
            </p>
            <p className="text-green-601 text-sm mt-1">
              No coupon needed - this course is completely free.
            </p> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseBillingDetails;
