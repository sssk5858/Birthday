import React, { useEffect } from "react";
import { Mail, Sparkles, Heart, ArrowRight } from "lucide-react";
import { birthdayContent } from "../../data/birthdayContent";
import { fireGrandCelebration, fireHeartConfetti } from "../../utils/confettiEffects";

interface CelebrationScreenProps {
  onOpenLetter: () => void;
}

export const CelebrationScreen: React.FC<CelebrationScreenProps> = ({
  onOpenLetter,
}) => {
  useEffect(() => {
    fireGrandCelebration();
    const timer = setTimeout(() => {
      fireHeartConfetti();
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto px-2 py-1 flex flex-col items-center justify-center relative z-10">
      <div className="glass-card w-full p-4 sm:p-5 flex flex-col items-center text-center relative overflow-hidden">
        {/* Animated Celebration Badge */}
        <div className="mb-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#FFE4EC] to-[#FFB6C8] text-[#E0218A] text-[10px] sm:text-xs font-extrabold tracking-wider shadow-sm border border-[#FF85A1] animate-bounce">
          <Sparkles className="w-3 h-3 text-[#FFD166]" />
          <span>TIME TO CELEBRATE OUR QUEEN</span>
          <Sparkles className="w-3 h-3 text-[#FFD166]" />
        </div>

        {/* Grand Headline */}
        <h1 className="font-heading fluid-h1 text-[#4A2338] font-extrabold mb-1 leading-tight">
          <span className="text-[#F43F78]">Happy Birthday</span>{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #FF1493 0%, #E0218A 50%, #9D4EDD 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {birthdayContent.name} ({birthdayContent.nickname})
          </span>{" "}
          💗🎂
        </h1>

        <p className="font-body text-[11px] sm:text-xs text-[#87566C] mb-2.5 max-w-xs leading-tight">
          {birthdayContent.celebrationScreen.subheading}
        </p>

        {/* Golden Quote Card */}
        <div
          className="mb-3 p-3 rounded-2xl max-w-xs sm:max-w-sm border shadow-sm"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 240, 245, 0.9))",
            borderColor: "rgba(255, 182, 200, 0.6)",
          }}
        >
          <p className="font-heading italic text-xs sm:text-sm text-[#4A2338] leading-snug">
            "{birthdayContent.celebrationScreen.cardQuote}"
          </p>
          <div className="mt-1 flex justify-center items-center gap-1 text-[10px] text-[#F43F78] font-bold">
            <Heart className="w-3 h-3 fill-[#FF5C8A] text-[#FF5C8A]" />
            <span>Forever Your Best Friend</span>
          </div>
        </div>

        {/* ========================================================
            HIGHLIGHTED "OPEN YOUR LETTER" LUXURY ENVELOPE CARD
            ======================================================== */}
        <div
          onClick={onOpenLetter}
          className="group relative cursor-pointer my-1 p-4 sm:p-5 rounded-2xl w-full max-w-xs sm:max-w-sm transition-all duration-300 transform hover:scale-105 active:scale-95 flex flex-col items-center select-none"
          style={{
            background: "linear-gradient(135deg, #FFFFFF 0%, #FFF0F5 50%, #FFE4EC 100%)",
            border: "1.5px solid #FF5C8A",
            boxShadow: "0 8px 22px rgba(244, 63, 120, 0.2), 0 0 15px rgba(255, 182, 200, 0.3)",
          }}
        >
          {/* Shimmering Badge */}
          <div className="mb-2 px-2.5 py-0.5 rounded-full bg-[#FF5C8A] text-white text-[9px] font-extrabold tracking-wider uppercase shadow-xs flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-[#FFD166]" />
            <span>SPECIAL MESSAGE INSIDE</span>
            <Sparkles className="w-2.5 h-2.5 text-[#FFD166]" />
          </div>

          {/* Luxury Envelope Graphic */}
          <div className="relative mb-2">
            <div
              className="w-16 h-13 sm:w-18 sm:h-14 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300"
              style={{
                background: "linear-gradient(135deg, #FFE4EC 0%, #FFB6C8 100%)",
                border: "1.5px solid #FFFFFF",
              }}
            >
              <Mail className="w-8 h-8 sm:w-9 sm:h-9 text-[#E0218A]" />
            </div>

            {/* Glowing Wax Seal */}
            <div
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-serif font-bold shadow-xs border border-white animate-pulse"
              style={{
                background: "linear-gradient(135deg, #FF1493 0%, #C71585 100%)",
              }}
            >
              P
            </div>
          </div>

          {/* CTA Title */}
          <h2 className="font-heading text-sm sm:text-base font-extrabold mb-0.5 text-[#E0218A]">
            {birthdayContent.celebrationScreen.openLetterButton}
          </h2>

          <p className="text-[10px] text-[#87566C] font-medium mb-2">
            A handwritten note just for you... 💌
          </p>

          {/* Button */}
          <div
            className="px-4 py-1.5 rounded-full text-white font-bold text-xs shadow-xs flex items-center gap-1.5 group-hover:shadow-pink-glow transition-all"
            style={{
              background: "linear-gradient(135deg, #FF5C8A 0%, #F43F78 50%, #E0218A 100%)",
            }}
          >
            <span>Read Letter</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Confetti button */}
        <button
          type="button"
          onClick={() => fireHeartConfetti()}
          className="mt-3 text-[11px] text-[#F43F78] hover:text-[#4A2338] font-bold underline-offset-2 hover:underline cursor-pointer flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3 text-[#FFD166]" />
          <span>More celebration confetti! 🎉</span>
        </button>
      </div>
    </div>
  );
};
