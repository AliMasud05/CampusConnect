import Link from "next/link"
import type React from "react"

const PrivacyPolicySection: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Main Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-4xl text-text-primary mb-8">Privacy Policy</h1>
        </div>

        {/* Content */}
        <div className="lg:w-[80%] mx-auto space-y-12 text-text-primary">
          {/* Introduction */}
          <div>
            <p className="text-base sm:text-lg leading-relaxed">
              This website respects your privacy and does not collect unnecessary personal data. Here&apos;s what you should
              know:
            </p>
          </div>

          {/* What We Collect */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-medium text-text-primary">What We Collect:</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-text-primary mr-3 flex-shrink-0">1.</span>
                <p className="text-base sm:text-lg leading-relaxed">
                  Name and email address (only when you contact me or register for a course)
                </p>
              </div>
              <div className="flex items-center">
                <span className="text-text-primary mr-3 flex-shrink-0">2.</span>
                <p className="text-base sm:text-lg leading-relaxed">
                  Basic analytics (page visits, country, time on page)
                </p>
              </div>
            </div>
          </div>

          {/* How It's Used */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-medium text-text-primary">How It&apos;s Used:</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-text-primary mr-3 flex-shrink-0">1.</span>
                <p className="text-base sm:text-lg leading-relaxed">
                  To send you course updates or reply to your messages
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-text-primary mr-3 flex-shrink-0">2.</span>
                <p className="text-base sm:text-lg leading-relaxed">
                  To understand how people use the site and improve it
                </p>
              </div>
            </div>
          </div>

          {/* What We Don't Do */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-medium text-text-primary">What We Don&apos;t Do:</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-text-primary mr-3 flex-shrink-0">1.</span>
                <p className="text-base sm:text-lg leading-relaxed">We do not sell or share your data</p>
              </div>
              <div className="flex items-start">
                <span className="text-text-primary mr-3 flex-shrink-0">2.</span>
                <p className="text-base sm:text-lg leading-relaxed">
                  We do not store any payment information (payments are handled securely via Stripe or PayPal)
                </p>
              </div>
            </div>
          </div>

          {/* Data Removal */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-medium text-text-primary">Data Removal:</h2>
            <p className="text-base sm:text-lg leading-relaxed">
              You can request to have your data deleted at any time by contacting me directly.
            </p>
          </div>

          {/* Cookies & Tracking */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-medium text-text-primary">Cookies & Tracking</h2>
            <p className="text-base sm:text-lg leading-relaxed">
              We use cookies to improve site performance and personalize your experience.
            </p>
          </div>

          {/* Contact Section */}
          <div className="text-center pt-28 pb-6">
            <h2 className="text-xl sm:text-2xl font-medium text-text-primary mb-4">Contact for privacy concerns:</h2>
            <Link
              href="mailto:contact@hk-academy.com"
              className="inline-flex items-center text-text-primary underline text-base sm:text-lg font-medium transition-colors duration-200"
            >
              📧 contact@hk-academy.com
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PrivacyPolicySection
