let socket;
$(document).ready(main);
let Query;
function main(){

  socket = io('http://localhost:3000', { "force new connection": true });
  let p = new p5(sketch, "game");
  $("#game").show();
//  socket.on("player_info",playerInfo);
}
