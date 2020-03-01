const BaseGood = require("./BaseGood")


class PrimaryGood extends BaseGood {
  constructor(id, name, color, len, wid, numOfDomains) {
    super(id, name);
    this.color = color;
    this.need = 10;
    this.totaldemanded = 0;
    this.tiles = [];
    this.grid = Array(len).fill().map(a => Array(wid));
    this.domainAmnts = [];
  }
  calculateDemand(tile){
    let x = tile.x;
    let y = tile.y
    let d = 0;
    if(!tile.water) {
      d = tile.baseValue/(Math.exp(-1*tile.populationPercentile));
    }
    this.grid[x][y] = d;
    return d;
  }
  setDmnAmnt(n){
    this.domainAmnts = Array(n).fill(0);
  }
  produce(domains) {
    for(let tile of this.tiles){
      let increase = tile.baseValue * 0.1;
      this.addAmnt(increase);
      if(tile.claimed) {
        this.domainAmnts[tile.domainID] += increase;
      }
    }
    console.log(this.domainAmnts)
    for(let d of domains){
      d.setResourceAmnt(this, this.domainAmnts[d.id]);
    }
  }
  addTile(t){
    this.tiles.push(t);
  }



}

module.exports = PrimaryGood;
