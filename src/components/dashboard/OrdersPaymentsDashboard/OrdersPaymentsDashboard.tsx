"use client"

import { useState } from "react"
import { ChevronDown, Users, CreditCard, RotateCcw, FolderOpen, Check, X } from "lucide-react"

type PaymentEntry = {
  id: number
  avatar: string
  name: string
  course: string
  date: string
  amount: number
  status?: 'pending' | 'completed' | 'refunded'
}

type RefundRequest = {
  id: number
  clientName: string
  course: string
  paidAmount: number
  refundAmount: number
  timeRemaining: string
  status: 'pending' | 'approved' | 'rejected'
}

export default function OrdersPaymentsDashboard() {
  const [activeTab, setActiveTab] = useState<"orders" | "refunds">("orders")
  const [timeRange, setTimeRange] = useState<string>("This month")
  const [selectedRefund, setSelectedRefund] = useState<RefundRequest | null>(null)
  const [fileSelected, setFileSelected] = useState<boolean>(false)

  const paymentEntries: PaymentEntry[] = [
    { id: 1, avatar: "bg-blue-400", name: "John Doe", course: "Converters Modeling", date: "12/10/12", amount: 100, status: 'completed' },
    { id: 2, avatar: "bg-orange-400", name: "Jane Smith", course: "Advanced React", date: "15/10/12", amount: 150, status: 'completed' },
    { id: 3, avatar: "bg-purple-400", name: "Robert Johnson", course: "UI/UX Design", date: "18/10/12", amount: 120, status: 'pending' },
    { id: 4, avatar: "bg-yellow-400", name: "Emily Davis", course: "Data Science", date: "20/10/12", amount: 200, status: 'completed' },
    { id: 5, avatar: "bg-red-400", name: "Michael Wilson", course: "DevOps Fundamentals", date: "22/10/12", amount: 180, status: 'refunded' },
  ]

  const [refundRequests, setRefundRequests] = useState<RefundRequest[]>([
    { id: 1, clientName: "John Doe", course: "Converters Modeling", paidAmount: 100, refundAmount: 100, timeRemaining: "19 hours", status: 'pending' },
    { id: 2, clientName: "Sarah Connor", course: "Advanced JavaScript", paidAmount: 150, refundAmount: 150, timeRemaining: "5 hours", status: 'pending' },
    { id: 3, clientName: "David Miller", course: "Cloud Computing", paidAmount: 200, refundAmount: 200, timeRemaining: "32 hours", status: 'pending' },
  ])

  const handleApproveRefund = (id: number) => {
    const updatedRequests = refundRequests.map(request => 
      request.id === id ? { ...request, status: 'approved' as const } : request
    )
    setRefundRequests(updatedRequests)
    setSelectedRefund(updatedRequests.find(req => req.id === id) || null)
  }

  const handleRejectRefund = (id: number) => {
    const updatedRequests = refundRequests.map(request => 
      request.id === id ? { ...request, status: 'rejected' as const } : request
    )
    setRefundRequests(updatedRequests)
    setSelectedRefund(updatedRequests.find(req => req.id === id) || null)
  }

  const handleFileUpload = () => {
    setFileSelected(true)
  }

  const handleSendInvoice = () => {
    alert('Invoice sent successfully!')
    setFileSelected(false)
  }

  const totalEnrollments = paymentEntries.length
  const totalPayments = paymentEntries
    .filter(entry => entry.status === 'completed')
    .reduce((sum, entry) => sum + entry.amount, 0)
  const totalRefunds = paymentEntries
    .filter(entry => entry.status === 'refunded')
    .reduce((sum, entry) => sum + entry.amount, 0)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Tab Navigation */}
 <div className="mb-8">
  <div className="flex border-b border-gray-200">
    <button
      onClick={() => setActiveTab("orders")}
      className={`px-4 py-3 mr-8 font-medium border-b-2 ${
        activeTab === "orders" 
          ? "text-gray-900 border-gray-900" 
          : "text-gray-500 border-transparent hover:text-gray-700"
      } transition-colors`}
    >
      Orders & Payments
    </button>
    <button
      onClick={() => setActiveTab("refunds")}
      className={`px-4 py-3 font-medium border-b-2 ${
        activeTab === "refunds" 
          ? "text-gray-900 border-gray-900" 
          : "text-gray-500 border-transparent hover:text-gray-700"
      } transition-colors`}
    >
      Refund Requests
    </button>
  </div>
