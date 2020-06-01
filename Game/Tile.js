class Tile {
  constructor(i, j, h) {
    this.x = i;
    this.y = j;
    this.h = h;
    this.tradeVec = [Math.cos(2*3.141*this.h), Math.sin(2*3.241*this.h)]
  }

}
module.exports = Tile;
