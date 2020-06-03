class Unit {
    constructor(tile) {
        this.tileId = tile.id;
    }

    moveUnit(newTileId) {
        this.tileId = newTileId;
    }


}


module.exports = Unit;
