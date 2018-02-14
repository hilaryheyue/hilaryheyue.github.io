var headlines = [];
var sections = [];

function preload() {

  // Assemble url for API call
  var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
  var apikey = "22c09c1f955d4037a3c39e0a3c8e914f"; // see: https://developer.nytimes.com
  url += "?api-key=" + apikey;

  nytResponse = loadJSON(url);
  // loadJSON() is asynchronous, but calling it inside preload() guarantees
  // we'll have a response before setup() and draw() is run.
}

function setup() {
  createCanvas(640, 1000);
  background(0);

  textSize(14);
  textAlign(LEFT);

  noLoop(); // since we're not animating, one frame is sufficient: run draw() just once

  extractHeadlines();
  extractSections();
}

function draw() {
  background(230, 230, 230);

  var lineheight = 24;
  var margin = 40;
  translate(margin, margin);

  for (var i = 0; i < headlines.length; i++) {
    var words = split(headlines[i], ' ');
    // split("a,b,c", ',') => ["a", "b", "c"]

    var nextX = 0;

    for (var j=0; j<words.length; j++) {
      // draw headline
      if (sections[i] == 'U.S.') {
        fill(161, 186, 211);
      } else if (sections[i] == 'World') {
        fill(73, 103, 145);
      } else {
        fill(105, 129, 164);
      }
      text(words[j]+ ' ', nextX, i*lineheight);
      nextX += textWidth(words[j]+' ');
    }
  }
}

function extractHeadlines() {

  // console.log(nytResponse); // take a look at the full API response structure
  //for (stat A; cond B; stat C) {
  //  stat D
  //}
  //execute stat A => check cond B => (if not satisfied) stat D => stat C => check cond B ...

  // var mylist = [1, 2, 3]
  // append(mylist, 4) => mylist = [1, 2, 3, 4]
  // mylist[0] => 1
  // mylist[1] => 2
  // mylist[2] => 3
  // mylist.length => 4
  // c++ <=> c = c + 1

  for (var i = 0; i < nytResponse.results.length; i++) {
    var h = nytResponse.results[i].title;
    // besides .title, other text data available to you include:
    // .abstract, .byline, .section, etc. etc.
    append(headlines, h);
  }

  // console.log(headlines); // make sure counted data looks as expected
}

function extractSections() {
  for (var i = 0; i < nytResponse.results.length; i++) {
    var section = nytResponse.results[i].section;
    append(sections, section);
  }
  //console.log(sections);
}

