var t = 0;  // current time step
var nt = 100000;  // number of time steps
var lengthPerDollar = 50;  // unit length for the circle charts
var lengthPerMonth = 5;  // unit length for the line chart
var offset = 60;  // offset between each graph
var topMargin = 100;
var x = [], y = [];  // data points for each fruit
var lineX = [[], []], lineY = [[], []];  // data points for PPI/CPI
var colors;  // color for each table
var indexHeight = 460; // height for CPI-PPI plot
var labels = ['APPLE', 'STRAWBERRY', 'GRAPE'];
var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
              'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function preload() {
    tables = [
        loadTable('../apple_pro.csv', 'csv', 'header'),
        loadTable('../apple_ret.csv', 'csv', 'header'),
        loadTable('../strawberry_pro.csv', 'csv', 'header'),
        loadTable('../strawberry_ret.csv', 'csv', 'header'),
        loadTable('../grape_pro.csv', 'csv', 'header'),
        loadTable('../grape_ret.csv', 'csv', 'header')
    ];
    piTable = loadTable('../fruit_ppi_cpi.csv', 'csv', 'header');
}

function setup() {
    // compute data point positions for PPI/CPI
    for (var i = 0; i < piTable.getRowCount() - 3; i++) {
        for (var j = 0; j < 2; j++) {
            var pi0 = parseFloat(piTable.getString(i, j + 1));
            var pi1 = parseFloat(piTable.getString(i + 1, j + 1));
            if (i == 0) {
                lineX[j].push(offset + 14 * lengthPerMonth);
                lineY[j].push(indexHeight - pi0);
            }
            for (var k = 1; k <= 12; k++) {
                var val = pi0 + (pi1 - pi0) / 14 * k;
                lineX[j].push(offset + ((i + 1) * 14 + k) * lengthPerMonth);
                lineY[j].push(indexHeight - val);
            }
        }
    }
    
    // compute data point positions for each fruit
    for (var k = 0; k < tables.length; k++) {
        x.push([]);
        y.push([]);
        for (var i = 0; i < tables[k].getRowCount(); i++) {
            for (var j = 1; j < tables[k].getColumnCount(); j++) {
                var r = parseFloat(tables[k].getString(i, j)) * lengthPerDollar;
                var theta = PI * (j - 1) / 6 - PI / 2;
                x[k].push(r * cos(theta));
                y[k].push(r * sin(theta));
            }
        }
        if (x[k].length < nt) {
            nt = x[k].length;
        }
    }

    colors = [
        // producer color
        [color(255, 220, 220), color(255, 0, 0), color(100, 0, 0)],
        // consumer color
        [color(220, 220, 255), color(0, 0, 255), color(0, 0, 100)]
    ]

    createCanvas(1920, 1080);
    frameRate(10);

    textSize(24);
    text('PRICE SPREADS FROM FARM TO CONSUMER', offset, 40);
    
    textSize(17);
    text('How do we understand the change of fresh fruit market spread vs. farm spread over the year?', offset, 80);
    fill(150);
    text('The change of CPI vs. PPI from 1995 to 2015 indicates that:', offset, 102);
    text('both CPI and PPI are increasing, but PPI is increasing faster', offset, 124);
    fill(0);
    text('How does seasonality influence fresh fruit market spread vs. farm spread?', offset, indexHeight + topMargin - 40);
    fill(150);
    text('For all year product, market spread vs. farm spread ratio is relatively stable', offset, indexHeight + topMargin - 18);
    text('For seasonal product, market spread increases significantly when low production', offset, indexHeight + topMargin + 4);


    // draw axis for index plot
    textSize(10);
    //line(offset, indexHeight, offset + (x[0].length + 11) * lengthPerMonth, indexHeight);
    //line(offset, indexHeight, offset, indexHeight - 400);
    fill(0);
    line(offset + 14 * lengthPerMonth, indexHeight, offset + 14 * lengthPerMonth, indexHeight - 5);
    text('1995', offset + 14 * lengthPerMonth - textWidth('1995') / 2, indexHeight + 12);
    line(offset + 263 * lengthPerMonth, indexHeight, offset + 263 * lengthPerMonth, indexHeight - 5);
    text('2015', offset + 263 * lengthPerMonth - textWidth('2015') / 2, indexHeight + 12);
    fill(150);
    text('USDA Average price indexs for fresh fruit. Price index 1995=100', offset + 263 * lengthPerMonth - 
        textWidth('USDA Average price indexs for fresh fruit. Price index 1995=100') 
        + textWidth('2015') / 2, indexHeight + 24);
    text('The retail price is derived from data from the U.S. Department of Labor, Bureau of Labor Statistics', offset + 263 * lengthPerMonth - 
        textWidth('The retail price is derived from data from the U.S. Department of Labor, Bureau of Labor Statistics') 
        + textWidth('2015') / 2, indexHeight + 600);
    text('The grower price is from USDA Fruit and Tree Nut Yearbook', offset + 263 * lengthPerMonth - 
        textWidth('The grower price is from USDA Fruit and Tree Nut Yearbook') 
        + textWidth('2015') / 2, indexHeight + 612);

    fill(0);
    line(offset + textWidth('100') + 2, indexHeight - 100, offset + textWidth('100') + 7, indexHeight - 100);
    text(100, offset, indexHeight - 100 + 4);
    line(offset + textWidth('100') + 2, indexHeight - 200, offset + textWidth('100') + 7, indexHeight - 200);
    text(200, offset, indexHeight - 200 + 4);
    line(offset + textWidth('100') + 2, indexHeight - 300, offset + textWidth('100') + 7, indexHeight - 300);
    text(300, offset, indexHeight - 300 + 4);

    // draw circles
    translate(0, indexHeight+40);
    textSize(12);
    translate(-lengthPerDollar * 4, topMargin + lengthPerDollar * 4);
    for (var k = 0; k < x.length / 2; k++) {
        translate(offset + lengthPerDollar * 8, 0);
        for (var i = 1; i <= 4; i++) {
            noFill();
            stroke(50, 25);
            ellipse(0, 0, lengthPerDollar * 2 * i, lengthPerDollar * 2 * i);
            noStroke();
            fill(0);
            textSize(12);
            text(str(i), lengthPerDollar * i, 0);
        }
        noStroke();
        fill(0);
        for (var i = 0; i < months.length; i++) {
            if (i != 3) {
                var r = lengthPerDollar * 4;
                var theta = PI * i / 6 - PI / 2;
                textSize(12);
                text(months[i], r * cos(theta) - textWidth(months[i]) / 2,
                     r * sin(theta) + 5);
            }
        }
        textSize(17);
        fill(0);
        text(labels[k], -textWidth(labels[k]) / 2, lengthPerDollar * 4 + 40);
    }
}

