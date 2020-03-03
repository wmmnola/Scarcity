class City {
    constructor(tile, population, tax) {
      this.baseTax = tax;
      this.tile = tile;
      this.pop = population;
      this.money = 0;
    }
    setDomain(domain){
      this.domain = domain;
    }
    calculateIncome(){
      if(this.domain){
        this.domain.payCity(this, 0.1);
      }
    }
    calculateDemand() {
      this.demand = this.tile.populationPercentile * this.domain.totaldemanded;
    }
    calculatePrice(){

    }
    update(){
      this.calculateIncome();
      this.calculateDemand();
    }


}
module.exports = City;
