class Rectangle {
  constructor({ x, y, width = 10, height = 10, color = "greenyellow" }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.velocityY = 0;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

const canvas = document.getElementById("canvas");
// const hint = document.getElementById("hint");

const dpr = devicePixelRatio;
canvas.width = CANVAS_WIDTH * devicePixelRatio;
canvas.height = CANVAS_HEIGHT * devicePixelRatio;

canvas.style.setProperty("width", CANVAS_WIDTH + "px");
canvas.style.setProperty("height", CANVAS_HEIGHT + "px");

const ctx = canvas.getContext("2d");

const GRAVITY = 8;
const boxes = [];

let activeBox = createBox();

let oldTime = 0;

requestAnimationFrame(drawFrame);


function drawFrame(ts) {
  ts /= 1000;
  const deltaTimeFrameFromPreviousExecution = ts - oldTime;
  oldTime = ts;

 
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  activeBox.velocityY += GRAVITY * deltaTimeFrameFromPreviousExecution;
  activeBox.y += activeBox.velocityY;

  if (activeBox.y + activeBox.height > canvas.height) {
    activeBox.y = canvas.height - activeBox.height;
    activeBox = createBox();
  }

  boxes.forEach((box) => {
    if (activeBox !== box && checkHitTest(activeBox, box)) {
      activeBox.y = box.y - activeBox.height;
      activeBox = createBox();
    }
    box.render(ctx);
  });

  requestAnimationFrame(drawFrame);
}

function createBox() {
  const width = Math.random() * 50 + 20;
  const height = Math.random() * 50 + 20;
  const box = new Rectangle({
    x: Math.random() * canvas.width,
    y: -height,
    width,
    height,
    color: getRandomRGBColor(),
  });
  boxes.push(box);
  return box;
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
