import { useEffect, useRef, useState } from "react";

const SPRITZER_STATS = [
  { value: 1.24, label: "Click Through Rate", format: "percent" },
  { value: 62.23, label: "Engagement Rate", format: "percent" },
  { value: 84.17, label: "Viewability Rate", format: "percent" },
  { value: 7384, label: "Revenue Generated", format: "currency" },
];

const KFC_STATS = [
  { value: 1.57, label: "Click Through Rate", format: "percent" },
  { value: 42.56, label: "Engagement Rate", format: "percent" },
  { value: 0, label: "Viewability Rate", format: "percent" },
  { value: 10215, label: "Revenue Generated", format: "currency" },
];

const LadyChoice_STATS = [
  { value: 0.9, label: "Click Through Rate", format: "percent" },
  { value: 0, label: "Engagement Rate", format: "percent" },
  { value: 0, label: "Viewability Rate", format: "percent" },
  { value: 20690, label: "Revenue Generated", format: "currency" },
];

const Lifebuoy_STATS = [
  { value: 1.07, label: "Click Through Rate", format: "percent" },
  { value: 1.07, label: "Engagement Rate", format: "percent" },
  { value: 63.43, label: "Viewability Rate", format: "percent" },
  { value: 7382, label: "Revenue Generated", format: "currency" },
];

const Beetlejuice_STATS = [
  { value: 1.07, label: "Click Through Rate", format: "percent" },
  { value: 1.07, label: "Engagement Rate", format: "percent" },
  { value: 63.43, label: "Viewability Rate", format: "percent" },
  { value: 7382, label: "Revenue Generated", format: "currency" },
];

const BeetlejuiceTriimpact_STATS = [
  { value: 0, label: "Click Through Rate", format: "percent" },
  { value: 0, label: "Engagement Rate", format: "percent" },
  { value: 0, label: "Viewability Rate", format: "percent" },
  { value: 0, label: "Revenue Generated", format: "currency" },
];

function formatStat(value, format) {
  const numericValue = typeof value === "string" 
    ? parseFloat(value.replace(/[^0-9.-]+/g, "")) 
    : value;

  if (isNaN(numericValue)) return value;

  if (format === "percent") return `${numericValue.toFixed(2)}%`;
  
  const rounded = Math.round(numericValue).toLocaleString("en-US");
  
  if (format === "currency") return `$${rounded}`;
  
  return rounded;
}

export function SpritzerPreview() {
  const frameRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="iphone" ref={frameRef}>
      {visible && (
        <iframe
          src="https://demo.freakout.net/campaign/MY-Spritzer-JUL26-JomMakan-Preview-Content.html"
          title="Spritzer Jom Makan preview"
        />
      )}
    </div>
  );
}

export function SpritzerStats() {
  const rowRef = useRef(null);
  const started = useRef(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = rowRef.current;
    if (!node) return undefined;
    let frame = 0;

    const start = () => {
      if (started.current) return;
      started.current = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setProgress(1);
        return;
      }
      const duration = 1500;
      const startTime = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - startTime) / duration);
        setProgress(1 - (1 - t) ** 3);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        start();
        observer.disconnect();
      }
    }, { threshold: 0.45 });
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="stat-bar">
      <div className="stat-bar__row" ref={rowRef}>
        {SPRITZER_STATS.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong>{formatStat(stat.value * progress, stat.format)}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function KFCPreview() {
  const frameRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="iphone" ref={frameRef}>
      {visible && (
        <iframe
          src="https://demo.freakout.net/campaign/MY-QubyCNY-SEP26-OOO-Preview-Content.html"
          title="KFC Quby CNY Out-of-Office preview"
        />
      )}
    </div>
  );
}

export function KFCStats() {
  const rowRef = useRef(null);
  const started = useRef(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = rowRef.current;
    if (!node) return undefined;
    let frame = 0;

    const start = () => {
      if (started.current) return;
      started.current = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setProgress(1);
        return;
      }
      const duration = 1500;
      const startTime = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - startTime) / duration);
        setProgress(1 - (1 - t) ** 3);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        start();
        observer.disconnect();
      }
    }, { threshold: 0.45 });
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="stat-bar stat-bar--kfc">
      <div className="stat-bar__row" ref={rowRef}>
        {KFC_STATS.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong>{formatStat(stat.value * progress, stat.format)}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


export function LadyChoicePreview() {
  const frameRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="iphone" ref={frameRef}>
      {visible && (
        <iframe
          src="https://demo.freakout.net/campaign/PH-LadysChoice-MAY26-Afternoon-SkyDash-Preview-Content.html"
          title="Lady's Choice Morning SkyDash preview"
        />
      )}
    </div>
  );
}

export function LadyChoiceStats() {
  const rowRef = useRef(null);
  const started = useRef(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = rowRef.current;
    if (!node) return undefined;
    let frame = 0;

    const start = () => {
      if (started.current) return;
      started.current = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setProgress(1);
        return;
      }
      const duration = 1500;
      const startTime = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - startTime) / duration);
        setProgress(1 - (1 - t) ** 3);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        start();
        observer.disconnect();
      }
    }, { threshold: 0.45 });
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="stat-bar stat-bar--ladys">
      <div className="stat-bar__row" ref={rowRef}>
        {LadyChoice_STATS.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong>{formatStat(stat.value * progress, stat.format)}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}



