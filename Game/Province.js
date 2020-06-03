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
        this.adjProvinces = [];
        this.units = [];
    }
    addTile(t) {
        this.tiles.push(t)
        t.setProvColor(this.provColor)
    }
    collectTax() {
        return this.pop + this.baseTax
    }
    getTradeDirec(source, sink) {
        let avgX = 0;
        let avgY = 0;
        let avgTheta = 0;
        let sourceDist = this.distFrom({x: source[0], y: source[1]})
        let sinkDist = this.distFrom({x: sink[0], y: sink[1]})
        for(let t of this.tiles){
            avgX += t.tradeX
            avgY += t.tradeY
        }
        this.tradeX = avgX/this.tiles.length - source[0]/sourceDist + sink[0]/sinkDist
        this.tradeY = avgY/this.tiles.length - source[1]/sourceDist + sink[1]/sinkDist
    }
    tradeFlow(adjProv) {
        let smallestAngle = 2*3.141;
        let closestProv = adjProv;
        for(let p of adjProv) {
            let dot = p.x * this.tradeX + p.y * this.tradeY;
            let tradeDist = this.distFrom({x: this.tradeX, y: this.tradeY});
            let costheta = dot/(tradeDist*this.distFrom(p));
            let angle = Math.acos(costheta);
            if(angle < smallestAngle) {
                angle = smallestAngle
                closestProv = p;
            }
        }
        if(!closestProv) closestProv = this;
        console.log("trade: "+this.id +"->"+ closestProv.id);
    }
    distFrom(prov) {
        let d1 = Math.pow(prov.x - this.x, 2);
        let d2 = Math.pow(prov.y - this.y, 2);
        return Math.sqrt(d1 + d2)
    }
    setAdjProvinces(adj) {
        this.adjProvinces = adj;
    }
    addUnit(unit) {
        this.units.push(unit);
    }
    removeUnit(unit) {
        if(this.units.includes(unit)) {
            for(let i = 0; i < this.unit.length; i++) {
                if(this.unit[i] == unit) {
                    this.unit.splice(i, 1);
                }
            }
        }
    }
    moveUnit(u, p2) {
        if(this.units.includes(u) && this.adjProvinces.contains(p2.id)) {
            p2.addUnit(u);
            this.removeUnit(u);
        }
    }
}


module.exports = Province;
