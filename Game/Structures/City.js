class City {
    constructor(tile, population, tax, resources) {
      this.baseTax = tax;
      this.tile = tile;
      this.pop = population;
      this.resources = resources;
      this.money = 0;
    }
    setDomain(domain){
      this.domain = domain;
    }
    calculateIncome(){
      if(this.domain){
        this.domain.pay(this, 0.1);
      }
    }
    calculateDemand() {

    }
    calculatePrice(){

    }


}
module.exports = City;
