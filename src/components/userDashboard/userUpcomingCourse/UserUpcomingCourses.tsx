import { EnrollmentWithCourse } from "@/types/EnrollmentWithCourse";

interface UserUpcomingCoursesProps {
  enrollments: EnrollmentWithCourse[];
}

export default function UserUpcomingCourses({
  enrollments,
}: UserUpcomingCoursesProps) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 max-w-5xl">
      {enrollments.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500">
            You don&apos;t have any upcoming courses.
          </p>
        </div>
      ) : (
        enrollments.map((enrollment) => (
          <div
            key={enrollment.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {enrollment.course.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {enrollment.course.subtitle}
              </p>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Release Date:</span>{" "}
                  {enrollment.course.releaseDate
                    ? new Date(
                        enrollment.course.releaseDate
                      ).toLocaleDateString()
                    : "To be announced"}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-medium">Enrolled On:</span>{" "}
                  {new Date(enrollment.enrolledAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
    </div>
  );
}
