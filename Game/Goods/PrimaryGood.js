const BaseGood = require("./BaseGood")


class PrimaryGood extends BaseGood {
  constructor(id, name, color) {
    super(id, name, len, wid, demandFn);
    this.color = color;
    this.tiles = [];
  }

  addTile(t){
    this.tiles.push(t);
  }



}

module.exports = PrimaryGood;
