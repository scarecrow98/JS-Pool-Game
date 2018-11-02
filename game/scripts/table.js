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
        this.friction = 0.975;
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
    }
}