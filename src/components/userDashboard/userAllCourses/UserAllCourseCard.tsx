"use client"

import type React from "react"
import { FaArrowRight } from "react-icons/fa"

interface UserCourseCardProps {
  id: number
  courseName: string
  enrollmentDate: string
  onGoToCourse: (id: number) => void
}

const UserAllCourseCard: React.FC<UserCourseCardProps> = ({ id, courseName, enrollmentDate, onGoToCourse }) => {
  const handleGoToCourse = () => {
    onGoToCourse(id)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-sm transition-shadow duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-7">
        {/* Course Information */}
        <div className="flex-1 space-y-3">
          {/* Course Name */}
          <div>
            <p className="text-gray-600 text-sm mb-1">Course name :</p>
            <h3 className="text-gray-900 font-semibold text-base leading-tight">{courseName}</h3>
          </div>

          {/* Enrollment Date */}
          <div>
            <p className="text-gray-600 text-sm mb-1">Enrollment Date :</p>
            <p className="text-gray-900 font-semibold text-base">{enrollmentDate}</p>
          </div>
        </div>

        {/* Go to Course Button */}
        <div className="flex-shrink-0 md:ml-6">
          <button
            onClick={handleGoToCourse}
            className="cursor-pointer inline-flex items-center bg-primary hover:bg-primary/80 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
          >
            Go to Course
            <FaArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserAllCourseCard
