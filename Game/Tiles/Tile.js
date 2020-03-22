const random = require("random");
const BasePop = require("./Pops/BasePop")
const normal = random.normal();
const taxStd = 5;
const taxMu = 10;
/**
* @class Tile := Tile object
*/
class Tile{
    /**
    * Constructs a new tile with given position in a grid
    * Initially all tiles are water with no value and no population
    * @param {Integer} x := x index of tile in board.grid
    * @param {Integer} y := y index of tile in board.grid
    */
    constructor(x, y,id) {
      this.x = x;
      this.y = y;
      this.id = id;
      this.water = true;
      this.color = "blue";
      this.baseValue = 0;
      this.taxPercentile = 0;
      this.hasResource = false;
      this.rColor = [0, 0, 0]
      this.claimed = false;
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
    makeLand(game) {
    	this.water = false;
    	this.setColor("Green")
    	this.baseValue = Math.abs(taxMu + taxStd*normal());
      let population = Math.floor(50 + 20*normal());
      this.populationPercentile = cdf(population, 50, 20);
      this.taxPercentile = cdf(this.baseValue, taxMu, taxStd);

      //If the taxPercentile and populationPercentile are high enough generate a city on this tile
      if(this.populationPercentile > 0.95) {
          if (this.taxPercentile > 0.8){
              this.isCity = true;
              console.log("new city! at "+this.x+" ,"+this.y+"with "+this.populationPercentile)
              game.board.addCity(this,population, game)
        }
      }
      for(let k = 0; k < population; k++){
        let p = new BasePop(this, game.secondary)
        this.population.push(p)
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
        if(!r.hasResource) {
          this.resourceName = r.name;
          this.resourceId = r.id
          r.addTile(this);
          this.hasResource = true;
          this.rColor = r.color;
        }
      }
      setColor(c){
        this.color = c
      }
      /**
      * Claims a Cell/Tile for a given domain
      * @param{Array} color := ordered triplet representing a domains rColor
      * @param{Integer} id := Domain's id
      */
      setClaimColor(color, id){
        this.claimed = true;
        this.domainID = id;
        this.claimColor = color;
      }
      convertToCell(){
        const cell = {
          x: this.x,
          y: this.y,
          id : this.id,
          color : this.color,
          water : this.water,
          baseValue : this.baseValue,
          taxPercentile : this.taxPercentile,
          hasResource : this.hasResource,
          rColor : this.rColor,
          claimed : this.claimed,
          claimColor : this.claimColor,
          population : this.population.length
        };
        return cell
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
