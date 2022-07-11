//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended:true
}));

app.use(express.static(__dirname + '/public'));

mongoose.connect("mongodb://localhost:27017/todoDB",{useNewUrlParser:true});

const todoSchema={
  name:String
}

const todo=mongoose.model("TodoL",todoSchema);
var n="ayush ji";
const t1=new todo({
  name:n
});
const defaul=[t1];

app.get("/", function(req, res){
  todo.find({},function(err,foundI){
    if(err)
     console.log(err);
    else
    res.render('list',{curDay:"Today",it:foundI}); 
  })
});

app.post("/",function(req,res){
  var ite=req.body.itemz;
  var lname=req.body.lis;
  const td=new todo({
    name:ite
  });
  td.save();
  console.log("Inserted");
  res.redirect("/");
})

app.post("/delete",function(req,res){
    var check=req.body.checkbox;
    todo.findByIdAndRemove(check,function(err){
      if(err)
       console.log(err);
      else
      {
        console.log("Deleted");
        res.redirect("/");
      }
    })
});

app.listen(process.env.PORT||300, function(){
  console.log("Server started on port 300.");
});
