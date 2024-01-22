const mongoose =  require("mongoose");
mongoose.connect("mongodb://localhost:27017/contactDance")
const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const app = express();
const port = 8000;

var contactSchema = new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String,
    desc:String,

});
var Contact = mongoose.model("Contact",contactSchema);

//  EXPRESS SPECIFIC STUFF
app.use("/static",express.static("static")); // for serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // set template engine as pug
app.set("views",path.join(__dirname,'viewsfolder')); // set views directory

// ENDPOINTS
app.get('/',(req,res) =>{
    
    const params = { };
    res.status(200).render('home.pug',params);
});

app.get('/contact',(req,res) =>{
    
    const params = { };
    res.status(200).render('contact.pug',params);
});

app.post('/contact',(req,res) =>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    });
    
});

// START THE SERVER
app.listen(port ,()=>{
    console.log(`application started succesfully on port ${port}`)
});