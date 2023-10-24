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



let oldTime = 0;



requestAnimationFrame(drawFrame);

function drawFrame(ts) {
  ts /= 1000;
  const deltaTimeFrameFromPreviousExecution = ts - oldTime;
  oldTime = ts;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

 
  requestAnimationFrame(drawFrame);
}
