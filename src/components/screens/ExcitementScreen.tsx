import React, { useState, useRef, useCallback } from "react";
import { Heart, Sparkles, PartyPopper } from "lucide-react";
import { birthdayContent } from "../../data/birthdayContent";
import { sounds } from "../../utils/audioEffects";
import { fireMiniSparkle } from "../../utils/confettiEffects";

interface ExcitementScreenProps {
  onYes: () => void;
}

export const ExcitementScreen: React.FC<ExcitementScreenProps> = ({ onYes }) => {
  const [noPosition, setNoPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [escapeCount, setEscapeCount] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const playfulTaunts = [
    "No chance, Pandi! 😂",
    "Oops! Missed me! 🏃‍♀️💨",
    "Say YES already! 💕",
    "You can't say No today! 😜",
    "Gattiga try chesina labham ledhu! 🤣",
    "Just click YES, cutie! 💖",
  ];

  const dodgeButton = useCallback(() => {
    sounds.playTap();
    setEscapeCount((prev) => prev + 1);

    const directionsY = [-45, 45, -60, 60, -75, 75, -35, 35];
    const directionsX = [-40, 40, -55, 55, 35, -35, 45, -45];

    const randomIndex = Math.floor(Math.random() * directionsY.length);
    const newY = directionsY[randomIndex];
    const newX = directionsX[randomIndex];

    setNoPosition({ x: newX, y: newY });
  }, []);

  const handleYes = () => {
    sounds.playUnlockChime();
    fireMiniSparkle(0.5, 0.5);
    onYes();
  };

  const currentTaunt = playfulTaunts[escapeCount % playfulTaunts.length];

  return (
    <div
      ref={containerRef}
      className="w-full max-w-sm sm:max-w-md mx-auto px-2 py-1 flex flex-col items-center justify-center relative z-10"
    >
      <div className="glass-card w-full p-4 sm:p-5 flex flex-col items-center text-center relative overflow-hidden">
        {/* Top Floating Badge */}
        <div className="mb-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFE4EC] text-[#F43F78] text-[10px] sm:text-xs font-bold tracking-wide shadow-sm border border-[#FFB6C8]">
          <PartyPopper className="w-3.5 h-3.5 text-[#FF5C8A]" />
          <span>IMPORTANT QUESTION</span>
        </div>

        {/* Heading */}
        <h1 className="font-heading fluid-h1 text-[#4A2338] font-extrabold mb-1 leading-tight">
          {birthdayContent.excitementScreen.heading}
        </h1>

        <p className="font-body fluid-h2 text-[#F43F78] font-bold mb-1">
          {birthdayContent.excitementScreen.question}
        </p>

        <p className="font-body text-[11px] sm:text-xs text-[#87566C] mb-4 max-w-xs leading-tight">
          {birthdayContent.excitementScreen.supportingText}
        </p>

        {/* Dynamic Taunt Bubble */}
        {escapeCount > 0 && (
          <div className="mb-3 px-3 py-1 rounded-xl bg-gradient-to-r from-[#FFF0F5] to-[#FFE4EC] border border-[#FFB6C8] text-[#F43F78] font-bold text-xs shadow-xs animate-bounce flex items-center gap-1.5">
            <span>{currentTaunt}</span>
          </div>
        )}

        {/* Buttons Area */}
        <div className="relative w-full min-h-[90px] flex items-center justify-center gap-4 sm:gap-6">
          {/* YES BUTTON */}
          <button
            type="button"
            onClick={handleYes}
            className="group relative px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-white font-bold text-sm sm:text-base shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
            style={{
              background: "linear-gradient(135deg, #FF5C8A 0%, #F43F78 100%)",
              boxShadow: "0 6px 18px -2px rgba(244, 63, 120, 0.4)",
            }}
          >
            <Heart className="w-4 h-4 fill-white text-white group-hover:scale-110 transition-transform" />
            <span>{birthdayContent.excitementScreen.yesText}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#FFD166] animate-pulse" />
          </button>

          {/* NO BUTTON */}
          <div
            className="relative transition-all duration-300 ease-out"
            style={{
              transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
            }}
          >
            <button
              type="button"
              onMouseEnter={dodgeButton}
              onTouchStart={(e) => {
                e.preventDefault();
                dodgeButton();
              }}
              onPointerDown={(e) => {
                e.preventDefault();
                dodgeButton();
              }}
              onClick={dodgeButton}
              className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/85 hover:bg-white text-[#87566C] font-semibold text-xs sm:text-sm border border-[#FFB6C8]/60 shadow-xs cursor-pointer transition-transform select-none"
            >
              {birthdayContent.excitementScreen.noText}
            </button>
          </div>
        </div>

        {/* Cute Telugu Footnote */}
        <p className="mt-3 text-[10px] text-[#87566C]/80 italic">
          Tip: You have no other choice except YES, Pandi! 😉💖
        </p>
      </div>
    </div>
  );
};
