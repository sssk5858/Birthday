import React, { useState, useEffect, useCallback } from "react";
import { Delete, HelpCircle, Sparkles } from "lucide-react";
import { birthdayContent } from "../../data/birthdayContent";
import { sounds } from "../../utils/audioEffects";
import { fireMiniSparkle } from "../../utils/confettiEffects";

interface PinScreenProps {
  onUnlock: (pin: string) => boolean;
}

const KEYPAD_NUMS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export const PinScreen: React.FC<PinScreenProps> = ({ onUnlock }) => {
  const [pin, setPin] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const targetLength = birthdayContent.pin.length;

  const handleDigit = useCallback(
    (digit: string) => {
      if (isSuccess || pin.length >= targetLength) return;
      sounds.playTap();
      setIsError(false);
      const newPin = pin + digit;
      setPin(newPin);

      if (newPin.length === targetLength) {
        const passed = onUnlock(newPin);
        if (passed) {
          setIsSuccess(true);
          fireMiniSparkle(0.5, 0.45);
        } else {
          setIsError(true);
          sounds.playTap();
          setTimeout(() => {
            setPin("");
          }, 650);
        }
      }
    },
    [pin, isSuccess, targetLength, onUnlock]
  );

  const handleDelete = useCallback(() => {
    if (isSuccess || pin.length === 0) return;
    sounds.playTap();
    setIsError(false);
    setPin((prev) => prev.slice(0, -1));
  }, [isSuccess, pin.length]);

  const handleClear = useCallback(() => {
    if (isSuccess) return;
    sounds.playTap();
    setIsError(false);
    setPin("");
  }, [isSuccess]);

  // Support physical keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleDigit(e.key);
      } else if (e.key === "Backspace") {
        handleDelete();
      } else if (e.key === "Escape") {
        handleClear();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleDigit, handleDelete, handleClear]);

  return (
    <div className="w-full max-w-sm mx-auto px-2 py-2 flex flex-col items-center justify-center relative z-10">
      <div
        className={`glass-card w-full p-4 sm:p-5 flex flex-col items-center text-center transition-all duration-300 ${
          isError ? "animate-shake border-red-300" : ""
        }`}
        style={{
          boxShadow: isSuccess
            ? "0 0 30px rgba(255, 92, 138, 0.5), 0 16px 35px rgba(244, 63, 120, 0.2)"
            : "0 16px 35px -6px rgba(74, 35, 56, 0.1), 0 0 20px rgba(255, 182, 200, 0.18)",
          border: isSuccess
            ? "2px solid #FF5C8A"
            : "1.5px solid rgba(255, 255, 255, 0.95)",
        }}
      >
        {/* Heart Lock Image Badge */}
        <div className="relative mb-2">
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-md overflow-hidden border-2 border-white ${
              isSuccess ? "scale-110" : ""
            }`}
            style={{
              boxShadow: isSuccess
                ? "0 0 20px rgba(255, 92, 138, 0.6)"
                : "0 4px 12px rgba(255, 92, 138, 0.25)",
            }}
          >
            <img
              src="/images/heart_lock.jpg"
              alt="Heart Lock"
              className="w-full h-full object-cover"
            />
          </div>
          <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-[#FFD166] animate-pulse" />
        </div>

        {/* Headings */}
        <h1 className="font-heading fluid-h1 text-[#4A2338] font-bold mb-0.5">
          {birthdayContent.pinScreen.title}
        </h1>
        <p className="font-body text-[11px] sm:text-xs text-[#87566C] mb-2.5 max-w-xs leading-tight">
          {birthdayContent.pinScreen.subheading}
        </p>

        {/* 4 Pin Slots with Glowing Heart Gems */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
          {Array.from({ length: targetLength }).map((_, idx) => {
            const isFilled = idx < pin.length;
            const isCurrent = idx === pin.length;
            return (
              <div
                key={idx}
                className={`pin-slot-capsule ${isFilled ? "filled" : ""} ${
                  isCurrent ? "active-slot" : ""
                }`}
              >
                {isFilled ? (
                  <span className="text-xl transform scale-105 transition-transform duration-200">
                    💖
                  </span>
                ) : (
                  <span className="text-rose-300 font-bold text-base select-none">
                    •
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Status Message */}
        <div className="min-h-[18px] mb-2 text-[11px] sm:text-xs font-semibold transition-all">
          {isSuccess && (
            <span className="text-[#F43F78] flex items-center gap-1 justify-center animate-bounce">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
              {birthdayContent.pinScreen.successMessage}
            </span>
          )}
          {isError && (
            <span className="text-red-500 font-medium">
              {birthdayContent.pinScreen.incorrectMessage}
            </span>
          )}
          {!isSuccess && !isError && (
            <span className="text-[#87566C] tracking-wide">
              {birthdayContent.pinScreen.hintText}
            </span>
          )}
        </div>

        {/* Compact 3x4 Keypad */}
        <div className="keypad-grid">
          {KEYPAD_NUMS.map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleDigit(num)}
              disabled={isSuccess}
              className="keypad-btn"
            >
              <span className="text-lg font-bold">{num}</span>
            </button>
          ))}

          {/* Row 4: Clear, 0, Backspace */}
          <button
            type="button"
            onClick={handleClear}
            disabled={isSuccess || pin.length === 0}
            className="keypad-btn keypad-btn-secondary"
            title="Clear all"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={() => handleDigit("0")}
            disabled={isSuccess}
            className="keypad-btn"
          >
            <span className="text-lg font-bold">0</span>
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isSuccess || pin.length === 0}
            aria-label="Delete last digit"
            className="keypad-btn keypad-btn-secondary"
            title="Backspace"
          >
            <Delete className="w-4 h-4 text-[#87566C]" />
          </button>
        </div>

        {/* Hint button & toggle */}
        <div className="mt-0.5 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setShowHint((prev) => !prev)}
            className="inline-flex items-center gap-1 text-[11px] text-[#87566C] hover:text-[#F43F78] transition-colors underline-offset-2 hover:underline cursor-pointer py-0.5"
          >
            <HelpCircle className="w-3 h-3" />
            <span>Need a little hint? 😉</span>
          </button>

          {showHint && (
            <div
              className="mt-1.5 p-2 px-3 rounded-xl text-[11px] text-[#4A2338] max-w-xs shadow-sm border"
              style={{
                background: "linear-gradient(135deg, #FFF0F5 0%, #FFE4EC 100%)",
                borderColor: "#FFB6C8",
              }}
            >
              <span className="text-[#87566C]">Secret Passcode: </span>
              <strong className="font-heading text-sm text-[#F43F78] tracking-widest font-extrabold ml-1">
                {birthdayContent.pin}
              </strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
