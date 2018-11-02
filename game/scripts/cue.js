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

            //angle of cue
            this.dir.set(
                this.shootingPos.x - cueball.pos.x,
                this.shootingPos.y - cueball.pos.y
            );
            this.angle = this.getAngle(this.dir);

        } else {
            this.offset = 40;
            this.shootingStrength = 0;
            this.dir.set(
                mouse.x - cueball.pos.x,
                mouse.y - cueball.pos.y
            );
            this.angle = this.getAngle(this.dir);
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

        this.drawCueHelp(cueball);
    }

    drawCueHelp(cueball) {

        let e = {
            x: 1000 * cos(this.angle + PI) + cueball.pos.x,
            y: 1000 * sin(this.angle + PI) + cueball.pos.y
        }

        stroke(255);
        strokeWeight(1);
        line(cueball.pos.x, cueball.pos.y, e.x, e.y);
    }

    getAngle(vec) {
        return atan2(vec.y, vec.x);
    }
}