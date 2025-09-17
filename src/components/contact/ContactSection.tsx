"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HiOutlineMail } from "react-icons/hi";
import { GrLocation } from "react-icons/gr";
import { TbMessages } from "react-icons/tb";
import { useCreateContactMutation } from "@/redux/api/contactApi"; // ✅ Import mutation
import { toast } from "sonner";
import softStar from "@/assets/about/icons/SoftStar.svg"
import Image from "next/image";

// Zod validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10).max(500),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection: React.FC = () => {
  const [createContact, { isLoading }] = useCreateContactMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        description: data.message, // API expects `description`, not `message`
      };
      await createContact(payload).unwrap();
      toast.success("Message sent successfully!");
      reset();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send message.");
    }
  };

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left side info... */}
          <div className="space-y-24">
            {/* Main Heading */}
            <div>
              <h2 className="max-w-[590px] text-3xl sm:text-4xl lg:text-4xl text-text-primary leading-tight">
                Whether you have a question about a course, want to collaborate
                on a project, or just want to say hi — my inbox is always open.
              </h2>
            </div>

            <div className="absolute top-[15%] md:top-[20%] xl:right-[30%] lg:right-[15%] md:right-[5%] right-1">
              <Image src={softStar} alt="Soft star icon" height={150} width={150} />
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start space-x-4 border-b-2 border-text-secondary/30 w-72 pb-3">
                <div className="flex-shrink-0">
                  <HiOutlineMail className="w-6 h-6 text-text-secondary mt-1" />
                </div>
                <div>
                  <p className="text-gray-700 text-base sm:text-lg">
                    contact@hk-academy.com
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4 border-b-2 border-text-secondary/30 w-72 pb-3">
                <div className="flex-shrink-0">
                  <GrLocation className="w-6 h-6 text-text-secondary mt-1" />
                </div>
                <div>
                  <p className="text-gray-700 text-base sm:text-lg">
                    Gotlandweg 135,
                  </p>
                  <p className="text-gray-700 text-base sm:text-lg">
                    59494 Soest, Germany
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <TbMessages className="w-6 h-6 text-text-secondary mt-1" />
                </div>
                <div className="space-y-1">
                  <p className="text-gray-700 text-base sm:text-lg">
                    +49 (0)15757206211
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div className="bg-white">
            <div className="space-y-8">
              <h3 className="text-2xl sm:text-3xl text-gray-900 mb-8 text-center">
                Send me a note
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-base font-medium"
                  >
                    Your Name
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    id="name"
                    className="w-full px-0 py-3 border-b-2 border-r-2 border-gray-300 focus:border-primary focus:outline-none"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-base font-medium"
                  >
                    Your Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    className="w-full px-0 py-3 border-b-2 border-r-2 border-gray-300 focus:border-primary focus:outline-none"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-gray-700 text-base font-medium"
                  >
                    Describe
                  </label>
                  <textarea
                    {...register("message")}
                    id="message"
                    rows={4}
                    className="w-full px-0 py-3 border-b-2 border-r-2 border-gray-300 focus:border-primary focus:outline-none resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="cursor-pointer w-full bg-text-secondary hover:bg-primary disabled:bg-primary/80 text-white font-semibold py-4 px-6 rounded-full transition duration-200"
                  >
                    {isLoading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
