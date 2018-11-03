class Table {
    constructor(ww, wh, image) {
        this.image = image;
        this.padding = 60;
        this.ww = ww;
        this.wh = wh;
        this.width = this.ww - 2 * this.padding;
        this.height = this.wh - 2 * this.padding;
        this.topLeftCorner = createVector(this.padding, this.padding);
        this.bottomRightCorner = createVector(this.topLeftCorner.x + this.width, this.topLeftCorner.y + this.height);
        this.friction = 0.978;
        this.holes = [
            createVector(this.topLeftCorner.x, this.topLeftCorner.y),
            createVector(this.topLeftCorner.x + this.width / 2, this.topLeftCorner.y),
            createVector(this.topLeftCorner.x + this.width, this.topLeftCorner.y),
            createVector(this.topLeftCorner.x, this.topLeftCorner.y + this.height),
            createVector(this.topLeftCorner.x, this.topLeftCorner.y + this.height),
            createVector(this.topLeftCorner.x + this.width / 2, this.topLeftCorner.y + this.height),
            createVector(this.topLeftCorner.x + this.width, this.topLeftCorner.y + this.height),
        ];
        this.holeRadius = 20;
        this.balls = [];

        this.balls.push(new Ball(600, 250, color(244, 217, 66), 1, false));

        this.balls.push(new Ball(630, 235, color(43, 103, 188), 2, false));
        this.balls.push(new Ball(630, 265, color(255, 0, 0), 3, false));
    
        this.balls.push(new Ball(660, 220, color(115, 32, 178), 4, false));
        this.balls.push(new Ball(660, 250, color(255, 140, 0), 5, false));
        this.balls.push(new Ball(660, 280, color(64, 142, 28), 6, false));
    
        this.balls.push(new Ball(690, 205, color(160, 68, 43), 7, false));
        this.balls.push(new Ball(690, 235, color(0, 0, 0), 8, false));
        this.balls.push(new Ball(690, 265, color(244, 217, 66), 9, true));
        this.balls.push(new Ball(690, 295, color(43, 103, 188), 10, true));
        
        this.balls.push(new Ball(720, 190, color(255, 0, 0), 11, true));
        this.balls.push(new Ball(720, 220, color(115, 32, 178), 12, true));
        this.balls.push(new Ball(720, 250, color(255, 140, 0), 13, true));
        this.balls.push(new Ball(720, 280, color(64, 142, 28), 14, true));
        this.balls.push(new Ball(720, 310, color(160, 68, 43), 15, true));
    }

    display() {
        image(this.image, 0, 0, this.ww, this.wh);
        
        noFill();
        stroke(255);
        strokeWeight(2);
        rect(
            this.padding,
            this.padding,
            this.width,
            this.height
        );

        //draw holes
        for (let hole of this.holes) {
            ellipse(hole.x, hole.y, this.holeRadius * 2);
        }

        /*let unitSize = 60;

        for (let i = 0; i < this.width / unitSize; i++) {
            for (let j = 0; j < this.height / unitSize; j++) {
                stroke(100);
                strokeWeight(1);
                rect(i * unitSize + this.padding, j * unitSize + this.padding, unitSize, unitSize);
            }
        }*/
    }

    setupBalls() {
        
    }
}