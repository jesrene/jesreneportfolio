import { useState, useEffect, useRef } from "react";

const CONFETTI_COLORS = ["#f29a2e", "#e08618", "#171717", "#fffdfb", "#f7c56a"];

function popConfetti(event) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rect = event.currentTarget.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;
  const layer = document.createElement("div");
  layer.className = "confetti";
  for (let i = 0; i < 26; i += 1) {
    const bit = document.createElement("span");
    const angle = (Math.PI * 2 * i) / 26 + Math.random() * 0.4;
    const distance = 36 + Math.random() * 78;
    bit.style.left = `${originX}px`;
    bit.style.top = `${originY}px`;
    bit.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    bit.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
    bit.style.setProperty("--y", `${Math.sin(angle) * distance}px`);
    bit.style.setProperty("--spin", `${120 + Math.random() * 220}deg`);
    layer.appendChild(bit);
  }
  document.body.appendChild(layer);
  window.setTimeout(() => layer.remove(), 850);
}

const TICK_MS = 50;
const SIZE = 40;
const ZONE_W = 200;
const ZONE_H = 100;
const ZONE_TOP = 76;

function getBounds() {
  const minX = window.innerWidth - ZONE_W - 12;
  return {
    minX,
    maxX: minX + ZONE_W - SIZE,
    minY: ZONE_TOP,
    maxY: ZONE_TOP + ZONE_H - SIZE,
  };
}

function startSpot() {
  const b = getBounds();
  return {
    x: b.minX + Math.random() * (b.maxX - b.minX),
    y: b.minY + Math.random() * (b.maxY - b.minY),
    face: Math.random() * 360,
  };
}

const wrap = (d) => ((d % 360) + 360) % 360;

// Turn toward a target angle by at most maxTurn degrees (shortest direction)
function turnToward(face, target, maxTurn) {
  const diff = wrap(target - face + 180) - 180;
  return face + Math.max(-maxTurn, Math.min(maxTurn, diff));
}

// Short crawls, then a pause. Heading only drifts a few degrees.
function stepBug(m) {
  const b = getBounds();
  let { x, y, face, mode, ticks, gait } = m;
  gait = gait || 0;

  if (ticks <= 0) {
    if (mode === "walk") {
      mode = "pause";
      ticks = 8 + Math.floor(Math.random() * 16);
    } else {
      mode = "walk";
      ticks = 16 + Math.floor(Math.random() * 24);
      face += Math.random() * 8 - 4;
    }
  }
  ticks -= 1;

  if (mode === "pause") {
    face += (Math.random() - 0.5) * 0.4;
  } else {
    gait += 0.5;
    face += (Math.random() - 0.5) * 0.6;

    const margin = 16;
    const nearEdge =
      x < b.minX + margin || x > b.maxX - margin ||
      y < b.minY + margin || y > b.maxY - margin;
    if (nearEdge) {
      const cx = (b.minX + b.maxX) / 2;
      const cy = (b.minY + b.maxY) / 2;
      const toCenter = (Math.atan2(cy - y, cx - x) * 180) / Math.PI + 90;
      face = turnToward(face, toCenter, 1.2);
    }

    const rad = ((face - 90) * Math.PI) / 180;
    const speed = 0.38;
    x = Math.min(b.maxX, Math.max(b.minX, x + Math.cos(rad) * speed));
    y = Math.min(b.maxY, Math.max(b.minY, y + Math.sin(rad) * speed));
  }

  return { x, y, face, mode, ticks, gait };
}

// Tripod gait: group "a" and group "b" swing in opposite phase
const LEGS = [
  { side: "L", g: "a", x1: 11, y1: 14, x2: 3,  y2: 10 },
  { side: "R", g: "b", x1: 21, y1: 14, x2: 29, y2: 10 },
  { side: "L", g: "b", x1: 10, y1: 20, x2: 2,  y2: 20 },
  { side: "R", g: "a", x1: 22, y1: 20, x2: 30, y2: 20 },
  { side: "L", g: "a", x1: 11, y1: 26, x2: 3,  y2: 31 },
  { side: "R", g: "b", x1: 21, y1: 26, x2: 29, y2: 31 },
];

function footPoint(leg, gait, walking) {
  const phase = walking ? (leg.g === "a" ? gait : gait + Math.PI) : 0;
  const reach = Math.sin(phase) * 2.2;
  const outward = leg.side === "L" ? -1 : 1;
  return {
    x: leg.x2 + outward * Math.max(reach, 0) * 0.35,
    y: leg.y2 - reach,
  };
}

