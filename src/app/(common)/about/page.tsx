import AboutMe from "@/components/about/AboutMe";
import AboutSection from "@/components/about/AboutSection";
import ExperienceSection from "@/components/about/ExperienceSection";
import BannerSection from "@/components/shared/BannerSection";


const AboutPage = () => {
  return (
    <div>
      <BannerSection
        title="Crafting Real-World"
        titleBottom="Skills Through Real"
        subtitle="— Haris Kovačević"
      />

      <AboutSection />
      <AboutMe />
      <ExperienceSection />
    </div>
  );
};

export default AboutPage;