const CANVAS_WIDTH = 512;
const CANVAS_HEIGHT = 512;

const canvas = document.getElementById("canvas");

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const ctx = canvas.getContext("2d");

requestAnimationFrame(drawFrame);

function drawFrame(ts) {
  ts /= 1000;

  ctx.moveTo(50, 50);
  ctx.lineTo(300, 300);
  ctx.stroke();
  requestAnimationFrame(drawFrame);
}
