import type { ISourceOptions } from "@tsparticles/engine";

export const particlesOptions: ISourceOptions = {
  fullScreen: { enable: false },
  background: { color: "transparent" },
  fpsLimit: 60,
  detectRetina: true,
  particles: {
    number: {
      value: 90,
      density: { enable: true, width: 1920, height: 1080 },
    },
    color: { value: ["#c084fc", "#a855f7", "#7c3aed", "#f0abfc"] },
    shape: { type: "circle" },
    opacity: {
      value: { min: 0.1, max: 0.8 },
      animation: { enable: true, speed: 0.6, sync: false, startValue: "random" },
    },
    size: {
      value: { min: 0.6, max: 2.6 },
    },
    links: {
      enable: true,
      distance: 140,
      color: "#a855f7",
      opacity: 0.12,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
    },
    modes: {
      grab: { distance: 160, links: { opacity: 0.35 } },
    },
  },
};
