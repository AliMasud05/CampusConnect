"use client";

import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import softStar from "@/assets/about/icons/SoftStar.svg";
import Image from "next/image";
import { BsFillQuestionCircleFill } from "react-icons/bs";

export default function Faq() {
  // FAQ data
  const faqData = [
    {
      id: 1,
      question: "Are all resources on this site free?",
      answer:
        "All of the free resources (code, models, documents) or resources within the course are completely free to download.",
    },
    {
      id: 2,
      question: "Can I use your resources in my university project or thesis?",
      answer:
        "Yes, you are free to use these resources in academic projects, provided proper credit is given where required.",
    },
    {
      id: 3,
      question: "Do I get certificates after completing your courses?",
      answer:
        "No, you will not receive a digital certificate of completion once you finish a course successfully.",
    },
    {
      id: 4,
      question: "Can I hire you for freelance or consulting work?",
      answer:
        "Absolutely! I'm available for freelance and consulting projects depending on availability and project scope.",
    },
    {
      id: 5,
      question: "What background do I need to take your courses?",
      answer:
        "Most courses are beginner-friendly, but having a basic understanding of electronics or programming is helpful.",
    },
    {
      id: 6,
      question: "Can I resell or publish your code or documents?",
      answer:
        "No, redistribution or resale of any content without explicit permission is strictly prohibited.",
    },
    {
      id: 7,
      question: "Can I track my delivery in real-time?",
      answer:
        "Yes, real-time delivery tracking is available for all physical products with an active shipping number.",
    },
  ];

  // State to track which FAQ is open
  const [openFaq, setOpenFaq] = useState(1);

  // Toggle FAQ open/close
  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? 0 : id);
  };

  return (
    <div className="container mx-auto py-20 space-y-5">
      <h2 className="text-3xl md:text-4xl font-medium text-center mb-8 text-text-primary">
        Got <span className="text-text-secondary">Questions</span>? I&apos;ve
        Got <span className="text-text-secondary">Answers</span>.
      </h2>

      <div className="absolute md:top-[20%] top-[20%] xl:top-[18%] xl:right-[40%] lg:right-[35%] md:right-[30%] right-1">
        <Image src={softStar} alt="Soft star icon" height={150} width={150} />
      </div>

      {faqData.map((faq) => (
        <div
          key={faq.id}
          className={`border ${
            openFaq === faq.id ? "border-text-secondary" : "border-slate-500"
          } rounded-lg overflow-hidden transition-all duration-300 lg:w-[80%] mx-auto`}
        >
          {/* Question Row */}
          <div
            className="flex justify-between items-center p-4 cursor-pointer gap-1"
            onClick={() => toggleFaq(faq.id)}
          >
            <div className="flex items-center justify-items-start gap-2">
              <div>
                <BsFillQuestionCircleFill
                  className="text-text-secondary"
                  height={24}
                  width={24}
                />
              </div>
              <h3 className="md:text-lg font-medium">{faq.question}</h3>
            </div>
            <div>
              <div
                className={`${
                  openFaq === faq.id
                    ? "bg-white text-text-secondary"
                    : "bg-text-secondary text-white"
                } rounded-full p-1 flex items-center justify-center w-7 h-7 border border-primary`}
              >
                {openFaq === faq.id ? (
                  <FaMinus size={14} />
                ) : (
                  <FaPlus size={14} />
                )}
              </div>
            </div>
          </div>

          {/* Answer */}
          <div
            className={`px-4 overflow-hidden transition-all duration-300 ${
              openFaq === faq.id ? "max-h-40 pb-4" : "max-h-0"
            }`}
          >
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
