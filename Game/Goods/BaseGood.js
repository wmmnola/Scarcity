const rand = require("random")
const normal = rand.normal();


class BaseGood {
  constructor(id, name,len, wid, demandFn) {
    this.id = id;
    this.name = name;
    this.amnt = 0;
    this.length = len;
    this.width = wid;
    console.log(demandFn)
    if(demandFn) {
      this.demand_function = demandFn;
    }
    else {
      this.coefficent = Math.abs(rand.float(1,5)*normal());
      this.demand_function = (t) => {
        return t.baseValue*this.coefficent * t.populationPercentile;
      }
    }
    this.AmntDemandGrid = Array(len).fill().map(a => Array(wid));
    this.PriceGrid = Array(len).fill().map(a => Array(wid));
    this.domainAmnts = [];
  }
  setDmnAmnt(n){
    this.domainAmnts = Array(n).fill(0);
  }
  addAmnt(n){
    this.amnt += n;
  }
  initializeDemand(board){
    for(let x = 0; x < board.length; x++){
      for(let y = 0; y < board.width; y++){
        let d = 0;
        let p = 0;
        let tile = board.grid[x][y];
        if(!tile.water) {
          d = this.demand_function(tile);
          p = d/tile.populationPercentile;
        }
        this.AmntDemandGrid[x][y] = d;
        this.PriceGrid[x][y] =p;
      }
    }
    this.calculateAvgPrice();
}
  calculateAvgPrice(){
    let sum = 0;
    let count = 0;
    for(let i = 0; i < this.length; i++){
      for(let j = 0; j < this.width; j++) {
        if(this.AmntDemandGrid[i][j] > 0){
        sum += this.PriceGrid[i][j];
        count += 1
      }
      }
    }
    console.log("Average price of "+this.name +":"+sum/count)
  }
  getDemand(tile){
    return this.AmntDemandGrid[tile.x][tile.y]
  }


}
module.exports = BaseGood;
