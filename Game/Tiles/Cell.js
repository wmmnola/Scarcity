class Cell {
  constructor(id, x, y){
    this.x = x;
    this.y = y;
    this.id = id;
    this.water = true;
    this.color = "blue";
    this.baseValue = 0;
    this.taxPercentile = 0;
    this.hasResource = false;
    this.claimed = false;
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

}

module.exports = Cell
