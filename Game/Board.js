const csv = require('csv-parser');
const fs = require('fs');
const Tile = require("./Tile")
const perlin = require('perlin-noise');


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

    generate() {
        this.grid = Array(this.size).fill(0).map(x => Array(this.size).fill(0))
        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++) {
                let h = perlin.generatePerlinNoise(i, j);
                this.grid[i][j] = new Tile(i, j, h);
            }
        }
    }




}
module.exports = Board;
