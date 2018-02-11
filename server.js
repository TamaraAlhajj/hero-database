//Tamara Alhajj 100948027

//simple server listens on the provided port and responds with requested pages

// load modules
var http = require('http');
var fs = require('fs');
var mime = require('mime-types');
var url = require('url');
const ROOT = "./public";

// create http server
var server = http.createServer(handleRequest);
server.listen(2406);
console.log('Server listening on port 2406');

// handler for incoming requests
function handleRequest(req, res) {
	//process the request
	console.log("Request for: "+req.url);
	var filename = ROOT+req.url;
	var code, stats, heroNames; 
	var data = "";
	var urlObj = url.parse(req.url, true);
	
	
	if(urlObj.pathname === '/allHeroes'){
		//get list of heroes from each file name
		heroNames = fs.readdirSync("./heroes/");
		data = JSON.stringify({"superheroes": heroNames});
		code = 200; //respond
		
	}else if(urlObj.pathname === '/hero'){
		//specified hero
		data = fs.readFileSync("./heroes/"+urlObj.query.name);
		code = 200;
	}else if(fs.existsSync(filename)){
		//main page
		stats = fs.statSync(filename);
		if(stats.isDirectory()){
			filename = ROOT+"/index.html";
		}
		data = getFileContents(filename);
		code = 200; //respond
	}else{
		//let client know there has been an error
		filename = ROOT+"/404page.html";
		data = getFileContents(filename);
		code = 404; //respond
	}
	
	// content header
	res.writeHead(code, {'content-type': mime.lookup(filename)||'text/html'});
	// write message and signal communication is complete
	res.end(data);
};

//read a file and returns its contents
function getFileContents(filename){
	
	var contents;
	
	//handle good requests
	console.log("Getting file");
	contents = fs.readFileSync(filename);
	return contents;
}