function drawCell(t, size, p) {
    p.fill(p.color(t.color));
    p.noStroke();
    p.rect(t.y*size, t.x*size, size, size);
    if(t.claimed){
      let c = p.color(t.claimColor);
      c.setAlpha(100);
      p.fill(c);
      p.rect(t.y*size, t.x*size, size, size);
    }
    if(t.isCity) {
      p.fill("yellow")
      p.ellipse((t.y + 0.5)*size, (t.x + 0.5)*size, size/2, size/2);
    }
    if(t.isSelected) {
      p.strokeWeight(1);
      p.stroke("yellow")
      p.rect(t.y*size, t.x*size, size, size);
    }
}

function drawStates(t, size, p){
    p.noStroke();
    let c = t.claimed ? p.color(t.claimColor) : p.color(t.color)
    p.fill(c);
    //p.strokeWeight(1)
    p.rect(t.y*size, t.x*size, size, size);
}

function drawBaseTax(t, size, p){
    //push();
    let c = t.water ? p.color("blue") : p.color(0, 255, 100, 255*t.taxPercentile);
    p.fill(c);
    p.strokeWeight(1)
    p.rect(t.y*size, t.x*size, size, size);
    //fill(c);
    if(!t.water){
      p.fill(0)
      p.text(p.floor(t.baseValue), t.y*size, t.x*size, t.y*size - size, t.x*size + size);
      p.fill(0);
  }
    //pop();
}
function drawResource(t, size, p){

  let c = t.hasResource ? p.color(t.rColor) : p.color("grey");
  p.fill(c);
  p.strokeWeight(1);
  p.rect(t.y*size, t.x*size, size, size);
  if(t.water){
    p.fill("blue");
    p.rect(t.y*size, t.x*size, size, size);
  }
}
