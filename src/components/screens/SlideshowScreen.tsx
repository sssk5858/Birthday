import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart, Sparkles, Play, Pause, ArrowRight } from "lucide-react";
import { birthdayPhotos, type BirthdayPhoto } from "../../data/photos";
import { birthdayContent } from "../../data/birthdayContent";
import { sounds } from "../../utils/audioEffects";

interface SlideshowScreenProps {
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onProceed: () => void;
}

export const SlideshowScreen: React.FC<SlideshowScreenProps> = ({
  currentIndex,
  onIndexChange,
  onProceed,
}) => {
  const [photos] = useState<BirthdayPhoto[]>(birthdayPhotos);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const total = photos.length;
  const currentPhoto = photos[currentIndex % total];

  // Auto-slide effect
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      onIndexChange((currentIndex + 1) % total);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex, total, onIndexChange]);

  const handleNext = () => {
    sounds.playTap();
    onIndexChange((currentIndex + 1) % total);
  };

  const handlePrev = () => {
    sounds.playTap();
    onIndexChange((currentIndex - 1 + total) % total);
  };

  const handleImageError = (id: string) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  const hasImageFailed = imageErrorMap[currentPhoto.id];

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto px-2 py-1 flex flex-col items-center justify-center relative z-10">
      <div className="glass-card w-full p-4 sm:p-5 flex flex-col items-center text-center relative overflow-hidden">
        {/* Top Header Badge */}
        <div className="mb-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFE4EC] text-[#E0218A] text-[10px] font-bold tracking-wide shadow-sm border border-[#FFB6C8]">
          <Sparkles className="w-3 h-3 text-[#FF5C8A]" />
          <span>MEMORIES & MOMENTS</span>
        </div>

        {/* Headings */}
        <h1 className="font-heading fluid-h1 text-[#4A2338] font-bold mb-0.5">
          {birthdayContent.slideshowScreen.heading}
        </h1>
        <p className="font-body text-[11px] text-[#87566C] mb-2 max-w-xs leading-tight">
          {birthdayContent.slideshowScreen.subheading}
        </p>

        {/* POLAROID FRAME CAROUSEL */}
        <div className="relative w-full max-w-[280px] sm:max-w-xs my-1 flex flex-col items-center">
          {/* Decorative Washi Tape */}
          <div className="w-20 h-4 bg-[#FFB6C8]/70 backdrop-blur-xs -mb-2 z-20 rounded-xs shadow-xs rotate-1" />

          {/* Polaroid Frame Card */}
          <div
            className="w-full bg-white p-2.5 sm:p-3 pb-3 rounded-2xl shadow-lg border border-rose-100 flex flex-col items-center transform transition-all duration-300"
            style={{
              transform: currentIndex % 2 === 0 ? "rotate(0.8deg)" : "rotate(-0.8deg)",
            }}
          >
            {/* Photo Viewport */}
            <div className="relative w-full aspect-[3/4] max-h-[260px] sm:max-h-[290px] rounded-xl overflow-hidden bg-gradient-to-tr from-[#FFF0F5] to-[#FFE4EC] flex items-center justify-center border border-gray-100 shadow-inner">
              {!hasImageFailed ? (
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.alt}
                  onError={() => handleImageError(currentPhoto.id)}
                  className="w-full h-full object-cover object-center transition-opacity duration-300"
                />
              ) : (
                /* Fallback Artistic Memory Card */
                <div className="p-3 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#FFE4EC] flex items-center justify-center text-2xl mb-1 shadow-xs border border-pink-200">
                    {currentPhoto.badgeEmoji || " "}
                  </div>
                  <span className="font-heading text-xs font-bold text-[#F43F78] mb-0.5">
                    Precious Moment #{currentIndex + 1}
                  </span>
                  <p className="text-[10px] text-[#87566C] leading-tight">
                    Add photos to <code>/public/images/</code> to preview real photos!
                  </p>
                </div>
              )}

              {/* Badge Emoji */}
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 backdrop-blur-xs shadow-sm flex items-center justify-center text-xs">
                {currentPhoto.badgeEmoji || "💗"}
              </div>
            </div>

            {/* Polaroid Caption */}
            <div className="mt-2 text-center px-1">
              <p className="font-heading text-xs sm:text-sm font-bold text-[#4A2338] leading-tight">
                {currentPhoto.caption}
              </p>
              <div className="mt-0.5 flex items-center justify-center gap-1 text-[10px] text-[#F43F78] font-medium">
                <Heart className="w-3 h-3 fill-[#FF5C8A] text-[#FF5C8A]" />
                <span>Memory {currentIndex + 1} of {total}</span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="w-full flex items-center justify-between mt-2.5 px-1">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous photo"
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#4A2338] shadow-sm flex items-center justify-center border border-[#FFB6C8]/60 hover:text-[#F43F78] active:scale-95 transition-transform cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1">
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sounds.playTap();
                    onIndexChange(idx);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${idx === currentIndex
                      ? "w-4 bg-[#F43F78]"
                      : "w-1.5 bg-rose-200 hover:bg-rose-300"
                    }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next photo"
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#4A2338] shadow-sm flex items-center justify-center border border-[#FFB6C8]/60 hover:text-[#F43F78] active:scale-95 transition-transform cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Autoplay Toggle Only (Add file button removed as requested) */}
          <div className="mt-2 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              className="text-[10px] text-[#87566C] hover:text-[#4A2338] flex items-center gap-1 bg-white/60 hover:bg-white px-2.5 py-0.5 rounded-full border border-rose-200 cursor-pointer shadow-xs"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isPlaying ? "Pause Slides" : "Auto Play"}</span>
            </button>
          </div>
        </div>

        {/* Final Button */}
        <div className="mt-3 flex flex-col items-center">
          <button
            type="button"
            onClick={onProceed}
            className="px-6 py-2 rounded-full text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-pink-glow transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
            style={{
              background: "linear-gradient(135deg, #FF5C8A 0%, #F43F78 100%)",
            }}
          >
            <span>{birthdayContent.slideshowScreen.nextButton}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
