class Player {
    constructor(_status) {
        this.status = _status;
        this.score = 0;
        this.ballType = undefined;
        this.id = undefined;
    }

    addPoint() {
        this.score++;
    }

    setStatus(status) {
        this.status = status;
    }

    getStatus() {
        return this.status;
    }
}