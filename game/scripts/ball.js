class Ball {
    constructor(_x, _y, _color, _number, _striped, _isCueball = false) {
        this.pos = createVector(_x, _y);
        this.color = _color
        this.radius = 15;
        this.vel = createVector(0, 0);
        this.mass = 1;
        this.isMoving = false;
        this.inPot = false;
        this.number = _number ? _number.toString() : '';
        this.striped = _striped;
        this.isCueball = _isCueball;
    }

    update(table) {
        //pot detection
        for (let hole of table.holes) {
            if (dist(hole.x, hole.y, this.pos.x, this.pos.y) < table.holeRadius) {
                //this.inPot = true;
                if (!this.isCueball) {
                    console.log(this);
                    table.balls.splice(this.number - 1, 1);
                } else { //cueball is potted
                    this.pos.set(table.ww / 5, table.wh / 2);
                    this.vel.set(0, 0);
                }
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
        if (this.striped) {
            fill(255);
            ellipse(this.pos.x, this.pos.y, this.radius + 8);
        }

        textSize(13);
        fill(this.striped ? 0 : 255);
        textAlign(CENTER, CENTER);
        text(this.number, this.pos.x, this.pos.y)
    }

    shoot(angle, strength) {
        angle += PI;
        this.vel.x = cos(angle) * strength * 0.1;
        this.vel.y = sin(angle) * strength * 0.1;
        this.isMoving = true;

        /*socket.emit('cueball update', {
            vel: {
                x: this.vel.x,
                y: this.vel.y
            }
        });*/
    }

    collide(ball) {

        let distance = dist(ball.pos.x, ball.pos.y, this.pos.x, this.pos.y);
        
        if (distance < ball.radius + this.radius) {
            let diff = p5.Vector.sub(ball.pos, this.pos);
            let normal = p5.Vector.div(diff, distance);
            //let normal = diff.div(distance);
            let velocityDelta = p5.Vector.sub(this.vel, ball.vel);
            let dot = p5.Vector.dot(velocityDelta, normal);

            if (dot > 0) {
                let coeff = 0.1;
                let strength = (1 + coeff) * dot;
                let impulse = normal.mult(strength);

                this.vel.sub(impulse);
                ball.vel.add(impulse);
            }
        }
    }
}