// requiring dependencies-------------------------------------------
var express = require("express"),
        app = express(),
 bodyParser = require("body-parser");
// using dependencies-----------------------------------------------
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static("public"));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
// app.set("view engine", "ejs");
// routes-----------------------------------------------------------
app.get("/",function(req,res){
	res.render("./static/home/home.html");
}) ;


// listening--------------------------------------------------------
app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Portfolio Up and Running")
}); 