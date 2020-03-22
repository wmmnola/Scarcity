const random = require("random");


class Domain {
    constructor(id,city, color){
      this.id = id;
      this.city = city;
      this.color = color;
      this.maxSize = random.int(20, 80);
      this.money = 0;
      this.claimedTiles = [this.city.tile];
      this.resources = [0,0, 0];
      this.factories = [];
      this.city.setDomain(this);
    }

    claimTile(tiles) {
      let tile = findMax(tiles)
      tile.isClaimed = true;
      tile.setClaimColor(this.color, this.id)
      this.claimedTiles.push(tile)
    }
    setResourceAmnt(resource, amnt){
      this.resources[resource.id] = amnt
    }
    update(game) {
      this.collectTaxes();
      this.collectPrimaryResources(game.primaryGoods)
      this.city.update();
    }
    collectPrimaryResources(goods){

    }


    payCity(city, amnt){
      this.money -= amnt * this.money;
      city.money += amnt * this.money;
    }
    collectTaxes() {

    }
    calcPopPercentile() {
      let sum = 0;
      for(let tile of this.claimedTiles){
          sum += tile.getPop();
      }
      this.percentile = sum/this.claimedTiles.length;
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
