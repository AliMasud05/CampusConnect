import React from 'react'

interface DashboardSubHeadingProps {
  title: string;
  declaration: string;
}

const DashboardSubHeading: React.FC<DashboardSubHeadingProps> = ({ title, declaration }) => {
  return (
    <div>
            <div className="flex items-center justify-between gap-2 mb-4">
          <div className='flex flex-col gap-2'>
            <h1 className="text-black text-2xl font-bold leading-[30px] tracking[-0.24px]
">{title}</h1>
            <p className="text-[#8C8C8C] text-sm font-normal leading-[20px] tracking[-0.14px]"
            >{declaration}</p>
          </div>

          <div className="flex items-center gap-2 border rounded-md px-3 py-2 bg-white">
            <input
              defaultValue={(function () {
                const date = new Date();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                return `${year}-${month.toString().padStart(2, "0")}`;
              })()}
              type="month"
              className="border-none focus:outline-none"
            />
          </div>
        </div>
      
    </div>
  )
}

export default DashboardSubHeading
