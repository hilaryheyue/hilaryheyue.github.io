function setup() {
  createCanvas(640, 480);
}

function draw() {
  background ('black');
  
  fill (255, 255, 255);
  rect (220, 40, map(second(),0,60,0,400), 20);
  fill (255, 255, map(minute(),0,60,0,255));
  ellipse (210, 40, 5, 5);
  fill (map(minute(),0,60,0,255), 255, 255);
  ellipse (210, 60, 5, 5);
  textSize (30);
  fill (236, 0, 139);
  text ('hilary says hi', 20, 60);
}
