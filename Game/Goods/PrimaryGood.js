const BaseGood = require("./BaseGood")


class PrimaryGood extends BaseGood {
  constructor(id, name, color) {
    super(id, name);
    this.color = color;
    this.tiles = [];
  }

  addTile(t){
    this.tiles.push(t);
  }
  produce(board){
    let grid = board.grid;
    for(let i = 0; i < this.board.length; i++){
      for(let j = 0; j < this.board.width; j++) {
        
      }
    }
  }


}

module.exports = PrimaryGood;
