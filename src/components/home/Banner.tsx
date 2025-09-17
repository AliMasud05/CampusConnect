interface BannerProps {
  image: string;
  children: React.ReactNode;
}
const Banner = ({ image, children }: BannerProps) => {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="lg:h-[500px]"
    >
      {children}
    </div>
  );
};

export default Banner;
