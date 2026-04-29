const jet = document.getElementById("jet");
const board = document.getElementById("board");
const scoreDisplay = document.getElementById("score");

/* ------------------ GAME STATE ------------------ */
let score = 0;
let gamePaused = false;
let gameOver = false;
let shooting = false;

/* ------------------ SETTINGS ------------------ */
let enemySpeed = 3;
let spawnRate = 2000;
const lanes = 5;

/* ------------------ CENTER JET ------------------ */
function centerJet() {
    const boardHeight = board.clientHeight;
    const jetHeight = jet.clientHeight;
    jet.style.top = (boardHeight / 2 - jetHeight / 2) + "px";
}
centerJet();

/* ------------------ MOVEMENT ------------------ */
window.addEventListener("keydown", (e) => {
    if (gamePaused || gameOver) return;

    let top = parseInt(getComputedStyle(jet).top);
    let maxTop = board.clientHeight - jet.clientHeight;

    if (e.key === "ArrowDown" && top < maxTop) {
        jet.style.top = (top + 20) + "px";
    }

    if (e.key === "ArrowUp" && top > 0) {
        jet.style.top = (top - 20) + "px";
    }

    if (e.code === "Space") shooting = true;

    if ((e.key === "p" || e.key === "P") && !gameOver) {
        gamePaused = true;
        showPause();
    }
});

window.addEventListener("keyup", (e) => {
    if (e.code === "Space") shooting = false;
});

/* ------------------ CLICK TO RESUME ------------------ */
document.addEventListener("click", () => {
    if (gamePaused && !gameOver) {
        gamePaused = false;
        removePause();
    }
});

/* ------------------ SHOOT ------------------ */
function shootBullet() {
    const bullet = document.createElement("div");
    bullet.className = "bullet";

    const jetTop = parseInt(getComputedStyle(jet).top);
    const jetLeft = parseInt(getComputedStyle(jet).left);

    bullet.style.left = (jetLeft + jet.clientWidth) + "px";
    bullet.style.top = (jetTop + jet.clientHeight / 2 - 10) + "px";

    board.appendChild(bullet);
}

setInterval(() => {
    if (!gamePaused && !gameOver && shooting) shootBullet();
}, 250);

/* ------------------ BULLETS ------------------ */
setInterval(() => {
    if (gamePaused || gameOver) return;

    document.querySelectorAll(".bullet").forEach(b => {
        let left = parseInt(b.style.left);
        b.style.left = (left + 10) + "px";

        if (left > board.clientWidth) b.remove();
    });
}, 30);

/* ------------------ SPAWN ENEMIES (LANES) ------------------ */
function spawnEnemy() {
    if (gamePaused || gameOver) return;

    const rock = document.createElement("div");
    rock.className = "rocks";

    const laneHeight = board.clientHeight / lanes;
    const lane = Math.floor(Math.random() * lanes);

    rock.style.top = (lane * laneHeight + 10) + "px";
    rock.style.left = (board.clientWidth - 200) + "px";

    rock.dataset.health = 5;

    board.appendChild(rock);
}

setInterval(spawnEnemy, spawnRate);

// move enemies
setInterval(() => {
    if (gamePaused || gameOver) return;

    document.querySelectorAll(".rocks").forEach(r => {
        let left = parseInt(r.style.left);

        r.style.left = (left - enemySpeed) + "px";

        // game over
        if (left <= 200) {
            endGame();
        }

        if (left < -200) r.remove();
    });
}, 40);

// Collision logic
setInterval(() => {
    if (gamePaused || gameOver) return;

    const bullets = document.querySelectorAll(".bullet");
    const rocks = document.querySelectorAll(".rocks");

    bullets.forEach(b => {
        const bRect = b.getBoundingClientRect();

        rocks.forEach(r => {
            const rRect = r.getBoundingClientRect();

            if (
                bRect.left < rRect.right &&
                bRect.right > rRect.left &&
                bRect.top < rRect.bottom &&
                bRect.bottom > rRect.top
            ) {
                b.remove();

                let health = parseInt(r.dataset.health) - 1;
                r.dataset.health = health;

                r.style.opacity = health / 5;

                // scoring
                if (health <= 0) {
                    r.remove();

                    score++;
                    scoreDisplay.innerText = "Score: " + score;

                    updateDifficulty();
                }
            }
        });
    });
}, 30);

/* ------------------ DIFFICULTY ------------------ */
function updateDifficulty() {
    if (score % 10 === 0) {
        enemySpeed += 1;

        if (spawnRate > 600) {
            spawnRate -= 200;
        }
    }
}

/* ------------------ GAME STATES ------------------ */
function endGame() {
    gameOver = true;
    gamePaused = true;

    const msg = document.createElement("div");
    msg.innerText = "GAME OVER\nScore: " + score;
    msg.style.whiteSpace = "pre";

    msg.style.position = "absolute";
    msg.style.top = "50%";
    msg.style.left = "50%";
    msg.style.transform = "translate(-50%, -50%)";
    msg.style.color = "white";
    msg.style.fontSize = "40px";

    board.appendChild(msg);
}

function showPause() {
    const msg = document.createElement("div");
    msg.id = "pauseMsg";
    msg.innerText = "PAUSED\nClick to Resume";
    msg.style.whiteSpace = "pre";

    msg.style.position = "absolute";
    msg.style.top = "50%";
    msg.style.left = "50%";
    msg.style.transform = "translate(-50%, -50%)";
    msg.style.color = "white";
    msg.style.fontSize = "30px";

    board.appendChild(msg);
}

function removePause() {
    const msg = document.getElementById("pauseMsg");
    if (msg) msg.remove();
}