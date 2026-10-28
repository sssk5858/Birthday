import React from "react";
import { useBirthdayJourney } from "./hooks/useBirthdayJourney";
import { BackgroundEffects } from "./components/BackgroundEffects";
import { PinScreen } from "./components/screens/PinScreen";
import { ExcitementScreen } from "./components/screens/ExcitementScreen";
import { GiftsScreen } from "./components/screens/GiftsScreen";
import { CakeScreen } from "./components/screens/CakeScreen";
import { CelebrationScreen } from "./components/screens/CelebrationScreen";
import { LetterScreen } from "./components/screens/LetterScreen";
import { BouquetScreen } from "./components/screens/BouquetScreen";
import { SlideshowScreen } from "./components/screens/SlideshowScreen";
import { FinalScreen } from "./components/screens/FinalScreen";

export const App: React.FC = () => {
  const journey = useBirthdayJourney();

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-center items-center pt-12 pb-2 px-2 sm:px-4 selection:bg-[#FFB6C8] selection:text-[#4A2338]">
      {/* Background Ambience: Floating hearts, sparkles, glowing orbs, top audio bar */}
      <BackgroundEffects
        soundEnabled={journey.soundEnabled}
        onToggleSound={journey.toggleSound}
        currentScreen={journey.currentScreen}
      />

      {/* Screen Router */}
      <div className="w-full flex justify-center items-center relative z-10">
        {journey.currentScreen === "PIN_ENTRY" && (
          <PinScreen onUnlock={journey.unlockWithPin} />
        )}

        {journey.currentScreen === "EXCITEMENT" && (
          <ExcitementScreen onYes={journey.onExcitedYes} />
        )}

        {journey.currentScreen === "GIFTS" && (
          <GiftsScreen
            openedGifts={journey.openedGifts}
            onOpenGift={journey.openGift}
            onProceed={journey.goToCake}
          />
        )}

        {journey.currentScreen === "CAKE" && (
          <CakeScreen
            candleStage={journey.candleStage}
            onAdvanceStage={journey.advanceCandleStage}
            onProceedToCelebration={journey.goToCelebration}
          />
        )}

        {journey.currentScreen === "CELEBRATION" && (
          <CelebrationScreen onOpenLetter={journey.goToLetter} />
        )}

        {journey.currentScreen === "LETTER" && (
          <LetterScreen onProceed={journey.goToBouquet} />
        )}

        {journey.currentScreen === "BOUQUET" && (
          <BouquetScreen onProceed={journey.goToSlideshow} />
        )}

        {journey.currentScreen === "SLIDESHOW" && (
          <SlideshowScreen
            currentIndex={journey.slideshowIndex}
            onIndexChange={journey.setSlideshowIndex}
            onProceed={journey.goToFinal}
          />
        )}

        {journey.currentScreen === "FINAL" && (
          <FinalScreen onReplay={journey.replaySurprise} />
        )}
      </div>
    </main>
  );
};

export default App;
