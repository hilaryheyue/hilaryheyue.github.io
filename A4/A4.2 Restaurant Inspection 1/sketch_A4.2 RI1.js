var numPerBoro = {};
var sum = 0;

function preload() {
	table = loadTable('../RI.csv', 'csv', 'header');
}

function setup() {
	createCanvas(800, 600);
	loadData();
	noStroke();
}

function draw() {
	background(255);
	var startX = margin;
    var startY = margin*5;
	var boros = Object.keys(numPerBoro);
	var totAngle = 0;
	var diameter = 300;
	var margin = 20;
	// colors for different boros
	var colorsR = [206, 178, 255, 255, 109];
    var colorsG = [207, 178, 251, 246, 110];
    var colorsB = [255, 175, 232, 206, 178];

	for (var i = 0; i < boros.length; i++) {
		var angle = radians(numPerBoro[boros[i]] / sum * 360);
		fill(colorsR[i], colorsG[i], colorsB[i]);
		var x = margin + diameter / 2;
		var y = x;
		arc(x, y, diameter, diameter, totAngle, totAngle + angle);
		totAngle += angle;
		var iconX = margin;
		var iconY = diameter + margin + 18 * (i+1);
		rect(iconX, iconY, 10, 10);
		fill(0);
		text(boros[i], iconX + 20, iconY + 10);
	}
}

function loadData() {
	var boros = table.getColumn("BORO");
	for (var i = 0; i < boros.length; i++) {
		if (!boros[i].includes('Missing')) {
			if (!numPerBoro[boros[i]]) {
			    numPerBoro[boros[i]] = 0;
		    }
			numPerBoro[boros[i]] += 1;
			sum += 1;
		}
	}
}