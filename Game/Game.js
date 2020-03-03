const Board = require("./Board")
const PrimaryGood = require("./Goods/PrimaryGood")
const BaseGood = require("./Goods/BaseGood")
const Domain = require("./Structures/Domain")
const Player = require("./Player")
const random = require("random");
const len = 25;
const wid = 40;
const food_demand = (t) => {
        return t.baseValue/(1 +Math.exp(-1*(t.populationPercentile - 0.5)));
    };
const iron_demand = (t) => {
      return Math.exp(t.baseValue/10)/(1 - t.populationPercentile);
}
/**@class Game := Game object*/
class Game {
    /**
    * Creates a new game and generates the board
    *
    */
    constructor(){
        // Creates the different kinds of goods

        this.domains = [];
        this.board = new Board(len,wid);
        this.players = [];
        // Terrian Generation
        let iron = new PrimaryGood(0, "Iron", [128,85,0], len, wid, iron_demand);
        let food = new PrimaryGood(1, "Food", [0,51,0],len, wid, food_demand);
        let bleh = new BaseGood(2, "Bleh", len, wid);
        this.resources = [iron, food];
        this.cities = []
        this.board.generateLand(35, this.resources, this);
        this.board.generateResources(50, this.resources[0], this);
        this.board.generateResources(200, this.resources[1], this);

        //Creates a new domain for each city

        for(let i = 0; i < this.cities.length; i++){
          let d = new Domain(i,this.cities[i], [random.int(0, 255), random.int(0, 100), random.int(0, 50)]);
          this.domains.push(d);
        }
        for(let d of this.domains){
          d.claimTiles(this,random.int(10,80));
        }
        for(let r of this.resources){
          r.initializeDemand(this.board)
          r.setDmnAmnt(this.domains.length);
        }


    }

    update(){
      this.board.update(this.resources);
      for(let d of this.domains){
        d.update(this);
      }
      for(let r of this.resources){
        if(r.produce){
        r.produce(this.domains);
        }
      }


    }
    /**
    * Given a list of tiles on the board, it finds all valid adjacent tiles
    *
    *
    */
    findAdjTiles(tiles){
      let adjTiles = [];
      for(let tile of tiles){
        let x = tile.x;
        let y = tile.y;
        if(this.board.grid[x]) {
          if(this.board.grid[x+1] && this.board.grid[x+1][y]) adjTiles.push(this.board.grid[x+1][y]);
          if(this.board.grid[x-1] && this.board.grid[x-1][y]) adjTiles.push(this.board.grid[x-1][y]);
          if(this.board.grid[x] && this.board.grid[x][y + 1]) adjTiles.push(this.board.grid[x][y+1]);
          if(this.board.grid[x] && this.board.grid[x][y-1]) adjTiles.push(this.board.grid[x][y-1]);
        }
      }
      return adjTiles;

    }
    addPlayer(s){
      let p = new Player(s, this);
      this.players.push(p);
      console.log(p);
    }

}
module.exports = Game;
