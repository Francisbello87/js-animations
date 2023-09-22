const CANVAS_WIDTH = 550;
const CANVAS_HEIGHT = 550;

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
  const circleRadius = 100 + Math.sin(ts * 2) * 99;

  const circleStartAngle = 0;
  const circleEndAngle = Math.PI * 2;
  const circleCounterclockwise = false;

  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(
    circleX,
    circleY,
    circleRadius,
    circleStartAngle,
    circleEndAngle,
    circleCounterclockwise
  );
  ctx.stroke();

  ctx.fillStyle = "green";

  const angle = ts * 4;

  const moveX = circleX - Math.cos(angle) * circleRadius;
  const moveY = circleY - Math.sin(angle) * circleRadius;

  ctx.beginPath();
  ctx.arc(
    moveX,
    moveY,
    20 + Math.cos(ts * 2) * 10,
    circleStartAngle,
    circleEndAngle,
    circleCounterclockwise
  );
  ctx.fill();

  const moveX2 = circleX - Math.cos(angle + Math.PI) * circleRadius;
  const moveY2 = circleY - Math.sin(angle + Math.PI) * circleRadius;
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(
    moveX2,
    moveY2,
    30 + Math.cos(ts * 2) * 20,
    circleStartAngle,
    circleEndAngle,
    circleCounterclockwise
  );
  ctx.fill();

  const moveX3 = circleX - Math.cos(angle + Math.PI * 2.5) * circleRadius;
  const moveY3 = circleY - Math.sin(angle + Math.PI / 2.5) * circleRadius;
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(
    moveX3,
    moveY3,
    40 + Math.cos(ts * 2) * 20,
    circleStartAngle,
    circleEndAngle,
    circleCounterclockwise
  );
  ctx.fill();

  requestAnimationFrame(drawFrame);
}
