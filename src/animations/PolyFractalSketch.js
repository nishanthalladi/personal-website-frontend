export default function sketch(p) {
    let t;
    let frame = 0;
    const frames = 500;
    const maxDepth = 2;
    let n = 12;
    const drawSize = 500;

    const geometryCache = new Map();

    const polarCache = Array.from({ length: n + 1 }, (_, i) => {
        const angle = (i / n + 0.25) * p.TWO_PI;
        return {
          x: p.cos(angle),
          y: p.sin(angle)
        };
      });

    p.frameRate(30);
  
    p.setup = () => {
      p.createCanvas(drawSize, drawSize, p.WEBGL);
      p.colorMode(p.HSL, 1);
      for (let i = 0; i <= 100; i++) {
        const depth = i / 50;
        const segments = [];
        drawFractal(0.5, 0.5, 1 / 2.5, depth, segments);
        geometryCache.set(depth, segments);
      }
    };
  
    function invCosn(v) {
      return 1 - (p.cos(v * p.TWO_PI) * 0.5 + 0.5);
    }
  
    p.draw = () => {
      const speed = 2;
      frame += (p.deltaTime / (1000 / 60)) * speed;
      const pingPongT = (frame % (2 * frames)) / frames;
      t = pingPongT <= 1 ? pingPongT : 2 - pingPongT;

      p.clear();
  
      p.strokeWeight(2);
  
      const depthIndex = Math.floor(t * 100);
      const depth = depthIndex / 50;
      const segments = geometryCache.get(depth);
  
      if (segments) {
        segments.forEach(({ x1, y1, x2, y2, hue, light }) => {
          p.stroke(p.color(hue, 0.75, light));
          p.line(x1, y1, x2, y2);
        });
      }
    };
  
    function polar(angle, radius) {
      return {
        x: p.cos(angle * p.TWO_PI) * radius,
        y: p.sin(angle * p.TWO_PI) * radius,
      };
    }
  
    function drawFractal(x, y, size, depth, segments) {
      const df = p.constrain(depth, 0, 1);
      for (let i = 0; i < n; i++) {
        const f = i / n;
        const angle = f + 0.25;
  
        if (depth > 0) {
          const scale = 0.5;
          const r = size * (df * scale);
          const p1 = polar(angle, r);
          const s = size * (1 - df * scale);
          drawFractal(x + p1.x, y + p1.y, s, depth - 1, segments);
        } else {
          const dir1 = polarCache[i];
          const dir2 = polarCache[(i + 1) % n];
          const p1 = { x: dir1.x * size, y: dir1.y * size };
          const p2 = { x: dir2.x * size, y: dir2.y * size };
  
          segments.push({
            x1: (x + p1.x - 0.5) * drawSize,
            y1: (y + p1.y - 0.5) * drawSize,
            x2: (x + p2.x - 0.5) * drawSize,
            y2: (y + p2.y - 0.5) * drawSize,
            hue: (0.1 + y * 0.06) % 1,
            light: p.constrain((y - 0.5) * 0.8 + 0.5, 0, 1),
          });
        }
      }
    }
  }