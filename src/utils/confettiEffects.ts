import confetti from "canvas-confetti";

/**
 * Triggers a heart-shaped and pastel confetti explosion
 */
export function fireHeartConfetti() {
  const count = 60;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 30,
    startVelocity: 55,
    colors: ["#FF5C8A", "#FFB6C8", "#FFD166"],
  });
  fire(0.2, {
    spread: 60,
    colors: ["#F43F78", "#FFF0F5", "#E8DDF8"],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 1.2,
    colors: ["#FF5C8A", "#FF85A1", "#FFD166", "#FFFFFF"],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors: ["#FFB6C8", "#E8DDF8"],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ["#FF5C8A", "#F43F78"],
  });
}

/**
 * Triggers a massive grand celebration with side cannons
 */
export function fireGrandCelebration() {
  const end = Date.now() + 2.5 * 1000;
  const colors = ["#FF5C8A", "#FFB6C8", "#FFD166", "#F43F78", "#E8DDF8", "#FFFFFF"];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: colors,
      zIndex: 9999,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

/**
 * Gentle sparkle blast around a point
 */
export function fireMiniSparkle(xPercent: number = 0.5, yPercent: number = 0.5) {
  confetti({
    particleCount: 20,
    spread: 40,
    origin: { x: xPercent, y: yPercent },
    colors: ["#FF5C8A", "#FFD166", "#FFFFFF", "#FFB6C8"],
    scalar: 0.9,
    ticks: 60,
    zIndex: 9999,
  });
}
