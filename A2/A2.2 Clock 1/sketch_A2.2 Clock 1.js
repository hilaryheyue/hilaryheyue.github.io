function setup() {
  createCanvas(600, 600);
}

function draw() {
  background ('black');

  var h=hour();
  var m=minute();
  var s=second ();
  
  fill ('white');
  stroke ('black');
  text ('the time right now is : \n' + h + ':' + m + ':' + s, 100, 100);

  if (h>=12) {
  	h=h-12
  }

  if (h=1) {fill (190,30,45);}
  if (h=2) {fill (239,64,54);}
  if (h=3) {fill (240,90,40);}
  if (h=4) {fill (247,147,29);}
  if (h=5) {fill (251,175,63);}
  if (h=6) {fill (248,237,49);}
  if (h=7) {fill (214,223,35);}
  if (h=8) {fill (140,198,62);}
  if (h=9) {fill (56,180,73);}
  if (h=10) {fill (0,147,68);}
  if (h=11) {fill (0,103,56);}
  if (h=12) {fill (42,181,115);}
  stroke ('black');
  rect (100, 200, 400, 200)
  
  fill ('white');
  stroke ('white');
  ellipse(215, 305, 140, 140);
  ellipse(385, 305, 140, 140);

  // Angles for sin() and cos() start at 3 o'clock;
  // subtract HALF_PI to make them start at the top

  var angles = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  var anglem = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  var angleh = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;



  push();
  translate (215, 305);
  rotate (anglem);
  fill ( 'black');
  ellipse (35, 0, 70, 70);
  pop();

  push();
  translate (385, 305);
  rotate (angles);
  fill ( 'black');
  ellipse (35, 0, 70, 70);
  pop();


  //fill (255, 255, 255);
  //rect (220, 40, map(second(),0,60,0,400), 20);
  //fill (255, 255, map(minute(),0,60,0,255));
  //ellipse (210, 40, 5, 5);
  //fill (map(minute(),0,60,0,255), 255, 255);
  //ellipse (210, 60, 5, 5);
  //textSize (30);
  //fill (236, 0, 139);
  //text ('hilary says hi', 20, 60);
}
