import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/WebsiteLogo.png";

interface InvoiceItem {
  id: number;
  description: string;
  articleNo: string;
  quantity: number;
  price: number;
  tax: number;
  total: number;
}

interface InvoiceData {
  invoiceNo: string;
  invoiceDate: string;
  deliveryDate: string;
  dueDate: string;
  recipient: {
    name: string;
    address: string;
    city: string;
    customerId: string;
    email: string;
  };
  items: InvoiceItem[];
  vatExemption: {
    category: string;
    reason: string;
  };
}

const dummyInvoiceData: InvoiceData = {
  invoiceNo: "IN-1",
  invoiceDate: "06/29/2025",
  deliveryDate: "06/29/2025",
  dueDate: "06/29/2025",
  recipient: {
    name: "Buyer Full Name",
    address: "Buyer Street and House Number",
    city: "Buyer Post code Buyer City, DE",
    customerId: "ID-1",
    email: "buyermail@gmail.com",
  },
  items: [
    {
      id: 1,
      description:
        "Course: Writing Maintainable Code and Documentation with Doxygen",
      articleNo: "C-1",
      quantity: 1,
      price: 100.0,
      tax: 0,
      total: 100.0,
    },
  ],
  vatExemption: {
    category: "E-0%",
    reason: "No tax shown, as small business owner according to §19 UStG.",
  },
};

