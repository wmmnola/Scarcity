let Market = require("./Market");

class DomainMarket extends Market {
  constructor(domain, good){
    super(good);
    this.domain = domain;
  }
  updateAmnt() {
    this.amnt = this.good.getDomainAmnt(this.domain);
    this.price = (this.amnt/this.good.baseCost);
    console.log(this.good.name +" is priced at "+this.price+" in domain : "+this.domain.id)
  }
  price() {
    console.log(this.good.baseCost)
    this.price = (this.good.baseCost/this.amnt)
    console.log(this.good.name +" at " + this.price)
    return this.price
  }
  buy(money, factory) {
    if(this.price < money) {
      let q = Math.round(money/price);
      if(q < this.goodAmnt) {
        this.good.remove(q);
        this.good.removeDomainAmnt(q, domain)
        this.domain.incMoney(money)

      }
      else {
        q = 0;
      }
    }
  }
}
module.exports = DomainMarket;
