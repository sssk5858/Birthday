import React, { useMemo } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";
import type { ScreenType } from "../hooks/useBirthdayJourney";

interface BackgroundEffectsProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  currentScreen?: ScreenType;
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({
  soundEnabled,
  onToggleSound,
}) => {
  // Generate stable floating hearts
  const floatingElements = useMemo(() => {
    const emojis = ["💖", "💗", "🌸", "✨", "💕", "🌷", "🍰", "🤍"];
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: `${(i * 4.6 + (i % 3) * 2.2) % 96}%`,
      animationDuration: `${12 + ((i * 3.7) % 14)}s`,
      animationDelay: `${-(i * 1.8)}s`,
      targetOpacity: (0.25 + (i % 5) * 0.12).toFixed(2),
      size: `${14 + (i % 4) * 8}px`,
      targetRotate: `${((i * 19) % 60) - 30}deg`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Dreamy Ambient Gradient Orbs */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(255,20,147,0.6) 0%, rgba(255,105,180,0) 70%)",
        }}
      />
      <div
        className="absolute top-1/3 -right-32 w-96 h-96 rounded-full blur-3xl opacity-45"
        style={{
          background: "radial-gradient(circle, rgba(224,33,138,0.55) 0%, rgba(255,182,200,0) 70%)",
        }}
      />
      <div
        className="absolute -bottom-24 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(244,63,120,0.6) 0%, rgba(255,92,138,0) 70%)",
        }}
      />

      {/* Floating Hearts & Sparkles */}
      {floatingElements.map((item) => (
        <span
          key={item.id}
          className="absolute block select-none pointer-events-none"
          style={
            {
              left: item.left,
              bottom: "-40px",
              fontSize: item.size,
              animation: `floatUp ${item.animationDuration} infinite linear ${item.animationDelay}`,
              "--target-opacity": item.targetOpacity,
              "--target-rotate": item.targetRotate,
            } as React.CSSProperties
          }
        >
          {item.emoji}
        </span>
      ))}

      {/* Neatly Positioned Top Header Bar */}
      <div className="absolute top-3 sm:top-4 left-0 right-0 w-full max-w-sm sm:max-w-md mx-auto px-4 flex items-center justify-between pointer-events-auto z-30">
        {/* For Renu Brand Pill */}
        <div className="glass-card-sm px-3 py-1 flex items-center gap-1.5 text-[11px] font-semibold text-[#87566C] shadow-xs">
          <Sparkles className="w-3 h-3 text-[#FF5C8A] animate-spin" style={{ animationDuration: "6s" }} />
          <span className="font-heading tracking-wide">For Renu 💗</span>
        </div>

        {/* Sound Toggle Button */}
        <button
          onClick={onToggleSound}
          type="button"
          aria-label={soundEnabled ? "Mute audio" : "Enable audio"}
          className="glass-card-sm px-3 py-1 flex items-center gap-1.5 text-[11px] font-semibold text-[#4A2338] hover:text-[#F43F78] transition-transform active:scale-95 cursor-pointer shadow-xs"
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            border: "1px solid rgba(255, 182, 200, 0.5)",
          }}
        >
          {soundEnabled ? (
            <>
              <Volume2 className="w-3 h-3 text-[#FF5C8A] animate-pulse" />
              <span>Sound ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3 h-3 text-gray-400" />
              <span className="text-gray-500">Muted</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