</div>

        {/* Orders & Payments Tab Content */}
        {activeTab === "orders" && (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Total Enrollments */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Total Enrollments</span>
                  <div className="relative">
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="appearance-none flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded-full px-3 py-1 pr-6 cursor-pointer"
                    >
                      <option>This month</option>
                      <option>Last month</option>
                      <option>This year</option>
                    </select>
                    <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-2xl font-semibold text-gray-900">{totalEnrollments}</span>
                </div>
              </div>

              {/* Total Payments */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Total Payments</span>
                  <div className="relative">
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="appearance-none flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded-full px-3 py-1 pr-6 cursor-pointer"
                    >
                      <option>This month</option>
                      <option>Last month</option>
                      <option>This year</option>
                    </select>
                    <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-2xl font-semibold text-gray-900">€{totalPayments.toLocaleString()}</span>
                </div>
              </div>

              {/* Total Refunds */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Total Refunds</span>
                  <div className="relative">
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="appearance-none flex items-center gap-1 text-xs text-gray-500 border border-gray-200 rounded-full px-3 py-1 pr-6 cursor-pointer"
                    >
                      <option>This month</option>
                      <option>Last month</option>
                      <option>This year</option>
                    </select>
                    <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <RotateCcw className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-2xl font-semibold text-gray-900">€{totalRefunds.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Today's Payments Section */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">{"Today's Payments"}</h2>
                <div className="relative">
                  <select className="appearance-none flex items-center gap-1 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 pr-8 cursor-pointer">
                    <option>Today</option>
                    <option>Yesterday</option>
                    <option>Last 7 days</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {paymentEntries.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${entry.avatar} rounded-full flex items-center justify-center`}>
                        <span className="text-white font-medium text-sm">
                          {entry.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">{entry.name}</h3>
                        <p className="text-sm text-gray-600 mb-1">Enrolled - {entry.course}</p>
                        <p className="text-xs text-gray-500">Joined date: {entry.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-lg font-semibold ${
                        entry.status === 'refunded' ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        €{entry.amount}
                      </span>
                      {entry.status === 'pending' && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          Pending
                        </span>
                      )}
                      {entry.status === 'refunded' && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                          Refunded
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Refund Requests Tab Content */}
        {activeTab === "refunds" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - List of Refund Requests */}
            <div className="bg-white rounded-xl shadow-sm lg:col-span-1">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Refund Requests</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {refundRequests.map((request) => (
                  <div 
                    key={request.id} 
                    onClick={() => setSelectedRefund(request)}
                    className={`p-6 cursor-pointer ${
                      selectedRefund?.id === request.id ? 'bg-gray-50' : 'hover:bg-gray-50'
                    } transition-colors`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{request.clientName}</h3>
                      <span className={`text-sm px-2 py-1 rounded ${
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{request.course}</p>
                    <p className="text-sm text-gray-900 mt-2">€{request.refundAmount}</p>
                    <p className="text-xs text-gray-500 mt-1">{request.timeRemaining} remaining</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Refund Details and Invoice Upload */}
            <div className="lg:col-span-2 space-y-8">
              {/* Refund Details */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Refund Details</h3>
                <div className="space-y-6">
                  {selectedRefund ? (
                    <>
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Client Name:</label>
                        <p className="text-lg font-semibold text-gray-900">{selectedRefund.clientName}</p>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Want to cancel:</label>
                        <p className="text-lg font-semibold text-gray-900">{selectedRefund.course}</p>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Paid Amount:</label>
                        <p className="text-lg font-semibold text-gray-900">€{selectedRefund.paidAmount}</p>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Refund Amount:</label>
                        <p className="text-lg font-semibold text-gray-900">€{selectedRefund.refundAmount}</p>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Time remains:</label>
                        <p className="text-lg font-semibold text-gray-900">{selectedRefund.timeRemaining}</p>
                      </div>

                      {selectedRefund.status === 'pending' ? (
                        <div className="flex gap-4 pt-4">
                          <button 
                            onClick={() => handleApproveRefund(selectedRefund.id)}
                            className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                          >
                            <Check className="w-4 h-4" /> Approve
                          </button>
                          <button 
                            onClick={() => handleRejectRefund(selectedRefund.id)}
                            className="flex-1 border border-green-600 text-green-600 py-3 px-6 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
                          >
                            <X className="w-4 h-4" /> Reject
                          </button>
                        </div>
                      ) : selectedRefund.status === 'approved' ? (
                        <div className="bg-green-100 text-green-800 py-3 px-6 rounded-lg text-center">
                          Refund Approved
                        </div>
                      ) : (
                        <div className="bg-red-100 text-red-800 py-3 px-6 rounded-lg text-center">
                          Refund Rejected
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      Select a refund request to view details
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Invoice */}
              {selectedRefund && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Upload Invoice</h3>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                    <FolderOpen className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <p className="text-sm text-gray-500 mb-4">Formats: pdf - Max 100 MB each</p>

                    <div className="flex items-center justify-center gap-4">
                      <button 
                        onClick={handleFileUpload}
                        className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        Choose File
                      </button>
                      <span className="text-sm text-gray-500">
                        {fileSelected ? "1 file selected" : "No File Choosen"}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={handleSendInvoice}
                    disabled={!fileSelected}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                      fileSelected 
                        ? "bg-green-600 text-white hover:bg-green-700" 
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Send via email
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}