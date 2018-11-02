let cue;
let balls;
let cueball;
let mouse;
let table;
let tableSprite;
let player;


function preload() {
    tableSprite = loadImage('images/table.png');
}

function setup() {
    createCanvas(900, 500);

    table = new Table(width, height, tableSprite);

    cueball = new Ball(width / 5, height / 2, 1, color(255, 255, 255));
    cue = new Cue();

    player = new Player();

    balls = [];
}

function draw() {
    background(51);

    mouse = {
        x: mouseX,
        y: mouseY
    }

    table.display();
    cueball.update(table);

    for (let ball of balls) {
        ball.update(table);
    }

    if (cueball.inPot) {
        player.isActive = false;
    }

    if (!cueball.isMoving) {
        player.isActive = true;
    }
    
    if (player.isActive) {
        cue.update(cueball, mouse);
    }
}

function mousePressed() {
    if (!player.isActive) return; 

    cue.isShooting = true;
    cue.shootingPos.x = mouseX;
    cue.shootingPos.y = mouseY;
}

function mouseReleased() {
    if (!player.isActive) return;

    cue.isShooting = false;
    cueball.shoot(cue.angle, cue.shootingStrength);
    player.isActive = false;
}