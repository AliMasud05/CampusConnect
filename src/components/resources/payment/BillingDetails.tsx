/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CourseBillingDetailsSkeleton from "@/components/skeleton/CourseBillingDetailsSkeleton";
import { useApplyCouponMutation } from "@/redux/api/couponApi";
import { useGetResourceByIdQuery } from "@/redux/api/resourceApi";
import { setAmountState } from "@/redux/features/amountSlice";
import { setCouponState } from "@/redux/features/couponSlice";
import getUserInfo from "@/utils/getUserInfo";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState,  useMemo } from "react";
import { useDispatch } from "react-redux";

const BillingDetails: React.FC = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const myprofile = getUserInfo();

  const { data, isLoading } = useGetResourceByIdQuery(params.id as string);
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

  const resource = data?.data;

  const resourcePrice = resource?.price || 0;
  const resourceDiscount = resource?.discount || 0;

  const initialDiscountedPrice = useMemo(() => {
    if (resourceDiscount >= 100) {
      return 0;
    }
    return resourcePrice - (resourcePrice * resourceDiscount) / 100;
  }, [resourcePrice, resourceDiscount]);

  // Handle coupon application
  const handleApplyCoupon = async () => {
    setErrorMessage("");

    // Check if resource already has 100% discount
    if (resourceDiscount >= 100) {
      setErrorMessage("You already have 100% discount on this resource");
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

  // Calculate final price based on resource discount and coupon
  const finalPrice = useMemo(() => {
    let price = initialDiscountedPrice;
    if (couponData && resourceDiscount < 100) {
      if (couponData.discountType === "PERCENTAGE") {
        // Calculate maximum allowed discount (up to 100%)
        const maxAllowedDiscount = 100 - resourceDiscount;
        const couponDiscountValue = Math.min(
          maxAllowedDiscount,
          couponData.discountValue
        );

        // Calculate total discount percentage
        const totalDiscountPercentage = Math.min(
          100,
          resourceDiscount + couponDiscountValue
        );

        // Calculate final price
        price = resourcePrice - (resourcePrice * totalDiscountPercentage) / 100;
      } else if (couponData.discountType === "FIXED") {
        // For fixed discount, subtract from the already discounted price
        price = Math.max(0, initialDiscountedPrice - couponData.discountValue);
      }
    }
    return price;
  }, [initialDiscountedPrice, couponData, resourceDiscount, resourcePrice]);

  const couponDiscountValue = useMemo(() => {
    if (!couponData || resourceDiscount >= 100) return 0;
    if (couponData.discountType === "PERCENTAGE") {
      const maxAllowedDiscount = 100 - resourceDiscount;
      return Math.min(maxAllowedDiscount, couponData.discountValue);
    } else if (couponData.discountType === "FIXED") {
      return couponData.discountValue;
    }
    return 0;
  }, [couponData, resourceDiscount]);

  const totalDiscountPercentage = useMemo(() => {
    if (!couponData || couponData.discountType !== "PERCENTAGE")
      return resourceDiscount;
    return Math.min(100, resourceDiscount + couponDiscountValue);
  }, [couponData, resourceDiscount, couponDiscountValue]);

  // Update the amount in Redux state whenever finalPrice changes
  // useEffect(() => {
  // }, [finalPrice, dispatch]);
  
  dispatch(setAmountState({ amount: finalPrice }));
  console.log(finalPrice, "final price");

  if (isLoading) return <CourseBillingDetailsSkeleton />;

  return (
    <div className="w-full md:w-1/2">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Billing Details
      </h2>
      <div className="flex flex-col mb-6 gap-6">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <Image
            src={resource?.thumbnail || "/default-thumbnail.png"} // Fallback image
            alt="Resource Thumbnail"
            width={150}
            height={100}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="w-full">
          <h3 className="text-xl font-medium text-gray-900">
            {resource?.title || "Resource Title"}
          </h3>
          {/* Optional: Add subtitle if available in resource data */}
          {resource?.subtitle && (
            <p className="text-gray-600 mt-1">{resource.subtitle}</p>
          )}
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4 md:pl-6">
        <h4 className="text-lg font-medium text-gray-700 mb-4">
          Payment Details
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Resource Price</span>
            <span className="text-gray-900">€{resourcePrice.toFixed(2)}</span>
          </div>

          {resourceDiscount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Resource Discount</span>
              <span className="text-black">{resourceDiscount}%</span>
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

          {(resourceDiscount > 0 || couponData) && (
            <div className="flex justify-between">
              <span className="text-gray-600">Total Savings</span>
              <span className="text-black">
                {couponData && couponData.discountType === "PERCENTAGE"
                  ? `${totalDiscountPercentage}% (€${(
                      resourcePrice - finalPrice
                    ).toFixed(2)})`
                  : `€${(resourcePrice - finalPrice).toFixed(2)}`}
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

        {resourceDiscount < 100 ? (
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
                    : "bg-text-secondary py-2 px-4 rounded-full hover:bg-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
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
            <p className="text-green-700 font-medium">
              🎉 You already have 100% discount on this resource!
            </p>
            <p className="text-green-600 text-sm mt-1">
              No coupon needed - this resource is completely free.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillingDetails;
