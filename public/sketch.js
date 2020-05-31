
let board;
let has_board;
let tile_size = 35;
let r = 60;
let k = 50;
let size = 10;
let grid = [];
let active = [];
let w;
let count = 0;
let cols, rows;
let n = 5;
let tiles = [];
let camX = 0;
let camY = 0;

let sketch = function(p) {
      p.setup = function() {
        has_board = false;
        p.createCanvas(500, 500);
      }
       p.show = function() {
        p.noStroke();
        if(has_board) {
          for(let x = 0; x < p.floor(p.width/n); x++){
            for(let y = 0; y < p.floor(p.width/n); y++) {
              let i = p.abs(camX + x) % board.length;
              let j = p.abs(camY + y) % board.length;
              t = board[i][j]
              p.fill(150);
              if(t.h < 0.5) {
                p.fill(0,0,200);
              }
              if(t.x == 0 || t.x == 199 || t.y ==0 || t.y == 199) {
                p.fill(0);
              }
              p.square(x*n, y*n, n*n);
            }
          }
        }
      }
      p.keyTyped = function() {
        console.log(p.key);
        if(p.key === "d") {
          camX += 5*n;
          camX = camX % board.length;
        }
        if(p.key === "s"){
          camY += 5*n;
          camX = camX % board.length;
        }
        if(p.key === "a") {
          camX -= 5*n;
          camX = camX % board.length;
        }
        if(p.key === "w"){
          camY -= 5*n;
          camX = camX % board.length;
        }
        p.show();
      }
      p.init_game = function(b){
        has_board = true;
        board = b;
        p.show();
      }
}
