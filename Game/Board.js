const random = require("random");
const Tile = require("./Tiles/Tile");
let City = require("./Structures/City")
let PrimaryGood = require("./Goods/PrimaryGood")
const LIM = 1000;
let landTiles = [];
/** @class Represents the Game Board. This object is passed to the client*/
class Board {
    /**
    * Creates a new board with given length and width
    * @constructor
    * @param {number} length := the length of the gameboard
    * @param {number} width := the width of the gameboard
    * The constructor also initliazises a grid which is then filled
    * With a tile. This provides a neat container object for the tiles
    */
    constructor(length, width){
        	this.length = length;
          this.width = width
          // Nice little lambda to create an mxn matrix
        	this.grid = Array(this.length).fill().map(a => Array(this.width));
          this.cities = [];
          let c = 0;
        	for(let i = 0; i < this.length; i++){
        	    for(let j = 0; j < this.width; j++) {
        		        this.grid[i][j] = new Tile(i, j,c);
                    c+=1;
        	    }
        	}
    }
    update(r){
      for(let i = 0; i < this.length; i++){
          for(let j = 0; j < this.width; j++) {
                this.grid[i][j].update(r);
          }
      }
    }
    /**
    * Adds a city to the game board. This only happens if a tile's base taxPercentile
    * and populationPercentile are above 0.95.
    * @param {Tile} tile := the tile which contians the city and satisfies the conditions for a City
    * @param {number} population := Population is a hidden variable of a tile, but not of a city.
                           This is the population of the given tile, but it is not recorded
    */
    addCity(tile, population, g){
      if(tile) {
        let c = new City(tile, population, tile.baseValue);
        g.cities.push(c);
      }
    }
    /**
    * Generates a given number of landmasses in the world
    * The world, by default is all water. This will pick a random seed to start.
    * It will gen pick a random neighbor from that seed and add it to the landmasses
    * Then it will pick a new tile to expand from, from the list of tiles currently in the landmass
    * @param {Integer} n - number of landmasses to generate
    */
    generateLand(n, primaryGoods, game) {
      	for(let i = 0; i < n; i++){
      	    let maxSize = 100;
      	    let mass = []
            //Pick a random element from this.grid with uniform x and uniform y
      	    let xr = random.int(0, this.length - 1);
      	    let yr = random.int(0, this.width - 1);
      	    mass.push(this.grid[xr][yr]);

            // While the landmass has less than the maximum tiles it can
      	    while(mass.length < maxSize){
                //Pick a random element from all tiles already picked
            		let seed_index = random.int(0, mass.length - 1);
            		let seed = mass[seed_index]
                //Pick a neighbor from that tile and add it to the landmass
            		let tile = pick_tile_neighbor(seed, game);
                if(tile) {
                  mass.push(tile);
                }
                else {
                  break;
                }

      	    }
      	    for(let tile of mass){
                // Keep track of all land tiles.
                if(tile.water) {
        		      tile.makeLand(game);
                  landTiles.push(tile);
                }
      	    }
      	}
    }
    /**
    * Generates a given resource on the map
    * In order to have a resource, a tile must be landmass
    * This function picks a uniformly random land tile and adds the given addResource
    * @param {Integer} n := number of the given resource to add to the world
    * @param {PrimaryGood} resource := resource to be added
    */
    generateResources(n,resource) {
        for(let i = 0; i < n; i++){
          let ran = random.int(0, landTiles.length - 1);
          let t = landTiles[ran];
          let maxRec = 100
          let n = 0;
          // If the tile already has a resource pick a different tile.
          //// TODO: add break condition, this could run indefinitly
          while(t.hasResource){
            n+=1
            ran = random.int(0, landTiles.length - 1);
            t = landTiles[ran];
            if(n > maxRec) break;
          }
          t.addResource(resource);
        }
        console.log("generated resources")

    }
    findTiles(lst) {
      let tiles  = [];
      for(let pair of lst){
        tiles.push(this.grid[pair[0]][pair[1]].convertToCell());
      }
      return tiles;
    }
    claimTiles(game,domains, n) {
      for(let i = 0; i < n; i++){
        for(let d of domains) {
          if(i <= d.maxSize) {
            let adjTiles = game.findAdjTiles(d.claimedTiles)
            let validTiles = []
            for(let tile of adjTiles) {
              if(!tile.claimed && !tile.isWater) validTiles.push(tile)
            }
            d.claimTile(validTiles);
          }
        }
      }
    }
    sendBoard(){
      let cellGrid = Array(this.length).fill().map(a => Array(this.width));
      for(let i = 0; i < this.length; i++){
          for(let j = 0; j < this.width; j++) {
              let t = this.grid[i][j];
              cellGrid[i][j] = t.convertToCell();
          }
      }
      const b = {
        grid : cellGrid,
        width : this.width,
        length : this.length
      };
      return b

    }

}
function findUnclaimedTile(tiles){
  let max = 0
  let maxTile = tiles[0];
    for(let tiles of tile){
      if(tile.populationPercentile * tile.baseValue > max && !tile.claimed){
        max = tile.populationPercentile * tile.baseValue;
        maxTile = tile;
      }
    }
  return maxTile
}


function pick_tile_neighbor(tile, game){
  let adjTiles = game.findAdjTiles([tile])
  let r = random.int(0, adjTiles.length-1)
  return adjTiles[r]
}

module.exports = Board;
