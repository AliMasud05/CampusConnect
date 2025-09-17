import type React from "react"

interface ProcessCardProps {
  title: string
  subtitle?: string
  hasArrow?: boolean
}

const ProcessCard: React.FC<ProcessCardProps> = ({ title, subtitle, hasArrow = false }) => {
  return (
    <div className="border border-text-primary/20 rounded-2xl p-6 sm:p-8 max-w-96 mx-auto">
      <div className="flex items-start space-x-4">
        {/* Bullet Point or Arrow */}
        <div className="flex-shrink-0 mt-1">
          {hasArrow ? (
            <div className="w-4 h-6 flex flex-col items-center">
              <div className="w-2 h-2 bg-text-primary rounded-full"></div>
              <div className="w-0.5 h-4 bg-gray-400"></div>
            </div>
          ) : (
            <div className="w-2 h-2 bg-text-primary rounded-full mt-2"></div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-medium text-text-primary leading-tight">
            {title}
            {subtitle && (
              <>
                <br />
                <span>{subtitle} {title === 'System Modeling & Control' && <span className="text-gray-500">(If Required)</span> }</span>
              </>
            )}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default ProcessCard
