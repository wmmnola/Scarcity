class Factory {
    constructor(tile, inputGood, outputGood) {
      this.tile = tile;
      this.budget = 1000;
      this.inputGood = inputGood;
      this.outputGood = outputGood;
      // Labor constraint
      this.wage = tile.baseValue;
      this.resource = resource;
      this.materialConstraint = (tile.baseValue * tile.populationPercentile)
      const maxLabor = tile.percentile;
      const employRate = .1;
      this.labor = .1 * maxLabor
    }
    produce(inputMarket)  {
      const laborCost = this.labor * this.wage
      const materialCost = inputMarket.price();
      const consumption = (this.budget - laborCost)/materialCost;
      console.log(this.consumption)
      const produce = 2*consumption + (1/2)*this.laborCost;
      inputMarket.remove(consumption);
      console.log(consumption+"was consumed of "+this.inputGood.name)
    }
  }


module.exports = Factory;
