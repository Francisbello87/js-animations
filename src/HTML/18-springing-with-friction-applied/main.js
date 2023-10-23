const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

const canvas = document.getElementById("canvas");

const dpr = devicePixelRatio;
canvas.width = CANVAS_WIDTH * devicePixelRatio;
canvas.height = CANVAS_HEIGHT * devicePixelRatio;

canvas.style.setProperty("width", CANVAS_WIDTH + "px");
canvas.style.setProperty("height", CANVAS_HEIGHT + "px");

const ctx = canvas.getContext("2d");

let oldTime = 0;

let startX = 100;
let startY = 100;
let startScale = 1;

let endX = 400;
let endY = 400;
let endScale = 2;

let currX = startX;
let currY = startY;
let currentScale = startScale;

let velocityX = 0;
let velocityY = 0;
let velocityScale = 0;

canvas.addEventListener("click", function () {
  let tempX = startX;
  startX = endX;
  endX = tempX;

  let tempY = startY;
  startY = endY;
  endY = tempY;

  let tempScale = startScale;
  startScale = endScale;
  endScale = tempScale;
});

requestAnimationFrame(drawFrame);

function drawFrame(ts) {
  ts /= 1000;
  const deltaTimeFrameFromPreviousExecution = ts - oldTime;
  oldTime = ts;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#aaa";
  ctx.fillStyle = "#888";

  ctx.beginPath();
  ctx.arc(startX, startY, 40 * startScale, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(endX, endY, 40 * endScale, 0, Math.PI * 2);
  ctx.stroke();

  // animate our object
  const speed = deltaTimeFrameFromPreviousExecution * 3;

  const accelerationX = (endX - currX) * speed;
  const accelerationY = (endY - currY) * speed;
  const accelerationScale = (endScale - currentScale) * speed;

  velocityX += accelerationX;
  velocityY += accelerationY;
  velocityScale += accelerationScale;

  const frictionFactor = 0.9;

  velocityX *= frictionFactor;
  velocityY *= frictionFactor;
  velocityScale *= frictionFactor;

  currX += velocityX;
  currY += velocityY;
  currentScale += velocityScale;

  ctx.fillStyle = "pink";
  ctx.beginPath();
  ctx.arc(currX, currY, 40 * currentScale, 0, Math.PI * 2);
  ctx.fill();

  requestAnimationFrame(drawFrame);
}
