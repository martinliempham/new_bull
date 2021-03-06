var express = require('express');
var Msg = require("./models/sqlz");
var bodyParser = require('body-parser');
var path = require("path")

var app = express();
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


app.get('/', function(req, res){
    
   Msg.findAll().then(function(rows){
       
        
        
        res.render('index',{messages:rows});
        
    })
    
})

app.get('/new', function(req, res){
    
    res.render('new');
    
})

app.post('/new', function(req, res){
    
    Msg.sync().then(function(){
        
        Msg.create({
            title: req.body.title,
            body: req.body.msg
        });
        res.redirect('/')
    });
    
});

app.listen(8080,function(){
  
  console.log("Server listening at", process.env.PORT);
});