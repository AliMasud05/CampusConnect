import HowProcessWorks from "@/components/serviceDetails/softwareDevlopment/HowProcessWorks";
import LetsBuild from "@/components/serviceDetails/softwareDevlopment/LetsBuild";
import BannerSectionThree from "@/components/shared/BannerSectionThree";
import React from "react";

export default function SoftwareDevelopmentPage() {
  return (
    <div>
      <BannerSectionThree
        heading="SOFTWARE DEVELOPMENT"
        title="Intelligent Firmware for Intelligent Hardware"
        subtitle="My work lives inside devices — controlling motors, managing power, and running on real hardware with strict timing, safety, and precision requirements."
        buttonText="Contact me"
        buttonLink="/contact"
        titleBreak={true}
      />

      <LetsBuild />
      <HowProcessWorks />
    </div>
  );
}
