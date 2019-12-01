// requiring dependencies-------------------------------------------
require("dotenv").config();
var express = require("express"),
		app = express(),
		bodyParser = require("body-parser"),
		nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const GMAIL_USER = process.env.GMAIL_USER
const CLIENT_ID= process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REFRESH_TOKEN	= process.env.REFRESH_TOKEN
const oauth2Client = new OAuth2(
     CLIENT_ID, // ClientID
     CLIENT_SECRET, // Client Secret
     "https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
     refresh_token: REFRESH_TOKEN
});
const accessToken = oauth2Client.getAccessToken()
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

app.get("/contactme",function(req,res){
	res.render("./contact.ejs")
})

//contact me email set up  ----------------------------------------------------
// POST route from contact form

app.post('/contactme', (req, res) => {
	
  // Instantiate the SMTP server
	const smtpTransport = nodemailer.createTransport({
		 service: "gmail",
		 auth: {
			  type: "OAuth2",
			  user: "racheltancoding@gmail.com", 
			  clientId: CLIENT_ID,
			  clientSecret: CLIENT_SECRET,
			  refreshToken: REFRESH_TOKEN,
			  accessToken: accessToken
		 }
	});

  // Specify what the email will look like
  const mailOpts = {
    from: `${req.body.email}`, 
    to: GMAIL_USER,
    subject: `${req.body.title}`,
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  }

  // Attempt to send the email
  smtpTransport.sendMail(mailOpts, (error, response) => {
    if (error) {
      res.redirect("back"); // Show a page indicating failure
		console.log(error);
    }
    else {
      res.redirect("/contactme") // Show a page indicating success
	
    }
	  smtpTransport.close()
  })
})
// listening--------------------------------------------------------
app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("Portfolio Up and Running")
}); 