const BaseGood = require("./BaseGood")


class PrimaryGood extends BaseGood {
  constructor(id, name, color, len, wid) {
    super(id, name);
    this.color = color;
    this.need = 10;
    this.totaldemanded = 0;
    this.grid = Array(len).fill().map(a => Array(wid));
    console.log(this.grid);
  }
  calculateDemand(tile){
    let x = tile.x;
    let y = tile.y
    let d = 0;
    if(!tile.water) {
      d = tile.baseValue/1 + Math.exp(-1*tile.populationPercentile);
    }
    this.grid[x][y] = d;
    console.log(d);
    return d;
  }



}

module.exports = PrimaryGood;
