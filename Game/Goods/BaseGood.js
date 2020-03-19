const rand = require("random")
const normal = rand.normal();


class BaseGood {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.amnt = 0;
  }
  add(increase){
    this.amnt += increase
  }


}
module.exports = BaseGood;
