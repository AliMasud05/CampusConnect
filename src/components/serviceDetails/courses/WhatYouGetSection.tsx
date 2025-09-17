import type React from "react"
import Image, { StaticImageData } from "next/image"

import one from "@/assets/serviceDetails/courses/icons/One.png"
import two from "@/assets/serviceDetails/courses/icons/Two.png"
import three from "@/assets/serviceDetails/courses/icons/Three.png"

interface FeatureItem {
  id: number
  icon: StaticImageData
  title: string
  subtitle: string
  alt: string
}

const featuresData: FeatureItem[] = [
  {
    id: 1,
    icon: one,
    title: "Lifetime access to HD",
    subtitle: "video lessons",
    alt: "Laptop with play button and graduation cap icon",
  },
  {
    id: 2,
    icon: two,
    title: "Code files, circuit",
    subtitle: "diagrams & downloads",
    alt: "Code files, circuit diagrams and hand icon",
  },
  {
    id: 3,
    icon: three,
    title: "Practical quizzes",
    subtitle: "and project tasks",
    alt: "Checklist and calculator icon",
  },
]

const WhatYouGetSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-medium text-text-primary leading-tight">
            What You&apos;ll{" "}
            <span className="relative text-text-secondary">
              Get
              <svg
                className="absolute -bottom-2 left-0 w-full h-3"
                viewBox="0 0 100 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10C25 2 50 2 98 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {featuresData.map((feature) => (
            <div key={feature.id} className="flex flex-col items-center text-center">
              {/* Icon Container */}
              <div className="relative mb-8">
                {/* Green Circular Background */}
                <div className="relative w-40 h-40 sm:w-56 sm:h-56 lg:w-46 lg:h-46 bg-[#E6F2E6] rounded-full flex items-center justify-center">
                  {/* Icon */}
                  <div className="absolute w-28 h-28 sm:w-28 sm:h-28 lg:w-36 lg:h-33 top-14">
                    <Image
                      src={feature.icon || "/placeholder.svg"}
                      alt={feature.alt}
                      fill
                      className="object-contain"
                      priority={feature.id === 1}
                    />
                  </div>
                </div>
              </div>

              {/* Feature Text */}
              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl lg:text-xl text-text-primary  leading-tight">
                  {feature.title}
                </h3>
                <h3 className="text-lg sm:text-xl lg:text-xl text-text-primary  leading-tight">
                  {feature.subtitle}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatYouGetSection
