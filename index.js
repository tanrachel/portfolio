// requiring dependencies-------------------------------------------
var express = require("express"),
        app = express(),
 bodyParser = require("body-parser");
// using dependencies-----------------------------------------------
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static("public"));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static('public'));
// app.set("view engine", "ejs");
// routes-----------------------------------------------------------
app.get("/",function(req,res){
	res.render("./home.html");
}) ;

app.get("/resume",function(req,res){
	res.render("./resume.ejs");
})

app.get("/aboutme", function(req,res){
	res.render("./aboutme.ejs")
})

app.get("/projects",function(req,res){
	res.render("./projects.ejs")
})

// listening--------------------------------------------------------
app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Portfolio Up and Running")
}); 