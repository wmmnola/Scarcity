const csv = require('csv-parser');
const fs = require('fs');
const Tile = require("./Tile")
const perlin = require('perlin-noise');
const random = require("random")


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
        let noise = perlin.generatePerlinNoise(this.size,this.size);
        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++) {
                let h = noise[i + j*this.size]
                console.log("Generated tile "+i+","+j+"with height "+h)
                this.grid[i][j] = new Tile(i, j, h);
            }
        }
    }
    generateProvinces(n) {
        this.provinces = [];
        for(let i = 0; i < n; i++){
            let x = random.uniform(0, this.size)
            let y = random.uniform(0, this.size)
            this.provinces.push(new Province(i, x, y))
        }
    }



}
module.exports = Board;
