let viewers = 0;
const herCowImg = new Image();
herCowImg.src = "./res/img/herCow.png";

const milk = new Image();
milk.src = "./res/img/milk.png";

const ban = new Image();
ban.src = "./res/img/BAN.png";

const game = document.getElementById("game");
const ctx = game.getContext("2d");

let mouseX = game.width / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
}, false);

const random = (min, max) => {
    return Math.random() * (max - min) + min;
};

const resize = () => {
  game.width = window.innerWidth;
  game.height = window.innerHeight;
};

window.onload = () => {
    init();
    window.addEventListener('resize', resize, false);
}

const gameLoop = () => {
    ctx.fillStyle = "rgb(66, 135, 245)";
    ctx.fillRect(0, 0, game.width, game.height);
    collision();
    draw();

    window.requestAnimationFrame(gameLoop);
}

const init = () => {
    resize();
    spawnObjects(40);
    window.requestAnimationFrame(gameLoop);
}

const draw = () => {
    drawFace();
    player.draw();
    updateObjects();
}

const drawFace = () => {
    ctx.fillStyle = "rgb(62, 201, 67)";
    ctx.fillRect(0, game.height - 150, game.width, 150);
    ctx.fillStyle = "rgb(246, 88, 85)";
    ctx.font = "25px Arial";
    ctx.fillText(viewers, game.width / 2, game.height - 75);
}

class Player {
    width = 50;
    height = 70;

    draw() {
        this.x = mouseX - this.width / 2;
        this.y = game.height - 220;
        ctx.drawImage(herCowImg, this.x, this.y, this.width, this.height);
    }

}

let player = new Player();

class Object {
    width = 50;
    height = 60;
    constructor(x, y) {
        this.x = random(10, game.width - this.width);
        this.y = 0;
        this.speedY = random(3, 6);
        let rN = random(0, 9);
        if (rN < 3) {
            this.isBan = 1;
        } else {
            this.isBan = 0;
        }
    }

    update() {
        if (this.isBan) {
            ctx.drawImage(ban, this.x, this.y, this.width, this.height);
        } else {
            ctx.drawImage(milk, this.x, this.y, this.width, this.height);
        }
        if (this.y > game.height) {
            viewers -= 10;
            if (viewers < 0) {
                viewers = 0;
            }
            this.reset();
            return;
        }
        this.y += this.speedY;
    }

    reset() {
        this.x = random(10, game.width - this.width);
        this.y = 0;
        this.speedY = random(3, 6);
        let rN = random(0, 9);
        if (rN < 3) {
            this.isBan = 1;
        } else {
            this.isBan = 0;
        }
    }


}

let objects = [];

const spawnObjects = (number) => {
    let i = 0;
    for (i; i < number; i++) {
        objects.push(new Object());
    }
}

const updateObjects = () => {
    objects.forEach((object) => {
        object.update();
    });
}

const collision = () => {
    objects.forEach((object) => {
        if (
            player.x < object.x + object.width &&
            player.x + player.width > object.x &&
            player.y < object.y + object.height &&
            player.y + player.height > object.y
            ) {
                if (object.isBan) {
                    viewers = 0;
                } else {
                    viewers += 50;
                }
                object.reset();
            }
    });
}