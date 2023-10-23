class Circle {
  constructor({ x, y, radius, color }) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.velocityX = 0;
    this.velocityY = 0;
    this.frictionFactor = 0.9;
  }

  springTo(target, deltaTimeFrameFromPreviousExecution) {
    const accelerationX =
      (target.x - this.x) * deltaTimeFrameFromPreviousExecution;
    const accelerationY =
      (target.y - this.y) * deltaTimeFrameFromPreviousExecution;

    this.velocityX += accelerationX;
    this.velocityY += accelerationY;

    this.velocityX *= this.frictionFactor;
    this.velocityY *= this.frictionFactor;

    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

const canvas = document.getElementById("canvas");

const dpr = devicePixelRatio;
canvas.width = CANVAS_WIDTH * devicePixelRatio;
canvas.height = CANVAS_HEIGHT * devicePixelRatio;

canvas.style.setProperty("width", CANVAS_WIDTH + "px");
canvas.style.setProperty("height", CANVAS_HEIGHT + "px");

const ctx = canvas.getContext("2d");

const CIRCLES_COUNT = 20;
const circles = [];
const mousePosition = { x: canvas.width / 2, y: canvas.height / 2 };

for (let i = 0; i < CIRCLES_COUNT; i++) {
  const circle = new Circle({
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10 + Math.random() * 40,
    color: getRandomRGBColor(),
  });
  circles.push(circle);
}

let oldTime = 0;

canvas.addEventListener("mousemove", function (event) {
  mousePosition.x = event.layerX;
  mousePosition.y = event.layerY;
});

requestAnimationFrame(drawFrame);

function drawFrame(ts) {
  ts /= 1000;
  const deltaTimeFrameFromPreviousExecution = ts - oldTime;
  oldTime = ts;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < CIRCLES_COUNT; i++) {
    const circle = circles[i];

    if (i === 0) {
      ctx.beginPath();
      ctx.moveTo(mousePosition.x, mousePosition.y);
      ctx.lineTo(circle.x, circle.y);
    } else {
      const prevCircle = circles[i - 1];
      ctx.lineTo(circle.x, circle.y);
    }
  }
  ctx.stroke();

  for (let i = 0; i < CIRCLES_COUNT; i++) {
    const circle = circles[i];

    if (i === 0) {
      circle.springTo(mousePosition, deltaTimeFrameFromPreviousExecution);
    } else {
      const prevCircle = circles[i - 1];
      circle.springTo(prevCircle, deltaTimeFrameFromPreviousExecution);
    }

    circle.render(ctx);
  }

  requestAnimationFrame(drawFrame);
}

function getRandomRGBColor() {
  const randomR = Math.random() * 255;
  const randomG = Math.random() * 255;
  const randomB = Math.random() * 255;
  return `rgba(${randomR}, ${randomG}, ${randomB})`;
}
