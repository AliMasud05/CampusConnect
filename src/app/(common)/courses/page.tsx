"use client";

import CourseBanner from "@/components/courses/CourseBanner";
import CoursesSection from "@/components/courses/CoursesSection";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

export default function CoursesPage() {
  const activeTab = useSelector(
    (state: RootState) => state.coursesTab.activeTab
  );

  return (
    <div>
      {activeTab === "all" ? (
        <CourseBanner
          title="Build Real Skills."
          titleBelow="One Course at a Time."
          subtitle="Learn control systems, firmware, and power electronics from someone who builds them daily."
        />
      ) : (
        <CourseBanner
          title="Coming Soon: "
          titleBelow="Expand Your Skillset Even Further"
          subtitle="I’m currently working on several new, high-impact courses based on real industry needs — designed to help you advance faster and build smarter systems."
        />
      )}

      <CoursesSection />
    </div>
  );
}
