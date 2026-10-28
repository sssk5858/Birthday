import React, { useEffect, useState } from "react";
import { Heart, RotateCcw, Sparkles, Music, Share2, Check } from "lucide-react";
import { birthdayContent } from "../../data/birthdayContent";
import { sounds } from "../../utils/audioEffects";
import { fireGrandCelebration, fireHeartConfetti } from "../../utils/confettiEffects";

interface FinalScreenProps {
  onReplay: () => void;
}

export const FinalScreen: React.FC<FinalScreenProps> = ({ onReplay }) => {
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    fireGrandCelebration();
    sounds.playHappyBirthdayMelody();

    const timer = setTimeout(() => {
      fireHeartConfetti();
    }, 1500);

    return () => {
      clearTimeout(timer);
      sounds.stopMelody();
    };
  }, []);

  const handleShare = () => {
    sounds.playTap();
    const url = window.location.href;
    const text = `Happiest Birthday, Renu (pandi)! 🎂💗 Someone made a special little surprise for you: ${url}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handlePlayMusic = () => {
    sounds.playHappyBirthdayMelody();
    fireHeartConfetti();
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto px-2 py-1 flex flex-col items-center justify-center relative z-10">
      <div className="glass-card w-full p-4 sm:p-5 flex flex-col items-center text-center relative overflow-hidden">
        {/* Animated Badge */}
        <div className="mb-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#FFE4EC] to-[#FFB6C8] text-[#E0218A] text-[10px] font-extrabold tracking-wide shadow-sm">
          <Sparkles className="w-3 h-3 text-[#FFD166]" />
          <span>FOREVER & ALWAYS</span>
          <Heart className="w-3 h-3 fill-[#F43F78]" />
        </div>

        {/* Grand Headline */}
        <h1 className="font-heading fluid-h1 text-[#4A2338] font-extrabold mb-1 leading-tight">
          <span className="text-[#F43F78]">Happy Birthday,</span>{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #FF1493 0%, #E0218A 50%, #9D4EDD 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {birthdayContent.name} ({birthdayContent.nickname})!
          </span>{" "}
          🎂
        </h1>

        {/* Featured Birthday Portrait */}
        <div className="relative my-2">
          <div className="w-25 h-25 sm:w-30 sm:h-30 rounded-2xl overflow-hidden shadow-md border-2 border-[#FF5C8A] mx-auto">
            <img
              src="/images/Renufin.jpeg"
              alt="Renu Birthday Special"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-[#FFD166] animate-spin" style={{ animationDuration: "6s" }} />
        </div>

        {/* Final Touching Message Card */}
        <div className="my-2 p-3 sm:p-4 rounded-2xl bg-white/95 border border-rose-200 shadow-sm max-w-xs sm:max-w-sm text-left">
          <div className="font-body text-[11px] sm:text-xs text-[#4A2338] leading-relaxed whitespace-pre-line space-y-2">
            {birthdayContent.finalScreen.message}
          </div>

          <div className="mt-2.5 pt-2 border-t border-rose-100 flex items-center justify-between text-[10px] text-[#87566C]">
            <span className="font-semibold text-[#F43F78]">With infinite hugs & wishes 💗</span>
            <span>Always by your side ✨</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2 w-full">
          <button
            type="button"
            onClick={handlePlayMusic}
            className="px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#4A2338] font-semibold text-[11px] border border-[#FFB6C8] shadow-xs active:scale-95 cursor-pointer flex items-center gap-1"
          >
            <Music className="w-3 h-3 text-[#FF5C8A]" />
            <span>Melody 🎵</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#4A2338] font-semibold text-[11px] border border-[#FFB6C8] shadow-xs active:scale-95 cursor-pointer flex items-center gap-1"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-500" />
                <span className="text-emerald-600">Copied! 💖</span>
              </>
            ) : (
              <>
                <Share2 className="w-3 h-3 text-[#FF5C8A]" />
                <span>Share 💌</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => fireHeartConfetti()}
            className="px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#4A2338] font-semibold text-[11px] border border-[#FFB6C8] shadow-xs active:scale-95 cursor-pointer flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-[#FFD166]" />
            <span>Celebrate 🎉</span>
          </button>
        </div>

        {/* Replay Button */}
        <div className="mt-3">
          <button
            type="button"
            onClick={onReplay}
            className="px-6 py-2.5 rounded-full text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-pink-glow transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
            style={{
              background: "linear-gradient(135deg, #FF5C8A 0%, #F43F78 100%)",
            }}
          >
            <RotateCcw className="w-4 h-4 text-white" />
            <span>{birthdayContent.finalScreen.replayButton}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
