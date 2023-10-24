class Rectangle {
  constructor({
    x = 0,
    y = 0,
    width = 10,
    height = 10,
    velocityX = 0,
    velocityY = 0,
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
  }

  update(deltaTimeFrameFromPreviousExecution) {
    this.velocityY += this.gravity * deltaTimeFrameFromPreviousExecution;
    this.x += this.velocityX * deltaTimeFrameFromPreviousExecution;
    this.y += this.velocityY * deltaTimeFrameFromPreviousExecution;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
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

const box0 = new Rectangle({
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 100,
  height: 100,
  color: getRandomRGBColor(),
});

const box1 = new Rectangle({
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 100,
  height: 100,
  color: getRandomRGBColor(),
});

let oldTime = 0;

canvas.addEventListener("mousemove", function (event) {
  const mouseX = event.layerX;
  const mouseY = event.layerY;
  box1.x = mouseX - box1.width/2;
  box1.y = mouseY - box1.height/2;
  const hit = checkHitTest(box0, box1);
  hint.textContent = hit ? "Boxes overlap" : "Boxes do not overlap";
});

requestAnimationFrame(drawFrame);


function drawFrame(ts) {
  ts /= 1000;
  const deltaTimeFrameFromPreviousExecution = ts - oldTime;
  oldTime = ts;

 
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  box0.render(ctx);
  box1.render(ctx);

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
