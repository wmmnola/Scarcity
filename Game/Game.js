const Board = require("./Board")
const PrimaryGood = require("./Goods/PrimaryGood")
const ProducedGood = require("./Goods/ProducedGood");
const BaseGood = require("./Goods/BaseGood")
const Domain = require("./Structures/Domain")
const Player = require("./Player")
const Factory = require("./Structures/Factory");
const random = require("random");
const len = 25;
const wid = 40;

/**@class Game := Game object*/
class Game {
    /**
    * Creates a new game and generates the board
    *
    */
    constructor(){
        // Creates the different kinds of goods

        this.board = new Board(len,wid);
        this.domains = []
        this.players = []
        // Terrian Generation
        let iron = new PrimaryGood(0, "Iron", [128,85,0]);
        let rawFood = new PrimaryGood(1, "Raw Food", [0,51,0]);
        let procFood = new ProducedGood(2, "Processed Food");
        let conGood = new ProducedGood(3, "Consumer Goods");

        this.primary = [iron, rawFood];
        this.secondary = [procFood, conGood];
        this.resources = [iron, rawFood, procFood, conGood];
        this.basePopResources = [procFood, conGood];
        this.cities = []
        this.board.generateLand(35, this.primary, this);
        this.board.generateResources(50, iron, this);
        this.board.generateResources(200, rawFood, this);


        //Creates a new domain for each city
        for(let i = 0; i < this.cities.length; i++){
          let d = new Domain(i,this.cities[i], [random.int(0, 255), random.int(0, 100), random.int(0, 50)]);
          this.domains.push(d);
        }
        console.log("Claiming Tiles")
        this.board.claimTiles(this,this.domains, 80);

        for(let p of this.primary) {
          p.initDomains(this.domains);
          p.produce(this.domains);
        }
        for(let d of this.domains){
          d.update(this);
        }
    }

    update(){
      for(let d of this.domains){
        d.update(this);
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
    }
    sendDomains() {
      let dmnList = [];
      for(let d of this.domains){
        dmnList.push(d.toInfo());
      }
    }

}
module.exports = Game;
