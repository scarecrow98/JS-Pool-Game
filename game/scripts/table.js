class Table {
    constructor(ww, wh, image) {
        this.image = image;
        this.padding = 60;
        this.ww = ww;
        this.wh = wh;
        this.width = this.ww - 2 * this.padding;
        this.height = this.wh - 2 * this.padding;
        this.topLeftCorner = {
            x: this.padding,
            y: this.padding
        };
        this.bottomRightCorner = {
            x: this.topLeftCorner.x + this.width,
            y: this.topLeftCorner.y + this.height
        }
        this.friction = 0.975;
        this.holes = [
            {
                x: this.topLeftCorner.x,
                y: this.topLeftCorner.y
            },
            {
                x: this.topLeftCorner.x + this.width / 2,
                y: this.topLeftCorner.y
            },
            {
                x: this.topLeftCorner.x + this.width,
                y: this.topLeftCorner.y
            },
            {
                x: this.topLeftCorner.x,
                y: this.topLeftCorner.y + this.height
            },
            {
                x: this.topLeftCorner.x + this.width / 2,
                y: this.topLeftCorner.y + this.height
            },
            {
                x: this.topLeftCorner.x + this.width,
                y: this.topLeftCorner.y + this.height
            }
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

        for (let hole of this.holes) {
            ellipse(hole.x, hole.y, this.holeRadius * 2);
        }
    }
}