var http = require("http");
var url = require('url');
var osInfo= require('os');
var myArr=[],ip,kitu;



var networkInterfaces = osInfo.networkInterfaces();
for (var devname in networkInterfaces){
    iface = networkInterfaces[devname];
    if(devname == "Wi-Fi"){
        iface = networkInterfaces[devname];
        alias = iface[1];
        ip = alias.address;
    }
    //for unix devices
    else if(devname == "wlan-0"){
        iface = networkInterfaces[devname];
        alias = iface[0];//linux ipv4 at 0th ipv6 at 1
        ip = alias.address;
    }
}

http.createServer(function(req, res) {
  res.writeHead(200, {"Content-Type": "text/html"});
  var logic = url.parse(req.url, true).query;//query
  //{}object  //key:value  
  if(!isNaN(logic.kitu) && logic.kitu != ""){
        myArr.push({kitu:parseInt(logic.kitu),
            ip : req.connection.remoteAddress.slice(7)
        
        });
    }
    console.log(req.connection.remoteAddress);
  res.end(serve());
}).listen(8081);

console.log("Server is listening at http://"+ip+":8081");

function serve(){
    
   
var sum = 0;
var tableContent;
  for( var i = 0; i < myArr.length; i++ ){
      sum += parseInt( myArr[i].kitu); //don't forget to add the base
      tableContent+= "<tr><td>"+(i+1)+"</td><td>"+myArr[i].kitu+"</td><td>"+myArr[i].ip+"</td></tr>";  
    }
  var avg = sum/myArr.length;
  var styling = "<style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 30%;}td, th {border: 1px solid #FFC107;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #FFC107;} h1{font-family: helvetica; color:#FF9800;}input[type=text] {font-family:helvetica; font-size:13px; width: 10%;padding: 12px 20px;margin: 8px 0;box-sizing: border-box;border: none;border-bottom: 2px solid #FF9800;} .button{width: 10%; background-color: #FF9800;border: none;color: white;padding: 16px 32px;text-decoration: none;margin: 4px 2px;cursor: pointer;} p{ font-family: helvetica;}</style>"; 
  var html ="<html><head><title>IBM Assignment</title>"+styling+"</head><h1>Lean mean Average making machine</h1><form action='http://"+ip+":8081' method='GET'> <input type='text' name='kitu' placeholder='Add a number' required autocomplete='off'/><br> <button class='button'>Add</button></form> <table><tr><th>#</th><th>Value</th><th>IP Address</th></tr>"+tableContent+"</table>";
  var presentation = (html+ '<p>The sum of all the elements is: ' + sum + ' The average is:<b> ' + avg+'</b></p>');  
  return presentation;
}