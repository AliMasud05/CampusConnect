"use client"

import type React from "react"

interface UserCourseCardProps {
  id: number
  courseName: string
  enrollmentDate: string
}

const UserUpCourseCard: React.FC<UserCourseCardProps> = ({ id, courseName, enrollmentDate }) => {
 console.log(id,"id from card")

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
        <div className="flex-shrink-0 md:ml-6 bg-secondary rounded-2xl px-4 py-1 text-primary">
          <p className="text-center">Coming Soon</p>
        </div>
      </div>
    </div>
  )
}

export default UserUpCourseCard
