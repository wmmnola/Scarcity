class Tile {
  constructor(i, j, h) {
    this.x = i;
    this.y = j;
    this.h = h;
    this.theta = 2*3.141*this.h;
    this.tradeX = Math.sin(this.theta);
    this.tradeY = Math.cos(this.theta);
    this.provColor = 0;
  }
    setProvColor(c) {
        this.provColor = c;
    }

}
module.exports = Tile;
