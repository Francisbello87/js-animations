class Rectangle {
  constructor({
    x = 0,
    y = 0,
    width = 10,
    height = 10,
    velocityX = 0,
    velocityY = 0,
  }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }

  update(deltaTimeFrameFromPreviousExecution) {
    this.x += this.velocityX * deltaTimeFrameFromPreviousExecution;
    this.y += this.velocityY * deltaTimeFrameFromPreviousExecution;
  }

  render(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

const CANVAS_WIDTH = 450;
const CANVAS_HEIGHT = 450;

const canvas = document.getElementById("canvas");
const logger = document.getElementById("logger");

const dpr = devicePixelRatio;
canvas.width = CANVAS_WIDTH * devicePixelRatio;
canvas.height = CANVAS_HEIGHT * devicePixelRatio;

canvas.style.setProperty("width", CANVAS_WIDTH + "px");
canvas.style.setProperty("height", CANVAS_HEIGHT + "px");

const ctx = canvas.getContext("2d");

const RECTANGLES_COUNT = 50;
const rectangles = [];

for (let i = 0; i < RECTANGLES_COUNT; i++) {
  const radius = Math.random() * 20;
  rectangles.push(
    new Rectangle({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      width: radius,
      height: radius,
      velocityX: 20 + (Math.random() * 2 - 1) * 100,
      velocityY: 20 + (Math.random() * 2 - 1) * 100,
    })
  );
}

let oldTime = 0;

requestAnimationFrame(drawFrame);

function drawFrame(ts) {
  ts /= 1000;
  const deltaTimeFrameFromPreviousExecution = ts - oldTime;
  oldTime = ts;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let i = rectangles.length;
  while (i--) {
    const rect = rectangles[i];
    rect.update(deltaTimeFrameFromPreviousExecution);

    if (
      rect.x > canvas.width ||
      rect.x < -rect.width ||
      rect.y > canvas.height ||
      rect.y < -rect.height
    ) {
      rectangles.splice(i, 1);
      console.log("removed rectangle at index: " + i);
      if (rectangles.length === 0) {
        console.log("removed all rectangles!");
        
      }
    }

    rect.render(ctx);
  }

  requestAnimationFrame(drawFrame);
}
