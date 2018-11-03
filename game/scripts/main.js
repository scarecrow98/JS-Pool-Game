let cue;
let cueball;
let mouse;
let table;
let tableSprite;
let player;
let socket;

function preload() {
    tableSprite = loadImage('images/table.png');
}

function setup() {
    createCanvas(1000, 500);

    table = new Table(width, height, tableSprite);

    cueball = new Ball(width / 5, height / 2, color(255, 255, 255));
    cue = new Cue();

    table.setupBalls();

    player = new Player();
    /*socket = io();

    socket.on('init game', (data) => {
        player.id = data.id;
        player.isActive = data.isActive;
    });

    socket.on('opponent disconnected', () => {
        player.isActive = true;
        console.log(player);
    });

    socket.on('cueball update', (data) => {
        cueball.vel.x = data.vel.x;
        cueball.vel.y = data.vel.y;
        cueball.isMoving = true;
    });*/

    /*socket.on('cue update', (data) => {
        player.isActive = false;
        let m = JSON.parse(data);
        cue.update(cueball, m);
    });*/
}

function draw() {
    background(51);

    mouse = {
        x: mouseX,
        y: mouseY
    }

    table.display();
    cueball.update(table);

    //update balls and draw them
    for (let ball of table.balls) {
        ball.update(table);
    }

    //check if cueball is potted
    if (cueball.inPot) {
        player.isActive = false;
    }

    //checking cueball movement
    if (!cueball.isMoving) {
        player.isActive = true;
    } else { //only check for collisions when cueball is moving
        for (let i = 0; i < table.balls.length - 1; i++) {
            for (let j = i + 1; j < table.balls.length; j++) {
                table.balls[i].collide(table.balls[j]);
                cueball.collide(table.balls[i]);
            }
        }
        cueball.collide(table.balls[table.balls.length - 1]);
    }
    
    //only display and update cue when player is active
    if (player.isActive) {
        cue.update(cueball, mouse);
    }
}

function mousePressed() {
    //if the player is inactive, then do not listen for mouse events
    if (!player.isActive) return; 

    //player is in the process of shooting, save clicked position
    cue.isShooting = true;
    cue.shootingPos.x = mouseX;
    cue.shootingPos.y = mouseY;
}

function mouseReleased() {
    if (!player.isActive) return;

    //shoot the cueball, and set player to inactive, to prevent them from making another shot while the cueball is moving
    cue.isShooting = false;
    cueball.shoot(cue.angle, cue.shootingStrength);
    player.isActive = false;
}