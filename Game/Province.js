const random = require('random')

class Province {

    constructor(id, x, y){
        this.id = id;
        this.x = x;
        this.y = y;
        this.tiles = [];
        this.baseTax = Math.abs(random.normal())
        this.pop =5 + 10*random.normal()
    }
    addTile(t) {
        this.tiles.push(t)
    }
    collectTax() {
        return this.pop + this.baseTax
    }
    getTradeDirec() {
        let avgX = 0;
        let avgY = 0;
        let avgTheta = 0;

        for(let t of this.tiles){
            avgX += t.tradeX
            avgY += t.tradeY
            avgTheta = t.theta
        }
        this.tradeX = avgX/this.tiles.length;
        this.tradeY = avgY/this.tiles.length;
        this.theta = Math.asin(this.tradeX)
    }

}

module.exports = Province;
