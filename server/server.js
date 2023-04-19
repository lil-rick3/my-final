const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "fn34fb5y4bgu54gb45ybg4y5ryth43ugbru34ytgv3yu5vt";

app.use(express.json());
app.use(cors());

const twilio = require('twilio');
const accountSid = 'ACf2a255488e507b16467ba06629db84e8';
const authToken = 'a6e5754c1a57d0084e5a9649a583d78a';

const client = twilio(accountSid, authToken);
const server_num = '+18338669587';
//sendMessage('+15202514006', 'twillio test');

const port = 80;
require("./models/user");

const connectionString =
  "mongodb+srv://jbm3:1234@cluster0.kdcfo15.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

const User = mongoose.model("User");

app.get("/test-api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

app.post("/createAccount", async (req, res) => {
  const { username, firstName, lastName, phoneNumber, email, password } =
    req.body;
  try {
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });
    const existingPhoneNumber = await User.findOne({ phoneNumber });

    if (existingEmail) {
      return res.send({
        error: "This email has already been registered with an account",
      });
    }
    if (existingUsername) {
      return res.send({ error: "Username already exists" });
    }
    if (existingPhoneNumber) {
      return res.send({
        error: "This phone number has already been registered with an account",
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username: username,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      password: encryptedPassword,
    });

    res.send({ status: "ok" });
    console.log("User saved");
  } catch (err) {
    res.send({ status: "error" });
    console.log("Error at saving user");
  }
});

app.post("/loginAccount", async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.json({ error: "Login details are incorrect" });
  }

  if (
    !existingUser &&
    !(await bcrypt.compare(password, existingUser.password))
  ) {
    return res.json({ error: "Login details are incorrect" });
  }

  const token = jwt.sign({ email: existingUser.email }, jwtSecret, {
    expiresIn: 60,
  });

  if (res.status(201)) {
    return res.json({ status: "ok", data: token });
  } else {
    return res.json({ error: "error" });
  }
});

app.post("/homeData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, jwtSecret, (err, res) => {
      if (err) {
        return "token expired";
      } else {
        return res;
      }
    });

    if (user === "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    User.findOne({ email: user.email })
      .then((data) => {
        res.send({ stauts: "ok", data: data });
      })
      .catch((err) => res.send({ status: "error", data: error }));
  } catch (err) {
    res.json({ error: "Error at /username/TODO" });
    console.log("Error at /username/TODO");
  }
});

app.post('/reminder/enter', async(req,res)=>{
  /*
  this takes in a task, and enters it into the database, however, the object id's still need to be found out
  */
 let tempReminder = req.body;
 var newTask = new Reminder(tempReminder);

 try{
  let message = await newTask.save();
 } catch (error){
  console.log("error" + error);
 }
  
  res.end("task created");

  //TODO

});
app.post('/user/search/:keyword', async(req,res)=>{

  /*
  This part will take in a username keyword and create a search for users, and send those users with their _id value for future things
  */
  let keyWord = req.params.keyword;

  let p1 = User.find({name:{$regex:keyWord}}).exec();
  p1.then( (results) => { 
    outarr = new Array();

    for(let i = 0; i < results.length; i++){

      tempObj = {name: results[i].username, id: results[i]._id}
      outarr.push(tempObj);
    }
    res.end( JSON.stringify(outarr) );
  }).catch( (error) => {
    console.log(error);
    res.end('FAIL');
  });




});
function sendMessage(phoneNumber, textBody){
  client.messages
    .create({
        body: textBody,
        from: server_num,
        to: phoneNumber
    })
    .then(message => console.log(message.sid))
}

app.listen(port, () => {
  console.log(`http://localhost:${80}`);
});
