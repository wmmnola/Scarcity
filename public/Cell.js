
function drawCell(t, size, p) {
    p.noStroke();
    if(t.h < 0.5){
      c.setAlpha(100);
      p.fill("blue");
      p.square(t.x, t.y, size*size);
      return;
    }
    else {
      p.fill(100);
      p.square(t.x, t.y, size*size);
    }

}
