"use client";

import type React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaPhone } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { IoLogoYoutube } from "react-icons/io";
import { AiOutlineGithub } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { useCreateSubscribeMutation } from "@/redux/api/subscribeApi";
import { toast } from "sonner";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
type NewsletterFormData = z.infer<typeof newsletterSchema>;

const Footer: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const [createSubscribe, { isLoading }] = useCreateSubscribeMutation();

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      await createSubscribe(data).unwrap();
      toast.success("For confirm your subscription please check your email.");
      reset();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Subscription failed. Please try again."
      );
    }
  };

  const footerLinks = [
    {
      title: "Special Links",
      links: [
        { label: "Home", href: "/" },
        { label: "Services", href: "/service-details/courses" },
        { label: "Courses", href: "/courses" },
        { label: "About", href: "/about" },
        { label: "Testimonials", href: "/testimonials" },
      ],
    },
    {
      title: "Need Help?",
      links: [
        { label: "FAQ", href: "/faq" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Policy",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of use", href: "/terms-of-use" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: <IoLogoYoutube className="w-10 h-10 text-text-primary" />,
      label: "YouTube",
      href: "https://www.youtube.com/",
    },
    {
      icon: <AiOutlineGithub className="w-10 h-10 text-text-primary" />,
      label: "GitHub",
      href: "https://github.com/",
    },
    {
      icon: <MdEmail className="w-10 h-10 text-text-primary" />,
      label: "Email",
      href: "mailto:example@gmail.com",
    },
  ];

  const phoneNumbers = ["+49 (0)15757206211"];

  return (
    <footer className="w-full bg-secondary">
      {/* Main Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Logo and Quote */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center">
              <Image src={logo} alt="Website Logo" width={68} height={80} />
            </Link>
            <blockquote className="text-gray-700 text-base leading-relaxed">
              Education is not the learning of facts, but the training of the
              mind to think{" "}
              <span className="font-medium">- Albert Einstein</span>
            </blockquote>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8 mt-0 md:mt-20 ">
            {footerLinks.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="font-semibold text-gray-900 text-lg">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-gray-600 text-base hover:text-gray-900 transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Address */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg">Address</h3>
              <div className="space-y-3">
                <p className="text-gray-600 text-base leading-relaxed">
                  Gotlandweg 135,
                  <br />
                  59494 Soest, Germany
                </p>
                <div className="space-y-2">
                  {phoneNumbers.map((phone, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <FaPhone className="w-3 h-3 text-gray-600" />
                      <span className="text-gray-600 text-base">{phone}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social + Newsletter */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="container mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="w-10 h-10 flex items-center justify-center transition-colors duration-200"
                aria-label={item.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.icon}
              </Link>
            ))}
          </div>

          {/* Newsletter */}
          <div className="flex-1 lg:max-w-md lg:ml-8 space-y-4">
            <h3 className="font-semibold text-gray-900 text-2xl">
              Subscribe Our Newsletter
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-2">
              <div className="relative flex-1">
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-5 bg-white rounded-3xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors duration-200 text-gray-900 placeholder-gray-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-2 top-2 h-12 cursor-pointer bg-text-secondary hover:bg-primary/80 disabled:bg-green-400 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 whitespace-nowrap"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container mx-auto py-4 border-t-2 border-primary/30">
        <p className="text-gray-600 text-sm">
          Copyright © 2010-2025. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
