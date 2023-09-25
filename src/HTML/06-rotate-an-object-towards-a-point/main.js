const CANVAS_WIDTH = 550;
const CANVAS_HEIGHT = 550;

const canvas = document.getElementById("canvas");

const dpr = devicePixelRatio;
canvas.width = CANVAS_WIDTH * devicePixelRatio;
canvas.height = CANVAS_HEIGHT * devicePixelRatio;

canvas.style.setProperty("width", CANVAS_WIDTH + "px");
canvas.style.setProperty("height", CANVAS_HEIGHT + "px");

const ctx = canvas.getContext("2d");

const mousePosition = {
  x: 0,
  y: 0,
};

requestAnimationFrame(drawFrame);

canvas.addEventListener("mousemove", function (event) {
  const mouseX = event.layerX;
  const mouseY = event.layerY;
  mousePosition.x = mouseX;
  mousePosition.y = mouseY;
});

function drawFrame(ts) {
  ts /= 1000;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const arrowWidth = 200;

  ctx.lineWidth = 2;
  ctx.strokeStyle = "green";
  ctx.fillStyle = "yellow";

  const dx = mousePosition.x - centerX;
  const dy = mousePosition.y - centerY;
  const angle = Math.atan2(dy, dx);

  ctx.save();

  ctx.translate(centerX, centerY);
  ctx.rotate(angle);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -10);
  ctx.lineTo(arrowWidth / 2, -10);
  ctx.lineTo(arrowWidth / 2, -20);
  ctx.lineTo(arrowWidth, 0);
  ctx.lineTo(arrowWidth / 2, 20);
  ctx.lineTo(arrowWidth / 2, 10);
  ctx.lineTo(0, 10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.restore();

  requestAnimationFrame(drawFrame);
}
