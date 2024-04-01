const express = require("express");
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const path = require("path");
require('dotenv').config();
const app = express();
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
app.use(express.json());



const Users = require("./models/users");

const seq = require("./util/db");
const { stringify } = require("querystring");


//these two are a MUST in order to be able to send or recive data from the client side, fornt-end
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type');   
     next();

  });
  

  app.use(express.urlencoded({ extended: false }));
  const sessionStore = new SequelizeStore({
    db: seq,
    checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 24 * 60 * 60 * 1000  // The maximum age (in milliseconds) of a valid session.
  });
  app.use(session({
    secret: 'sec',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  }));

// const transporter = nodemailer.createTransport(
//   sgTransport({
//     auth: {
//      api_key: process.env.SENDGRID_API_KEY
//     },
//   })
// );

//otp sending route

app.post("/sendOtp", (req, res) => {
  let otp = Math.floor(10000000 + Math.random() * 90000000);
otp = parseInt(otp);

  req.session.otp = otp;
  console.log(req.session.otp);
  transporter
    .sendMail({
      to: req.body.email,
      from: "redyarh@gmail.com",
      subject: "OTP for registration is: ",
      text: `Your OTP for registration ${otp}`
    }) 
    .then((result) => {
if(result){  
req.session.email = req.body.email;
req.session.name = req.body.name;
req.session.password = req.body.password;

    console.log("the email has been sent!!");
    res.json({ valid: true });
}
else{
    res.json({ valid: false });
} })
    .catch((err) => {
      console.log(err);
    });
});


//otp checking route
//stringify the otp and send it to the client side if needed idk yet
//i have put the code at the bortom of this file .
app.post('/verify-otp', (req, res) => {

    console.log("enterted the verify otp route");
    let otp = req.session.otp ;
     console.log("the otp is :  ", otp);
    console.log("the user entered otp :  ", req.body.otp);
    console.log(otp==req.body.otp);
  
  if (otp == req.body.otp) {
    req.session.save(err=>{
      if(err){
        console.log("there was an error in saving the session");
        res.json({ valid: false });
      }
      else{
        console.log("the otp is correct");
          res.json({ valid: true });
      }

    });

  } else {
    console.log("the otp is wrong");
    res.json({ valid: false });
  }
});



//make it so when the OTP IS VALID then it will create a user in the database
//boya abet la dway data.valid akawa fetchy api /createUser bkain
app.post('/createUser', (req, res) => {

  console.log("enterted the create user route");

  console.log(req.session.name);
  console.log(req.session.email);
  console.log(req.session.password);

Users.create({
    name: req.session.name,
    email: req.session.email,
    password: req.session.password,
  }).then((result) => {
      console.log("the user has been created successfully");
      req.session.destroy();
      res.json({ valid: true });
    })
    .catch((err) => {
      console.log(err);
      res.json({ valid: false });
    });

});





app.post('/login', (req, res) => {

let email = req.body.email;
  let password= req.body.password;

  Users.findOne({where:{email:email, password:password}}).then((result)=>{
    if(result){
      console.log("the user has been found");
      res.json({valid:true});
    }
    else{
      console.log("the user has not been found");
      res.json({valid:false});
    }
  }).catch((err)=>{
    console.log(err);
  });


});









// {force:true}
seq.sync()
  .then(() => {
    sessionStore.sync();
    app.listen(3000, () => console.log("Server started on port 3000"));
  });

  
//fetch("http://localhost:3000/createUser", {
    // method:"POST"
    // , headers:{"Content-Type":"application/json"}, 
    // body:JSON.stringify({name:name, email:email, password:password})})
    // .then(response=> {
    //     response.json()
    // }).then(result=>{
    // if(result.valid){
    //   console.log("the user has been created successfully");
    //   return nav("/otp")
    // }
    // else{
    //   console.log("the user has not been created successfully");
    // }
      
    // }).catch((err) => {
    //   console.log(err);
    // });
    //   }
    