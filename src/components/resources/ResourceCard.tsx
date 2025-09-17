"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LuDownload } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { TResource } from "@/types/resource.type";
import fileIcon from "@/assets/resources/file.svg";
import message from "@/assets/resources/message.svg";
import { toast } from "sonner";

const ResourceCard: React.FC<TResource> = ({
  id,
  title,
  topic,
  type,
  status,
  price,
  discount,
  file,
  thumbnail,
}) => {
  const router = useRouter();

  console.log(
    id,
    title,
    topic,
    type,
    status,
    price,
    discount,
    thumbnail,
    "resource"
  );
  console.log(file, "file");

  // Calculate discounted price with null checks
  const discountedPrice =
    discount && price ? price - (price * discount) / 100 : price || 0;

  // Format currency with null check
  const formatCurrency = (amount: number | null) => {
    if (amount === null) return "€0.00";

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const handleFreeDownloadBtn = async () => {
    if (!file) {
      toast.error("No file available for download");
      return;
    }

    try {
      // Fetch the file with no-cache headers to ensure fresh download
      const response = await fetch(file, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const url = new URL(file);
      const pathname = url.pathname;
      const filename =
        pathname.split("/").pop() ||
        `resource-${title.replace(/[^a-z0-9]/gi, "_")}.${type.toLowerCase()}`;

      // Create download link
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      }, 100);

      toast.success("Download started");
    } catch (error) {
      console.error("Download failed:", error);
      // toast.error("Failed to download file. Please try again.");

      // Fallback: open in new tab if download fails
      window.open(file, "_blank");
    }
  };

  const handleBuyNowBtn = () => {
    router.push(`/resources/${id}`);
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      {/* Resource Thumbnail */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <Image
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Discount Badge - Only show if discount exists and is greater than 0 */}
      {discount && discount > 0 && (
        <div className="absolute px-3 py-1 rounded-full bg-red-500 text-white top-4 right-4 flex items-center justify-center shadow-md text-sm font-medium">
          {discount}% OFF
        </div>
      )}

      {/* Status Badge */}
      <button className="absolute px-4 py-1 rounded-full bg-white/40 backdrop-blur-md top-4 left-4 flex items-center justify-center border border-white/30 shadow-md text-sm font-medium">
        {status === "FREE" ? "Free" : "Premium"}
      </button>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3
          className={`${
            status === "FREE" ? "text-center" : ""
          } text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2`}
        >
          {title}
        </h3>
        <div
          className={`${
            status === "FREE" ? "justify-center" : "justify-start"
          } flex items-center gap-3 pb-6 text-sm text-gray-600`}
        >
          <div className="flex items-center gap-2">
            <Image src={fileIcon} alt="file icon" height={20} width={20} />
            <span>File type: {type}</span>
          </div>
          <div className="flex items-center gap-2">
            <Image src={message} alt="file icon" height={20} width={20} />
            <span>Topic: {topic}</span>
          </div>
        </div>

        {/* Spacer to push buttons to bottom */}
        <div className="flex-grow"></div>

        {status === "PAID" && price !== null && (
          <div className="pb-5 ml-4">
            {discount && discount > 0 ? (
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-semibold text-text-primary">
                    {formatCurrency(discountedPrice)}
                  </span>
                  <span className="text-lg line-through text-gray-500">
                    {formatCurrency(price)}
                  </span>
                </div>
                <p className="text-[#FF00C8]">Get {discount}% discount.</p>
              </div>
            ) : (
              <span className="text-2xl font-semibold text-text-primary">
                {formatCurrency(price)}
              </span>
            )}
          </div>
        )}

        {/* Action Button - Now always at bottom */}
        <div className="flex mt-4">
          {status === "FREE" ? (
            <button
              onClick={handleFreeDownloadBtn}
              className="cursor-pointer flex items-center justify-center gap-2.5 w-full bg-text-secondary hover:bg-primary text-white font-semibold py-3 px-4 rounded-full transition duration-200"
            >
              <LuDownload />
              Free Download
            </button>
          ) : (
            <button
              onClick={handleBuyNowBtn}
              className="cursor-pointer flex items-center justify-center gap-2.5 w-full bg-text-secondary hover:bg-primary text-white font-semibold py-3 px-4 rounded-full transition duration-200"
            >
              <BsCart3 />
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
