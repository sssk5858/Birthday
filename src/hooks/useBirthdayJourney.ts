import { useState, useCallback } from "react";
import { birthdayContent } from "../data/birthdayContent";
import { sounds } from "../utils/audioEffects";

export type ScreenType =
  | "PIN_ENTRY"
  | "EXCITEMENT"
  | "GIFTS"
  | "CAKE"
  | "CELEBRATION"
  | "LETTER"
  | "BOUQUET"
  | "SLIDESHOW"
  | "FINAL";

export interface JourneyState {
  currentScreen: ScreenType;
  pinPassed: boolean;
  openedGifts: number[]; // indices of opened boxes: 0, 1, 2, 3
  candleStage: number; // 0: initial lit (18), 1: first blow (5 left), 2: second blow (all out)
  letterOpened: boolean;
  soundEnabled: boolean;
  slideshowIndex: number;
}

export function useBirthdayJourney() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("PIN_ENTRY");
  const [pinPassed, setPinPassed] = useState<boolean>(false);
  const [openedGifts, setOpenedGifts] = useState<number[]>([]);
  const [candleStage, setCandleStage] = useState<number>(0);
  const [letterOpened, setLetterOpened] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [slideshowIndex, setSlideshowIndex] = useState<number>(0);

  // Toggle sound
  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      sounds.setMuted(!next);
      return next;
    });
  }, []);

  // Unlock with PIN
  const unlockWithPin = useCallback(
    (inputPin: string): boolean => {
      if (inputPin.trim() === birthdayContent.pin) {
        sounds.playUnlockChime();
        setPinPassed(true);
        setTimeout(() => {
          setCurrentScreen("EXCITEMENT");
        }, 800);
        return true;
      }
      return false;
    },
    []
  );

  // Excitement YES clicked
  const onExcitedYes = useCallback(() => {
    sounds.playUnlockChime();
    setCurrentScreen("GIFTS");
  }, []);

  // Open an individual gift box
  const openGift = useCallback((index: number) => {
    setOpenedGifts((prev) => {
      if (prev.includes(index)) return prev;
      sounds.playPop();
      return [...prev, index];
    });
  }, []);

  // Proceed from gifts to cake
  const goToCake = useCallback(() => {
    sounds.playUnlockChime();
    setCurrentScreen("CAKE");
  }, []);

  // Cake candle stages
  const advanceCandleStage = useCallback((stage: number) => {
    setCandleStage(stage);
  }, []);

  // Proceed to celebration
  const goToCelebration = useCallback(() => {
    sounds.stopMelody();
    sounds.playCelebrationFanfare();
    setCurrentScreen("CELEBRATION");
  }, []);

  // Proceed to letter
  const goToLetter = useCallback(() => {
    sounds.playLetterOpen();
    setCurrentScreen("LETTER");
  }, []);

  // Open letter inside letter screen
  const markLetterOpened = useCallback(() => {
    sounds.playLetterOpen();
    setLetterOpened(true);
  }, []);

  // Proceed to bouquet
  const goToBouquet = useCallback(() => {
    sounds.playSparkle();
    setCurrentScreen("BOUQUET");
  }, []);

  // Proceed to slideshow
  const goToSlideshow = useCallback(() => {
    sounds.playUnlockChime();
    setCurrentScreen("SLIDESHOW");
  }, []);

  // Proceed to final
  const goToFinal = useCallback(() => {
    sounds.playCelebrationFanfare();
    setCurrentScreen("FINAL");
  }, []);

  // Full Replay / Reset
  const replaySurprise = useCallback(() => {
    setCurrentScreen("PIN_ENTRY");
    setPinPassed(false);
    setOpenedGifts([]);
    setCandleStage(0);
    setLetterOpened(false);
    setSlideshowIndex(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return {
    currentScreen,
    setCurrentScreen,
    pinPassed,
    openedGifts,
    candleStage,
    letterOpened,
    soundEnabled,
    slideshowIndex,
    setSlideshowIndex,
    toggleSound,
    unlockWithPin,
    onExcitedYes,
    openGift,
    goToCake,
    advanceCandleStage,
    goToCelebration,
    goToLetter,
    markLetterOpened,
    goToBouquet,
    goToSlideshow,
    goToFinal,
    replaySurprise,
  };
}
