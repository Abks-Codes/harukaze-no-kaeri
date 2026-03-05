const gameScreen = document.getElementById("game-screen");
const player = document.getElementById("player");
const obstacles = document.querySelectorAll(".obstacle");
const healthBar = document.getElementById("health-bar");


let health = 100;
let x = 45;
let y = 230;
const ZOOM = 2;
const keys = {};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup",   e => keys[e.key] = false);

function move() {
  let dx = 0;
  let dy = 0;

  if (keys['ArrowUp'])    dy = -3;
  if (keys['ArrowDown'])  dy = 3;
  if (keys['ArrowLeft'])  dx = -3;
  if (keys['ArrowRight']) dx = 3;




  x += dx;
  y += dy;

  obstacles.forEach(obstacle => {
    const obstacleLeft   = obstacle.offsetLeft;
    const obstacleTop    = obstacle.offsetTop;
    const obstacleRight  = obstacleLeft + obstacle.offsetWidth;
    const obstacleBottom = obstacleTop  + obstacle.offsetHeight;

    const playerRight  = x + player.offsetWidth;
    const playerBottom = y + player.offsetHeight;

    const colliding =
      playerRight  > obstacleLeft &&
      x            < obstacleRight &&
      playerBottom > obstacleTop &&
      y            < obstacleBottom;

    if (colliding) {
      if (dx > 0) x = obstacleLeft - player.offsetWidth;
      if (dx < 0) x = obstacleRight;
      if (dy > 0) y = obstacleTop  - player.offsetHeight;
      if (dy < 0) y = obstacleBottom;
    }
  });

  player.style.left = `${x}px`;
  player.style.top  = `${y}px`;
  updateCamera();
}

function updateCamera() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const offsetX = centerX / ZOOM - x - player.offsetWidth / 2;
  const offsetY = centerY / ZOOM - y - player.offsetHeight / 2;

  gameScreen.style.transform = `scale(${ZOOM}) translate(${offsetX}px, ${offsetY}px)`;
}

function gameLoop() {
  move();
  requestAnimationFrame(gameLoop);
}

gameLoop();