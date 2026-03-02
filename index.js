const gameArea = document.getElementById("game-screen");
const gameRect = gameArea.getBoundingClientRect();
const player = document.getElementById("player");
const obstacles = document.querySelectorAll(".obstacle");
let x = 45;
let y = 230;

document.addEventListener("keydown", move);

function move(e) {
  let dx = 0;
  let dy = 0;

  if (e.key === 'ArrowUp') dy = -10;
  if (e.key === 'ArrowDown') dy = 10;
  if (e.key === 'ArrowLeft') dx = -10;
  if (e.key === 'ArrowRight') dx = 10;

  x += dx;
  y += dy;

  obstacles.forEach(obstacle => {
    const obstacleLeft = obstacle.offsetLeft;
    const obstacleTop = obstacle.offsetTop;
    const obstacleRight = obstacleLeft + obstacle.offsetWidth;
    const obstacleBottom = obstacleTop + obstacle.offsetHeight;

    const playerRight = x + player.offsetWidth;
    const playerBottom = y + player.offsetHeight;

    const colliding =
      playerRight > obstacleLeft &&
      x < obstacleRight &&
      playerBottom > obstacleTop &&
      y < obstacleBottom;

    if (colliding) {
      
      if (dx > 0) {
        x = obstacleLeft - player.offsetWidth;
      }
      
      if (dx < 0) {
        x = obstacleRight;
      }
   
      if (dy > 0) {
        y = obstacleTop - player.offsetHeight;
      }
      
      if (dy < 0) {
        y = obstacleBottom;
      }
    }
  });

  player.style.left = `${x}px`;
  player.style.top = `${y}px`;
}