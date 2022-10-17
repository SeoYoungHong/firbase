var admin = require("firebase-admin");

var serviceAccount = require("./severAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://testapp-760da-default-rtdb.firebaseio.com"
});

module.exports=admin;
