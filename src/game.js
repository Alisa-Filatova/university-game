import {
  playerImageSource,
  startPointImageSource,
  regularPointImageSource,
  targetPointImageSource,
  finishPointImageSource,
} from './data/images';
import { tracks, pathPoints, pointSize } from './data/game-path';
import { randomNumberFromInterval, disableButton } from './helpers/common';
import { moveObjectInBezierCurve } from './helpers/canvas-draw';

const playButton = document.querySelector('.play-button');
const stepBox = document.querySelector('.game-step');

const player = {
  image: playerImageSource,
  width: 21,
  height: 69,
  x: 441,
  y: 505,
  speed: 0.03,
  time: 0,
};

const startPointImage = new Image();
startPointImage.src = startPointImageSource;

const finishPointImage = new Image();
finishPointImage.src = finishPointImageSource;

const regularPointImage = new Image();
regularPointImage.src = regularPointImageSource;

const targetPointImage = new Image();
targetPointImage.src = targetPointImageSource;

const playerImage = new Image();
playerImage.src = player.image;

const track = [];

tracks.forEach(({ bezierCurves }) => {
  bezierCurves.forEach((curve) => track.push(curve));
});

const drawPlayer = () => {
  const canvas = document.getElementById('player');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let playerX = Math.ceil(player.x - player.width / 2);
  let playerY = Math.ceil(player.y - player.height);

  ctx.drawImage(playerImage, playerX, playerY, player.width, player.height);
}

const drawGamePath = () => {
  const canvas = document.getElementById('game-path');
  const ctx = canvas.getContext('2d');

  ctx.lineWidth = '10';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowOffsetX = 1.5;
  ctx.shadowOffsetY = 1.5;

  tracks.forEach(({ start, bezierCurves, color }) => {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    bezierCurves.forEach((path) => ctx.bezierCurveTo(...path));
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  });
}

const drawPoints = () => {
  const canvas = document.getElementById('game-path');
  const ctx = canvas.getContext('2d');

  const drawPoint = (point, image, size) => {
    image.addEventListener('load', () => {
      ctx.drawImage(image, point.x, point.y, size.width, size.height);
    });
  };

  pathPoints.forEach((point) => {
    if (point.type === 'start') {
      drawPoint(point, startPointImage, pointSize.l);
    } else if (point.type === 'finish') {
      drawPoint(point, finishPointImage, pointSize.l);
    } else if (point.type === 'regular') {
      drawPoint(point, regularPointImage, pointSize.s);
    } else if (point.type === 'target') {
      drawPoint(point, targetPointImage, pointSize.m);
    } else {
      throw new Error('Unknown point type.');
    }
  });
}

let playerMoves = false;

let currentCurveIndex = 0;
let targetCurveIndex;

let prevX;
let prevY;

const animatePlayer = () => {
  if (playerMoves) {
    moveObjectInBezierCurve(player, track[currentCurveIndex]);
    drawPlayer();

    if (player.x === prevX && player.y === prevY) {
      if (currentCurveIndex < targetCurveIndex) {
        currentCurveIndex += 1;
      } else {
        playerMoves = false;
        disableButton(playButton, false);
      }
    }

    prevX = player.x;
    prevY = player.y;

  } else {
    drawPlayer();
  }

  requestAnimationFrame(animatePlayer);
};

drawGamePath();
drawPoints();
animatePlayer();

playButton.addEventListener('click', (event) => {
  event.preventDefault();
  const step = randomNumberFromInterval(1, 5);
  targetCurveIndex = currentCurveIndex + step;
  disableButton(playButton, true);

  if (currentCurveIndex < targetCurveIndex) {
    playerMoves = true;
    stepBox.textContent = step + 1;
  } else {
    playerMoves = false;
    stepBox.textContent = 'Победа!';
  }
});
