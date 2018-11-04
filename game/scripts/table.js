class Table {
    constructor(ww, wh, image) {
        this.image = image;
        this.vPadding = 60; //vertical padding
        this.hPadding = 65; //horizontal padding
        this.ww = ww;
        this.wh = wh;
        this.width = this.ww - 2 * this.hPadding;
        this.height = this.wh - 2 * this.vPadding;
        this.topLeftCorner = createVector(this.hPadding, this.vPadding);
        this.bottomRightCorner = createVector(this.topLeftCorner.x + this.width, this.topLeftCorner.y + this.height);
        this.friction = 0.978;
        this.holes = [
            createVector(this.topLeftCorner.x, this.topLeftCorner.y),
            createVector(this.topLeftCorner.x + this.width / 2, this.topLeftCorner.y - 10),
            createVector(this.topLeftCorner.x + this.width, this.topLeftCorner.y),
            createVector(this.topLeftCorner.x, this.topLeftCorner.y + this.height),
            createVector(this.topLeftCorner.x, this.topLeftCorner.y + this.height),
            createVector(this.topLeftCorner.x + this.width / 2, this.topLeftCorner.y + this.height + 10),
            createVector(this.topLeftCorner.x + this.width, this.topLeftCorner.y + this.height),
        ];
        this.balls = [
            new Ball(600, 250, color(244, 217, 66), 1, false),

            new Ball(630, 235, color(43, 103, 188), 2, false),
            new Ball(630, 265, color(255, 0, 0), 3, false),
        
            new Ball(660, 220, color(115, 32, 178), 4, false),
            new Ball(660, 250, color(255, 140, 0), 5, false),
            new Ball(660, 280, color(64, 142, 28), 6, false),
        
            new Ball(690, 205, color(160, 68, 43), 7, false),
            new Ball(690, 235, color(0, 0, 0), 8, false),
            new Ball(690, 265, color(244, 217, 66), 9, true),
            new Ball(690, 295, color(43, 103, 188), 10, true),
            
            new Ball(720, 190, color(255, 0, 0), 11, true),
            new Ball(720, 220, color(115, 32, 178), 12, true),
            new Ball(720, 250, color(255, 140, 0), 13, true),
            new Ball(720, 280, color(64, 142, 28), 14, true),
            new Ball(720, 310, color(160, 68, 43), 15, true)
        ];
        this.holeRadius = 26;
    }

    display() {
        image(this.image, 0, 0, this.ww, this.wh);
        
        /*noFill();
        stroke(255);
        strokeWeight(2);
        rect(
            this.hPadding,
            this.vPadding,
            this.width,
            this.height
        );*/
        /*line(
            this.topLeftCorner.x + this.holeRadius,
            this.topLeftCorner.y,
            this.topLeftCorner.x + this.width / 2 - this.holeRadius,
            this.topLeftCorner.y
        );

        line(
            this.topLeftCorner.x + this.width / 2 + this.holeRadius,
            this.topLeftCorner.y,
            this.bottomRightCorner.x - this.holeRadius,
            this.topLeftCorner.y
        );

        line(
            this.bottomRightCorner.x,
            this.topLeftCorner.y + this.holeRadius,
            this.bottomRightCorner.x,
            this.bottomRightCorner.y - this.holeRadius
        );*/

        //draw holes
        /*for (let hole of this.holes) {
            ellipse(hole.x, hole.y, this.holeRadius * 2);
        }*/
    }

    setupBalls() {
        
    }
}