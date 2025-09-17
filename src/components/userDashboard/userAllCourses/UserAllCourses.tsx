import { EnrollmentWithCourse } from "@/types/EnrollmentWithCourse";

interface UserAllCoursesProps {
  enrollments: EnrollmentWithCourse[];
}

export default function UserAllCourses({ enrollments }: UserAllCoursesProps) {
  console.log(enrollments, "enrollments from all courses");
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 max-w-5xl ">
        {enrollments.map((enrollment) => (
          <div
            key={enrollment.id}
            className="bg-white border py-6 rounded-lg shadow-md  overflow-hidden"
          >
            <div className="p-6 flex items-center justify-between">
              <div className="flex flex-col  gap-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {enrollment.course.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {enrollment.course.subtitle}
                </p>
                <p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      enrollment.course.status === "ONGOING"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {enrollment.course.status}
                  </span>
                </p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex flex-col gap-1 items-center">
                  <div>
                    <button
                      onClick={() => {
                        window.location.href = `/user-dashboard/my-courses/${enrollment.course.id}`;
                      }}
                      className="flex gap-1 items-center bg-[#017F00] text-white px-4 py-3 rounded-4xl cursor-pointer"
                    >
                      <span>Go to Course</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="38"
                        height="15"
                        viewBox="0 0 38 15"
                        fill="none"
                      >
                        <path
                          d="M37.2071 8.20711C37.5976 7.81658 37.5976 7.18342 37.2071 6.79289L30.8431 0.428932C30.4526 0.0384078 29.8195 0.0384078 29.4289 0.428932C29.0384 0.819457 29.0384 1.45262 29.4289 1.84315L35.0858 7.5L29.4289 13.1569C29.0384 13.5474 29.0384 14.1805 29.4289 14.5711C29.8195 14.9616 30.4526 14.9616 30.8431 14.5711L37.2071 8.20711ZM0.5 7.5V8.5H36.5V7.5V6.5H0.5V7.5Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                  </div>
                  <div>
                    {enrollment.course.status === "UPCOMING" && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Release Date:</span>{" "}
                        {enrollment.course.releaseDate
                          ? new Date(
                              enrollment.course.releaseDate
                            ).toLocaleDateString()
                          : "To be announced"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
