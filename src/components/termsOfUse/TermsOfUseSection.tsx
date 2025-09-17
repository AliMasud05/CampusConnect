import type React from "react"

const TermsOfUseSection: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Main Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-4xl text-text-primary mb-8">Terms of Use</h1>
        </div>

        {/* Content */}
        <div className="lg:w-[80%] mx-auto space-y-12 text-gray-700">
          {/* Introduction */}
          <div>
            <p className="text-base sm:text-lg leading-relaxed">
              By using this website, you agree to the following terms:
            </p>
          </div>

          {/* Personal Use Only */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-medium text-text-primary">Personal Use Only</h2>
            <div className="flex items-start">
              <span className="text-gray-700 mr-3 flex-shrink-0 pt-0.5">1.</span>
              <p className="text-base sm:text-lg leading-relaxed">
                You may use free downloads for personal or academic learning. You may not resell, redistribute, or
                modify them for commercial use without permission.
              </p>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-medium text-text-primary">Intellectual Property</h2>
            <div className="flex items-start">
              <span className="text-text-primary mr-3 flex-shrink-0 pt-0.5">1.</span>
              <p className="text-base sm:text-lg leading-relaxed">
                All content, including courses, videos, diagrams, and resources, is owned by Haris Kovačević unless
                otherwise credited. Unauthorized reproduction or distribution is prohibited.
              </p>
            </div>
          </div>

          {/* Course Access */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-medium text-text-primary">Course Access</h2>
            <div className="flex items-start">
              <span className="text-gray-700 mr-3 flex-shrink-0 pt-0.5">1.</span>
              <p className="text-base sm:text-lg leading-relaxed">
                Purchased courses come with lifetime access unless stated otherwise. Sharing course access or content is
                not permitted.
              </p>
            </div>
          </div>

          {/* Payments & Refunds */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-medium text-text-primary">Payments & Refunds</h2>
            <p className="text-base sm:text-lg leading-relaxed">
              All payments are processed securely. If you&apos;re enrolled for a wrong course and you are not watched
              lectures more than 50%, you may request a refund within 24 hours. If accepted, refund will be within 48
              hours.
            </p>
          </div>

          {/* Communication */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-medium text-text-primary">Communication</h2>
            <p className="text-base sm:text-lg leading-relaxed">
              By enrolling or subscribing, you agree to receive important updates. You can unsubscribe anytime.
            </p>
          </div>

          {/* Contact Section */}
          <div className="text-center pt-28 pb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4">
              If you have any questions about these terms, contact:
            </h2>
            <a
              href="mailto:contact@hk-academy.com"
              className="inline-flex items-center text-text-primary underline text-base sm:text-lg font-medium transition-colors duration-200"
            >
              📧 contact@hk-academy.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TermsOfUseSection
