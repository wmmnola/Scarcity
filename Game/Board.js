const csv = require('csv-parser');
const fs = require('fs');
const Tile = require("./Tile")
const Province = require("./Province");
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
            let x = this.size * random.float();
            let y = this.size * random.float();
            this.provinces.push(new Province(i,x,y));
        }

        for(let i = 0; i < this.size; i++){
            for(let j = 0; j < this.size; j++) {
                let minDistance = 99999;
                let province = this.provinces[0];
                for (let prov of this.provinces) {
                    let distance = distSq(i, j, prov.x, prov.y)
                    console.log(distance)
                    if(distance < minDistance) {
                        minDistance = distance;
                        province = prov;
                    }
                }
                console.log("province:("+i+", "+j+") added to "+province.id)
                province.addTile(this.grid[i][j])

            }


    }
}
calculateTrade() {
    for (let p of this.provinces) {
        p.getTradeDirec();
        console.log("the trade heading is "+p.theta)
    }
}
}

function distSq(x1, y1, x2, y2){;
    let d1 = Math.pow(x2  - x1, 2);
    let d2 = Math.pow(y2 - y1, 2);;
    return d1 + d2
}
module.exports = Board;
