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
      for(let fac of this.factories){
        let m = find_market_by_good(this.markets, fac.inputGood)
        fac.produce(m);
      }
    }
    addMarket(good){
      let market = new DomainMarket(this,good);
      this.markets.push(market)
    }
    addFactory(factory){
      this.factories.push(factory);
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

function find_market_by_good(markets, good){
  for(let m of markets){
    if(m.good.id == good.id) return m;
  }
  return -1;
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
