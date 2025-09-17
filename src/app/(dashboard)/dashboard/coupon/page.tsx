/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  useCreateCouponMutation,
  useGetCouponsQuery,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} from "@/redux/api/couponApi";

// Define Coupon interface based on Prisma model
interface Coupon {
  id: string;
  code: string;
  description?: string | null;
  discountType: "PERCENTAGE" | "FIXED_AMOUNT";
  discountValue: number;
  minPurchase?: number | null;
  maxDiscount?: number | null;
  startDate: string;
  expiryDate: string;
  usageLimit?: number | null;
  usageCount: number;
  isSingleUse: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Define form data type (subset of Coupon for form fields)
interface CouponFormData {
  code: string;
  description: string;
  discountType: "PERCENTAGE" | "FIXED_AMOUNT";
  discountValue: number;
  minPurchase?: number | null;
  maxDiscount?: number | null;
  startDate: string;
  expiryDate: string;
  usageLimit?: number | null;
  isSingleUse: boolean;
  isActive: boolean;
}

const initialForm: CouponFormData = {
  code: "",
  description: "",
  discountType: "PERCENTAGE",
  discountValue: 0,
  minPurchase: 0,
  maxDiscount: null,
  startDate: new Date().toISOString().split("T")[0],
  expiryDate: new Date().toISOString().split("T")[0],
  usageLimit: null,
  isSingleUse: false,
  isActive: true,
};

const AdminCouponsPage = () => {
  const { data: coupons, isLoading } = useGetCouponsQuery(undefined);
  const [createCoupon, { isLoading: isCreating }] = useCreateCouponMutation();
  const [updateCoupon, { isLoading: isUpdating }] = useUpdateCouponMutation();
  const [deleteCoupon, { isLoading: isDeleting }] = useDeleteCouponMutation();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState<CouponFormData>(initialForm);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    let val: string | number | boolean | null =
      type === "checkbox" ? checked : value;

    if (["maxDiscount", "usageLimit", "minPurchase"].includes(name)) {
      val = value === "" ? null : parseFloat(value);
    } else if (name === "discountValue") {
      val = parseFloat(value) || 0;
    }

    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const handleCreate = async () => {
    try {
      const payload = {
        ...formData,
        startDate: `${formData.startDate}T00:00:00Z`,
        expiryDate: `${formData.expiryDate}T00:00:00Z`,
      };
      await createCoupon(payload).unwrap();
      setIsCreateModalOpen(false);
      setFormData(initialForm);
      setErrorMessage("");
    } catch (err: any) {
      setErrorMessage(err?.data?.message || "Failed to create coupon");
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setFormData({
      code: coupon.code,
      description: coupon.description || "",
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minPurchase: coupon.minPurchase ?? 0,
      maxDiscount: coupon.maxDiscount ?? null,
      startDate: new Date(coupon.startDate).toISOString().split("T")[0],
      expiryDate: new Date(coupon.expiryDate).toISOString().split("T")[0],
      usageLimit: coupon.usageLimit ?? null,
      isSingleUse: coupon.isSingleUse,
      isActive: coupon.isActive,
    });
    setIsEditModalOpen(true);
    setErrorMessage("");
  };

  const handleUpdate = async () => {
    if (!selectedCoupon) return;
    try {
      const payload = {
        ...formData,
        startDate: `${formData.startDate}T00:00:00Z`,
        expiryDate: `${formData.expiryDate}T00:00:00Z`,
      };
      await updateCoupon({ id: selectedCoupon.id, ...payload }).unwrap();
      setIsEditModalOpen(false);
      setSelectedCoupon(null);
      setFormData(initialForm);
      setErrorMessage("");
    } catch (err: any) {
      setErrorMessage(err?.data?.message || "Failed to update coupon");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this coupon?")) {
      try {
        await deleteCoupon(id).unwrap();
        setErrorMessage("");
      } catch (err: any) {
        setErrorMessage(err?.data?.message || "Failed to delete coupon");
      }
    }
  };

  const handleToggleActive = async (coupon: Coupon) => {
    try {
      await updateCoupon({
        id: coupon.id,
        isActive: !coupon.isActive,
      }).unwrap();
      setErrorMessage("");
    } catch (err: any) {
      setErrorMessage(err?.data?.message || "Failed to toggle active status");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Coupon Management
      </h1>
      <button
        onClick={() => {
          setFormData(initialForm);
          setIsCreateModalOpen(true);
          setErrorMessage("");
        }}
        className="bg-[#037F01] text-white px-6 py-3 rounded-lg shadow hover:bg-text-primary transition mb-6"
      >
        Create New Coupon
      </button>

      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {errorMessage}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Discount Type</th>
              <th className="p-3 text-left">Value</th>
              {/* <th className="p-3 text-left">Min Purchase</th> */}
              {/* <th className="p-3 text-left">Max Discount</th> */}
              <th className="p-3 text-left">Start Date</th>
              <th className="p-3 text-left">Expiry Date</th>
              <th className="p-3 text-left">Usage Count / Limit</th>
              <th className="p-3 text-left">Single Use</th>
              <th className="p-3 text-left">Active</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons?.data?.map((coupon: Coupon) => (
              <tr key={coupon.id} className="border-b">
                <td className="p-3">{coupon.code}</td>
                <td className="p-3">{coupon.description || "N/A"}</td>
                <td className="p-3">{coupon.discountType}</td>
                <td className="p-3">{coupon.discountValue}</td>
                {/* <td className="p-3">{coupon.minPurchase ?? "N/A"}</td> */}
                {/* <td className="p-3">{coupon.maxDiscount ?? "N/A"}</td> */}
                <td className="p-3">
                  {new Date(coupon.startDate).toLocaleDateString()}
                </td>
                <td className="p-3">
                  {new Date(coupon.expiryDate).toLocaleDateString()}
                </td>
                <td className="p-3">
                  {coupon.usageCount} / {coupon.usageLimit ?? "Unlimited"}
                </td>
                <td className="p-3">{coupon.isSingleUse ? "Yes" : "No"}</td>
                <td className="p-3">{coupon.isActive ? "Yes" : "No"}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(coupon)}
                    disabled={isUpdating || isDeleting}
                    className="bg-[#A8BBA3] text-white px-3 py-1 rounded hover:bg-text-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleActive(coupon)}
                    disabled={isUpdating || isDeleting}
                    className={`${
                      coupon.isActive
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white px-3 py-1 rounded disabled:bg-gray-400 disabled:cursor-not-allowed`}
                  >
                    {coupon.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => handleDelete(coupon.id)}
                    disabled={isDeleting}
                    className="bg-[#d87b49] text-white px-3 py-1 rounded hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Create Coupon</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Code</label>
                <input
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Description</label>
                <input
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* <div>
                <label className="block text-gray-700">Discount Type</label>
                <select
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="PERCENTAGE">PERCENTAGE</option>
                  <option value="FIXED_AMOUNT">FIXED_AMOUNT</option>
                </select>
              </div> */}
              <div>
                <label className="block text-gray-700">Discount Value</label>
                <input
                  type="number"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  min="0"
                />
              </div>
              {/* <div>
                <label className="block text-gray-700">Min Purchase</label>
                <input
                  type="number"
                  name="minPurchase"
                  value={formData.minPurchase ?? ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-gray-700">Max Discount</label>
                <input
                  type="number"
                  name="maxDiscount"
                  value={formData.maxDiscount ?? ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  min="0"
                />
              </div> */}
              <div>
                <label className="block text-gray-700">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Usage Limit</label>
                <input
                  type="number"
                  name="usageLimit"
                  value={formData.usageLimit ?? ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  min="0"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isSingleUse"
                  checked={formData.isSingleUse}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="text-gray-700">Is Single Use</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="text-gray-700">Is Active</label>
              </div>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCreate}
                  disabled={isCreating}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isCreating ? "Creating..." : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Coupon</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Code</label>
                <input
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Description</label>
                <input
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              {/* <div>
                <label className="block text-gray-700">Discount Type</label>
                <select
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="PERCENTAGE">PERCENTAGE</option>
                  <option value="FIXED_AMOUNT">FIXED_AMOUNT</option>
                </select>
              </div> */}
              <div>
                <label className="block text-gray-700">Discount Value</label>
                <input
                  type="number"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                  min="0"
                />
              </div>
              {/* <div>
                <label className="block text-gray-700">Min Purchase</label>
                <input
                  type="number"
                  name="minPurchase"
                  value={formData.minPurchase ?? ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-gray-700">Max Discount</label>
                <input
                  type="number"
                  name="maxDiscount"
                  value={formData.maxDiscount ?? ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  min="0"
                />
              </div> */}
              <div>
                <label className="block text-gray-700">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Usage Limit</label>
                <input
                  type="number"
                  name="usageLimit"
                  value={formData.usageLimit ?? ""}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  min="0"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isSingleUse"
                  checked={formData.isSingleUse}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="text-gray-700">Is Single Use</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label className="text-gray-700">Is Active</label>
              </div>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isUpdating ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCouponsPage;
