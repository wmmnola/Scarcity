const random = require("random");
const normal = random.normal();
const math = require("mathjs")
class BasePop {
  constructor(tile, resourcesDemanded) {
      let minFood = Math.abs(5 + 2*normal())
      let i = tile.baseValue + 2*normal();
      this.income = i < 0 ? 0 : i;
      let minCG = minFood + this.income
      let k = random.float(0, 1);
      let transMat = math.matrix([[1, -k], [0, 1]]);
      this.constraintVec = [minCG, minFood];
      this.demandVec = math.multiply(transMat, this.constraintVec)._data


  }

}

module.exports = BasePop
