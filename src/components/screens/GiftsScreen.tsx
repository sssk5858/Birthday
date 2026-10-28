import React from "react";
import { Gift, Heart, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { birthdayContent } from "../../data/birthdayContent";
import { fireHeartConfetti, fireMiniSparkle } from "../../utils/confettiEffects";

interface GiftsScreenProps {
  openedGifts: number[];
  onOpenGift: (index: number) => void;
  onProceed: () => void;
}

interface GiftCardData {
  id: number;
  label: string;
  surpriseTitle: string;
  surpriseMessage: string;
}

const GIFT_DATA: GiftCardData[] = [
  {
    id: 0,
    label: "Surprise #1",
    surpriseTitle: "Precious Smile 🌸",
    surpriseMessage: "Your smile brightens any day!",
  },
  {
    id: 1,
    label: "Surprise #2",
    surpriseTitle: "Pure Gold Heart 💖",
    surpriseMessage: "One of the kindest souls ever.",
  },
  {
    id: 2,
    label: "Surprise #3",
    surpriseTitle: "Endless Joy ✨",
    surpriseMessage: "May every wish come true!",
  },
  {
    id: 3,
    label: "Surprise #4",
    surpriseTitle: "Queen Pandi 👑",
    surpriseMessage: "Stay cute, crazy, & wonderful!",
  },
];

export const GiftsScreen: React.FC<GiftsScreenProps> = ({
  openedGifts,
  onOpenGift,
  onProceed,
}) => {
  const allOpened = openedGifts.length === 4;

  const handleBoxClick = (index: number, e: React.MouseEvent) => {
    if (openedGifts.includes(index)) return;

    // Trigger sparkle at click coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    fireMiniSparkle(x, y);

    onOpenGift(index);

    if (openedGifts.length === 3) {
      setTimeout(() => {
        fireHeartConfetti();
      }, 300);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-2 py-1 flex flex-col items-center justify-center relative z-10">
      <div className="glass-card w-full p-4 sm:p-6 flex flex-col items-center text-center">
        {/* Top Floating Badge */}
        <div className="mb-1.5 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFE4EC] text-[#E0218A] text-[10px] sm:text-xs font-bold tracking-wide shadow-xs border border-[#FFB6C8]">
          <Gift className="w-3.5 h-3.5 text-[#FF5C8A]" />
          <span>FOUR MYSTERY BOXES</span>
        </div>

        {/* Headings */}
        <h1 className="font-heading fluid-h1 text-[#4A2338] font-bold mb-0.5">
          {birthdayContent.giftsScreen.heading}
        </h1>
        <p className="font-body text-[11px] sm:text-xs text-[#87566C] mb-2 max-w-xs leading-tight">
          {birthdayContent.giftsScreen.supportingText}
        </p>

        {/* Counter Pill */}
        <div className="mb-3 px-3 py-0.5 rounded-full bg-white/90 border border-[#FFB6C8] text-[11px] font-semibold text-[#87566C] shadow-xs flex items-center gap-1.5">
          <span>Unlocked:</span>
          <span className="text-[#F43F78] font-bold">
            {openedGifts.length} of 4
          </span>
          {allOpened && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 inline" />}
        </div>

        {/* 2x2 Grid with comfortable height and clean spacing */}
        <div className="gifts-grid-2x2">
          {GIFT_DATA.map((gift) => {
            const isOpened = openedGifts.includes(gift.id);

            return (
              <div
                key={gift.id}
                onClick={(e) => handleBoxClick(gift.id, e)}
                className={`gift-card-interactive ${isOpened ? "opened" : ""}`}
              >
                {/* Corner Status Pill */}
                <div className="absolute top-2 right-2 z-10">
                  {isOpened ? (
                    <span className="w-5 h-5 rounded-full bg-[#FF5C8A] text-white flex items-center justify-center text-[10px] shadow-xs font-bold">
                      ✓
                    </span>
                  ) : (
                    <span className="w-5 h-5 rounded-full bg-[#FFE4EC] text-[#F43F78] flex items-center justify-center text-[10px] font-bold border border-[#FFB6C8]">

                    </span>
                  )}
                </div>

                {isOpened ? (
                  /* REVEALED CONTENT - FULLY READABLE, NO CLIPPING */
                  <div className="flex flex-col items-center justify-center text-center gift-surprise-reveal w-full px-1">
                    <img
                      src="/images/gift_box_open.jpg"
                      alt="Gift Open"
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-contain drop-shadow-xs mb-1.5"
                    />
                    <h3 className="font-heading text-xs font-bold text-[#E0218A] mb-0.5 leading-tight">
                      {gift.surpriseTitle}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-[#87566C] font-medium leading-snug">
                      "{gift.surpriseMessage}"
                    </p>
                  </div>
                ) : (
                  /* UNOPENED GIFT BOX */
                  <div className="flex flex-col items-center justify-center text-center w-full px-1">
                    <img
                      src="/images/gift_box_closed.jpg"
                      alt="Gift Box"
                      className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-xl drop-shadow-xs mb-1.5 transition-transform duration-200 hover:scale-105"
                    />
                    <h3 className="font-heading text-xs sm:text-sm font-bold text-[#4A2338] leading-tight mb-1">
                      {gift.label}
                    </h3>
                    <span className="text-[10px] text-[#F43F78] font-bold bg-[#FFE4EC] px-2.5 py-0.5 rounded-full border border-[#FFB6C8] shadow-2xs">
                      Tap to open 🎁
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Celebration bottom action when all 4 gifts are opened */}
        {allOpened && (
          <div className="w-full flex flex-col items-center animate-fadeIn mt-2">
            <div className="mb-2 text-xs font-bold text-[#F43F78] flex items-center gap-1.5 bg-[#FFF0F5] px-3 py-1 rounded-full border border-[#FFB6C8] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
              <span>{birthdayContent.giftsScreen.allUnlockedMessage}</span>
            </div>

            <button
              type="button"
              onClick={onProceed}
              className="px-6 py-2 rounded-full text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-pink-glow transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
              style={{
                background: "linear-gradient(135deg, #FF5C8A 0%, #F43F78 50%, #E0218A 100%)",
                boxShadow: "0 6px 18px -2px rgba(244, 63, 120, 0.35)",
              }}
            >
              <Heart className="w-4 h-4 fill-white text-white" />
              <span>{birthdayContent.giftsScreen.nextButton}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
