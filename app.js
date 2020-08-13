//jshint esverson:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("Public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  }
  const jsonData = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/50ec826e44";
  const option = {
    method: "POST",
    auth: "rakesh1:c2f2807cc0db817e67dc2cfb2ec3e073-us10"
  }
  const request = https.request(url, option, function(response) {
    if(response.statusCode==200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
});
app.listen(process.env.PORT || 3000, function() {
  console.log("server is started ");
});

//API Key
// 6c66f91ad1f45d4ec4e57a58f6c82055-us10
// unique id for auedience
// 32e4a3d73c
