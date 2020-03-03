const random = require("random");


class Domain {
    constructor(id,city, color){
      this.id = id;
      this.city = city;
      this.color = color;
      this.money = 0;
      this.claimedTiles = [this.city.tile];
      this.resources = [0,0, 0];
      this.city.setDomain(this);
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
    setResourceAmnt(resource, amnt){
      this.resources[resource.id] = amnt
    }
    update(game) {
      this.collectTaxes();
      this.calculateFood(game.resources[1])
      this.city.update();
    }
    calculateFood(food){
      let total = 0;
      for(let tile of this.claimedTiles){
        total += tile.foodDemand;
      }
      this.foodDemanded = total;
    }
    payCity(city, amnt){
      this.money -= amnt * this.money;
      city.money += amnt * this.money;
    }
    collectTaxes() {
      for(let tile of this.claimedTiles){
        this.money += tile.payTax();
      }
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
