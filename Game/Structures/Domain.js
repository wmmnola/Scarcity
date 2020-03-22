const random = require("random");
const DomainMarket = require("./Zones/DomainMarket")

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
      this.markets = [];
      this.city.setDomain(this);
    }

    toInfo(){
      let compact = {
        id : this.id,
        color : this.color,
        money : this.money,
        numTiles : this.claimedTiles.length,
      }
      return compact
    }

    claimTile(tiles) {
      let tile = findMax(tiles)
      tile.isClaimed = true;
      tile.setClaimColor(this.color, this.id)
      this.claimedTiles.push(tile)
    }
    updateMarkets() {
      for(let market of this.markets){
        market.updateAmnt();
      }
    }
    update(game) {
      this.updateMarkets();
    }
    addMarket(good){
      let market = new DomainMarket(this,good);
      this.markets.push(market)
    }
    addFactory(factory){
      this.factory.push(factory);
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
