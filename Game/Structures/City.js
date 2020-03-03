class City {
    constructor(tile, population, tax, domainid) {
      this.baseTax = tax;
      this.tile = tile;
      this.pop = population;
      this.money = 0;
    }
    setDomain(domain){
      this.domainid = domain.id;
    }
    calculateIncome(){
      if(this.domain){
        this.domain.payCity(this, 0.1);
      }
    }
    calculateDemand() {
      this.demand = this.pop * this.baseTax;
    }
    calculatePrice(){

    }
    update(){
      this.calculateIncome();
      this.calculateDemand();
    }


}
module.exports = City;
