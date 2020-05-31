
function drawCell(t, size, p) {
    p.noStroke();
    if(t.h < 0.5){
      p.fill("blue");
      p.square(t.x*size, t.y*size, size*size);
    }
    else {
      p.fill(100);
      p.square(t.x*size, t.y*size, size*size);
    }

}
