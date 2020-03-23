class Factory {
    constructor(tile, inputGood, outputGood) {
      this.tile = tile;
      this.budget = 20;
      this.inputGood = inputGood;
      this.outputGood = outputGood;
      // Labor constraint
      this.wage = tile.baseValue;
      this.outputGood = outputGood;
      this.materialConstraint = (tile.baseValue * tile.populationPercentile)
      const maxLabor = tile.populationPercentile;
      const employRate = .1;
      this.labor = .1 * maxLabor
    }
    produce(inputMarket)  {
      const laborCost = this.labor * this.wage
      const materialCost = inputMarket.getPrice();
      const consumption = (this.budget - laborCost)/materialCost;
      console.log("cost : "+materialCost +" labor cost: "+laborCost)
      this.consumption = consumption > 0 ? consumption : 0;
      inputMarket.buy(this.consumption)
      const produce = 2*consumption + (1/2)*laborCost;

      //inputMarket.remove(consumption);
      console.log(this.consumption+" was consumed of "+this.inputGood.name)
      console.log(produce + " was produced of "+this.outputGood.name)
    }
  }


module.exports = Factory;
