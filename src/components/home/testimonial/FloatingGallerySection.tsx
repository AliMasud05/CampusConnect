"use client"
import type React from "react"
import Image, { type StaticImageData } from "next/image"
import imgOne from "@/assets/home/testimonial/ImgOne.png"
import imgTwo from "@/assets/home/testimonial/ImgTwo.png"
import imgThree from "@/assets/home/testimonial/ImgThree.png"
import imgFour from "@/assets/home/testimonial/ImgFour.png"
import imgFive from "@/assets/home/testimonial/ImgFive.png"
import imgSix from "@/assets/home/testimonial/ImgSix.png"
import imgSeven from "@/assets/home/testimonial/ImgSeven.png"
import imgEight from "@/assets/home/testimonial/ImgEight.png"
import imgNine from "@/assets/home/testimonial/ImgNine.png"
import imgTen from "@/assets/home/testimonial/ImgTen.png"
import imgEleven from "@/assets/home/testimonial/ImgEleven.png"

interface ImageItem {
  src: StaticImageData
  alt: string
  className: string
}

const FloatingGallerySection: React.FC = () => {
  const images: ImageItem[] = [
    {
      src: imgOne,
      alt: "Testimonial person 1",
      className: "absolute top-20 left-0 w-32 h-40 sm:w-40 sm:h-48 lg:w-32 lg:h-36 xl:w-48 xl:h-60",
    },
    {
      src: imgNine,
      alt: "Testimonial person 9",
      className: "absolute top-48 left-0 w-32 h-32 sm:top-60 sm:w-40 sm:h-40 lg:w-32 lg:h-36 xl:top-[340px] xl:w-48 xl:h-48",
    },
    {
      src: imgTwo,
      alt: "Testimonial person 2",
      className: "absolute top-0 left-28 w-28 h-28 sm:left-44 sm:w-36 sm:h-36 lg:w-32 lg:h-36 lg:left-36 xl:left-52 xl:w-44 xl:h-44",
    },
    {
      src: imgSeven,
      alt: "Testimonial person 7",
      className:
        "absolute top-32 left-36 w-28 h-36 sm:top-40 sm:left-44 sm:w-36 sm:h-44 lg:w-32 lg:h-36 xl:top-48 lg:left-36 xl:left-52 xl:w-44 xl:h-52",
    },
    {
      src: imgThree,
      alt: "Testimonial person 3",
      className: "absolute top-20 left-68 w-32 h-32 sm:left-84 sm:w-40 sm:h-40 lg:w-32 lg:h-36 lg:left-72 xl:left-100 xl:w-48 xl:h-48",
    },
    {
      src: imgFour,
      alt: "Testimonial person 4",
      className: "absolute top-0 left-104 w-28 h-36 sm:left-128 sm:w-36 sm:h-44 lg:w-32 lg:h-36 lg:left-108 xl:left-152 xl:w-44 xl:h-52",
    },
    {
      src: imgFive,
      alt: "Testimonial person 5",
      className: "absolute top-20 left-136 w-32 h-40 sm:left-168 sm:w-40 sm:h-48 lg:w-32 lg:h-36 lg:left-144 xl:left-200 xl:w-48 xl:h-56",
    },
    {
      src: imgSix,
      alt: "Testimonial person 6",
      className: "absolute top-0 left-172 w-28 h-28 sm:left-212 sm:w-36 sm:h-36 lg:w-32 lg:h-36 lg:left-180 xl:left-252 xl:w-44 xl:h-44",
    },
    {
      src: imgEight,
      alt: "Testimonial person 8",
      className:
        "absolute top-32 left-172 w-28 h-32 sm:top-40 sm:left-212 sm:w-36 sm:h-40 lg:w-32 lg:h-36 lg:left-180 xl:top-48 xl:left-252 xl:w-44 xl:h-48",
    },
    {
      src: imgTen,
      alt: "Testimonial person 10",
      className: "absolute top-20 left-204 w-32 h-40 sm:left-252 sm:w-44 sm:h-48 lg:w-32 lg:h-36 lg:left-215 xl:left-300 xl:w-48 xl:h-56",
    },
    {
      src: imgEleven,
      alt: "Testimonial person 11",
      className:
        "absolute top-64 left-204 w-32 h-32 sm:top-52 sm:left-252 sm:w-40 sm:h-40 lg:w-32 lg:h-36 lg:left-215 xl:top-[330px] lg:top-[240px] xl:left-300 xl:w-48 xl:h-48",
    },
  ]

  return (
    <div className="hidden lg:block relative container mx-auto py-24 overflow-hidden">
      <div className="relative">
        <div className="relative h-96 sm:h-[500px] lg:h-[350px] xl:h-[450px]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`${image.className} transform transition-transform duration-300 hover:scale-105 hover:z-10`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover rounded-2xl shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FloatingGallerySection
