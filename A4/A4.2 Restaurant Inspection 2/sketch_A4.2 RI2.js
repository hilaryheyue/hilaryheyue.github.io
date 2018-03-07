var mCuisine = {"Chinese": 0, "American": 0, "Pizza": 0, "Italian":0, "Cafe/Coffee/Tea": 0}
var bCuisine = {"Chinese": 0, "American": 0, "Pizza": 0, "Italian":0, "Cafe/Coffee/Tea": 0}
var qCuisine = {"Chinese": 0, "American": 0, "Pizza": 0, "Italian":0, "Cafe/Coffee/Tea": 0}
var mSum = 0;
var bSum = 0;
var qSum = 0;
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
	var startX = marginx;
    var startY = marginy*5;
	var cuisines = Object.keys(mCuisine);
	var diameter = 200;
	var marginx = 20
	var marginy = 20;
	// colors for different grades
	var colorsR = [206, 178, 255, 255, 109, 150];
    var colorsG = [207, 178, 251, 246, 110, 150];
    var colorsB = [255, 175, 232, 206, 178, 150];

    var mDiameter = diameter;
    var bDiameter = diameter * bSum / mSum;
    var qDiameter = diameter * qSum / mSum;
    var mTotAngle = 0;
    var bTotAngle = 0;
    var qTotAngle = 0;
	for (var i = 0; i < cuisines.length; i++) {
		var mAngle = radians(mCuisine[cuisines[i]] / mSum * 360);
		var bAngle = radians(bCuisine[cuisines[i]] / bSum * 360);
		var qAngle = radians(qCuisine[cuisines[i]] / qSum * 360);
		fill(colorsR[i], colorsG[i], colorsB[i]);
		var x = marginx + mDiameter / 2;
		var y = marginy + mDiameter / 2 + 20;
		arc(x, y, mDiameter, mDiameter, mTotAngle, mTotAngle + mAngle);
		x += (mDiameter + bDiameter) / 2 + 20;
		arc(x, y, bDiameter, bDiameter, bTotAngle, bTotAngle + bAngle);
		x += (bDiameter + qDiameter) / 2 + 20;
		arc(x, y, qDiameter, qDiameter, qTotAngle, qTotAngle + qAngle);
		mTotAngle += mAngle;
		bTotAngle += bAngle;
		qTotAngle += qAngle;

		var iconX = marginx;
		var iconY = mDiameter + marginy + 20 + 18 * (i+1);
		rect(iconX, iconY, 10, 10);
		fill(0);
		text(cuisines[i], iconX + 20, iconY + 10);
	}

	fill(0);
	var x = marginx + mDiameter / 2;
	var y = marginx;
	var labelSize = 10;
	textSize(labelSize);
	text("Manhattan", x - 15, y);
	x += (mDiameter + bDiameter) / 2 + 20;
	text("Brooklyn", x - 15, y);
    x += (bDiameter + qDiameter) / 2 + 20;
    text("Queens", x - 10, y);
}

function loadData() {
	var boros = table.getColumn("BORO");
	var cuisine = table.getColumn("CUISINE DESCRIPTION");
	allCuisines = Object.keys(mCuisine);
	for (var i = 0; i < boros.length; i++) {
		if (allCuisines.includes(cuisine[i])) {
			if (boros[i].includes("MANHATTAN")) {
				mCuisine[cuisine[i]] += 1;
				mSum += 1;
			} else if (boros[i].includes("BROOKLYN")) {
				bCuisine[cuisine[i]] += 1;
				bSum += 1;
			} else if (boros[i].includes("QUEENS")) {
				qCuisine[cuisine[i]] += 1;
				qSum += 1;
			}
		}	
	}
	sum = mSum + bSum + qSum;
	console.log(mCuisine);
}