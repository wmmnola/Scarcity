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
    }
    employ(market)  {
      this.laborBudget = (3/4)*this.budget;
      this.wageBudget = (1/4)*this.budget;
      const labourCost = this.budget / this.wage;
      const materialCost = market.priceResource(this.inputGood)
      const profitCost = this.laborBudget -
    }
  }


}
module.exports = Factory;
