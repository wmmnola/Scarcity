let Market = require("./Market");
const lam = 100;
class DomainMarket extends Market {

  constructor(domain, good){
    super(good);
    this.domain = domain;
    this.amnt = 0;
  }
  getPrice(){
    this.price = lam / (this.amnt)
    return this.price;
  }
  updateAmnt() {
    this.amnt = this.good.getDomainAmnt(this.domain);
    this.price = lam/(this.amnt)
    console.log(this.good.name +" is priced at "+this.price+" in domain : "+this.domain.id)
  }
  buy(amnt) {
    if(amnt < this.amnt){
      this.good.removeDomainAmnt(amnt, this.domain)
    }
    this.price += 0.02 * amnt;
    console.log("new price of "+this.good.name +" is "+this.price)
  }

}
module.exports = DomainMarket;
