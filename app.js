const express = require("express");
const bodyParser = require("body-parser"); 
const request = require("request"); 
const https = require("https"); 

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res)
{
    res.sendFile(__dirname + "/signup.html");
});
    
app.post("/", function(req, res)
{
const FirstName = req.body.Name1;
const LastName = req.body.Name2;
const email = req.body.email;

const data = 
{
members: 
[{ 
email_address: email,
status: "subscribed",
merge_fields: 
    {
    FNAME: FirstName,
    LNAME: LastName,
    }
}]
};

const jsonData = JSON.stringify(data);

const url = "https://us19.api.mailchimp.com/3.0/lists/4061a48e5f"; 
const options = 
{
method: "POST",
auth: "A-10:c66749b2c012fce8feebeb0e9e967ca7-us19",
};

const request = https.request(url, options, function(response)
{
response.on("data", function(data)
{
    if (response.statusCode === 200)
    {
    res.sendFile(__dirname + "/sucess.html")
    }
    else
    {
    res.sendFile(__dirname + "/failure.html")
    }
})
});

request.write(jsonData);
request.end();
});    

app.post("/failure", function(req, res)
{
    req.redirect("/");
});

app.listen(process.env.PORT || 3000, function()
{
console.log("Server is on localhost:3000");
});

// API 
// c66749b2c012fce8feebeb0e9e967ca7-us19

// List ID
// 4061a48e5f