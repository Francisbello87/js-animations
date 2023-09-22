const CANVAS_WIDTH = 525;
const CANVAS_HEIGHT = 525;

const canvas = document.getElementById("canvas");

const dpr = devicePixelRatio;
canvas.width = CANVAS_WIDTH * devicePixelRatio;
canvas.height = CANVAS_HEIGHT * devicePixelRatio;

canvas.style.setProperty("width", CANVAS_WIDTH + "px");
canvas.style.setProperty("height", CANVAS_HEIGHT + "px");

const ctx = canvas.getContext("2d");

requestAnimationFrame(drawFrame);

function drawFrame(ts) {
  ts /= 1000;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const circleX = canvas.width / 2;
  const circleY = canvas.height / 2;
  const circleRadius = 100 + Math.sin(ts * 5) * 20;

  const circleStartAngle = 0;
  const circleEndAngle = Math.PI * 2;
  const circleCounterclockwise = false;

  ctx.fillStyle = "greenyellow";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(
    circleX,
    circleY,
    circleRadius,
    circleStartAngle,
    circleEndAngle,
    circleCounterclockwise
  );
  ctx.fill();
  ctx.stroke();

  requestAnimationFrame(drawFrame);
}
