import HomeWrapper from "@/components/wrappers/HomeWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "",
  description: "",
};

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return <HomeWrapper>{children}</HomeWrapper>;
};

export default CommonLayout;
