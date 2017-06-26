/* 
Written By:  Otto Von Bailey
Title: Sample Program for Otto Von Bailey
Purpose:  Demonstrate programming skills in selinium and node.js
 */

// Setup requirements for Selenium
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var chromedriver = require('chromedriver');
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

// Setup requirements for Node.JS
var http = require('http');
var url = require('url');
var fs = require('fs');

exports.doSearch=function(br,sc,eng)
{   
    try{
        // Opening the Browser
        var driver = new webdriver.Builder().forBrowser(br).build();
        driver.manage().window().maximize();
        try{
        // Selecting the search engine
            switch (eng)
            {
                case "google": // Entering search criteria to Google
                    driver.get("http://www.google.com");
                    element=driver.findElement(webdriver.By.name("q"));
                    element.sendKeys(sc);
                    var element1=driver.findElement(webdriver.By.name("btnG"));
                    break;
                case "bing": // Entering search criteria to Bing
                    driver.get("http://www.bing.com");
                    element=driver.findElement(webdriver.By.name("q"));
                    element.sendKeys(sc);
                    var element1=driver.findElement(webdriver.By.name("go"));
                    break;
                case "yahoo": // Entering search criteria to Yahoo
                    driver.get("http://www.yahoo.com");
                    element=driver.findElement(webdriver.By.name("p"));
                    element.sendKeys(sc);
                    var element1=driver.findElement(webdriver.By.id("uh-search-button"));
                    break;
            }}
        catch(err)
        {
        console.log(exports.getDateStamp()+"ERROR: doSearch() while entering search critera for "
                +br+ " using the "+eng+" search engine.");
        console.log(err.message);             
        }
    // Submitting search criteria
    element1.click();
    }
     catch(err)
     {
        console.log(exports.getDateStamp()+"ERROR: doSearch()");
        console.log(err.message);         
     }
};

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  var qdata=q.query; 
  if(qdata.sc!==undefined)
  {
      exports.doSearch(qdata.browser,qdata.sc,qdata.eng);
  }
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }  
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();});

  }).listen(8080);
