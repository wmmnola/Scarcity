
let board;
let has_board;
let tile_size = 35;



let sketch = function(p) {
      p.setup = function() {
      }

       p.draw = function() {
          p.background(50);
          if(has_board) {
              	for(let i = 0; i < board.length; i++){
              	    for(let j = 0; j<board.width; j++){
                    		t = board.grid[i][j];

                        p.push();
                    		if(p.keyIsDown(66)){
                    		    drawBaseTax(t, tile_size, p);
                    		}
                        else if (p.keyIsDown(82)) {
                          drawResource(t, tile_size, p)
                        }
                        else if (p.keyIsDown(80)){
                          drawStates(t, tile_size, p);
                        }
                    		else {
                    		    drawCell(t,tile_size, p);
                    		}
                        p.pop();
              	    }
              	}
          }

      }
      p.keyPressed = function(){
        if(p.keyCode == 81){
          console.log("SEND!")
          let query = {
            socketId : p.socket.id,
            tiles : []
          };
          for(let i = 0; i< board.length; i++){
            for(let j = 0; j<board.width; j++){
              t = board.grid[i][j];
              if(t.isSelected && !t.water){
                query.tiles.push([i,j]);
              }
            }
          }
          p.socket.emit("test2",query)
        }
      }
       p.mousePressed = function() {

        let x = p.floor(p.mouseX/(tile_size));
        let y = p.floor(p.mouseY/(tile_size))
        if(board.grid[y]) {
        board.grid[y][x].isSelected = board.grid[y][x].isSelected ? false : true;
        console.log(y, x)
        console.log(board.grid[y][x].domainID)
      }
      }
      p.addSocket = function(s){
        p.socket = s;
      }

       p.init_game = function(data){
          p.createCanvas(tile_size*data.width, tile_size*data.length);
          board = data;
          has_board = true;

      }
}
