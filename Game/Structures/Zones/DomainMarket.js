let Market = require("./Market");

class DomainMarket extends Market {

  constructor(domain, good){
    super(good);
    this.domain = domain;
  }
  getPrice(){
    this.price = (this.good.baseCost/this.amnt)
    return this.price;
  }
  updateAmnt() {
    this.amnt = this.good.getDomainAmnt(this.domain);
    console.log(this.amnt)
    this.price = (this.amnt/this.good.baseCost);
    console.log(this.good.name +" is priced at "+this.price+" in domain : "+this.domain.id)
  }

}
module.exports = DomainMarket;
