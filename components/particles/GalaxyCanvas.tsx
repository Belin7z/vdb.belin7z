"use client";

import { useEffect, useRef } from "react";
import { generateStars, generateNebulae, type Star } from "@/lib/galaxy/star-field";

const STAR_COUNT = 220;
const ROTATION_PERIOD_MS = 240000;
const DISK_SQUASH = 0.55;
const COMET_CHANCE_PER_FRAME = 0.018;
const COMET_COLORS = ["#ffffff", "#e9d5ff", "#c084fc", "#93c5fd", "#f0abfc"];

interface Comet {
  x: number;
  y: number;
  angle: number;
  speed: number;
  curve: number;
  life: number;
  length: number;
  size: number;
  color: string;
}

function withAlpha(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function GalaxyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const stars = generateStars(STAR_COUNT);
    const nebulae = generateNebulae(4);
    const comets: Comet[] = [];

    function drawSparkle(x: number, y: number, size: number, opacity: number, color: string) {
      ctx!.save();
      ctx!.translate(x, y);
      ctx!.globalAlpha = opacity;

      const glow = ctx!.createRadialGradient(0, 0, 0, 0, 0, size * 3);
      glow.addColorStop(0, color);
      glow.addColorStop(1, "transparent");
      ctx!.fillStyle = glow;
      ctx!.fillRect(-size * 3, -size * 3, size * 6, size * 6);

      ctx!.strokeStyle = "#ffffff";
      ctx!.lineWidth = Math.max(0.6, size * 0.18);
      ctx!.beginPath();
      ctx!.moveTo(-size * 2.2, 0);
      ctx!.lineTo(size * 2.2, 0);
      ctx!.moveTo(0, -size * 2.2);
      ctx!.lineTo(0, size * 2.2);
      ctx!.stroke();

      ctx!.beginPath();
      ctx!.arc(0, 0, size * 0.7, 0, Math.PI * 2);
      ctx!.fillStyle = "#ffffff";
      ctx!.fill();

      ctx!.restore();
    }

    function drawStar(star: Star, elapsed: number, rotation: number, centerX: number, centerY: number, maxRadius: number) {
      const angle = star.angle + rotation;
      const r = star.radius * maxRadius;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r * DISK_SQUASH;

      const twinkle = reducedMotion
        ? 0.85
        : 0.5 + 0.5 * Math.sin(elapsed * 0.001 * star.twinkleSpeed + star.twinklePhase);
      const opacity = (0.25 + 0.6 * star.depth) * (0.5 + 0.5 * twinkle);
      const size = star.size * (0.6 + star.depth * 0.8);

      if (star.isSparkle) {
        drawSparkle(x, y, size, opacity, star.color);
        return;
      }

      ctx!.beginPath();
      ctx!.arc(x, y, size, 0, Math.PI * 2);
      ctx!.fillStyle = star.color;
      ctx!.globalAlpha = opacity;
      ctx!.fill();
    }

    function drawCore(centerX: number, centerY: number, maxRadius: number) {
      const coreRadius = maxRadius * 0.32;

      ctx!.save();
      ctx!.translate(centerX, centerY);
      ctx!.scale(1, DISK_SQUASH);
      const gradient = ctx!.createRadialGradient(0, 0, 0, 0, 0, coreRadius);
      gradient.addColorStop(0, "rgba(253, 230, 255, 0.55)");
      gradient.addColorStop(0.4, "rgba(216, 180, 254, 0.28)");
      gradient.addColorStop(1, "transparent");
      ctx!.globalAlpha = 1;
      ctx!.fillStyle = gradient;
      ctx!.fillRect(-coreRadius, -coreRadius, coreRadius * 2, coreRadius * 2);
      ctx!.restore();
    }

    function drawNebulae(elapsed: number, centerX: number, centerY: number, maxRadius: number) {
      for (const nebula of nebulae) {
        const drift = reducedMotion ? 0 : elapsed * nebula.driftSpeed;
        const nx = centerX + nebula.baseX * maxRadius + Math.cos(nebula.driftAngle + drift) * nebula.driftRadius * maxRadius * 0.12;
        const ny = centerY + nebula.baseY * maxRadius + Math.sin(nebula.driftAngle + drift) * nebula.driftRadius * maxRadius * 0.12;
        const r = nebula.radius * maxRadius;

        const gradient = ctx!.createRadialGradient(nx, ny, 0, nx, ny, r);
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(1, "transparent");
        ctx!.globalAlpha = 1;
        ctx!.fillStyle = gradient;
        ctx!.fillRect(nx - r, ny - r, r * 2, r * 2);
      }
    }

    function spawnComet() {
      comets.push({
        x: width * Math.random(),
        y: -0.05 * height,
        angle: Math.PI / 4 + Math.random() * (Math.PI / 4),
        speed: 7 + Math.random() * 9,
        curve: (Math.random() - 0.5) * 0.018,
        life: 1,
        length: 70 + Math.random() * 100,
        size: 1.3 + Math.random() * 2.2,
        color: COMET_COLORS[Math.floor(Math.random() * COMET_COLORS.length)],
      });
    }

    function drawComets() {
      for (let i = comets.length - 1; i >= 0; i--) {
        const comet = comets[i];
        comet.angle += comet.curve;
        comet.x += Math.cos(comet.angle) * comet.speed;
        comet.y += Math.sin(comet.angle) * comet.speed;
        comet.life -= 0.012;

        const offScreen =
          comet.y > height + 60 || comet.x < -60 || comet.x > width + 60;
        if (comet.life <= 0 || offScreen) {
          comets.splice(i, 1);
          continue;
        }

        const progress = 1 - comet.life;
        const depthCurve = Math.sin(Math.min(progress, 1) * Math.PI);
        const headSize = comet.size * (0.4 + depthCurve * 1.4);
        const tailLength = comet.length * (0.5 + depthCurve * 0.8);
        const opacity = comet.life * (0.4 + depthCurve * 0.6);

        const tailX = comet.x - Math.cos(comet.angle) * tailLength;
        const tailY = comet.y - Math.sin(comet.angle) * tailLength;

        const tailGradient = ctx!.createLinearGradient(comet.x, comet.y, tailX, tailY);
        tailGradient.addColorStop(0, withAlpha("#ffffff", opacity));
        tailGradient.addColorStop(0.4, withAlpha(comet.color, opacity * 0.55));
        tailGradient.addColorStop(1, withAlpha(comet.color, 0));

        ctx!.globalAlpha = 1;
        ctx!.strokeStyle = tailGradient;
        ctx!.lineWidth = Math.max(0.8, headSize * 0.8);
        ctx!.lineCap = "round";
        ctx!.beginPath();
        ctx!.moveTo(comet.x, comet.y);
        ctx!.lineTo(tailX, tailY);
        ctx!.stroke();

        const glow = ctx!.createRadialGradient(comet.x, comet.y, 0, comet.x, comet.y, headSize * 3.2);
        glow.addColorStop(0, withAlpha(comet.color, opacity));
        glow.addColorStop(1, withAlpha(comet.color, 0));
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(comet.x, comet.y, headSize * 3.2, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.beginPath();
        ctx!.arc(comet.x, comet.y, headSize * 0.75, 0, Math.PI * 2);
        ctx!.fillStyle = "#ffffff";
        ctx!.globalAlpha = opacity;
        ctx!.fill();
      }
    }

    let rafId = 0;
    const startTime = performance.now();

    function render(now: number) {
      const elapsed = now - startTime;
      const rotation = reducedMotion ? 0 : (elapsed / ROTATION_PERIOD_MS) * Math.PI * 2;
      const centerX = width * 0.5;
      const centerY = height * 0.42;
      const maxRadius = Math.hypot(width, height) * 0.55;

      ctx!.clearRect(0, 0, width, height);
      drawNebulae(elapsed, centerX, centerY, maxRadius);
      drawCore(centerX, centerY, maxRadius);
      for (const star of stars) drawStar(star, elapsed, rotation, centerX, centerY, maxRadius);
      ctx!.globalAlpha = 1;

      if (!reducedMotion) {
        if (Math.random() < COMET_CHANCE_PER_FRAME) spawnComet();
        drawComets();
        rafId = requestAnimationFrame(render);
      }
    }

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
