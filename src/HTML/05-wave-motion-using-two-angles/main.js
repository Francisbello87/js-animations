const CANVAS_WIDTH = 550;
const CANVAS_HEIGHT = 550;

const canvas = document.getElementById("canvas");

const dpr = devicePixelRatio;
canvas.width = CANVAS_WIDTH * devicePixelRatio;
canvas.height = CANVAS_HEIGHT * devicePixelRatio;

canvas.style.setProperty("width", CANVAS_WIDTH + "px");
canvas.style.setProperty("height", CANVAS_HEIGHT + "px");

const ctx = canvas.getContext("2d");

let angle1 = 0;
let angle2 = 0;

requestAnimationFrame(drawFrame);

function drawFrame(ts) {
  ts /= 1000;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const circleX = canvas.width / 2;
  const circleY = canvas.height / 2;
  const circleRadius = 100;

  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(
    circleX + Math.sin(angle1) * 50,
    circleY + Math.sin(angle2) * 100,
    circleRadius,
    0,
    Math.PI * 2,
    false
  );
  ctx.fill();

  angle1 += 0.1;
  angle2 += 0.2;

  requestAnimationFrame(drawFrame);
}
