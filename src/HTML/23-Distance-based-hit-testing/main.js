class Circle {
  constructor({ x = 0, y = 0, radius = 30, color = "black" }) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

const CANVAS_WIDTH = 512;
const CANVAS_HEIGHT = 512;

const canvas = document.getElementById("canvas");
const hint = document.getElementById("hint");

const dpr = devicePixelRatio;
canvas.width = CANVAS_WIDTH * devicePixelRatio;
canvas.height = CANVAS_HEIGHT * devicePixelRatio;

canvas.style.setProperty("width", CANVAS_WIDTH + "px");
canvas.style.setProperty("height", CANVAS_HEIGHT + "px");

const ctx = canvas.getContext("2d");

const circle0 = new Circle({
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 50,
  color: getRandomRGBColor(),
});

const circle1 = new Circle({
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 50,
  color: getRandomRGBColor(),
});

let oldTime = 0;

canvas.addEventListener("mousemove", function (event) {
  const mouseX = event.layerX;
  const mouseY = event.layerY;

  circle1.x = mouseX;
  circle1.y = mouseY;

  const dx = circle1.x - circle0.x;
  const dy = circle1.y - circle0.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  hint.textContent =
    distance < circle1.radius + circle0.radius
      ? "Circle overlap"
      : "Circles do not overlap each other";
});

requestAnimationFrame(drawFrame);

function drawFrame(ts) {
  ts /= 1000;
  const deltaTimeFrameFromPreviousExecution = ts - oldTime;
  oldTime = ts;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  circle0.render(ctx);
  circle1.render(ctx);

  requestAnimationFrame(drawFrame);
}

function getRandomRGBColor() {
  const randomR = Math.random() * 255;
  const randomG = Math.random() * 255;
  const randomB = Math.random() * 255;
  return `rgba(${randomR}, ${randomG}, ${randomB})`;
}

function checkHitTest(rectA, rectB) {
  const isHit = !(
    rectA.x + rectA.width < rectB.x ||
    rectB.x + rectB.width < rectA.x ||
    rectA.y + rectA.height < rectB.y ||
    rectB.y + rectB.height < rectA.y
  );
  return isHit;
}
