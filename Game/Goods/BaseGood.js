class BaseGood {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.amnt = 0;
  }
  addAmnt(n){
    this.amnt += n;
  }

}
module.exports = BaseGood;
