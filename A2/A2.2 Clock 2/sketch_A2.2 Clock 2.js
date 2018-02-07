function setup() {
  createCanvas(600, 600);
}

function draw() {
  background ('black');

  var h=hour();
  var m=minute();
  var s=second ();


  if (h>=12) {
    h=h-12
  }

  var angles = map(second(), 0, 60, 0, TWO_PI) - 3*PI/4;
  var anglem = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - 3*PI/4;
  var angleh = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - 3*PI/4;

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
  rect (0, 0, 150, 150);
  pop();

  push();
  rotate (anglem);
  fill (187,189,192);
  rect (0, 0, 100, 100);
  pop();

  push();
  rotate (angles);
  fill (241,241,242);
  rect (0, 0, 50, 50);
  pop();
}