export default function InvoicePage() {
  const calculateTotals = () => {
    const totalNet = dummyInvoiceData.items.reduce(
      (sum, item) => sum + item.total,
      0
    );
    const totalGross = totalNet;
    return { totalNet, totalGross };
  };

  const { totalNet, totalGross } = calculateTotals();

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto bg-white mt-28">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 pb-6 border-b border-gray-200">
          {/* Left Side - Company Info */}
          <div className="flex items-start space-x-4 mb-6 lg:mb-0">
            {/* Logo */}
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image src={logo} alt="Website Logo" width={80} height={80} />
              </Link>
            </div>

            {/* Company Details */}
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Haris Kovačević
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Gotlandweg 135
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                59494 Soest, DE
              </p>
            </div>
          </div>

          {/* Right Side - Contact Info */}
          <div className="text-right space-y-2 w-full">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Contact
            </h2>
            <div className="space-y-1 text-sm sm:text-base">
              <p className="text-gray-600">
                <span className="font-medium">Name:</span> Haris Kovačević
              </p>
              <p className="text-gray-600">
                <span className="font-medium">E-Mail:</span>{" "}
                contact@hk-academy.com
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Tel:</span> +4915757206211
              </p>
            </div>
          </div>
        </div>

        {/* Company Registration Details */}
        <div className="mb-8 space-y-1 text-sm sm:text-base">
          <p className="text-gray-600">
            <span className="font-medium">VAT ID:</span> DE123456789
          </p>
          <p className="text-gray-600">
            <span className="font-medium">E-Address:</span>{" "}
            contact@hk-academy.com
          </p>
        </div>

        {/* Invoice Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Side - Recipient */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recipient
            </h3>
            <div className="space-y-1 text-sm sm:text-base">
              <p className="text-gray-900 font-medium">
                {dummyInvoiceData.recipient.name}
              </p>
              <p className="text-gray-600">
                {dummyInvoiceData.recipient.address}
              </p>
              <p className="text-gray-600">{dummyInvoiceData.recipient.city}</p>
            </div>

            <div className="mt-4 space-y-1 text-sm sm:text-base">
              <p className="text-gray-600">
                <span className="font-medium">Customer ID:</span>{" "}
                {dummyInvoiceData.recipient.customerId}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">E-Address:</span>{" "}
                {dummyInvoiceData.recipient.email}
              </p>
            </div>

            <div className="mt-4 text-sm sm:text-base">
              <h4 className="font-medium text-gray-900 mb-1">Contact</h4>
              <p className="text-gray-600">
                <span className="font-medium">Name:</span>{" "}
                {dummyInvoiceData.recipient.name},
                <span className="font-medium"> E-Mail:</span>{" "}
                {dummyInvoiceData.recipient.email}
              </p>
            </div>
          </div>

          {/* Right Side - Invoice Info */}
          <div className="space-y-3 text-sm sm:text-base">
            <div className="flex justify-between">
              <span className="font-medium text-gray-900">Invoice No.:</span>
              <span className="text-gray-900">
                {dummyInvoiceData.invoiceNo}
              </span>
            </div>
            <div className="flex justify-between bg-slate-200">
              <span className="font-medium text-gray-900">Invoice date:</span>
              <span className="text-gray-900">
                {dummyInvoiceData.invoiceDate}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-900">Delivery date:</span>
              <span className="text-gray-900">
                {dummyInvoiceData.deliveryDate}
              </span>
            </div>
            <div className="flex justify-between bg-slate-200">
              <span className="font-medium text-gray-900">Due date:</span>
              <span className="text-gray-900">{dummyInvoiceData.dueDate}</span>
            </div>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Invoice</h2>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-2 font-semibold text-gray-900">
                    Item
                  </th>
                  <th className="text-center py-3 px-2 font-semibold text-gray-900">
                    Quantity
                  </th>
                  <th className="text-right py-3 px-2 font-semibold text-gray-900">
                    Price
                  </th>
                  <th className="text-right py-3 px-2 font-semibold text-gray-900">
                    Tax
                  </th>
                  <th className="text-right py-3 px-2 font-semibold text-gray-900">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {dummyInvoiceData.items.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="py-4 px-2">
                      <div className="flex">
                        <p className="text-gray-900 font-medium pt-1 pr-2">{index + 1}</p>
                        <div>
                          <p className="text-gray-900 mt-1">
                            {item.description}
                          </p>
                          <p className="text-gray-600 text-sm mt-1">
                            Article no.: {item.articleNo}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <span className="text-gray-900">{item.quantity}</span>
                      <span className="text-gray-500 text-sm ml-1">H87</span>
                    </td>
                    <td className="py-4 px-2 text-right text-gray-900">
                      {item.price.toFixed(2)} €
                    </td>
                    <td className="py-4 px-2 text-right text-gray-900">
                      {item.tax}% €
                    </td>
                    <td className="py-4 px-2 text-right text-gray-900 font-medium">
                      {item.total.toFixed(2)} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Table */}
          <div className="md:hidden space-y-4">
            {dummyInvoiceData.items.map((item, index) => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">
                      Item {index + 1}
                    </p>
                    <p className="text-gray-900 mt-1">{item.description}</p>
                    <p className="text-gray-600 text-sm mt-1">
                      Article no.: {item.articleNo}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Quantity</p>
                      <p className="text-gray-900 font-medium">
                        {item.quantity} H87
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Price</p>
                      <p className="text-gray-900 font-medium">
                        {item.price.toFixed(2)} €
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Tax</p>
                      <p className="text-gray-900 font-medium">{item.tax}% €</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total</p>
                      <p className="text-gray-900 font-bold">
                        {item.total.toFixed(2)} €
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals Section */}
        <div className="mb-8">
          <div className="flex justify-end">
            <div className="w-full max-w-sm space-y-3">
              <div className="flex justify-between py-2 text-sm sm:text-base">
                <span className="text-gray-600">Total (net):</span>
                <span className="text-gray-900 font-medium">
                  {totalNet.toFixed(2)} €
                </span>
              </div>
              <div className="flex justify-between py-2 text-sm sm:text-base">
                <span className="text-gray-600">Total (gross):</span>
                <span className="text-gray-900 font-medium">
                  {totalGross.toFixed(2)} €
                </span>
              </div>
              <div className="flex justify-between py-3 border-t-2 border-gray-200">
                <span className="text-gray-900 font-bold text-base sm:text-lg">
                  Amount due:
                </span>
                <span className="text-gray-900 font-bold text-base sm:text-lg">
                  {totalGross.toFixed(2)} €
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* VAT Exemption Section */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            VAT exemption reasons
          </h3>
          <div className="text-sm sm:text-base">
            <p className="text-gray-900">
              <span className="font-medium">
                Category {dummyInvoiceData.vatExemption.category}
              </span>
              <span className="ml-4 text-gray-600">
                {dummyInvoiceData.vatExemption.reason}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
