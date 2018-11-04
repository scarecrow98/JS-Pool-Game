class PlayerManager {
    constructor() {
        this.players = [
            new Player(true),
            new Player(false)
        ]
        this.activePlayer = 0;
    }

    switchPlayers() {
        this.activePlayer = this.activePlayer == 0 ? 1 : 0;
    }

    getActivePlayer() {
        return this.players[this.activePlayer];
    }
}