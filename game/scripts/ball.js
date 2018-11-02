class Ball {
    constructor(_x, _y, _color) {
        this.x = _x;
        this.y = _y;
        this.color = _color
        this.radius = 15;
        this.dx = 0;
        this.dy = 0;
        this.isMoving = false;
        this.inPot = false;
    }

    update(table) {
        for (let hole of table.holes) {
            if (dist(hole.x, hole.y, this.x, this.y) < (this.radius + table.holeRadius)) {
                this.inPot = true;
                return;
            }
        }

        if (this.x + this.radius > table.bottomRightCorner.x || this.x - this.radius < table.topLeftCorner.x) {
            this.dx *= -1;
        }

        if (this.y + this.radius > table.bottomRightCorner.y || this.y - this.radius < table.topLeftCorner.y) {
            this.dy *= -1;
        }

        this.dx *= table.friction;
        this.dy *= table.friction;
        if ((abs(this.dx) < 0.0025 || abs(this.dy) < 0.0025) && this.isMoving) {
            this.dx = 0;
            this.dy = 0;
            this.isMoving = false;
        }

        this.x += this.dx;
        this.y += this.dy;

        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.radius * 2);
    }

    shoot(angle, strength) {
        angle += PI;
        this.dx = cos(angle) * strength * 0.2;
        this.dy = sin(angle) * strength * 0.2;
        this.isMoving = true;
    }
}