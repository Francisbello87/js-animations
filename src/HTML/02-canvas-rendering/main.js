const CANVAS_WIDTH = 512;
const CANVAS_HEIGHT = 512;

const canvas = document.getElementById("canvas");

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const ctx = canvas.getContext("2d");

requestAnimationFrame(drawFrame);

function drawFrame(ts) {
  ts /= 1000;

  const gradient = ctx.createLinearGradient(100, 100, 250, 200);
  gradient.addColorStop(0, "blue");
  gradient.addColorStop(1, "green");

  ctx.fillStyle = gradient;
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  //   Rectangle
  //   ctx.rect(100, 100, 250, 200);
  //   ctx.fill();
  //   ctx.stroke();
  ctx.fillRect(100, 100, 250, 200);
  ctx.strokeRect(100, 100, 250, 200);

  //   Circle

  requestAnimationFrame(drawFrame);
}
