class Cue {
    constructor() {
        this.length = 300;
        this.radius = 10;
        this.offset = 40;
        this.dir = createVector(0, 0);
        this.angle = 0;
        this.isShooting = false;
        this.shootingPos = createVector(0, 0);
        this.shootingStrength = 0;
        this.strengthLimit = 130;

        this.tip = createVector(0, 0);
        this.end = createVector(0, 0);
    }

    update(cueball, mouse) {   
        //if player is in the process of shooting (mouse button is down and player is aiming)     
        if (this.isShooting) {
            //calculate the strength of the shoot (distance between mouseclick position and current mouse position)
            this.shootingStrength = dist(
                this.shootingPos.x,
                this.shootingPos.y,
                mouse.x,
                mouse.y
            );

            //increase the cue's offset from the cueball to visualize the strength
            this.offset = this.shootingStrength < 40 ? 40 : this.shootingStrength;

            //limit the strength
            if (this.offset > this.strengthLimit) {
                this.offset = this.strengthLimit;
            }

            //angle of cue
            this.dir.set(
                this.shootingPos.x - cueball.pos.x,
                this.shootingPos.y - cueball.pos.y
            );
            this.angle = this.getAngle(this.dir) + PI;

        } else {
            this.offset = 40;
            this.shootingStrength = 0;
            this.dir.set(
                mouse.x - cueball.pos.x,
                mouse.y - cueball.pos.y
            );
            this.angle = this.getAngle(this.dir) + PI;
        }
     
        //coordinates of the cue's tip and cue's end
        this.tip.set(
            this.offset * cos(this.angle) + cueball.pos.x,
            this.offset * sin(this.angle) + cueball.pos.y
        );

        this.end.set(
            (this.length + this.offset) * cos(this.angle) + cueball.pos.x, 
            (this.length + this.offset) * sin(this.angle) + cueball.pos.y
        );

        stroke(130);
        strokeWeight(10);
        line(this.tip.x, this.tip.y, this.end.x, this.end.y);

        /*socket.emit('cue update', JSON.stringify({
            mouse:{
                x: mouse.x,
                y: mouse.y
            }
        }));*/

        this.drawCueHelp(cueball);
    }

    drawCueHelp(cueball) {

        let lineEnd = {
            x: 1000 * cos(this.angle - PI) + cueball.pos.x,
            y: 1000 * sin(this.angle - PI) + cueball.pos.y
        }

        stroke(255);
        strokeWeight(1);
        line(cueball.pos.x, cueball.pos.y, lineEnd.x, lineEnd.y);



        /*let ball = new Ball(700, 350, color(100, 100, 100));

        let distance = dist(ball.pos.x, ball.pos.y, cueball.pos.x, cueball.pos.y);
        
        let diff = p5.Vector.sub(ball.pos, cueball.pos);
        let normal = p5.Vector.div(diff, distance);
        //let normal = diff.div(distance);
        let velocityDelta = p5.Vector.sub(this.dir, ball.vel);
        let dot = p5.Vector.dot(velocityDelta, normal);

        let impulse = normal.mult(dot);
        let d = p5.Vector.add(impulse, this.dir);

        let ang = atan2(d.y, d.x);
        let dx = 30 * cos(ang) + ball.pos.x;
        let dy = 30 * sin(ang) + ball.pos.y;
        console.log(dx, dy);
        line(
            ball.pos.x,
            ball.pos.y,
            dx,
            dy
        );*/
    }

    getAngle(vec) {
        return atan2(vec.y, vec.x);
    }
}