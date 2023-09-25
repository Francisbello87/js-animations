const CANVAS_WIDTH = 550;
const CANVAS_HEIGHT = 550;

const canvas = document.getElementById("canvas");

const dpr = devicePixelRatio;
canvas.width = CANVAS_WIDTH * devicePixelRatio;
canvas.height = CANVAS_HEIGHT * devicePixelRatio;

canvas.style.setProperty("width", CANVAS_WIDTH + "px");
canvas.style.setProperty("height", CANVAS_HEIGHT + "px");

const ctx = canvas.getContext("2d");

// let posX = 100;
let posX = canvas.width / 2;
// let posY = 100;
let posY = canvas.height / 2;

// const velocityX = Math.random() * 2;
// const velocityY = Math.random() * 2;

let oldTime = 0;

requestAnimationFrame(drawFrame);

function drawFrame(ts) {
  ts /= 1000;

  const deltaTimeFrameFromPreviousExecution = ts - oldTime;
  oldTime = ts;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  posX += deltaTimeFrameFromPreviousExecution * 100;
  posY += deltaTimeFrameFromPreviousExecution * 50;
  // posY += velocityY;
  ctx.fillRect(posX, posY, 40, 40);

  requestAnimationFrame(drawFrame);
}
