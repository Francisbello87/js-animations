const CANVAS_WIDTH = 450;
const CANVAS_HEIGHT = 450;

const canvas = document.getElementById("canvas");

const dpr = devicePixelRatio;
canvas.width = CANVAS_WIDTH * devicePixelRatio;
canvas.height = CANVAS_HEIGHT * devicePixelRatio;

canvas.style.setProperty("width", CANVAS_WIDTH + "px");
canvas.style.setProperty("height", CANVAS_HEIGHT + "px");

const ctx = canvas.getContext("2d");

let oldTime = 0;
let positionX = 100;
let positionY = 100;

let velocityX = 0;
let velocityY = 0;

let accelerationX = 0;
let accelerationY = 0;

const KEY_DOWN_ACCELERATION = 4;
const RECT_WIDTH = 20;
const RECT_HEIGHT = 20;
const GRAVITY = 1;

document.addEventListener("keydown", function (event) {
  // console.log(event.keyCode);
  if (event.keyCode === 30) {
    accelerationY = -KEY_DOWN_ACCELERATION;
  } else if (event.keyCode === 40) {
    accelerationY = KEY_DOWN_ACCELERATION;
  } else if (event.keyCode === 37) {
    accelerationX = -KEY_DOWN_ACCELERATION;
  } else if (event.keyCode === 39) {
    accelerationX = KEY_DOWN_ACCELERATION;
  }
});

document.addEventListener("keyup", function (event) {
  accelerationX = 0;
  accelerationY = 0;
});
requestAnimationFrame(drawFrame);

function drawFrame(ts) {
  ts /= 1000;
  const deltaTimeFrameFromPreviousExecution = ts - oldTime;
  oldTime = ts;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  velocityX += accelerationX * deltaTimeFrameFromPreviousExecution;
  velocityY += accelerationY * deltaTimeFrameFromPreviousExecution;
  velocityY += GRAVITY * deltaTimeFrameFromPreviousExecution;

  positionX += velocityX;
  positionY += velocityY;

  ctx.fillRect(positionX, positionY, RECT_WIDTH, RECT_HEIGHT);

  requestAnimationFrame(drawFrame);
}
