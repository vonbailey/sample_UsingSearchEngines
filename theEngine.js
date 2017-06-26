/* 
Written By:  Otto Von Bailey
Title: Sample Program for Otto Von Bailey
Purpose:  Demonstrate programming skills in javascript
 */

var domain="http://localhost:8080/";

function setOne(x)
{
    try{
    if(x===1)
        {// If Google selected, uncheck Bing and Yahoo
            document.getElementById("b").checked = false;
            document.getElementById("y").checked = false;
        }
        else if(x===2)
        {// If Bing selected, uncheck Google and Yahoo
            document.getElementById("g").checked = false;
            document.getElementById("y").checked = false;        
        }
        else
        {// If Yahoo selected, uncheck Bing and Google
            document.getElementById("g").checked = false;
            document.getElementById("b").checked = false;        
        }
    }
    catch(err)
    {
        console.log("ERROR: setOne()");
        console.log(err.message);        
    }
    
}

function httpGet(theUrl)
{
    try
    {// Sending request to server
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, true );
        xmlHttp.send( null );
        console.log(xmlHttp.responseText);
        return xmlHttp.responseText;
    }
    catch(err)
    {
        console.log("ERROR: httpGet()");
        console.log("Failed to process this URL: "+theUrl);
        console.log(err.message);
        return err.message;
    }
    
}

function getOtherStuff(x)
{
    try{
        if(x===0)
        // Getting the search criteria
        {
            var com=document.getElementById("sCriteria").value;
            return com;
        }
        else
        // Getting the search engine
        {
            var eng;
            var id=["g","b","y"]; // html tags for the engines
            var sc=["google","bing","yahoo"]; // labels for the engines
            for(i=0;i<3;i++)
            {
                pEng=document.getElementById(id[i]).checked;
                if(pEng===true)
                {
                    eng=sc[i];
                    break;
                }
            }
            return eng;
        } 
    }
    catch(err)
    {
        console.log(exports.getDateStamp()+"ERROR: getOtherStuff(x)");
        if(x===0)
        {   
            e="search criteria.";
        }
        else
        {
            e="search engine name.";
        }
        console.log(exports.getDateStamp()+"Attempting to retrieve: "+e);
        alert("Failed attempting to retrieve the "+e);
        return false;
    }
}

function startUp(x)
{
    try{
        var br;
        var sc;
        var eng;
        switch(x)
        {
            case 1: // Setting up for Internet Explorer
                br = "ie";
                sc = getOtherStuff(0);
                eng = getOtherStuff(1);
                break;
            case 2: // Setting up for Chrome
                br = "chrome";
                sc = getOtherStuff(0);
                eng = getOtherStuff(1);
                break;
        }
        if(sc.length < 1)
        {   // Verifying there is search criteria
            alert("Missing Search Criteria.");
            return;
        }
        else if(eng===undefined)
        {   // Verifying a search engine has been selected.
            alert("Missing Search Engine Choice.");
            return;
        }
        else
        {// If both engine and search criteria are valid, start the test.
            var validate=confirm("Browser: "+br+"\nSearch Engine: "+eng+"\nSearch Criteria: "+
                    sc+"\n\nIs this correct?" );
            if(validate===true)
            {   // Sending request to server to start test using the selected criteria.
                httpGet(domain+"index.html?browser="+br+"&eng="+eng+"&sc="+sc);
            }
        }
        window.open(domain+"index.html","_self");
    }
    catch(err)
    {
        console.log("ERROR: startUp())");
        console.log(err.message);
    }

}