function draw() {
    // plot index
    //background(0)
    for (var k = 0; k < lineX.length; k++) {
        var c;
        if (t <= nt / 2) {
            var inter = map(t, 0, nt / 2, 0, 1);
            c = lerpColor(colors[k][0], colors[k][1], inter);
        } else {
            var inter = map(t, nt / 2 + 1, nt - 1, 0, 1);
            c = lerpColor(colors[k][1], colors[k][2], inter);
        }
        stroke(c);
        noFill();
        if (t > 0) {
            strokeWeight(1);
            line(lineX[k][t - 1], lineY[k][t - 1], lineX[k][t], lineY[k][t]);
        }
        if (t % 12 == 0) {
            strokeWeight(4);
            point(lineX[k][t], lineY[k][t]);
        }
    }

    // plot fruit prices
    translate(0, indexHeight+40);
    translate(-lengthPerDollar * 4, topMargin + lengthPerDollar * 4);
    for (var k = 0; k < x.length; k++) {
        if (k % 2 == 0) {
            translate(offset + lengthPerDollar * 8, 0);
        }
        var c;
        if (t <= nt / 2) {
            var inter = map(t, 0, nt / 2, 0, 1);
            c = lerpColor(colors[k % 2][0], colors[k % 2][1], inter);
        } else {
            var inter = map(t, nt / 2 + 1, nt - 1, 0, 1);
            c = lerpColor(colors[k % 2][1], colors[k % 2][2], inter);
        }
        stroke(c);
        strokeWeight(1);
        noFill();
        if (t > 1) {
            curve(x[k][t - 2], y[k][t - 2], x[k][t - 1], y[k][t - 1],
                  x[k][t], y[k][t], x[k][t + 1], y[k][t + 1]);
        } else if (t == 1) {
            curve(x[k][0], y[k][0], x[k][0], y[k][0], x[k][1], y[k][1],
                  x[k][2], y[k][2]);
        }
        strokeWeight(4);
        point(x[k][t], y[k][t]);
    }

    if (t < nt - 1) {
        t += 1;
    }
}
