class Player{
  constructor(socket,game){
    this.socket = socket;
    this.game = game;
    this.socket.on("test", (data) => {
      console.log("test");
    });
    this.socket.on("test2", (data) => {
      let tiles = this.game.board.findTiles(data.tiles);
      console.log(tiles);
      this.socket.emit("selection_info", tiles);
    });

  }

  }




module.exports = Player;
