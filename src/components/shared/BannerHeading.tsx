import React from "react";

interface BannerHeadingProps {
  heading: string;
  subHeading: string;
}

const BannerHeading = ({ heading, subHeading }: BannerHeadingProps) => {
  return (
    <div className="  lg:max-w-[726px] md:max-w-[500px] max-w-[280px] mb-5 lg:mb-0">
      <h1 className="text-white lg:text-7xl text-xl font-semibold lg:leading-[90px] lg:tracking-[-1.44px] mb-2">
        {heading}
      </h1>
      <p className="text-white lg:text-[20px] lg:font-normal text-sm lg:leading-[36px]">{subHeading}</p>
    </div>
  );
};

export default BannerHeading;
