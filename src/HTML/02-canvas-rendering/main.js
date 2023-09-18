const CANVAS_WIDTH = 612;
const CANVAS_HEIGHT = 612;

const canvas = document.getElementById("canvas");

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const ctx = canvas.getContext("2d");

const image = new Image();
image.onload = function () {
  video.onloadeddata = function () {
    video.play();
    requestAnimationFrame(drawFrame);
  };
  video.src = "/assets/sample-video.mp4";
};
image.src = "/assets/photo-1494790108377-be9c29b29330.webp";
const video = document.createElement("video");

function drawFrame(ts) {
  ts /= 1000;

  // clear Command
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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
  ctx.fillRect(100, 100, 150, 100);
  ctx.strokeRect(100, 100, 150, 100);

  //   Circle
  const circleX = 150;
  const circleY = 150;
  const circleRadius = 30;
  const startAngle = 0;
  const endAngle = Math.PI * 2;

  ctx.fillStyle = "pink";
  ctx.beginPath();
  ctx.arc(circleX, circleY, circleRadius, startAngle, endAngle);
  ctx.closePath();
  ctx.fill();

  // Lines
  ctx.lineWidth = 2;
  ctx.strokeStyle = "greenyellow";

  ctx.beginPath();
  ctx.moveTo(125, 350);
  ctx.lineTo(175, 350);
  ctx.lineTo(175, 350 - 20);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  // Paths

  // Quadratic
  ctx.lineWidth = 2;
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(125, 450);
  ctx.quadraticCurveTo(150, 400, 175, 450);
  ctx.stroke();

  // Bezier
  ctx.lineWidth = 2;
  ctx.strokeStyle = "orange";
  ctx.beginPath();
  const startX = 50;
  const startY = 350;
  const cp1x = startX + 50;
  const cp1y = startY - 50 + 20;
  const cp2x = startX + 100;
  const cp2y = startY - 50;
  const endX = startX + 150;
  const endY = startY;

  ctx.moveTo(startX, startY);
  ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
  ctx.stroke();

  // Text
  ctx.font = "2em monospace";
  ctx.fillText("Hello World", 250, 100);

  ctx.fillStyle = "red";
  ctx.font = "2em monospace";
  ctx.strokeText("Hello to you", 250, 150);

  // Image

  ctx.drawImage(
    image,
    250,
    200,
    image.naturalWidth * 0.25,
    image.naturalHeight * 0.25
  );

  // video

  ctx.drawImage(
    video,
    250,
    450,
    video.videoWidth * 0.5,
    video.videoHeight * 0.5
  );
  requestAnimationFrame(drawFrame);
}
