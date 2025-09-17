export const CourseDetailsSkeleton = () => (
  <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8 animate-pulse">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left side skeleton */}
        <div className="space-y-6">
          <div className="h-10 bg-gray-200 rounded w-3/4"></div>
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-5 h-5 bg-gray-300 rounded-full" />
            ))}
          </div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="flex items-center space-x-12">
            <div className="h-10 w-24 bg-gray-300 rounded"></div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="h-12 w-32 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Right side skeleton (image/video area) */}
        <div className="aspect-video bg-gray-200 rounded-2xl shadow-inner" />
      </div>
    </div>
  </section>
);
