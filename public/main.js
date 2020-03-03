let socket;
$(document).ready(main);
let Query;
function main(){

  socket = io('http://localhost:3000', { "force new connection": true });
  let p = new p5(sketch, "game");
  p.addSocket(socket);
  socket.on("game_board", p.init_game);
  socket.on("domain_info", domain_info);
  socket.on("selection_info", selectionInfo);
//  socket.on("player_info",playerInfo);
  $(".map").click(function(){
    $("div").hide();
    $("#game").show();
  });
  $(".player").click((event) => {
    event.preventDefault();
    event.stopPropagation();
    $("div").hide();
    $(".playerInfo").show();
  });
  $(".domainInfo").click(function(event){
    event.preventDefault();
    event.stopPropagation();
    $("div").hide();
    $(".gameInfo").show();
  });
  $(".selection").click(function(event){
    event.preventDefault();
    event.stopPropagation();
    socket.emit("test");
    $("div").hide();
    $(".selectionInfo").show();
  });
  $("div").hide();
  $("#game").show();
}


function playerInfo(player){

}
function domain_info(domains) {
  $(".gameInfo").append('<tr><th id=domainId> ID </th><th id=tiles> #Tiles </th><th> Density </th><th>Money</th>'+
                        '<th>Food Demanded</th><th>Iron</th><th>Food</th></tr>');
  for(let d of domains){
    console.log(d)
    if(d.percentile){
      $(".gameInfo").append("<tr><td>"+d.id+"</td>" +"<td>"+d.claimedTiles.length+"</td>" +"<td>"+d.percentile.toFixed(2)+"</td>" +
      "<td>"+d.money.toFixed(0)+"</td><td>"+d.city.demand.toFixed(1)+
                  "</td><td>"+d.resources[0].toFixed(1)+"</td><td>"+d.resources[1].toFixed(1)+"</td></tr>");
    }
  }
}

function selectionInfo(tiles){

  $(".selectionInfo").empty();
  $(".selectionInfo").append('<tr><th>X, Y</th><th id=tiles>base value</th><th> Population Percentile </th><th>Resource?</th></tr>');
  for(let t of tiles){
    $(".selectionInfo").append("<tr><td>"+t.x+","+t.y+"</td><td>"+t.baseValue.toFixed(2)+"</td><td>"+t.populationPercentile.toFixed(2)+"</td>" +
                                "<td>"+t.resourceName+"</td><td>"+t.resourceDemands[1].toFixed(0)+
                                "</td><td><button id="+t.id+">Build</button></td></tr>");
  }
}
