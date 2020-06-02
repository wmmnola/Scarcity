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
    tradeFlow(adjProv) {
        let smallestAngle = 2*3.141;
        let closestProv = adjProv;
        for(let p of adjProv) {
            let dot = p.x * this.tradeX + p.y * this.tradeY;
            let costheta = dot/this.distFrom(p);
            let angle = Math.acos(costheta);
            if(angle < smallestAngle) {
                angle = smallestAngle
                closestProv = p;
            }
        }
        console.log("trade: "+this.id +"->"+ closestProv.id);
    }
    distFrom(prov) {
        let d1 = Math.pow(prov.x - this.x, 2);
        let d2 = Math.pow(prov.y - this.y, 2);
        return Math.sqrt(d1 + d2)
    }
}


module.exports = Province;
