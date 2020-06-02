const random = require('random')

class Province {

    constructor(id, x, y){
        this.id = id;
        this.x = x;
        this.y = y;
        this.tiles = [];
        this.provColor = 255*Math.random();
        this.baseTax = Math.abs(random.normal())
        this.pop =5 + 10*random.normal()
    }
    addTile(t) {
        this.tiles.push(t)
        t.setProvColor(this.provColor)
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
        }
        this.tradeX = avgX/this.tiles.length
        this.tradeY = avgY/this.tiles.length
    }

}

module.exports = Province;
