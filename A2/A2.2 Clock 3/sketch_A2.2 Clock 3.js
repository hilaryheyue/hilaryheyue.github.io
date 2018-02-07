function setup() {
  createCanvas(600, 600);
}

function draw() {
  background ('black');
  noStroke();

  	var s = second()
	var m = minute()
	var h = hour()

  //Hr Rect
  fill ('white');
  text ('HR', 50, 160);
  fill (255, 255, 255);
  rect (100, 120, map(hour(),0,24,0,450), 60);
  text (h, map(hour(),0,24,0,450)+110, 160);

  //Min Rect
  fill ('white');
  text ('MIN', 50, 300);
  fill (255, 255, 255);
  rect (100, 270, map(minute(),0,60,0,450), 60);
  text (m, map(minute(),0,60,0,450)+110, 300);  

  //Sec Rect
  fill ('white');
  text ('SEC', 50, 440);
  fill (255, 255, 255);
  rect (100, 410, map(second(),0,60,0,450), 60);
  text (s, map(second(),0,60,0,450)+110, 440);  

  
}
