/**
 * BIRTHDAY SURPRISE CONTENT CONFIGURATION
 * 
 * You can personalize the entire birthday experience from this single file!
 * - Change the PIN code
 * - Edit messages, Telugu jokes, letters, and bouquet phrases
 * - Update names and nicknames
 */

export interface BirthdayContentConfig {
  name: string;
  nickname: string;
  capitalizedNickname: string;
  pin: string;
  pinScreen: {
    title: string;
    subheading: string;
    hintText: string;
    incorrectMessage: string;
    successMessage: string;
    footerHint: string;
  };
  excitementScreen: {
    heading: string;
    question: string;
    supportingText: string;
    yesText: string;
    noText: string;
  };
  giftsScreen: {
    heading: string;
    subheading: string;
    supportingText: string;
    giftMessage: string;
    allUnlockedMessage: string;
    nextButton: string;
  };
  cakeScreen: {
    heading: string;
    instruction: string;
    supportingText: string;
    blowPrompt: string;
    blowButton: string;
    firstAttemptOops: string;
    firstAttemptRemaining: string;
    firstAttemptTelugu: string;
    secondCountdownPrompt: string;
    blowAgainButton: string;
    finalSuccessTitle: string;
    finalSuccessSub: string;
    celebrateButton: string;
  };
  celebrationScreen: {
    heading: string;
    subheading: string;
    cardQuote: string;
    openLetterButton: string;
  };
  letterContent: string;
  bouquetScreen: {
    heading: string;
    subheading: string;
    phrases: string[];
    nextButton: string;
  };
  slideshowScreen: {
    heading: string;
    subheading: string;
    nextButton: string;
  };
  finalScreen: {
    heading: string;
    message: string;
    replayButton: string;
  };
}

export const birthdayContent: BirthdayContentConfig = {
  // Personal Details
  name: "Renu",
  nickname: "pandi",
  capitalizedNickname: "Pandi",

  // 🔑 SECRET PIN GATE CODE:
  // Change this 4-digit code to any secret you and Renu share!
  pin: "2910",

  pinScreen: {
    title: "A Little Surprise For You 💗",
    subheading: "Someone special made something just for you...",
    hintText: "But first, a tiny secret!",
    incorrectMessage: "Oopsie! That's not the secret code, cutie 💕 Try again!",
    successMessage: "Yayyy! You found your way in! 💗",
    footerHint: "Only the birthday girl knows the secret 😉",
  },

  excitementScreen: {
    heading: "Renuuuuu! 💗",
    question: "Are you excited for your little surprise?",
    supportingText: "Choose wisely, Pandi... 👀💕",
    yesText: "Yessss! 💖",
    noText: "Nope 🙄",
  },

  giftsScreen: {
    heading: "Yayyyy! I KNEW IT! 🥹💗",
    subheading: "Four little gifts, just for my favorite person.",
    supportingText: "Tap each gift to unlock a tiny reminder of how special you are.",
    giftMessage: "You are so special to me 💗",
    allUnlockedMessage: "All four gifts are yours! 🎁💖",
    nextButton: "One More Surprise →",
  },

  cakeScreen: {
    heading: "Make a Little Wish, Birthday Girl 🎂",
    instruction: "Close your eyes, take a deep breath, and make a beautiful wish... ✨",
    supportingText: "Your wish is your little secret. Don't tell me! 🤫💗",
    blowPrompt: "Okayyy, now blow out all 18 candles! 💨🎂",
    blowButton: "Blow the Candles 💨",
    firstAttemptOops: "Oopsieee! 😭💗",
    firstAttemptRemaining: "Five candles are still burning!",
    firstAttemptTelugu: "Gattiga oodhu, Andhuke Thinali gattiga,Pichi Mokham😂🎂",
    secondCountdownPrompt: "Come on, Pandi! One more big blow! 💨",
    blowAgainButton: "Blow Again! 💨",
    finalSuccessTitle: "Yayyyyy! You did it, Renu! 🥹💗",
    finalSuccessSub: "May all your beautiful wishes come true.",
    celebrateButton: "Let's Celebrate! 🎉",
  },

  celebrationScreen: {
    heading: "Happy Birthday Renu (pandi) 💗🎂",
    subheading: "Today is all about you, my favorite human! 💖",
    cardQuote: "To the sweetest smiles, warmest hugs, and a friend who makes life a hundred times more colorful. ✨",
    openLetterButton: "Open Your Little Letter 💌",
  },

  letterContent: `Dear Renu, 💗

Happy Birthday to my favorite Pandi!

I hope this new chapter of your life brings you endless happiness, beautiful memories, good health, and all the little things that make your heart smile.

Never forget how special you are. Your presence makes ordinary moments feel a little more beautiful, and I hope today reminds you how much you are appreciated.

Keep smiling, keep being your crazy little self, and never stop chasing the things that make you happy.

May your dreams grow bigger, your worries grow smaller, and your life be filled with people who genuinely care about you.

And yes, please remember to eat lots of cake today! 🎂😂

Once again, happiest birthday, Renu (pandi)! 💖

With lots of love,
Your Best Friend 💌`,

  bouquetScreen: {
    heading: "A Little Bouquet, Just for You 🌸",
    subheading: "If I could give you a little happiness in every flower, I'd give you the whole garden. 💗",
    phrases: [
      "You deserve all the happiness in the world 💗",
      "Keep smiling, Pandi! 🌷",
      "You are one of a kind ✨",
      "Stay cute, stay crazy 😂💕",
      "A little flower for my favorite human 🌸",
      "Never stop being you 💖",
    ],
    nextButton: "One Last Surprise 📸",
  },

  slideshowScreen: {
    heading: "Moments & Memories 📸💕",
    subheading: "A little gallery dedicated to your contagious smile and endless joy.",
    nextButton: "A Final Message 💌",
  },

  finalScreen: {
    heading: "Happy Birthday, Renu (pandi)! 💗🎂",
    message: `Another year older, another year more amazing! 💖

I hope your days are filled with laughter, your heart is filled with happiness, and your dreams keep coming true.

Keep smiling that beautiful smile, keep being your adorable crazy self, and never forget how special you are.

No matter how busy life gets, I hope you always find little reasons to smile.

Today, tomorrow, and every day after that, you deserve so much happiness.

Have the most beautiful birthday, Pandi! 🎂🌸💗`,
    replayButton: "Replay Our Little Surprise 💞",
  },
};
