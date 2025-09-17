"use client"
import VideoModal from '@/components/courses/courseDetails/VideoModal';
import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React, { useState } from 'react'
import { FaPlay } from 'react-icons/fa';

export default function DetailsCourseCard() {


    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    const title = "Power Electronics & Embedded Systems";

    const thumbnailImage =
        "https://i.ibb.co/Q319pYqw/Frame-2147225813-1.png";
    const videoUrl =
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    const instructor = "Haris Kovačević";

    const handlePlayVideo = () => {
        setIsVideoModalOpen(true);
    };

    return (
        <div>

            <div>

                <div className="md:flex items-center gap-2.5 my-[18px]">
                    <div>

                        <div className="relative">
                            <div className="relative aspect-video md:h-48 h-40 w-auto rounded-2xl overflow-hidden shadow-2xl">
                                <Image
                                    src={thumbnailImage}
                                    alt={` course preview`}
                                    fill
                                    className="object-cover"
                                    priority
                                />

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="absolute top-6 left-6 right-6">
                                        <h2 className="text-white text-xl sm:text-2xl font-bold leading-tight drop-shadow-lg">
                                            {title}
                                            <span className="block text-base sm:text-lg font-normal opacity-90">
                                                with {instructor}
                                            </span>
                                        </h2>
                                    </div>

                                    <button
                                        onClick={handlePlayVideo}
                                        className="cursor-pointer bg-white/50 backdrop-blur-md group relative w-14 h-14 bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                                        aria-label="Play course preview video"
                                    >
                                        <FaPlay className="h-5 w-5 text-gray-800 ml-1 group-hover:text-primary transition-colors duration-200" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='md:mt-0 mt-3'>
                        <p className="text-[#363636] text-xs">Class name : </p>
                        <h3 className="font-bold text-[#363636]">What is Power Electronics? Concepts & Scope</h3>

                        <p className="text-[#363636] text-xs mt-3">Total Progression :</p>
                        <p className="font-bold text-[#363636]">100%</p>

                        <div className="flex mt-4 gap-2.5">
                            <Button className="text-xs font-medium py-5 cursor-pointer px-10 text-white bg-[#017F00] hover:bg-[#017F00]/85 rounded-[40px]">Play Video</Button>
                            <Button className="text-xs font-medium py-5 cursor-pointer px-10 hover:bg-[#017F00] hover:text-white text-[#017F00] border-[#017F00] rounded-[40px]" variant="outline">Resources</Button>
                        </div>
                    </div>
                </div>

            </div>

            <VideoModal
                isOpen={isVideoModalOpen}
                onClose={() => setIsVideoModalOpen(false)}
                videoUrl={videoUrl}
                title={`${title} - Course Preview`}
            />
        </div>
    )
}
