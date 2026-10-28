/**
 * BIRTHDAY PHOTO GALLERY CONFIGURATION
 * 
 * Replace the image paths and captions below with real photos of Renu!
 * Put your pictures in the 'public/images/' folder (e.g. /images/renu-1.jpg).
 * If a photo is not found, the gallery will gracefully display an artistic illustrated memory card!
 */

export interface BirthdayPhoto {
  id: string;
  src: string;
  caption: string;
  alt: string;
  themeColor?: string;
  badgeEmoji?: string;
}

export const birthdayPhotos: BirthdayPhoto[] = [
  {
    id: "photo-1",
    src: "/images/renu1.jpeg",
    caption: "A beautiful smile that lights up every room 💗",
    alt: "Renu's bright and radiant smile",
    themeColor: "#FFB6C8",
    badgeEmoji: "🌸",
  },
  {
    id: "photo-2",
    src: "/images/renu2.jpeg",
    caption: "Keep shining bright, our 18th birthday queen ✨",
    alt: "Renu shining bright",
    themeColor: "#FFD166",
    badgeEmoji: "✨",
  },
  {
    id: "photo-3",
    src: "/images/renu3.jpeg",
    caption: "Forever our crazy, adorable Pandi 😂💕",
    alt: "Fun and goofy moments with Pandi",
    themeColor: "#FF5C8A",
    badgeEmoji: "🥰",
  },
  {
    id: "photo-4",
    src: "/images/renu4.jpeg",
    caption: "A sweet moment worth remembering forever 🌸",
    alt: "A precious friendship memory",
    themeColor: "#E8DDF8",
    badgeEmoji: "🌷",
  },
  {
    id: "photo-5",
    src: "/images/renu5.jpeg",
    caption: "Stay happy, stay blessed, always 💖",
    alt: "Warm birthday blessings for Renu",
    themeColor: "#F43F78",
    badgeEmoji: "🎂",
  },
];
