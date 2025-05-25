export default function sketch(p) {
  let frame = 0;
  const frames = 1000;
  let lines = [];

  const rules = [{
    rewrite: {
      L: "+RF-LFL-FR+",
      R: "-LF+RFR+FL-",
    },
    start: "R",
    angle: 1 / 4,
    lineChars: ["F"],
    depth: 7,
  }];

  const tri = v => 1 - Math.abs(1 - p.fract(v) * 2);
  const invCosn = v => 1 - (p.cos(v * p.TWO_PI) * 0.5 + 0.5);

  const instructionCache = {};

  function getBounds(lines) {
    return {
      minX: lines.reduce((min, { x1, x2 }) => Math.min(min, x1, x2), Infinity),
      maxX: lines.reduce((max, { x1, x2 }) => Math.max(max, x1, x2), -Infinity),
      minY: lines.reduce((min, { y1, y2 }) => Math.min(min, y1, y2), Infinity),
      maxY: lines.reduce((max, { y1, y2 }) => Math.max(max, y1, y2), -Infinity),
    };
  }

  p.frameRate(30);

  p.setup = () => {
    p.createCanvas(800, 800, p.WEBGL);
    p.colorMode(p.HSL, 1);
    p.pixelDensity(1);
    p.noFill();
  };

  p.draw = () => {
    frame += p.deltaTime / (1000 / 60);
    const t = p.fract(frame / frames);
    const rule = rules[0];
    const sig = invCosn(t);
    const depth = Math.floor(1 + rule.depth * sig);
    if (!instructionCache[depth]) {
      let str = rule.start;
      for (let i = 0; i < depth; i++) {
        str = str.split('').map(c => rule.rewrite[c] || c).join('');
      }
      instructionCache[depth] = str;
    }

    let x = 0, y = 0, a = 0;
    const angle = rule.angle;
    const instruction = instructionCache[depth];
    lines = [];
    for (let c of instruction) {
      if (c === '+') {
        a += angle;
      } else if (c === '-') {
        a -= angle;
      } else if (!rule.lineChars || rule.lineChars.includes(c)) {
        const nx = x + p.cos(a * p.TWO_PI);
        const ny = y + p.sin(a * p.TWO_PI);
        lines.push({ x1: x, y1: y, x2: nx, y2: ny });
        x = nx;
        y = ny;
      }
    }

    const { minX, maxX, minY, maxY } = getBounds(lines);
    const w = maxX - minX;
    const h = maxY - minY;
    const s = Math.max(w, h);
    const zoom = 0.9 * p.width / s;

    p.clear();
    p.strokeWeight(1);
    p.scale(zoom);
    p.translate(
      -minX - w / 2,
      -minY - h / 2
    );

    lines.forEach(({ x1, y1, x2, y2 }, i) => {
      const f = i / lines.length;
      const hue = p.fract(1 - tri(f + t * 3) * 0.6);
      const light = 0.5 + 0.15 * tri(f);
      p.stroke(hue, 1, light);
      p.line(x1, y1, x2, y2);
    });
  };
}
