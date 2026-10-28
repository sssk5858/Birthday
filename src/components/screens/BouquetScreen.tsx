import React from "react";
import { Sparkles, ArrowRight, Heart } from "lucide-react";
import { birthdayContent } from "../../data/birthdayContent";
import { sounds } from "../../utils/audioEffects";
import { fireMiniSparkle } from "../../utils/confettiEffects";

interface BouquetScreenProps {
  onProceed: () => void;
}

const PHRASE_STYLES = [
  {
    bg: "linear-gradient(135deg, #FFF0F5 0%, #FFE4EC 100%)",
    border: "#FFB6C8",
    textColor: "#9F1239",
    icon: "🌸",
  },
  {
    bg: "linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)",
    border: "#D8B4FE",
    textColor: "#6B21A8",
    icon: "🌷",
  },
  {
    bg: "linear-gradient(135deg, #FFFDF0 0%, #FEF3C7 100%)",
    border: "#FDE68A",
    textColor: "#92400E",
    icon: "✨",
  },
  {
    bg: "linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)",
    border: "#FDA4AF",
    textColor: "#BE123C",
    icon: "💕",
  },
  {
    bg: "linear-gradient(135deg, #FDF4FF 0%, #F5D0FE 100%)",
    border: "#F0ABFC",
    textColor: "#86198F",
    icon: "👑",
  },
  {
    bg: "linear-gradient(135deg, #FFF0F6 0%, #FCE7F3 100%)",
    border: "#F472B6",
    textColor: "#9D174D",
    icon: "💖",
  },
];

export const BouquetScreen: React.FC<BouquetScreenProps> = ({ onProceed }) => {
  const phrases = birthdayContent.bouquetScreen.phrases;

  const handlePhraseClick = (e: React.MouseEvent) => {
    sounds.playSparkle();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    fireMiniSparkle(x, y);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto px-2 py-1 flex flex-col items-center justify-center relative z-10">
      <div className="glass-card w-full p-3.5 sm:p-5 flex flex-col items-center text-center relative overflow-hidden">
        {/* Top Header Badge */}
        <div className="mb-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFE4EC] text-[#E0218A] text-[10px] font-bold tracking-wide shadow-xs border border-[#FFB6C8]">
          <Sparkles className="w-3 h-3 text-[#FF5C8A]" />
          <span>A SPECIAL BOUQUET FOR RENU</span>
          <Sparkles className="w-3 h-3 text-[#FFD166]" />
        </div>

        {/* Headings */}
        <h1 className="font-heading fluid-h1 text-[#4A2338] font-bold mb-0.5">
          {birthdayContent.bouquetScreen.heading}
        </h1>
        <p className="font-body text-[11px] sm:text-xs text-[#87566C] mb-2 max-w-xs leading-tight">
          {birthdayContent.bouquetScreen.subheading}
        </p>

        {/* ========================================================
            FLOWER_BOUQUET.JPG WITH SURROUNDING GRADIENT PHRASES
            ======================================================== */}
        <div className="relative w-full flex flex-col items-center my-0.5">
          {/* Top Phrases */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-1">
            {phrases.slice(0, 2).map((phrase, idx) => {
              const style = PHRASE_STYLES[idx % PHRASE_STYLES.length];
              return (
                <div
                  key={idx}
                  onClick={handlePhraseClick}
                  className="rounded-full px-3 py-1 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer transition-transform hover:scale-105 active:scale-95 border"
                  style={{
                    background: style.bg,
                    borderColor: style.border,
                  }}
                >
                  <span className="text-[11px]">{style.icon}</span>
                  <span
                    className="font-handwriting text-xs sm:text-[13px] font-bold leading-tight"
                    style={{ color: style.textColor }}
                  >
                    {phrase}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Central Flower Bouquet Image: flower_bouquet.jpg */}
          <div
            onClick={handlePhraseClick}
            className="relative cursor-pointer my-1 group"
            title="Tap the flowers for magic sparkles! ✨"
          >
            {/* Soft Ambient Glow */}
            <div className="absolute inset-0 rounded-full blur-md bg-gradient-to-tr from-[#FF85A1]/30 to-[#FFD166]/25 -z-10" />

            <img
              src="/images/flower_bouquet.jpg"
              alt="Rose Bouquet Centerpiece"
              className="w-20 h-20 sm:w-18 sm:h-18 object-cover rounded-xl shadow-sm border-2 border-white/90 transition-transform duration-300 group-hover:scale-105 active:scale-95"
            />
          </div>

          {/* Middle/Side Phrases */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-1.5 my-1">
            {phrases.slice(2, 4).map((phrase, idx) => {
              const style = PHRASE_STYLES[(idx + 2) % PHRASE_STYLES.length];
              return (
                <div
                  key={idx}
                  onClick={handlePhraseClick}
                  className="rounded-full px-3 py-1 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer transition-transform hover:scale-105 active:scale-95 border"
                  style={{
                    background: style.bg,
                    borderColor: style.border,
                  }}
                >
                  <span className="text-[11px]">{style.icon}</span>
                  <span
                    className="font-handwriting text-xs sm:text-[13px] font-bold leading-tight"
                    style={{ color: style.textColor }}
                  >
                    {phrase}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bottom Phrases */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-0.5">
            {phrases.slice(4, 6).map((phrase, idx) => {
              const style = PHRASE_STYLES[(idx + 4) % PHRASE_STYLES.length];
              return (
                <div
                  key={idx}
                  onClick={handlePhraseClick}
                  className="rounded-full px-3 py-1 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer transition-transform hover:scale-105 active:scale-95 border"
                  style={{
                    background: style.bg,
                    borderColor: style.border,
                  }}
                >
                  <span className="text-[11px]">{style.icon}</span>
                  <span
                    className="font-handwriting text-xs sm:text-[13px] font-bold leading-tight"
                    style={{ color: style.textColor }}
                  >
                    {phrase}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-2 flex flex-col items-center">
          <button
            type="button"
            onClick={onProceed}
            className="px-6 py-2 rounded-full text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-pink-glow transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
            style={{
              background: "linear-gradient(135deg, #FF5C8A 0%, #F43F78 50%, #E0218A 100%)",
              boxShadow: "0 6px 16px -2px rgba(244, 63, 120, 0.35)",
            }}
          >
            <Heart className="w-3.5 h-3.5 fill-white text-white" />
            <span>{birthdayContent.bouquetScreen.nextButton}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
