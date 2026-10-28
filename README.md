# 🎂 Happy Birthday Renu (Pandi) — Interactive Surprise Web App

A responsive, heart-themed interactive frontend birthday surprise web application designed for a female best friend (**Renu / Pandi**).

Built with **React 19**, **Vite**, **TypeScript**, **Vanilla CSS & Glassmorphism Design System**, **Lucide Icons**, and **Web Audio API** (100% zero-dependency music box & sound effects).

---

## 🌟 Interactive Journey Overview

1. **🔑 Secret PIN Gate**
   - Romantic glassmorphism padlock with numeric keypad and physical keyboard support.
   - Default PIN: `2910` (Configurable in `src/data/birthdayContent.ts`).
   - Shake animation & playful error messages on incorrect entry.
   - Hint toggle: *"Need a hint? 😉"*.
   - Soft magical unlock chime on success.

2. **💕 Excitement Check ("Are you excited?")**
   - Question: *"Renuuuuu! Are you excited for your little surprise?"*.
   - **Runaway "Nope" Button**: Uses evasive spring physics. On hover, touch, or click attempt, the button smoothly dodges up, down, or sideways with playful taunts (*"No chance, Pandi! 😂"*, *"Say YES already! 💕"*). It is impossible to say No!
   - **"Yessss! 💖" Button**: Pulsing heart glow that unlocks the next step with celebration sparkle.

3. **🎁 Four Mystery Gift Boxes**
   - 4 luxury 3D-styled gift boxes tied with silk ribbons and glowing pastel gradients.
   - Tapping each box unboxes it with an unwrap sound, confetti burst, and reveals:
     > **"You are so special to me 💗"**
   - Once all 4 boxes are opened, a celebratory banner and *"One More Surprise →"* button unlocks the Cake!

4. **🎂 18-Candle Cake with 2-Stage Blowing & Telugu Humor**
   - Layered tiered cake with **18 glowing candles** with realistic flame flicker animation (`.flame-animated`).
   - Prompt: *"Close your eyes, take a deep breath, and make a beautiful wish... ✨"*.
   - **First 3-Second Timer**: Countdown (*3... 2... 1... Blow! 💨*).
   - **First Blow Result**: 13 candles extinguish with smoke puff effects (`.smoke-puff`), but **5 candles stubbornly remain burning!**
   - **Hilarious Telugu Dialogue**:
     > **"Gattiga oodhu, Andhuke Thinali gattiga 😂🎂"**
   - **Second 3-Second Timer**: *"Come on Pandi, one more big blow! 💨 3... 2... 1..."*.
   - **Second Blow Result**: All remaining 5 candles blow out! Fanfare chords play and celebratory confetti bursts.

5. **🎉 Grand Celebration Screen**
   - Headline: **"Happy Birthday Renu (pandi) 💗🎂"**.
   - Continuous confetti cannons and heartfelt friendship quote.
   - Wax-sealed luxury pink envelope teaser: *"Open Your Little Letter 💌"*.

6. **💌 Vintage Unfolding Letter**
   - Unfolds with paper opening audio and realistic scale animation.
   - Heartfelt, touching letter written specifically for Renu (pandi).

7. **🌸 Flower Bouquet with Floating Phrases**
   - Handcrafted illustrated blooming bouquet (English roses, peonies, baby's breath, and pink silk ribbon).
   - Interactive floating phrase bubbles surrounding the bouquet:
     - *"You deserve all the happiness in the world 💗"*
     - *"Keep smiling, Pandi! 🌷"*
     - *"You are one of a kind ✨"*
     - *"Stay cute, stay crazy 😂💕"*
     - *"A little flower for my favorite human 🌸"*
     - *"Never stop being you 💖"*

8. **📸 Polaroid Photo Slideshow**
   - Polaroid-style frames with washi tape, soft shadows, and warm captions.
   - Built-in illustrated fallbacks if photos aren't added yet.
   - Supports **live photo upload** right from the browser or placing images into `/public/images/`.

9. **💖 Grand Finale & Birthday Melody**
   - Spectacular celebration screen.
   - Plays a custom Web Audio synthesized **music-box "Happy Birthday to You"** melody!
   - *"Replay Our Little Surprise 💞"* button resets the entire experience to play again anytime.
   - *"Share with Renu 💌"* copies link and custom greeting to clipboard.

---

## 🎨 Theme & Design Aesthetics

- **Palette**: Rose Pink (`#FF5C8A`), Hot Blush (`#F43F78`), Lavender Blush (`#FFF0F5`), Soft Cream (`#FFF8F0`), Golden Honey (`#FFD166`).
- **Typography**: Google Fonts — *Playfair Display* (Editorial Serif), *Dancing Script* (Romantic cursive), and *Poppins* / *Nunito* (Modern rounded sans).
- **Glassmorphism**: High-translucency cards with `backdrop-filter: blur(14px)`, delicate white borders, and soft pink shadows.
- **Micro-Animations**: Flickering candle flames, smoke puffs, floating hearts and sparkles, runaway button physics, and canvas confetti.
- **Mobile First**: 100% fluid layouts with `clamp()` typography and touch-optimized event listeners.

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 🛠️ Personalization Guide

- **Change PIN or Messages**: Edit [src/data/birthdayContent.ts](file:///c:/Projects/Birthday/src/data/birthdayContent.ts).
- **Add Real Photos**: Place image files into [public/images/](file:///c:/Projects/Birthday/public/images/) (e.g. `renu-1.jpg`, `renu-2.jpg`) and update [src/data/photos.ts](file:///c:/Projects/Birthday/src/data/photos.ts), or use the browser file upload button in the slideshow.
