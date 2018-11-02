class Ball {
    constructor(_x, _y, _mass, _color) {
        this.pos = createVector(_x, _y);
        this.color = _color
        this.radius = 15;
        this.vel = createVector(0, 0);
        this.mass = _mass;
        this.isMoving = false;
        this.inPot = false;
    }

    update(table) {
        //hole detection
        for (let hole of table.holes) {
            if (dist(hole.x, hole.y, this.pos.x, this.pos.y) < table.holeRadius) {
                this.inPot = true;
                return;
            }
        }

        //table edges detection
        if (this.pos.x + this.radius > table.bottomRightCorner.x || this.pos.x - this.radius < table.topLeftCorner.x) {
            this.vel.x *= -1;
        }

        if (this.pos.y + this.radius > table.bottomRightCorner.y || this.pos.y - this.radius < table.topLeftCorner.y) {
            this.vel.y *= -1;
        }

        //ball movement
        this.vel.x *= table.friction;
        this.vel.y *= table.friction;
        if ((abs(this.vel.x) < 0.0025 || abs(this.vel.y) < 0.0025) && this.isMoving) {
            this.vel.x = 0;
            this.vel.y = 0;
            this.isMoving = false;
        }

        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        //draw ball
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.radius * 2);
    }

    shoot(angle, strength) {
        angle += PI;
        this.vel.x = cos(angle) * strength * 0.2;
        this.vel.y = sin(angle) * strength * 0.2;
        this.isMoving = true;
    }
}