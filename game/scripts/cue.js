class Cue {
    constructor(_x, _y) {
        this.length = 300;
        this.radius = 10;
        this.offset = 40;
        this.angle = 0;
        this.isShooting = false;
        this.shootingPos = undefined;
        this.shootingStrength = 0;
    }

    update(cueball, mouse) {        
        if (this.isShooting) {
            this.shootingStrength = dist(
                this.shootingPos.x,
                this.shootingPos.y,
                mouse.x,
                mouse.y
            );

            this.offset = this.shootingStrength < 40 ? 40 : this.shootingStrength;

            let dir = { x: this.shootingPos.x - cueball.x, y: this.shootingPos.y - cueball.y };
            this.angle = atan2(dir.y, dir.x);

        } else {
            this.offset = 40;
            this.shootingStrength = 0;
            let dir = { x: mouse.x - cueball.x, y: mouse.y - cueball.y };
            this.angle = atan2(dir.y, dir.x);
        }
     
    
        let tip = {
            x: this.offset * cos(this.angle) + cueball.x,
            y: this.offset * sin(this.angle) + cueball.y
        }
        let end = {
            x: (this.length + this.offset) * cos(this.angle) + cueball.x, 
            y: (this.length + this.offset) * sin(this.angle) + cueball.y
        };

        stroke(130);
        strokeWeight(10);
        line(tip.x, tip.y, end.x, end.y);
    }
}