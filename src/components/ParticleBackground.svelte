<script>
  import { onMount } from "svelte";
  import { createNoise3D } from "simplex-noise";
  import ControlPanel from "./ControlPanel.svelte";

  let container;
  let canvasA;
  let canvasB;
  let ctxA;
  let ctxB;
  let center = [0, 0];
  let tick = 0;
  let noise3D = createNoise3D();
  let mouse = { x: 0, y: 0, isActive: false };
  let originalPositions = [];

  export let settings = {
    particleSpeed: 2.0,
    repulsionForce: 6,
    repulsionRadius: 109,
    returnSpeed: 0.02,
    baseHue: 220,
    rangeHue: 193,
    particleCount: 700,
    glowIntensity: 120,
  };

  const particlePropCount = 9;
  const particlePropsLength = settings.particleCount * particlePropCount;
  const rangeY = 200;
  const baseTTL = 50;
  const rangeTTL = 150;
  const baseRadius = 1;
  const rangeRadius = 4;
  const noiseSteps = 8;
  const xOff = 0.00125;
  const yOff = 0.00125;
  const zOff = 0.0005;
  const backgroundColor = "hsla(260,40%,5%,1)";

  let particleProps;

  function handleMouseMove(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouse.isActive = true;
  }

  function handleMouseLeave() {
    mouse.isActive = false;
  }

  function handleSettingsUpdate(event) {
    settings = event.detail;
    // Reinitialize particles if count changes
    if (particleProps.length !== settings.particleCount * particlePropCount) {
      initParticles();
    }
  }

  function rand(n) {
    return Math.random() * n;
  }

  function randRange(n) {
    return n - Math.random() * (n * 2);
  }

  function fadeInOut(t, m) {
    let hm = 0.5 * m;
    return Math.abs(((t + hm) % m) - hm) / hm;
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function cos(n) {
    return Math.cos(n);
  }

  function sin(n) {
    return Math.sin(n);
  }

  function calculateRepulsion(x, y, mouseX, mouseY) {
    const dx = x - mouseX;
    const dy = y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < settings.repulsionRadius) {
      const force =
        (1 - distance / settings.repulsionRadius) * settings.repulsionForce;
      return {
        x: (dx / distance) * force,
        y: (dy / distance) * force,
      };
    }
    return { x: 0, y: 0 };
  }

  function initParticles() {
    tick = 0;
    particleProps = new Float32Array(particlePropsLength);
    originalPositions = [];

    let i;
    for (i = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i);
    }
  }

  function initParticle(i) {
    let x, y, vx, vy, life, ttl, speed, radius, hue;

    x = rand(canvasA.width);
    y = center[1] + randRange(rangeY);
    vx = 0;
    vy = 0;
    life = 0;
    ttl = baseTTL + rand(rangeTTL);
    speed = settings.particleSpeed;
    radius = baseRadius + rand(rangeRadius);
    hue = settings.baseHue + rand(settings.rangeHue);

    originalPositions[i / particlePropCount] = { x, y };
    particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
  }

  function drawParticles() {
    let i;
    for (i = 0; i < particlePropsLength; i += particlePropCount) {
      updateParticle(i);
    }
  }

  function updateParticle(i) {
    let i2 = 1 + i,
      i3 = 2 + i,
      i4 = 3 + i,
      i5 = 4 + i,
      i6 = 5 + i,
      i7 = 6 + i,
      i8 = 7 + i,
      i9 = 8 + i;
    let n, x, y, vx, vy, life, ttl, speed, x2, y2, radius, hue;

    x = particleProps[i];
    y = particleProps[i2];

    // Base movement from noise
    n = noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * Math.PI * 2;
    vx = lerp(particleProps[i3], cos(n), 0.5);
    vy = lerp(particleProps[i4], sin(n), 0.5);

    // Add cursor repulsion
    if (mouse.isActive) {
      const repulsion = calculateRepulsion(x, y, mouse.x, mouse.y);
      vx += repulsion.x;
      vy += repulsion.y;
    }

    // Return to original position when cursor is away
    if (!mouse.isActive) {
      const originalPos = originalPositions[i / particlePropCount];
      const dx = originalPos.x - x;
      const dy = originalPos.y - y;
      vx += dx * settings.returnSpeed;
      vy += dy * settings.returnSpeed;
    }

    life = particleProps[i5];
    ttl = particleProps[i6];
    speed = settings.particleSpeed;
    x2 = x + vx * speed;
    y2 = y + vy * speed;
    radius = particleProps[i8];
    hue = settings.baseHue + rand(settings.rangeHue);

    drawParticle(x, y, x2, y2, life, ttl, radius, hue);

    life++;

    particleProps[i] = x2;
    particleProps[i2] = y2;
    particleProps[i3] = vx;
    particleProps[i4] = vy;
    particleProps[i5] = life;

    (checkBounds(x, y) || life > ttl) && initParticle(i);
  }

  function drawParticle(x, y, x2, y2, life, ttl, radius, hue) {
    ctxA.save();
    ctxA.lineCap = "round";
    ctxA.lineWidth = radius;
    ctxA.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
    ctxA.beginPath();
    ctxA.moveTo(x, y);
    ctxA.lineTo(x2, y2);
    ctxA.stroke();
    ctxA.closePath();
    ctxA.restore();
  }

  function checkBounds(x, y) {
    return x > canvasA.width || x < 0 || y > canvasA.height || y < 0;
  }

  function resize() {
    const { innerWidth, innerHeight } = window;

    canvasA.width = innerWidth;
    canvasA.height = innerHeight;

    ctxA.drawImage(canvasB, 0, 0);

    canvasB.width = innerWidth;
    canvasB.height = innerHeight;

    ctxB.drawImage(canvasA, 0, 0);

    center[0] = 0.5 * canvasA.width;
    center[1] = 0.5 * canvasA.height;
  }

  function renderGlow() {
    ctxB.save();
    ctxB.filter = `blur(8px) brightness(${settings.glowIntensity}%)`;
    ctxB.globalCompositeOperation = "lighter";
    ctxB.drawImage(canvasA, 0, 0);
    ctxB.restore();

    ctxB.save();
    ctxB.filter = `blur(4px) brightness(${settings.glowIntensity}%)`;
    ctxB.globalCompositeOperation = "lighter";
    ctxB.drawImage(canvasA, 0, 0);
    ctxB.restore();
  }

  function renderToScreen() {
    ctxB.save();
    ctxB.globalCompositeOperation = "lighter";
    ctxB.drawImage(canvasA, 0, 0);
    ctxB.restore();
  }

  function draw() {
    tick++;

    ctxA.clearRect(0, 0, canvasA.width, canvasA.height);

    ctxB.fillStyle = backgroundColor;
    ctxB.fillRect(0, 0, canvasA.width, canvasA.height);

    drawParticles();
    renderGlow();
    renderToScreen();

    requestAnimationFrame(draw);
  }

  onMount(() => {
    container = document.querySelector(".particle-container");

    // Initialize canvas contexts
    ctxA = canvasA.getContext("2d");
    ctxB = canvasB.getContext("2d");

    // Set initial canvas size
    resize();

    // Initialize particles
    initParticles();

    // Start animation
    draw();

    // Add event listeners
    window.addEventListener("resize", resize);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  });
</script>

<div class="particle-container">
  <canvas bind:this={canvasA} />
  <canvas bind:this={canvasB} />
  <slot />
  <ControlPanel on:update={handleSettingsUpdate} />
</div>

<style>
  .particle-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    pointer-events: none;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  :global(.content) {
    position: relative;
    z-index: 1;
    pointer-events: auto;
  }
</style>
