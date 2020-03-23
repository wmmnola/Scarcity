const BaseGood = require("./BaseGood")
const random = require("Random")
const normal = random.normal()

class PrimaryGood extends BaseGood {
  constructor(id, name, color) {
    super(id, name);
    this.color = color;
    this.baseCost = Math.abs(10 + 10*(normal() * normal() * random.float()));
    console.log(this.name + "has a baseCost of "+this.baseCost)
    this.tiles = [];
    this.domains = []
  }

  addTile(t){
    this.tiles.push(t);
  }
  initDomains(domains){
    this.domainAmnts = []

    for(let d of domains){
      d.addMarket(this);
      this.domainAmnts.push(0);
    }
  }
  produce(domains){
    for(let d of domains){
      this.domains.push(d)
      for(let tile of d.claimedTiles) {
        let increase = 0;
        if(tile.resourceId == this.id){
          increase = tile.population.length * tile.baseValue * .01
        }
        this.add(increase);
        this.domainAmnts[d.id]+=increase;
      }
      console.log("Domain: "+d.id + " produced "+this.domainAmnts[d.id] + " of "+this.name)
    }
  }
    getDomainAmnt(domain) {
      return this.domainAmnts[domain.id];
    }
    removeDomainAmnt(q,domain) {
     this.domainAmnts[domain.id] - q;
     this.remove(q);
    }



}

module.exports = PrimaryGood;
