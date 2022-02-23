var express = require('express')
var app = express()
var path = require('path')
var bodyparser = require('body-parser')
var mongoose = require('mongoose')

//setup body-parser middleware to use in application
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())

//setup connection to mongoose
mongoose.connect('mongodb://localhost:27017/gameEntries',{
    useNewURLParser:true
}).then(function(){
    console.log("Connected to Mongo DB Database");
}).catch(function(err){
    console.log(err)
})

//Use Models for Database
require('./models/Game')
var Game = mongoose.model('game')

//basic code for saving an entry
//model of data
/*var Game = mongoose.model('Game', {nameofGame:String})

var game = new Game({nameofGame:"Skyrim"})
game.save().then(function(){
    console.log("Game Saved")
})*/


//Setup the post route to save the data

app.post('/saveGame', function(req,res){
    console.log("Request Made")
    console.log(req.body.name)
    console.log(req.body.game)
    console.log(req.body.score)
    req.body.name = req.body.name +(" - " + req.body.score)
    new Game(req.body).save().then(function(){
        res.redirect('gamelist.html')
    })
})

//setup get route to send data to Game List
app.get('/getData', function(req,res){
   
    Game.find({}).then(function(game){
        console.log("Retrieving Games")
        res.json({game})
    })
})

//setup post route to delete game entry
app.post('/deleteGame', function(req,res){
    console.log("Game Deleted" , req.body._id)
    Game.findByIdAndDelete(req.body._id).exec()
    res.redirect('gamelist.html')
})

//sets up static server and sets up connection
app.use(express.static(__dirname+"/views"))
app.listen(3000, function(){
    console.log("Listening on Port 3000")
})