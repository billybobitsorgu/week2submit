var express = require('express')
var exphbs = require('express-handlebars')
var bodyParser = require('body-parser')
var app = express()

//connect to the router
var appRouter = require('./app_server/routes/index')

//use body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())

app.engine('hbs', exphbs.engine({
    defaultLayout:'main',
    extname:'hbs',
    helpers:{
        getShortComment(comment){
            if(comment.length < 64){
                return comment
            }
            return comment.substring(0,60) + "..."
        },
        makeBold(name){
            return "<strong>" + name + "</strong>"
        },
        formatPhoneNumber(number){
            return "("+number.substring(0,3)+")"+number.substring(3,6)+"-"+ number.substring(6,10)
        },
        formatEmailLink(email){
            return `<a href="mailto:${email}">${email}</a>`
        },
        formatCapitalize(word){
            return word.toUpperCase()
        }

    }
}))

app.set('view engine', 'hbs')

//uses the app router
app.use('/', appRouter)

//app.post('/testData', )

app.listen(3000, function(){
    console.log("Listening on port 3000")
})


