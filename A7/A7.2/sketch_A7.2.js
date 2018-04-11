function preload() {
	table = loadTable('../cpi.csv', 'csv', 'header');
}

function setup() {
	createCanvas(800, 600);
}

function draw() {
	background(255);
	noStroke();
	var leftMargin = 50, topMargin = 70;
	text('CPI change from 1990 to 2016', leftMargin, topMargin - 40);
	text('test to load data and drawing simple graph from dataset', leftMargin, topMargin - 20);
	for (var i = 0; i < table.getRowCount(); i++) {
		noStroke();
		text(table.getString(i, 0), leftMargin, topMargin + 210 * i);
		stroke(153);
		var relCPI = 1.0;
		var oldRelCPI = 1.0;
		for (var j = 1; j < table.getColumnCount(); j++) {
			oldRelCPI = relCPI;
			relCPI = relCPI * (1 + parseFloat(table.getString(i, j)) / 100);
			print(relCPI);
			line(leftMargin + (j - 1) * 10, topMargin + 210 * (i + 1) - 100 * oldRelCPI,
				leftMargin + j * 10, topMargin + 210 * (i + 1) - 100 * relCPI);
		}
	}
}
