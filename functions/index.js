const functions = require("firebase-functions");
// server.js
// where your node app starts

const express = require("express");
const AppleAuth = require("apple-auth");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const naver_auth = require('./naver_auth.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});


app.get('/callbacks/naver/sign_in', async (request, response) => {
  //Authentication Code 받아 돌려줄 api
  const redirect = `webauthcallback://success?${new URLSearchParams(request.query).toString()}`;
  console.log(`Redirecting to ${redirect}`);
  response.redirect(307, redirect);
  
})
app.post('/callbacks/naver/token', async (request, response) => {
  naver_auth.createFirebaseToken(request.body["accessToken"],(resulst)=>{
    response.send(resulst);
  });
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
