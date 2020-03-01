const random = require("random");


class Domain {
    constructor(id,city, color){
      this.id = id;
      this.city = city;
      this.color = color;
      this.money = 0;
      this.claimedTiles = [this.city.tile];
    }
    claimTiles(game, n){
      while(this.claimedTiles.length < n){
        let adjTiles = game.findAdjTiles(this.claimedTiles)
        let tile = findMax(adjTiles)
        tile.setClaimColor(this.color, this.id)
        this.claimedTiles.push(tile);
      }
      this.calcPopPercentile();
    }
    update(game) {
      this.collectTaxes();
      this.calculateFood(game.food)
    }
    calculateFood(food){
      let total = 0;
      for(let tile of this.claimedTiles){
        total += tile.foodDemand;
      }
      console.log(total);
      this.foodDemanded = total;
    }
    collectTaxes() {
      for(let tile of this.claimedTiles){
        this.money += tile.payTax();
      }
      console.log(this.money);
    }
    calcPopPercentile() {
      let sum = 0;
      for(let tile of this.claimedTiles){
          sum += tile.getPop();
      }
      this.percentile = sum/this.claimedTiles.length;
      console.log(this.percentile);
    }
}
function findMax(lst){
  let max = 0;
  let maxC = lst[0]
  for(let c of lst){
    if (c.baseValue * c.populationPercentile > max && !c.city && !c.claimed && !c.isWater){
      max = c.baseValue * c.populationPercentile;
      maxC = c;
    }
  }
  return maxC;
}
module.exports = Domain;