function Ladybug({ walking, face, gait }) {
  return (
    <svg
      className={walking ? "ladybug is-walking" : "ladybug"}
      viewBox="0 0 32 40"
      aria-hidden="true"
      style={{ transform: `rotate(${face}deg)` }}
    >
      {LEGS.map((leg, i) => {
        const foot = footPoint(leg, gait, walking);
        const outward = leg.side === "L" ? -1.1 : 1.1;
        const kneeX = (leg.x1 + foot.x) / 2 + outward;
        const kneeY = (leg.y1 + foot.y) / 2;
        return (
          <polyline
            key={i}
            className="leg"
            points={`${leg.x1},${leg.y1} ${kneeX},${kneeY} ${foot.x},${foot.y}`}
          />
        );
      })}
      <path className="antenna" d="M14 6 Q11 2 9 1" fill="none" stroke="#171717" strokeWidth="1.2" strokeLinecap="round" />
      <path className="antenna antenna--r" d="M18 6 Q21 2 23 1" fill="none" stroke="#171717" strokeWidth="1.2" strokeLinecap="round" />
      <ellipse cx="16" cy="8" rx="4.2" ry="3.6" fill="#171717" />
      <ellipse cx="16" cy="22" rx="10" ry="13" fill="var(--bug-shell, #d9382b)" />
      <line x1="16" y1="10" x2="16" y2="35" stroke="#171717" strokeWidth="1" />
      <circle cx="11" cy="19" r="2.2" fill="#171717" />
      <circle cx="21" cy="19" r="2.2" fill="#171717" />
      <circle cx="11.5" cy="27" r="2" fill="#171717" />
      <circle cx="20.5" cy="27" r="2" fill="#171717" />
      <ellipse cx="16" cy="12.5" rx="6" ry="3.2" fill="#171717" />
      <circle cx="12.5" cy="11.5" r="1" fill="#fffdfb" />
      <circle cx="19.5" cy="11.5" r="1" fill="#fffdfb" />
    </svg>
  );
}

export function PageBug() {
  // "roaming" -> "squashed" -> "found" -> "done"
  const [phase, setPhase] = useState("roaming");
  const [pos, setPos] = useState(() => (
    typeof window === "undefined" ? { x: 0, y: 84, face: 0 } : startSpot()
  ));
  // Frozen on-screen box from the click, so the note doesn't follow a later step.
  const [spot, setSpot] = useState(null);
  const [moving, setMoving] = useState(false);
  const motion = useRef({ ...pos, mode: "pause", ticks: 6, gait: 0 });

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Small steps, frequent updates
  useEffect(() => {
    if (phase !== "roaming" || reduceMotion) return undefined;
    const id = setInterval(() => {
      motion.current = stepBug(motion.current);
      const { x, y, face, mode, gait } = motion.current;
      setPos({ x, y, face, gait });
      setMoving(mode === "walk");
    }, TICK_MS);
    return () => clearInterval(id);
  }, [phase, reduceMotion]);

  // Squashed -> show note -> remove everything
  useEffect(() => {
    if (phase === "squashed") {
      const id = setTimeout(() => setPhase("found"), 300);
      return () => clearTimeout(id);
    }
    if (phase === "found") {
      const id = setTimeout(() => setPhase("done"), 4000);
      return () => clearTimeout(id);
    }
  }, [phase]);

  if (phase === "done") return null;

  function squash(event) {
    if (phase !== "roaming") return;
    const rect = event.currentTarget.getBoundingClientRect();
    setSpot({
      x: rect.left,
      y: rect.top,
      // Body sits on the svg transform-origin (50% 55%), not the button's top-left.
      cx: rect.left + rect.width / 2,
      cy: rect.top + rect.height * 0.55,
    });
    setPhase("squashed");
  }

  if (phase === "found" && spot) {
    return (
      <p className="bug-note" role="status" style={{ left: spot.cx, top: spot.cy }}>
        <span className="bug-note__kicker">Found one</span>
        This is what I do for a living.
      </p>
    );
  }

  const place = spot ?? pos;

  return (
    <button
      className={phase === "squashed" ? "bug squashed" : "bug"}
      type="button"
      aria-label="A tiny bug. Click to squash it."
      onClick={squash}
      style={{ left: place.x, top: place.y }}
    >
      <Ladybug walking={phase === "roaming" && moving && !reduceMotion} face={pos.face} gait={pos.gait || 0} />
    </button>
  );
}

export function StarSticker() {
  const [popped, setPopped] = useState(false);

  function onPop(event) {
    popConfetti(event);
    setPopped(true);
  }

  return (
    <button className="sticker sticker--star" type="button" aria-label="Pop the star" onClick={onPop}>
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path fill="currentColor" d="M24 2l2.2 12.4L38 8l-6.2 11.2L46 24l-14.2 4.8L38 40l-11.8-6.4L24 46l-2.2-12.4L10 40l6.2-11.2L2 24l14.2-4.8L10 8l11.8 6.4z" />
      </svg>
      {!popped && (
        <span className="tap-hint" aria-hidden="true">
          <span className="tap-hint__label">what does this do?</span>
          <svg className="tap-hint__arrow" viewBox="0 0 52 46" aria-hidden="true">
            <path d="M4 10c20-4 28 6 36 26" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M30 27.1 40 36l1.1-13.4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </button>
  );
}