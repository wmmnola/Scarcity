const csv = require('csv-parser');
const fs = require('fs');
const Tile = require("./Tile")

class Board {
  constructor(size) {
    this.size = size;
  }
  loadFromFile() {
    this.grid = Array(this.size).fill(0).map(x => Array(this.size).fill(0))
      fs.createReadStream('worldSave.csv')
    .pipe(csv())
    .on('data', (row) => {
      this.grid[row.i][row.j] = new Tile(row.i, row.j, row.height)
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
  }




}
module.exports = Board;
