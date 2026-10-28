import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Wind, PartyPopper, Heart, Crown } from "lucide-react";
import { birthdayContent } from "../../data/birthdayContent";
import { sounds } from "../../utils/audioEffects";
import { fireHeartConfetti, fireGrandCelebration } from "../../utils/confettiEffects";

interface CakeScreenProps {
  candleStage: number; // 0 = all 18 lit, 1 = 5 lit, 2 = all 0 lit
  onAdvanceStage: (stage: number) => void;
  onProceedToCelebration: () => void;
}

// Exactly 5 stubborn candles stay lit during stage 1 (first blow)
const STUBBORN_INDICES = [2, 6, 9, 13, 17];

export const CakeScreen: React.FC<CakeScreenProps> = ({
  candleStage,
  onAdvanceStage,
  onProceedToCelebration,
}) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [countdownPhase, setCountdownPhase] = useState<"FIRST_BLOW" | "SECOND_BLOW" | null>(null);
  const [showCountdownPopup, setShowCountdownPopup] = useState<boolean>(false);
  const [isBlowing, setIsBlowing] = useState<boolean>(false);
  const [isWiggling, setIsWiggling] = useState<boolean>(false);
  const [showStubbornModal, setShowStubbornModal] = useState<boolean>(false);

  const timerRef = useRef<number | null>(null);
  const soundTimeoutRef = useRef<number | null>(null);
  const blowTimeoutRef = useRef<number | null>(null);
  const modalTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (soundTimeoutRef.current) clearTimeout(soundTimeoutRef.current);
      if (blowTimeoutRef.current) clearTimeout(blowTimeoutRef.current);
      if (modalTimeoutRef.current) clearTimeout(modalTimeoutRef.current);
      sounds.stopMelody();
    };
  }, []);

  const startCountdown = (phase: "FIRST_BLOW" | "SECOND_BLOW") => {
    sounds.playTap();
    setCountdownPhase(phase);
    setCountdown(3);
    setShowCountdownPopup(true);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setShowCountdownPopup(false);
          setCountdown(null);
          // Execute the blow sequence with specified gaps
          if (phase === "FIRST_BLOW") {
            executeFirstBlowSequence();
          } else {
            executeSecondBlowSequence();
          }
          return null;
        }
        sounds.playTap();
        return prev - 1;
      });
    }, 1000);
  };

  // First blow sequence:
  // 1. Timer finishes -> 2 sec gap to blow (candles extinguishing)
  // 2. Blow sound effect delayed by 1.2s to match when air hits candles
  // 3. Then 3 sec gap with 5 stubborn candles visible
  // 4. Then display stubborn 5 candles popup
  const executeFirstBlowSequence = () => {
    setIsBlowing(true);
    setIsWiggling(true);

    if (soundTimeoutRef.current) clearTimeout(soundTimeoutRef.current);
    if (blowTimeoutRef.current) clearTimeout(blowTimeoutRef.current);
    if (modalTimeoutRef.current) clearTimeout(modalTimeoutRef.current);

    // Delayed blow sound so it matches when breath is actually blown
    soundTimeoutRef.current = window.setTimeout(() => {
      sounds.playBlowSound();
    }, 1200);

    // 2 second gap to blow
    blowTimeoutRef.current = window.setTimeout(() => {
      setIsBlowing(false);
      setIsWiggling(false);
      onAdvanceStage(1); // 13 candles extinguished, 5 stubborn candles burning
      setCountdownPhase(null);

      // 3 second gap before displaying the stubborn popup
      modalTimeoutRef.current = window.setTimeout(() => {
        setShowStubbornModal(true);
      }, 3000);
    }, 2000);
  };

  // Second blow sequence:
  // 1. Timer finishes -> 2 sec gap to blow
  // 2. Blow sound effect delayed by 1.2s to match properly
  // 3. All remaining 5 candles extinguished
  // 4. Play happy birthday music continuously until clicking "Celebrate" button
  const executeSecondBlowSequence = () => {
    setIsBlowing(true);
    setIsWiggling(true);

    if (soundTimeoutRef.current) clearTimeout(soundTimeoutRef.current);
    if (blowTimeoutRef.current) clearTimeout(blowTimeoutRef.current);

    // Delayed blow sound so it matches when breath is actually blown
    soundTimeoutRef.current = window.setTimeout(() => {
      sounds.playBlowSound();
    }, 1200);

    // 2 second gap to blow
    blowTimeoutRef.current = window.setTimeout(() => {
      setIsBlowing(false);
      setIsWiggling(false);
      onAdvanceStage(2); // all 18 candles blown out!
      setCountdownPhase(null);

      // Play grand celebration fanfare, fireworks confetti,
      // and continuous Happy Birthday melody until "Celebrate" is clicked!
      sounds.playCelebrationFanfare();
      fireHeartConfetti();
      fireGrandCelebration();
      sounds.playHappyBirthdayMelody(true);
    }, 2000);
  };

  const handleCelebrate = () => {
    sounds.stopMelody();
    onProceedToCelebration();
  };

  const isCandleLit = (index: number) => {
    if (candleStage === 0) return true;
    if (candleStage === 1) return STUBBORN_INDICES.includes(index);
    return false;
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto px-2 py-1 flex flex-col items-center justify-center relative z-10">
      <div className="glass-card w-full p-3.5 sm:p-5 flex flex-col items-center text-center relative overflow-hidden">
        {/* Top Header Badge */}
        <div className="mb-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFE4EC] text-[#E0218A] text-[10px] font-bold tracking-wide shadow-xs border border-[#FFB6C8]">
          <Crown className="w-3 h-3 text-[#FFD166]" />
          <span>BARBIE QUEEN'S 18TH CAKE</span>
        </div>

        {/* Headings */}
        {candleStage === 0 && (
          <>
            <h1 className="font-heading fluid-h1 text-[#4A2338] font-bold mb-0.5">
              {birthdayContent.cakeScreen.heading}
            </h1>
            <p className="font-body text-[11px] text-[#F43F78] font-semibold mb-1 max-w-xs leading-tight">
              {birthdayContent.cakeScreen.instruction}
            </p>
          </>
        )}

        {candleStage === 1 && (
          <div className="animate-fadeIn mb-1">
            <h1 className="font-heading fluid-h1 text-[#E0218A] font-bold mb-0.5">
              5 Stubborn Candles Burning! 😂
            </h1>
            <p className="font-body text-[11px] text-[#87566C] font-semibold">
              Blow harder with all your breath, Pandi! 💨
            </p>
          </div>
        )}

        {candleStage === 2 && (
          <div className="animate-fadeIn mb-1">
            <h1 className="font-heading fluid-h1 text-[#E0218A] font-bold mb-0.5 flex items-center justify-center gap-1.5">
              <PartyPopper className="w-4 h-4 text-[#FF5C8A]" />
              {birthdayContent.cakeScreen.finalSuccessTitle}
            </h1>
            <p className="font-body text-[11px] text-[#87566C] font-semibold">
              {birthdayContent.cakeScreen.finalSuccessSub}
            </p>
          </div>
        )}

        {/* ========================================================
            BARBIE CAKE (COMPACT AND FITS IN VIEWPORT)
            ======================================================== */}
        <div className={`barbie-cake-container ${isWiggling ? "animate-cake-wiggle" : ""}`}>
          {/* Tiara Badge */}
          <div className="flex items-center justify-center mb-0.5 z-30">
            <div className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#FFD166] via-[#FFF3C4] to-[#F59E0B] shadow-xs border border-white flex items-center gap-1">
              <Crown className="w-3 h-3 text-[#92400E]" />
              <span className="font-heading text-[9px] font-extrabold text-[#78350F] tracking-wider uppercase">
                18th Queen
              </span>
              <Sparkles className="w-2.5 h-2.5 text-[#B45309]" />
            </div>
          </div>

          {/* TOP TIER CANDLES (8 Candles) */}
          <div className="flex justify-center items-end gap-2 mb-0.5 z-20">
            {Array.from({ length: 8 }).map((_, idx) => {
              const candleIndex = idx;
              const lit = isCandleLit(candleIndex);
              return (
                <CompactCandle
                  key={candleIndex}
                  isLit={lit}
                  height="h-6 sm:h-7"
                  colorGradient={
                    idx % 2 === 0
                      ? "linear-gradient(180deg, #FFFFFF 0%, #FFB6C8 50%, #FF5C8A 100%)"
                      : "linear-gradient(180deg, #FFFFFF 0%, #FFF3C4 50%, #FFD166 100%)"
                  }
                />
              );
            })}
          </div>

          {/* CAKE TOP TIER */}
          <div className="barbie-tier-top">
            <div className="flex items-center gap-1.5 text-white font-heading font-extrabold text-xs drop-shadow-md">
              <span>🌸</span>
              <span className="tracking-wider">SWEET 18</span>
              <span>🌸</span>
            </div>
          </div>

          {/* LOWER TIER CANDLES (10 Candles) */}
          <div className="flex justify-center items-end gap-1.5 -mt-1.5 mb-0.5 z-20">
            {Array.from({ length: 10 }).map((_, idx) => {
              const candleIndex = 8 + idx;
              const lit = isCandleLit(candleIndex);
              return (
                <CompactCandle
                  key={candleIndex}
                  isLit={lit}
                  height="h-7 sm:h-8"
                  colorGradient={
                    idx % 3 === 0
                      ? "linear-gradient(180deg, #FFFFFF 0%, #FFB7D5 50%, #E0218A 100%)"
                      : idx % 3 === 1
                      ? "linear-gradient(180deg, #FFFFFF 0%, #FFE4EC 50%, #F43F78 100%)"
                      : "linear-gradient(180deg, #FFFFFF 0%, #FFF3C4 50%, #F59E0B 100%)"
                  }
                />
              );
            })}
          </div>

          {/* CAKE BOTTOM TIER */}
          <div className="barbie-tier-bottom">
            <div className="text-center px-3 py-0.5 rounded-xl bg-white/25 backdrop-blur-xs border border-white/40 shadow-xs">
              <span className="font-heading font-extrabold text-white text-xs tracking-wide drop-shadow-md flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-[#FFD166]" />
                Renu (Pandi) 💖
                <Sparkles className="w-3 h-3 text-[#FFD166]" />
              </span>
            </div>
          </div>

          {/* GOLD STAND */}
          <div className="barbie-gold-stand" />
          <div className="barbie-gold-pedestal" />
          <div className="barbie-gold-base" />
        </div>

        {/* CANDLE COUNT STATUS */}
        <div className="my-1.5 text-[11px] font-bold">
          {candleStage === 0 && (
            <span className="text-[#E0218A] flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
              All 18 candles glowing brightly! ✨
            </span>
          )}
          {candleStage === 1 && (
            <span className="text-amber-600 font-extrabold">
              5 stubborn candles burning! Blow harder! 😂🔥
            </span>
          )}
          {candleStage === 2 && (
            <span className="text-emerald-600 font-extrabold flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              All candles blown out! Wish locked in! 🥳💖
            </span>
          )}
        </div>

        {/* ACTION BUTTONS & BLOWING FEEDBACK */}
        <div className="mt-1 flex flex-col items-center">
          {/* Blowing indicator during the 2-second blow gap */}
          {isBlowing && (
            <div className="animate-pulse flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#FFE4EC] text-[#E0218A] text-xs font-extrabold border border-[#FFB6C8] shadow-xs">
              <Wind className="w-4 h-4 text-[#E0218A] animate-spin" />
              <span>Blowing the candles... Pffffffff! 💨</span>
            </div>
          )}

          {candleStage === 0 && !showCountdownPopup && !isBlowing && (
            <button
              type="button"
              onClick={() => startCountdown("FIRST_BLOW")}
              className="px-6 py-2.5 rounded-full text-white font-bold text-sm shadow-md hover:shadow-barbie-glow transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
              style={{
                background: "linear-gradient(135deg, #FF69B4 0%, #FF1493 50%, #E0218A 100%)",
                boxShadow: "0 6px 18px -2px rgba(224, 33, 138, 0.4)",
              }}
            >
              <Wind className="w-4 h-4 text-white animate-pulse" />
              <span>{birthdayContent.cakeScreen.blowButton}</span>
            </button>
          )}

          {candleStage === 1 && !showCountdownPopup && !showStubbornModal && !isBlowing && (
            <button
              type="button"
              onClick={() => startCountdown("SECOND_BLOW")}
              className="px-6 py-2.5 rounded-full text-white font-bold text-sm shadow-md hover:shadow-barbie-glow transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 animate-bounce"
              style={{
                background: "linear-gradient(135deg, #FF1493 0%, #E0218A 50%, #C71585 100%)",
                boxShadow: "0 6px 18px -2px rgba(224, 33, 138, 0.45)",
              }}
            >
              <Wind className="w-4 h-4 text-white" />
              <span>{birthdayContent.cakeScreen.blowAgainButton}</span>
            </button>
          )}

          {candleStage === 2 && !isBlowing && (
            <button
              type="button"
              onClick={handleCelebrate}
              className="px-6 py-2.5 rounded-full text-white font-bold text-sm shadow-md hover:shadow-barbie-glow transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 animate-pulse"
              style={{
                background: "linear-gradient(135deg, #FF69B4 0%, #FF1493 50%, #E0218A 100%)",
                boxShadow: "0 6px 18px -2px rgba(224, 33, 138, 0.4)",
              }}
            >
              <PartyPopper className="w-4 h-4 text-white" />
              <span>{birthdayContent.cakeScreen.celebrateButton}</span>
              <Heart className="w-4 h-4 fill-white" />
            </button>
          )}
        </div>
      </div>

      {/* ========================================================
          1. COUNTDOWN TIMER POPUP MODAL (3... 2... 1...)
          ======================================================== */}
      {showCountdownPopup && countdown !== null && countdown > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div
            className="w-full max-w-xs p-6 rounded-3xl text-center shadow-2xl relative border-2 border-[#FF69B4] animate-scaleIn"
            style={{
              background: "linear-gradient(145deg, #FFFFFF 0%, #FFF0F5 50%, #FFE4EC 100%)",
              boxShadow: "0 25px 60px rgba(224, 33, 138, 0.4), 0 0 35px rgba(255, 105, 180, 0.5)",
            }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF5C8A] to-[#FFD166] flex items-center justify-center mx-auto mb-2 shadow-md animate-bounce">
              <Wind className="w-6 h-6 text-white" />
            </div>

            <p className="font-heading text-xs font-bold text-[#87566C] uppercase tracking-wider mb-1">
              {countdownPhase === "FIRST_BLOW"
                ? "Close your eyes & take a deep breath... 🌬️"
                : "Gattiga oodhu Pandi! One huge breath... 💨"}
            </p>

            <div className="flex items-center justify-center my-2">
              <span className="font-heading text-6xl sm:text-7xl font-extrabold text-red-600 mr-5 pr-3 inline-block drop-shadow-sm select-none">
                {countdown}
              </span>
            </div>

            <span className="text-xs text-[#F43F78] font-bold block mt-1">
              {countdownPhase === "FIRST_BLOW" ? "Get ready to blow! 💨" : "Blow out all 5 candles! 💨💨"}
            </span>
          </div>
        </div>
      )}

      {/* ========================================================
          2. STUBBORN 5 CANDLES ALERT POPUP (AFTER 1-2 SEC GAP)
          ======================================================== */}
      {showStubbornModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div
            className="w-full max-w-xs p-5 rounded-3xl text-center shadow-2xl relative border-2 border-[#FFD166] transform animate-bounce"
            style={{
              background: "linear-gradient(145deg, #FFFDF8 0%, #FFF0F5 50%, #FFE4EC 100%)",
              boxShadow: "0 20px 50px rgba(224, 33, 138, 0.35), 0 0 30px rgba(255, 209, 102, 0.5)",
            }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF5C8A] to-[#FFD166] flex items-center justify-center mx-auto mb-2 shadow-md">
              <span className="text-2xl">😂</span>
            </div>

            <h3 className="font-heading text-base font-extrabold text-[#E0218A] mb-1">
              Still 5 Candles Left! 😭🔥
            </h3>

            {/* Telugu Quote Box */}
            <div className="p-2.5 rounded-2xl bg-amber-100/90 border border-amber-300 my-2 shadow-inner">
              <p className="font-heading text-sm sm:text-base font-extrabold text-[#B45309] leading-snug">
                "{birthdayContent.cakeScreen.firstAttemptTelugu}"
              </p>
            </div>

            <p className="font-body text-xs text-[#87566C] mb-4 leading-relaxed font-medium">
              5 stubborn candles are still burning! You need to blow harder, Pandi! 💨🎂
            </p>

            {/* Okay Button */}
            <button
              type="button"
              onClick={() => {
                sounds.playTap();
                setShowStubbornModal(false);
              }}
              className="w-full py-2.5 rounded-full text-white font-bold text-sm shadow-md hover:shadow-barbie-glow transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              style={{
                background: "linear-gradient(135deg, #FF1493 0%, #E0218A 50%, #C71585 100%)",
                boxShadow: "0 6px 16px rgba(224, 33, 138, 0.4)",
              }}
            >
              <span>Okay, I'll Blow Harder! 💨</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Compact candle item
interface CompactCandleProps {
  isLit: boolean;
  height: string;
  colorGradient: string;
}

const CompactCandle: React.FC<CompactCandleProps> = ({ isLit, height, colorGradient }) => {
  return (
    <div className="flex flex-col items-center select-none">
      <div className="h-4 flex items-end justify-center relative">
        {isLit ? (
          <div className="flame-real" />
        ) : (
          <div className="smoke-puff text-[9px] text-gray-400 select-none">
            💨
          </div>
        )}
      </div>

      <div className="w-0.5 h-1 bg-gray-800" />

      <div
        className={`w-1.5 sm:w-2 ${height} rounded-t-xs shadow-xs border border-white/60 relative overflow-hidden`}
        style={{ background: colorGradient }}
      />
    </div>
  );
};
