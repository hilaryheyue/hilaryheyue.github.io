function setup() {
  createCanvas(600, 600);
  rectMode(CENTER)
}

function draw() {
  background ('black');

  var h=hour();
  var m=minute();
  var s=second ();


  if (h>=12) {
    h=h-12
  }

  var angles = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  var anglem = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  var angleh = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

  //center
  var cx, cy;

  fill ('white');
  stroke ('black');
  text ('the time right now is : \n' + h + ':' + m + ':' + s, 100, 100);

  translate (300,300);
  noStroke ();
 
  push();
  rotate (angleh);
  fill (128,130,132);
  rect (0, 0, 300, 300);
  pop();

  push();
  rotate (angleh-PI/2)
  fill ('black')
  rect (0, 150, 25, 150);
  pop();

  push();
  rotate (anglem);
  fill (187,189,192);
  rect (0, 0, 200, 200);
  pop();

  push();
  rotate (anglem-PI/2);
  fill (128,130,132);
  rect (0, 100, 15, 100);
  pop();

  push();
  rotate (angles);
  fill (241,241,242);
  rect (0, 0, 100, 100);
  pop();

  push();
  rotate (angles-PI/2);
  fill (187,189,192);
  rect (0, 50, 5, 50);
  pop();
}
