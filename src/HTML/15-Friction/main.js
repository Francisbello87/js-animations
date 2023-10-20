class Rectangle {
  constructor({
    x = 0,
    y = 0,
    width = 10,
    height = 10,
    velocityX = 0,
    velocityY = 0,
    friction = 1,
    gravity = 0,
    color = "black",
  }) {
    this.gravity = gravity;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.color = color;
    this.friction = friction;
  }

  update(deltaTimeFrameFromPreviousExecution) {
    this.velocityX *= this.friction;

    this.velocityY += this.gravity * deltaTimeFrameFromPreviousExecution;

    this.x += this.velocityX * deltaTimeFrameFromPreviousExecution;
    this.y += this.velocityY * deltaTimeFrameFromPreviousExecution;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}


const CANVAS_WIDTH = 450;
const CANVAS_HEIGHT = 450;

const canvas = document.getElementById("canvas");

const dpr = devicePixelRatio;
canvas.width = CANVAS_WIDTH * devicePixelRatio;
canvas.height = CANVAS_HEIGHT * devicePixelRatio;

canvas.style.setProperty("width", CANVAS_WIDTH + "px");
canvas.style.setProperty("height", CANVAS_HEIGHT + "px");

const ctx = canvas.getContext("2d");

const GRAVITY = 160;
const rectangles = [];

spawnRect();
setInterval(spawnRect, 2000);

let oldTime = 0;

requestAnimationFrame(drawFrame);

function spawnRect() {
  const rectangle = new Rectangle({
    x: 0,
    y: 100,
    width: 20,
    height: 20,
    velocityX: Math.random() * 500 + 500,
    velocityY: Math.random() * 200 + 200,
    friction: 0.99,
    gravity: GRAVITY,
    color: getRandomRGBColor(),
  });
  rectangles.push(rectangle);
}


function drawFrame(ts) {
  ts /= 1000;
  const deltaTimeFrameFromPreviousExecution = ts - oldTime;
  oldTime = ts;

 
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let i = rectangles.length;
  while (i--) {
    const rect = rectangles[i];
    rect.update(deltaTimeFrameFromPreviousExecution);

    checkBoundaries(rect);

    rect.render(ctx);
  }

  requestAnimationFrame(drawFrame);
}

function checkBoundaries(rect) {
  if (rect.x > canvas.width - rect.width) {
    rect.velocityX *= -1;
  } else if (rect.x < 0) {
    rect.velocityX *= -1;
  }

  if (rect.y > canvas.height - rect.height) {
    rect.velocityY *= -1;
    rect.y = canvas.height - rect.height;
    rect.velocityY *= 0.5;
  } else if (rect.y < 0) {
    rect.velocityY *= -1;
  }
}

function getRandomRGBColor() {
  const randomR = Math.random() * 255;
  const randomG = Math.random() * 255;
  const randomB = Math.random() * 255;
  return `rgba(${randomR}, ${randomG}, ${randomB})`;
}