export function LifebuoyPreview() {
  const frameRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="iphone" ref={frameRef}>
      {visible && (
        <iframe
          src="https://demo.freakout.net/campaign/MY-Lifebuoy-MAY26-Mix&Match-Preview-Content.html"
          title="Lifebuoy Mix & Match preview"
        />
      )}
    </div>
  );
}

export function LifebuoyStats() {
  const rowRef = useRef(null);
  const started = useRef(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = rowRef.current;
    if (!node) return undefined;
    let frame = 0;

    const start = () => {
      if (started.current) return;
      started.current = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setProgress(1);
        return;
      }
      const duration = 1500;
      const startTime = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - startTime) / duration);
        setProgress(1 - (1 - t) ** 3);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        start();
        observer.disconnect();
      }
    }, { threshold: 0.45 });
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="stat-bar stat-bar--lifebuoy">
      <div className="stat-bar__row" ref={rowRef}>
        {Lifebuoy_STATS.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong>{formatStat(stat.value * progress, stat.format)}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}



export function BeetlejuicePreview() {
  const frameRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="iphone" ref={frameRef}>
      {visible && (
        <iframe
          src="https://demo.freakout.net/campaign/MY-Beetlejuice-AUG24-HeaderAndFooter-Preview-Content.html"
          title="Beetlejuice Header and Footer preview"
        />
      )}
    </div>
  );
}

export function BeetlejuiceStats() {
  const rowRef = useRef(null);
  const started = useRef(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = rowRef.current;
    if (!node) return undefined;
    let frame = 0;

    const start = () => {
      if (started.current) return;
      started.current = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setProgress(1);
        return;
      }
      const duration = 1500;
      const startTime = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - startTime) / duration);
        setProgress(1 - (1 - t) ** 3);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        start();
        observer.disconnect();
      }
    }, { threshold: 0.45 });
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="stat-bar stat-bar--beetlejuice">
      <div className="stat-bar__row" ref={rowRef}>
        {Beetlejuice_STATS.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong>{formatStat(stat.value * progress, stat.format)}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}







export function BeetlejuiceTriimpactPreview() {
  const frameRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="iphone" ref={frameRef}>
      {visible && (
        <iframe
          src="https://demo.freakout.net/campaign/MY-Beetlejuice-IS-TriImpact-Preview-Content.html"
          title="Beetlejuice Tri-Impact preview"
        />
      )}
    </div>
  );
}

export function BeetlejuiceTriimpactStats() {
  const rowRef = useRef(null);
  const started = useRef(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = rowRef.current;
    if (!node) return undefined;
    let frame = 0;

    const start = () => {
      if (started.current) return;
      started.current = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setProgress(1);
        return;
      }
      const duration = 1500;
      const startTime = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - startTime) / duration);
        setProgress(1 - (1 - t) ** 3);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        start();
        observer.disconnect();
      }
    }, { threshold: 0.45 });
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="stat-bar stat-bar--beetlejuice">
      <div className="stat-bar__row" ref={rowRef}>
        {BeetlejuiceTriimpact_STATS.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong>{formatStat(stat.value * progress, stat.format)}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}





export function IkeaPreview() {
  const frameRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="iphone" ref={frameRef}>
      {visible && (
        <iframe
          src="https://demo.freakout.net/campaign/MY-IKEA-SEP26-3DModel-Preview-Content.html"
          title="IKEA 3D Model Viewer preview"
        />
      )}
    </div>
  );
}



export function LifebuoyProductPreview() {
  const frameRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="iphone" ref={frameRef}>
      {visible && (
        <iframe
          src="https://demo.freakout.net/campaign/MY-Lifebuoy-JUN26-CurvedCarousel-Preview-Content.html"
          title="Lifebuoy product carousel preview"
        />
      )}
    </div>
  );
}


export function KnorrPreview() {
  const frameRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="iphone" ref={frameRef}>
      {visible && (
        <iframe
          src="https://demo.freakout.net/campaign/PH-Knorr-MAR26-CatchEmAll-Preview-Content.html"
          title="Knorr Professional catch preview"
        />
      )}
    </div>
  );
}



export function McDonaldsPreview() {
  const frameRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="iphone" ref={frameRef}>
      {visible && (
        <iframe
          src="https://demo.freakout.net/campaign/PH-McDonalds-JAN26-CatchEmAll-Preview-Content.html"
          title="McDonalds preview"
        />
      )}
    </div>
  );
}



export function MAVAPreview() {
  const frameRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="iphone" ref={frameRef}>
      {visible && (
        <iframe
          src=" https://demo.freakout.net/campaign/MY-Mava-AUG26-DynamicView-Preview-Content.html"
          title="MAVA preview"
        />
      )}
    </div>
  );
}