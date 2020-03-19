const BaseGood = require("./BaseGood")
const random = require("Random")
const normal = random.normal()

class PrimaryGood extends BaseGood {
  constructor(id, name, color) {
    super(id, name);
    this.color = color;
    this.baseCost = Math.abs(10 + 100*(normal() * normal() * random.float()));
    console.log(this.name + "has a baseCost of "+this.baseCost)
    this.tiles = [];
  }

  addTile(t){
    this.tiles.push(t);
  }
  produce(board){
    let grid = board.grid;
    for(let i = 0; i < board.length; i++){
      for(let j = 0; j < board.width; j++) {
        let tile = grid[i][j];
        let tilePopPercent = tile.populationPercentile
        let baseValue = tile.baseValue
        let del = tilePopPercent * baseValue * 20;
        if(tile.resource){
          if(tile.resourceId == this.id){
            this.addAmnt(del);
          }
        }
      }
    }
  }


}

module.exports = PrimaryGood;
