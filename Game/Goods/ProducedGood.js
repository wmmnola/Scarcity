const BaseGood = require("./BaseGood");


class ProducedGood extends BaseGood{
    constructor(id, name) {
      super(id, name);
      this.amnt = 0;

    }

}
module.exports = ProducedGood;
