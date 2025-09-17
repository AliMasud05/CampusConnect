"use client"

import type React from "react"
import { useEffect } from "react"
import { FaTimes } from "react-icons/fa"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  title: string
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl, title }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 bg-opacity-75" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl mx-4 bg-black rounded-lg overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 z-10 p-2 text-white hover:text-gray-300 transition-colors duration-200"
          aria-label="Close video"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        {/* Video Container */}
        <div className="relative aspect-video">
          <video src={videoUrl} controls autoPlay className="w-full h-full" title={title}>
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  )
}

export default VideoModal
