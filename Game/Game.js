const Board = require("./Board");
const random = require("random");
const len = 25;
const wid = 40;

/**@class Game := Game object*/
class Game {
    /**
    * Creates a new game and generates the board
    *
    */
    constructor() {
        // Creates the different kinds of goods
        this.board = new Board(200);
        this.board.generate();
      }

    update(){

    }

    /**
    * Given a list of tiles on the board, it finds all valid adjacent tiles
    *
    *
    */

}
module.exports = Game;
