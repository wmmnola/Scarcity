class Player{
  constructor(socket, game){
    this.socket = socket;
    this.game = game;
    this.money = 10000;
    this.socket.on("test", (data) => {

    });
    this.socket.on("test2", (data) => {
      let tiles = this.game.board.findTiles(data.tiles);
      this.socket.emit("selection_info", tiles);
    });

  }

  }




module.exports = Player;
