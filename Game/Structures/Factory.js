class Factory {
    constructor(tile, inputGood, outputGood) {
      this.tile = tile;
      this.budget = 200;
      this.inputGood = inputGood;
      console.log(inputGood.name)
      this.outputGood = outputGood;
      // Labor constraint
      this.wage = tile.baseValue;
      this.outputGood = outputGood;
      this.materialConstraint = (tile.baseValue * tile.populationPercentile)
      const maxLabor = tile.population.length;
      const employRate = .1;
      this.labor = .1 * maxLabor
    }
    produce(inputMarket)  {
      const laborCost = this.labor * this.wage
      const materialCost = inputMarket.getPrice();
      const consumption = (this.budget - laborCost)/materialCost;
      this.consumption = consumption
      const produce = 2*consumption + (1/2)*this.laborCost;
      //inputMarket.remove(consumption);
      console.log(this.consumption+" was consumed of "+this.inputGood.name)
    }
  }


module.exports = Factory;
