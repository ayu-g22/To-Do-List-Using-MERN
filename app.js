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

mongoose.connect("mongodb+srv://ayushagupta225:A%40Yush225@cluster0.fi9trrm.mongodb.net/todoDB",{useNewUrlParser:true});

const todoSchema={
  name:String
}

const listSchema={
  name:String,
  items:[todoSchema]
}

const list=mongoose.model("list",listSchema);

const todo=mongoose.model("TodoL",todoSchema);
var n="ayush ji";
const t1=new todo({
  name:n
});
const defaul=[t1];
app.get("/:pn",function(req,res){
  const pname=req.params.pn;
  list.find({},function(err,foundI){
    if(!err)
    {
      if(!foundI)
      {
        const lis=new list({
          name:pname,
          items: defaul
        });
        lis.save();
        res.redirect("/");
      }
    else
    {
      res.render('list',{curDay:pname,it:foundI});
    } 
  }
  })
})

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
  if(lname=="Today")
  {
    td.save();
    res.redirect("/");
  }
  else
  {
    console.log(list.findOne({name:lname}));
  }
})

app.post("/delete",function(req,res){
    var check=req.body.checkbox;
    todo.findByIdAndRemove(check,function(err){
      if(err)
       console.log(err);
      else
      {
        console.log("Sucess");
        res.redirect("/");
      }
    })
});

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
