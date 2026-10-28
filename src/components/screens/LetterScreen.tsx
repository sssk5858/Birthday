import React, { useEffect, useState } from "react";
import { Heart, ArrowRight, Sparkles, Cake, Star, Smile } from "lucide-react";
import { sounds } from "../../utils/audioEffects";
import { fireMiniSparkle } from "../../utils/confettiEffects";

interface LetterScreenProps {
  onProceed: () => void;
}

export const LetterScreen: React.FC<LetterScreenProps> = ({ onProceed }) => {
  const [isUnfolded, setIsUnfolded] = useState<boolean>(false);

  useEffect(() => {
    sounds.playLetterOpen();
    const timer = setTimeout(() => {
      setIsUnfolded(true);
      fireMiniSparkle(0.5, 0.4);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto px-2 py-1 flex flex-col items-center justify-center relative z-10">
      <div className="glass-card w-full p-3.5 sm:p-5 flex flex-col items-center text-center relative overflow-hidden">
        {/* Top Header Badge */}
        <div className="mb-1.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFE4EC] text-[#E0218A] text-[10px] font-bold tracking-wide shadow-xs border border-[#FFB6C8]">
          <Heart className="w-3 h-3 fill-[#FF5C8A] text-[#FF5C8A]" />
          <span>A HANDWRITTEN LETTER FOR RENU</span>
        </div>

        {/* Parchment Container */}
        <div
          className={`w-full p-3.5 sm:p-4 rounded-2xl transition-all duration-500 shadow-md border text-left relative overflow-hidden ${isUnfolded ? "scale-100 opacity-100" : "scale-95 opacity-80"
            }`}
          style={{
            background: "linear-gradient(145deg, #FFFDF9 0%, #FFF5F8 50%, #FFF0F5 100%)",
            borderColor: "#FFB6C8",
          }}
        >
          {/* Decorative Postage Stamp */}
          {/* <div className="absolute top-2.5 right-2.5 w-10 h-11 border-2 border-dashed border-[#FF85A1] rounded-md flex flex-col items-center justify-center p-0.5 bg-white/90 rotate-2 shadow-xs select-none">
            <span className="text-xs">💌</span>
            <span className="text-[7px] font-extrabold text-[#E0218A] uppercase tracking-tighter">PANDI</span>
          </div> */}

          {/* Salutation */}
          <div className="pr-12 mb-2">
            <h2
              className="font-cursive text-2xl sm:text-3xl font-bold leading-none mb-0.5"
              style={{
                background: "linear-gradient(135deg, #FF1493 0%, #E0218A 50%, #9D4EDD 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Dear Renu, 💗
            </h2>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFE4EC] text-[#E0218A] text-[10px] font-bold border border-[#FFB6C8]">
              <Sparkles className="w-2.5 h-2.5 text-[#FFD166]" />
              <span>Happy Birthday to my favorite Pandi!</span>
            </div>
          </div>

          {/* ========================================================
              FOUR DISTINCT WIZARD CARDS WITH GRADIENTS & ANIMATIONS
              ======================================================== */}

          {/* Wizard 1: Warmest Wishes for New Chapter */}
          <div
            className="p-2.5 mb-2 rounded-xl transition-all duration-300 hover:scale-[1.01] shadow-2xs border-l-4 border-l-[#FF5C8A] border border-pink-100"
            style={{
              background: "linear-gradient(135deg, rgba(255, 240, 245, 0.95), rgba(255, 228, 236, 0.95))",
            }}
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <Star className="w-3.5 h-3.5 fill-[#FFD166] text-[#F59E0B]" />
              <span className="font-handwriting text-xs sm:text-[13px] font-bold text-[#E0218A]">
                Warmest Wishes for Your New Chapter 🌸
              </span>
            </div>
            <p className="font-body text-[11px] text-[#3D1A2E] leading-snug">
              I hope this new chapter brings you{" "}
              <strong className="text-[#E0218A] bg-white/70 px-1 py-0.2 rounded font-semibold">
                endless happiness
              </strong>
              ,{" "}
              <strong className="text-[#FF5C8A] bg-white/70 px-1 py-0.2 rounded font-semibold">
                beautiful memories
              </strong>
              , and{" "}
              <strong className="text-[#9D4EDD] bg-white/70 px-1 py-0.2 rounded font-semibold">
                good health
              </strong>
              .
            </p>
          </div>

          {/* Wizard 2: Special Value & Rare Presence */}
          <div
            className="p-2.5 mb-2 rounded-xl transition-all duration-300 hover:scale-[1.01] shadow-2xs border-l-4 border-l-[#F43F78] border border-rose-100"
            style={{
              background: "linear-gradient(135deg, rgba(255, 245, 240, 0.95), rgba(254, 237, 243, 0.95))",
            }}
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <Heart className="w-3.5 h-3.5 fill-[#F43F78] text-[#F43F78]" />
              <span className="font-handwriting text-xs sm:text-[13px] font-bold text-[#F43F78]">
                Never Forget How Rare You Are 💖
              </span>
            </div>
            <p className="font-body text-[11px] text-[#4A2338] leading-snug">
              You make ordinary moments feel a hundred times brighter. You are so genuinely appreciated, Pandi!
            </p>
          </div>

          {/* Wizard 3: For Every Dream Ahead */}
          <div
            className="p-2.5 mb-2 rounded-xl transition-all duration-300 hover:scale-[1.01] shadow-2xs border-l-4 border-l-[#9D4EDD] border border-purple-100"
            style={{
              background: "linear-gradient(135deg, rgba(245, 240, 255, 0.95), rgba(237, 230, 254, 0.95))",
            }}
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <Smile className="w-3.5 h-3.5 text-[#9D4EDD]" />
              <span className="font-handwriting text-xs sm:text-[13px] font-bold text-[#7B2CBF]">
                For Every Beautiful Dream Ahead ✨
              </span>
            </div>
            <p className="font-body text-[11px] text-[#4A2338] leading-snug italic">
              "May your dreams grow bigger, your worries grow smaller, and your life be filled with love."
            </p>
          </div>

          {/* Wizard 4: Playful Cake & Telugu Reminder */}
          <div
            className="p-2.5 mb-2 rounded-xl transition-all duration-300 hover:scale-[1.01] shadow-2xs border-l-4 border-l-[#F59E0B] border border-amber-200"
            style={{
              background: "linear-gradient(135deg, rgba(255, 253, 240, 0.95), rgba(254, 243, 199, 0.95))",
            }}
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <Cake className="w-3.5 h-3.5 text-[#D97706]" />
              <span className="font-handwriting text-xs sm:text-[13px] font-bold text-[#B45309]">
                Mandatory Birthday Rule: Eat lots of cake! 🎂😂
              </span>
            </div>
            <p className="font-body text-[10px] text-[#78350F] mt-0.5 font-medium leading-tight">
              Zero diet rules apply today, Pandi! Celebrate with full happiness! 😋💕
            </p>
          </div>

          {/* Wizard 5: Closing Signature & Wax Seal */}
          <div
            className="p-2.5 rounded-xl flex items-center justify-between border-l-4 border-l-[#C71585] border border-pink-100 shadow-2xs"
            style={{
              background: "linear-gradient(135deg, #FDF4FF 0%, #FCE7F3 100%)",
            }}
          >
            <div>
              <p className="font-heading text-xs font-extrabold text-[#7B2CBF]">
                Happiest 18th Birthday, Renu! 💖
              </p>
              <p className="font-handwriting text-sm text-[#F43F78] font-bold">
                With lots of love, Your Best Friend 💌
              </p>
            </div>

            <div
              className="w-8 h-8 rounded-full text-white flex items-center justify-center font-serif font-extrabold text-xs shadow-md border border-white shrink-0"
              style={{
                background: "linear-gradient(135deg, #FF1493 0%, #C71585 50%, #7209B7 100%)",
              }}
              title="Sealed with Love"
            >
              P
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-2.5 flex flex-col items-center">
          <button
            type="button"
            onClick={onProceed}
            className="px-6 py-2 rounded-full text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-pink-glow transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
            style={{
              background: "linear-gradient(135deg, #FF5C8A 0%, #F43F78 50%, #E0218A 100%)",
              boxShadow: "0 6px 16px -2px rgba(244, 63, 120, 0.35)",
            }}
          >
            <span>Next: A Special Bouquet for You 🌸</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
