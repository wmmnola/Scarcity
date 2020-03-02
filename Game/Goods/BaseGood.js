class BaseGood {
  constructor(id, name,len, wid) {
    this.id = id;
    this.name = name;
    this.amnt = 0;
    this.AmntDemandGrid = Array(len).fill().map(a => Array(wid));
    console.log(this.AmntDemandGrid)
    this.domainAmnts = [];
  }
  addAmnt(n){
    this.amnt += n;
  }
  calculateDemand(tile){
    let x = tile.x;
    let y = tile.y
    let d = 0;
    if(!tile.water) {
      d = tile.baseValue/(Math.exp(-1*tile.populationPercentile));
    }
    this.AmntDemandGrid[x][y] = d;
    return d;
  }


}
module.exports = BaseGood;
