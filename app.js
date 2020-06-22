
const express = require("express");
const bodyParser =require("body-parser");
const request =require("request");
const https=require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
  const firstName= req.body.fname;
  const middleName=req.body.mname;
  const lastName=req.body.lname;
  const data ={
    members:[
      {
        email_address:middleName,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ]
  };

  const jsonData=JSON.stringify(data);

  const url="https://us4.api.mailchimp.com/3.0/lists/1289a2b466";

  const option={
    method:"POST",
    auth:"satyam7:3a76f51f8a92b5e76ed9812a6a03225a-us4"
  }

  const request=https.request(url,option,function(response){

    if(response.statusCode===200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();
  //console.log(firstName , middleName , lastName);
});

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
