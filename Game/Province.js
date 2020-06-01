const random = require('random')

class Province {

    constructor(id, x, y){
        self.id = id;
        self.x = x;
        self.y = y;
        self.tiles = [];
        self.baseTax = Math.abs(random.gaussian())
        self.pop =5 + 10*random.gaussian()
    }
    addTile(t) {
        self.tiles.push(t)
    }
    collectTax() {
        return self.pop + self.baseTax
    }




}
