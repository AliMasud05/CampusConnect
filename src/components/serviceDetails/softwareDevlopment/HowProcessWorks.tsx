"use client"

import type React from "react"
import ProcessCard from "./ProcessCard"
import { useRouter } from "next/navigation"

interface ProcessStep {
  id: number
  title: string
  subtitle?: string
  hasArrow?: boolean
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Technical Discovery &",
    subtitle: "Requirements Definition",
    hasArrow: true,
  },
  {
    id: 2,
    title: "System Modeling & Control",
    subtitle: "Design ",
    hasArrow: true,
  },
  {
    id: 3,
    title: "Firmware Architecture",
    subtitle: "Planning",
    hasArrow: true,
  },
  {
    id: 4,
    title: "Firmware Development &",
    subtitle: "Integration",
    hasArrow: true,
  },
  {
    id: 5,
    title: "Testing & Hardware Debugging",
    hasArrow: true,
  },
]

const HowProcessWorks: React.FC = () => {
  const router = useRouter();

  const handleContactMe = () => {
    router.push("/contact");
  }

  return (
    <section className="w-full py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-medium text-text-primary leading-tight">
            How the{" "}
            <span className="relative text-text-secondary">
              Process
              <svg
                className="absolute -bottom-3 left-0 w-full h-5"
                viewBox="0 0 100 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10C25 2 50 2 98 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>{" "}
            Works
          </h2>
        </div>

        {/* Process Steps */}
        <div className="space-y-6 mb-16">
          {processSteps.map((step) => (
            <ProcessCard key={step.id} title={step.title} subtitle={step.subtitle} hasArrow={step.hasArrow} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-10 pt-16">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-text-primary leading-tight">
            Let&apos;s turn your{" "}
            <span className="relative text-text-secondary">
              vision
              <svg
                className="absolute -bottom-1 left-0 w-full h-2"
                viewBox="0 0 100 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 6C25 2 50 2 98 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>{" "}
            into a working solution.
          </h3>

          <button
            onClick={handleContactMe}
            className="cursor-pointer bg-text-secondary hover:bg-primary text-white font-semibold py-4 px-8 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Contact me
          </button>
        </div>
      </div>
    </section>
  )
}

export default HowProcessWorks
