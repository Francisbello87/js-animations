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

let currX = canvas.width / 2;
let currY = canvas.height / 2;

let endX = currX;
let endY = currY;

canvas.addEventListener("mousemove", function (e) {
  endX = e.layerX;
  endY = e.layerY;
});

requestAnimationFrame(drawFrame);

function drawFrame(ts) {
  ts /= 1000;
  const deltaTimeFrameFromPreviousExecution = ts - oldTime;
  oldTime = ts;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const speed = deltaTimeFrameFromPreviousExecution * 5;

  currX += (endX - currX) * speed;
  currY += (endY - currY) * speed;

  ctx.fillStyle = "pink";
  ctx.beginPath();
  ctx.arc(currX, currY, 20, 0, Math.PI * 2);
  ctx.fill();

  requestAnimationFrame(drawFrame);
}
