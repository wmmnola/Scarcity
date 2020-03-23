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
  remove(decrease){
    if(this.amnt > decrease) {
      this.amnt -= decrease
    }
  }


}
module.exports = BaseGood;
