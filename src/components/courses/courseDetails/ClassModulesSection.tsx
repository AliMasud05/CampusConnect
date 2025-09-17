"use client";

import { useGetCourseByIdQuery } from "@/redux/api/courseApi";
import { TModule } from "@/types/course.type";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const ClassModulesSection: React.FC = () => {
  const params = useParams();
  const { data: courseData, isLoading } = useGetCourseByIdQuery(
    params.id as string
  );

  // Initialize expandedModules as a set of strings (module IDs)
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set()
  );

  const toggleModule = (moduleId: string) => {
    const newExpandedModules = new Set(expandedModules);
    if (newExpandedModules.has(moduleId)) {
      newExpandedModules.delete(moduleId);
    } else {
      newExpandedModules.add(moduleId);
    }
    setExpandedModules(newExpandedModules);
  };

  const isExpanded = (moduleId: string) => expandedModules.has(moduleId);

  const modules = courseData?.data?.modules || [];

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-medium text-text-primary">
            Class Modules
          </h2>
        </div>

        {isLoading ? (
          <p className="text-center">Loading modules...</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {modules.map((module: TModule) => (
              <div
                key={module.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-sm"
              >
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className="cursor-pointer w-full p-6 sm:p-8 text-left"
                  aria-expanded={isExpanded(module.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                        <span className="font-bold">{module.title}</span>
                      </h3>
                    </div>
                    <div className="flex-shrink-0">
                      {isExpanded(module.id) ? (
                        <div className="rounded-full bg-[#E6E6E6] p-3">
                          <FaChevronUp className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="rounded-full bg-[#E6E6E6] p-3">
                          <FaChevronDown className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </div>
                </button>

                {/* Module Content */}
                {isExpanded(module.id) && (
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                    <div className="border-t border-gray-100 pt-6">
                      <ul className="space-y-3">
                        {module.videos?.map((video, i) => (
                          <li key={i} className="flex items-start">
                            <span className="flex-shrink-0 w-1 h-1 bg-text-primary rounded-full mt-3 mr-3"></span>
                            <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                              {video.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ClassModulesSection;
