


class DomainMarket extends Market {
  constructor(domain, good){
    super(good);
    this.domain = domain;
    this.goodAmnt = good.getDomainAmnt(domain);
  }
  price() {
    this.price = (this.amnt/this.good.baseCost)
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
