/**
 * Created by kathi on 08.05.16.
 */
var fs = require('fs');
var fileName = "/Users/kathi/WebstormProjects/shoppingList/amazonSearchMilch2.htm";

// read contents of request HTML
var contents = fs.readFileSync(fileName).toString();
var html = '<div id="atfResults" class="a-row s-result-list-parent-container">'
+ '<ul id="s-results-list-atf" class="s-result-list s-col-1 s-col-ws-1 s-result-list-hgrid s-height-equalized s-list-view s-text-condensed">'
+ '<li id="result_0" data-asin="B013R4XJQ2" class="s-result-item celwidget">'
+ '</li></ul></div>';

var cheerio = require('cheerio'), $ = cheerio.load(html);
var test = $('#atfResults').find('li.s-result-item');

test.each(function(index,item) {
    console.log(index);
    console.log(item);
});

//console.log(test);