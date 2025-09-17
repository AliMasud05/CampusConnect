import Image from "next/image"
import { Check } from "lucide-react"

export default function UserDetails() {
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm p-6">
        {/* Header */}
        <h1 className="text-xl font-semibold text-gray-900 mb-8">User Details</h1>

        {/* User Profile Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <Image src="/profile.png" alt="John Doe" width={60} height={60} className="rounded-full object-cover" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">John Doe</h2>
            <p className="text-sm text-gray-600 mb-1">Email: johndoe@gmail.com</p>
            <p className="text-sm text-gray-600">Mobile: +91 9 4010 1449</p>
          </div>
        </div>

        {/* Course & Payment Details Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Course & Payment details</h3>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Course Name:</span>
              <span className="text-sm font-medium text-gray-900">C & Assembly for Engineers</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Joined Date:</span>
              <span className="text-sm font-medium text-gray-900">12/06/05</span>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-3 gap-4">
            {/* Course Status */}
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-2">Course Status</p>
              <div className="relative w-12 h-12 mx-auto mb-2">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="86, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-semibold text-gray-900">86%</span>
                </div>
              </div>
            </div>

            {/* Total Payment */}
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-2">Total Payment</p>
              <div className="w-12 h-12 mx-auto mb-2 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-900">€100</p>
            </div>

            {/* Total Discount */}
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-2">Total Discount</p>
              <div className="w-12 h-12 mx-auto mb-2 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-900">€0.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
