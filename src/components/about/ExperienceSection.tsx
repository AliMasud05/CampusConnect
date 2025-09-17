import type React from "react"

import customIcon from "@/assets/about/icons/customIcon.svg"
import Image from "next/image"

interface ExperienceItem {
  company: string
  period: string
  position: string
  responsibilities: string[]
}

const experienceData: ExperienceItem[] = [
  {
    company: "AEconversion GmbH & Co. KG.",
    period: "8/2022 - today",
    position: "Power Electronics Engineer",
    responsibilities: [
      "Software development for custom power electronics systems",
      "Control system design for Power electronics converters",
      "C programming and model based design",
    ],
  },
  {
    company: "Emsiso d.o.o",
    period: "1/2021 - 8/2022",
    position: "Embedded System Engineer",
    responsibilities: [
      "Software development for home appliance and automotive devices",
      "Motor control system design for Washing Machine",
      "C programming and model based design",
    ],
  },
  {
    company: "Mahle Electric Drives Slovenia d.o.o.",
    period: "8/2018 - 1/2021",
    position: "Embedded System Engineer",
    responsibilities: [
      "Software development for electrically driven auxiliaries in automotive industry (ECF, water and oil pumps)",
      "Motor control system design",
      "C and assembly programming",
    ],
  },
  {
    company: "TECES",
    period: "10/2017 - 8/2018",
    position: "Embedded System Engineer",
    responsibilities: [
      "Software development for highly efficient solar micro inverter with advanced control and switching topology",
      "C and assembly programming",
    ],
  },
  {
    company: "GlobalLogic d.d",
    period: "7/2016 - 9/2017",
    position: "Junior Software Developer",
    responsibilities: [
      "Software development for telecommunication industry",
      "Software development for smart house",
      "Java and C programming",
    ],
  },
];

const ExperienceSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-semi-bold text-text-secondary mb-8">Experience</h2>
        </div>

        {/* Experience Timeline Container */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="relative">
            {/* Experience Items */}
            <div className="space-y-8 lg:space-y-10">
              {experienceData.map((item, index) => (
                <div key={index} className="relative flex items-start space-x-4 sm:space-x-6">
                  {/* Timeline Dot */}
                  <div className="flex-shrink-0 relative z-10">
                    <Image src={customIcon} alt="custom icon" className="pt-2" height={14} width={14} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Company Name */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{item.company}</h3>

                    {/* Period and Position */}
                    <div className="text-sm sm:text-base text-gray-600 mb-3 space-y-1">
                      <div className="font-medium">{item.period}</div>
                      <div className="font-medium">{item.position}</div>
                    </div>

                    {/* Vertical Line for Mobile */}
                    <div className="border-l-2 border-gray-200 pl-4 sm:pl-0 sm:border-l-0">
                      {/* Responsibilities */}
                      <ol className="space-y-2 text-sm sm:text-base text-gray-700">
                        {item.responsibilities.map((responsibility, respIndex) => (
                          <li key={respIndex} className="flex items-start">
                            <span className="font-medium text-text-primary mr-2 flex-shrink-0">{respIndex + 1}.</span>
                            <span className="leading-relaxed">{responsibility}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
