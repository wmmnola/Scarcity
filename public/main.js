let socket;
$(document).ready(main);
let Query;
function main(){

  socket = io('http://localhost:3000', { "force new connection": true });
  let p = new p5(sketch, "game");
  socket.on("game_board", p.init_game);
  $("#game").show();
//  socket.on("player_info",playerInfo);
}
