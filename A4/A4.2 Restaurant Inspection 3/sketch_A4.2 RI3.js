var chineseGrade = {"A": 0, "B": 0, "C": 0};
var americanGrade = {"A": 0, "B": 0, "C": 0};
var pizzaGrade = {"A": 0, "B": 0, "C": 0};
var sumChinese = 0;
var sumAmerican = 0;
var sumPizza = 0;
var sum;

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
	var startX = marginx;
    var startY = marginy*5;
	var grades = Object.keys(chineseGrade);
	var diameter = 100;
	var marginx = 20
	var marginy = 100;
	// colors for different grades
	var colorsR = [206, 178, 255, 255, 109];
    var colorsG = [207, 178, 251, 246, 110];
    var colorsB = [255, 175, 232, 206, 178];

    var cDiameter = diameter;
    var aDiameter = diameter * sumAmerican / sumChinese;
    var pDiameter = diameter * sumPizza / sumChinese;
    var cTotAngle = 0;
    var aTotAngle = 0;
    var pTotAngle = 0;
	for (var i = 0; i < grades.length; i++) {
		var cAngle = radians(chineseGrade[grades[i]] / sumChinese * 360);
		var aAngle = radians(americanGrade[grades[i]] / sumAmerican * 360);
		var pAngle = radians(pizzaGrade[grades[i]] / sumPizza * 360);
		fill(colorsR[i], colorsG[i], colorsB[i]);
		var x = marginx + cDiameter / 2;
		var y = marginy + cDiameter / 2 + 20;
		arc(x, y, cDiameter, cDiameter, cTotAngle, cTotAngle + cAngle);
		x += (cDiameter + aDiameter) / 2 + 20;
		arc(x, y, aDiameter, aDiameter, aTotAngle, aTotAngle + aAngle);
		x += (aDiameter + pDiameter) / 2 + 20;
		arc(x, y, pDiameter, pDiameter, pTotAngle, pTotAngle + pAngle);
		cTotAngle += cAngle;
		aTotAngle += aAngle;
		pTotAngle += pAngle;

		var iconX = marginx;
		var iconY = cDiameter + marginy + 20 + 18 * (i+1);
		rect(iconX, iconY, 10, 10);
		fill(0);
		text(grades[i], iconX + 20, iconY + 10);
	}

	fill(0);
	var x = marginx + cDiameter / 2;
	var y = marginx;
	var labelSize = 10;
	textSize(labelSize);
	text("Chinese", x - 15, y);
	x += (cDiameter + aDiameter) / 2 + 20;
	text("American", x - 15, y);
    x += (aDiameter + pDiameter) / 2 + 20;
    text("Pizza", x - 10, y);
}

function loadData() {
	var grades = table.getColumn("GRADE");
	var cuisine = table.getColumn("CUISINE DESCRIPTION");
	for (var i = 0; i < grades.length; i++) {
		if (grades[i].length != 0) {
			if (grades[i] != "Z") {
				if (grades[i] != "P") {
					if (cuisine[i].includes("Chinese")) {
                    	chineseGrade[grades[i]] += 1;
                    	sumChinese += 1;
					} else if (cuisine[i].includes("American")) {
   						americanGrade[grades[i]] += 1;
   						sumAmerican += 1;
					} else if (cuisine[i].includes("Pizza")) {
						pizzaGrade[grades[i]] += 1;
						sumPizza += 1;
					}
				}
			}
		}
	}
	sum = sumChinese + sumAmerican + sumPizza;
	console.log(chineseGrade);
	console.log(sumChinese);
}