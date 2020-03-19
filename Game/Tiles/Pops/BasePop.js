const random = require("random");
const normal = random.normal();
const math = require("mathjs")
class BasePop {
  constructor(tile, resourcesDemanded) {
      let minFood = Math.abs(5 + 2*normal())
      let i = tile.baseValue + 2*normal();
      this.baseIncome = i < 0 ? 0 : i;
      this.money = 0;
      let minCG = minFood + this.baseIncome;
      let k = random.float(0, 1);
      // Calculate amount demanded based on a linear system of equations
      let transMat = math.matrix([[1, -k], [0, 1]]);
      this.constraintVec = [minCG, minFood];
      this.demandVec = math.multiply(transMat, this.constraintVec)._data
  }
    update(){
      this.money += this.baseIncome;
    }

}

module.exports = BasePop
