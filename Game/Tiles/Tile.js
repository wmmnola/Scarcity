const random = require("random");
const Cell = require("./Cell")
const BasePop = require("./Pops/BasePop")
const normal = random.normal();
const taxStd = 5;
const taxMu = 10;
/**
* @class Tile := Tile object
*/
class Tile extends Cell{
    /**
    * Constructs a new tile with given position in a grid
    * Initially all tiles are water with no value and no population
    * @param {Integer} x := x index of tile in board.grid
    * @param {Integer} y := y index of tile in board.grid
    */
    constructor(x, y,id) {
        super(id, x , y);
        this.isCity = false;
        this.population = [];
        this.resourceName ="nothing";

    }
    /**
    * Converts tile from a water tile to a land tiles
    * Assigns a random base tax and population as Normal Random Variables
    * Determines if the base tax and population are high enough to generate a city
    * @param{Board} b := the game board
    */
    makeLand(b, resources, g) {
    	this.water = false;
    	this.setColor("Green")
    	this.baseValue = Math.abs(mu + std*normal());
      let population = floor(50 + 20*normal());
      this.populationPercentile = cdf(population, 50, 20);
      this.taxPercentile = cdf(this.baseValue, taxMu, taxStd);
      //If the taxPercentile and populationPercentile are high enough generate a city on this tile
      if(this.populationPercentile > 0.95) {
          if (this.taxPercentile > 0.8){
              this.isCity = true;
              console.log("new city! at "+this.x+" ,"+this.y+"with "+this.populationPercentile)
              b.addCity(this,population, g)
        }
      }
      for(let k = 0; k < population; k++){
        let p = new BasePop(this)
      }
    }
      update(){

      }

      getPop() {
        return this.populationPercentile
      }
      /**
      * Adds a resource to the tiles. Also ensures the resource color
      * @param{PrimaryGood} r
      */
      addResource(r){
        this.resourceName = r.name;
        r.addTile(this);
        this.hasResource = true;
        this.rColor = r.color;
      }


}
module.exports = Tile;


//TODO remove these helper functions and use a library


function cdf(x, mean, s) {
  variance = Math.pow(s,2);
  return 0.5 * (1 + erf((x - mean) / (Math.sqrt(2 * variance))));
}

function erf(x) {
  // save the sign of x
  var sign = (x >= 0) ? 1 : -1;
  x = Math.abs(x);

  // constants
  var a1 = 0.254829592;
  var a2 = -0.284496736;
  var a3 = 1.421413741;
  var a4 = -1.453152027;
  var a5 = 1.061405429;
  var p = 0.3275911;

  // A&S formula 7.1.26
  var t = 1.0 / (1.0 + p * x);
  var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-
    x * x);
  return sign * y; // erf(-x) = -erf(x);
}
