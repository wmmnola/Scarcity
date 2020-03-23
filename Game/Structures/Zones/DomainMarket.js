let Market = require("./Market");
const lam = 0.02;
class DomainMarket extends Market {

  constructor(domain, good){
    super(good);
    this.domain = domain;
  }
  getPrice(){
    this.price = lam * (this.amnt)
    return this.price;
  }
  updateAmnt() {
    this.amnt = this.good.getDomainAmnt(this.domain);
    this.price = lam *(this.amnt)
    console.log(this.good.name +" is priced at "+this.price+" in domain : "+this.domain.id)
  }

}
module.exports = DomainMarket;
