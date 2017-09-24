/*
  This script shows random quotes
  and changes background color every 5 seconds
*/
var totalQuotes = quotes.length;
var used = [];
var quoteID;
var quoute;
var html;
var RGB;
// it is used to save the last quote not to show one quote twice
lastUsed = '';

function generateRandomNumber (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRGB () {
  var color = [];
  for( var i = 0; i < 3; i++ ) {
    color.push(generateRandomNumber(0, 255));
  }
  RGB = 'RGB(' + color[0] + ', ';
  RGB += color[1] + ', ';
  RGB += color[1] + ')';
  return RGB;
}

function generatePseudoRandomNumber (limit) {
  while (true) {
    // generate random index
    var randomIndex = generateRandomNumber(0, totalQuotes - 1);
    // If we haven't used this number before OR if we have used all numbers AND we just showed this quote let's use it
    // else just try to generate again
    if ( (used.indexOf(randomIndex) === -1 || used.length >= limit) && (lastUsed !== randomIndex) ) {
      // save this number so we can track which numbers we used
      used.push(randomIndex);
      // keep last id
      lastUsed = randomIndex;
      return randomIndex;
    } else {
      // it calls itself to try to generate pseudo random number again
      return generatePseudoRandomNumber(limit);
    }
  }
}

function getRandomQuote () {
  quoteID = generatePseudoRandomNumber(totalQuotes);
  quoute = quotes[quoteID];
  return quoute;
}

function printQuote () {
  // get quote and put HTML
  var data = getRandomQuote();
  console.log(data);
  html = '<p class="quote">' + data.quote + '</p>';
  html += '<p class="source">' + data.source;
  // add extra info if we have it
  if('citation' in data) {
    html += '<span class="citation">' + data.citation + '</span>';
  }
  if('year' in data) {
    html += '<span class="year">' + data.year + '</span>';
  }
  if('tags' in data) {
    html += '<br><small class="tags">' + data.tags.join(', ') + '</small>';
  }
  html += '</p>';
  document.getElementById('quote-box').innerHTML = html;
  // change background color
  document.body.style.backgroundColor = generateRGB ();
}

// initialize the function when the page loads and run this functions every 5 seconds
printQuote();
window.setInterval( printQuote, 5000 );

// add event listener to respond to "Show another quote" button clicks
document.getElementById('loadQuote').addEventListener("click", printQuote, false);
