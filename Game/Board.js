const random = require("random");
let Tile = require("./Tiles/Tile");
let City = require("./Structures/City")
let PrimaryGood = require("./Goods/PrimaryGood")
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
        	for(let i = 0; i < this.length; i++){
        	    for(let j = 0; j < this.width; j++) {
        		        this.grid[i][j] = new Tile(i, j);
        	    }
        	}
    }
    update(food){
      for(let i = 0; i < this.length; i++){
          for(let j = 0; j < this.width; j++) {
                this.grid[i][j].update(food);
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
    addCity(tile, population){
      if(tile) {
        let c = new City(tile, population, tile.baseValue);
        this.cities.push(c);
      }
    }
    /**
    * Generates a given number of landmasses in the world
    * The world, by default is all water. This will pick a random seed to start.
    * It will gen pick a random neighbor from that seed and add it to the landmasses
    * Then it will pick a new tile to expand from, from the list of tiles currently in the landmass
    * @param {Integer} n - number of landmasses to generate
    */
    generateLand(n) {
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
            		let tile = pick_tile_neighbor(seed, this.grid);
            		mass.push(tile);
      	    }

      	    for(let tile of mass){
                // Keep track of all land tiles.
                if(tile.water) {
      		      tile.makeLand(this);
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
          // If the tile already has a resource pick a different tile.
          //// TODO: add break condition, this could run indefinitly
          while(t.hasResource){
            ran = random.int(0, landTiles.length - 1);
            t = landTiles[ran];
          }
          t.addResource(resource);
        }
    }
    findTiles(lst) {
      let tiles  = [];
      console.log(lst);
      for(let pair of lst){
        tiles.push(this.grid[pair[0]][pair[1]]);
      }
      return tiles;
    }

}

function pick_tile_neighbor(tile, g){
    let x1 = random.boolean();
    let y1 = random.boolean();
    if(x1 && y1) {
    	if(g[tile.x+1] && g[tile.x + 1][tile.y]){
    	    return g[tile.x+1][tile.y]
    	}
    	else {
    	    return pick_tile_neighbor(tile, g);
    	}
    }
    if(x1 && !y1) {
    	if( g[tile.x +1] && g[tile.x + 1][tile.y]){
    	    return g[tile.x+1][tile.y]
    	}
    	else {
    	    return pick_tile_neighbor(tile, g);
    	}
    }
    if(!x1 && y1) {
    	if(g[tile.x] && g[tile.x][tile.y + 1]){
    	    return g[tile.x][tile.y+1]
    	}
    	else {
    	    return pick_tile_neighbor(tile, g);
    	}
    }
    else {
    	if(g[tile.x] && g[tile.x][tile.y - 1]){
    	    return g[tile.x][tile.y-1]
    	}
    	else {
    	    return pick_tile_neighbor(tile, g);
    	}
    }

}

module.exports = Board;
