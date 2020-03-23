class BaseInv {
    constructor(resources) {
      this.resources = resources;
      this.quantities = Array(this.resources).fill(0);
    }
    addResource(r, amnt){
      let id = findResourceId(r);
      this.quantities[id] += amnt
    }
    findResourceId(resource){
      let i = 0;
      for(let r of resource){
        if r.id == resource.id: return i;
        i+=1;
      }
      return -1;

    }
}
/**
* FInd a given amnt of a resource
**/
}
module.exports = BaseInv;
