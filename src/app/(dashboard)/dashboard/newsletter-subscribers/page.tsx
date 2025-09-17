"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import {
  useDeleteSubscribeMutation,
  useGetAgreedSubscribeQuery,
  useGetSubscribeQuery,
  useSendBroadcastEmailMutation,
  
} from "@/redux/api/subscribeApi";
import { toast } from "sonner";

interface Subscriber {
  id: string;
  email: string;
}

interface SubscriberResponse {
  success: boolean;
  message: string;
  data: Subscriber[];
}

const avatarColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-purple-500",
  "bg-indigo-500",
];

export default function NewsletterSubscriber() {
  const [activeTab, setActiveTab] = useState<
    "all-subscriber" | "send-broadcast"
  >("all-subscriber");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [unsubscribingId, setUnsubscribingId] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isSending, setIsSending] = useState(false);

  // Fetch subscribers with refetch capability
  const {
    data: subscriberData,
    isLoading,
    isError,
    refetch,
  } = useGetAgreedSubscribeQuery({});

  const { data: subscriberAllData } = useGetSubscribeQuery({});

  console.log(subscriberAllData, "subscriber all data");
  console.log(subscriberData, "subscriber data");
  const [deleteSubscribe] = useDeleteSubscribeMutation();
  const [sendBroadcastEmail] = useSendBroadcastEmailMutation();

  // Function to determine color for email avatars
  const getColorForEmail = (email: string): string => {
    const hash = email.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    const index = Math.abs(hash) % avatarColors.length;
    return avatarColors[index];
  };

  // Function to get the first letter of an email
  const getFirstLetter = (email: string): string => {
    return email.charAt(0).toUpperCase();
  };

  // Function to handle unsubscribe action
  const handleUnsubscribe = async (id: string) => {
    setUnsubscribingId(id);
    try {
      await deleteSubscribe(id).unwrap();
      toast.success("Subscriber removed successfully!");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove subscriber.");
    } finally {
      setUnsubscribingId(null);
    }
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  // Remove a file from the list
  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  // Handle broadcast email submission
  const handleSendBroadcast = async () => {
    if (!subject || !message) {
      toast.error("Subject and message are required");
      return;
    }

    setIsSending(true);
    try {
      const formData = new FormData();
      formData.append("subject", subject); // ✅ Correctly append text fields
      formData.append("message", message);

      // Append files (if any)
      files.forEach((file) => {
        formData.append("attachments", file); // Must match Multer's field name
      });

      await sendBroadcastEmail(formData).unwrap();
      toast.success("Email sent successfully!");
      setSubject("");
      setMessage("");
      setFiles([]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send email");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white p-6 mt-6 md:mt-20 max-w-2xl">
      <h1 className="text-2xl md:text-4xl font-medium text-gray-800 mb-6">
        Newsletter Subscriber
      </h1>

      {/* Tab Navigation */}
      <div className="flex mb-6">
        <button
          onClick={() => setActiveTab("all-subscriber")}
          className={`pb-2 px-1 text-2xl md:text-3xl cursor-pointer font-medium border-b-2 transition-colors ${
            activeTab === "all-subscriber"
              ? "border-gray-800 text-gray-800"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          All Subscriber
        </button>
        <button
          onClick={() => setActiveTab("send-broadcast")}
          className={`pb-2 px-1 ml-6 text-2xl md:text-3xl cursor-pointer font-medium border-b-2 transition-colors ${
            activeTab === "send-broadcast"
              ? "border-gray-800 text-gray-800"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Send broadcast Email
        </button>
      </div>

      {/* Loading and Error States */}
      {isLoading && activeTab === "all-subscriber" && (
        <div className="text-center py-4">Loading subscribers...</div>
      )}

      {isError && activeTab === "all-subscriber" && (
        <div className="text-center py-4 text-red-500">
          Error loading subscribers
        </div>
      )}

      {/* All Subscriber Tab Content */}
      {activeTab === "all-subscriber" && subscriberData && (
        <div className="space-y-4 mt-10">
          {(subscriberData as SubscriberResponse)?.data?.map(
            (subscriber: Subscriber) => (
              <div
                key={subscriber.id}
                className="flex items-center space-x-3 shadow-sm shadow-purple-200 p-2 rounded-md"
              >
                <div
                  className={`w-8 h-8 rounded-full ${getColorForEmail(
                    subscriber.email
                  )} flex items-center justify-center text-white text-sm font-medium`}
                >
                  {getFirstLetter(subscriber?.email)}
                </div>
                <span className="text-2xl text-gray-700 flex-grow">
                  {subscriber?.email}
                </span>
                <button
                  onClick={() => handleUnsubscribe(subscriber.id)}
                  disabled={unsubscribingId === subscriber.id}
                  className="text-sm bg-primary cursor-pointer hover:bg-red-600 text-white py-1 px-3 rounded-md transition-colors disabled:bg-red-300"
                >
                  {unsubscribingId === subscriber.id
                    ? "Unsubscribing..."
                    : "Unsubscribe"}
                </button>
              </div>
            )
          )}
        </div>
      )}

      {/* Send Broadcast Email Tab Content */}
      {activeTab === "send-broadcast" && (
        <div className="space-y-4">
          {/* Subject Field */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
            />
          </div>

          {/* Attachment Field */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Attachment{" "}
              <span className="text-gray-400">(Optional & Recommended)</span>
            </label>
            <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center block cursor-pointer">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept="*"
              />
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">
                Click to upload files or drag and drop
              </p>
              <p className="text-xs text-gray-400">
                Images, PDFs, docs, videos, Excel files (Max 50MB each)
              </p>
            </label>

            {/* Display selected files */}
            {files.length > 0 && (
              <div className="mt-2 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <span className="text-sm truncate max-w-xs">
                      {file.name}
                    </span>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message here..."
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm resize-none focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendBroadcast}
            disabled={isSending || !subject || !message}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-sm font-medium transition-colors disabled:bg-green-300 disabled:cursor-not-allowed"
          >
            {isSending ? "Sending..." : "Send Broadcast Email"}
          </button>
        </div>
      )}
    </div>
  );
}
