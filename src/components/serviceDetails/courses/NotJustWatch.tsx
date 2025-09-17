import React from "react";

const NotJustWatch: React.FC = () => {
  return (
    <section className="container lg:max-w-5xl mx-auto bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="">
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full font-medium bg-bg-primary text-text-secondary">
            Courses
          </span>
        </div>
        {/* Main heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-4xl text-text-primary font-medium leading-tight">
            Courses Designed to Make You Do—{" "}
            <span className="relative text-text-secondary inline-block">
              Not Just Watch.
              <svg
                className="absolute -bottom-2 left-0 w-full h-5"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10C50 2 100 2 198 10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
        </div>

        {/* Description text */}
        <div className="text-center mb-16 space-y-4 mx-auto text-gray-600 text-base sm:text-lg leading-relaxed">
          <p>
            These are not passive video playlists. These are step-by-step
            learning journeys, built on the mindset and methods I&apos;ve used
            in actual engineering projects and client work. Build your knowledge
            the way real engineers and developers do — through hands-on, guided
            experiences that mirror the challenges of the real world.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NotJustWatch;
