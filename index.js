const express = require("express")
const app = express()

app.get('/', welcome)

function welcome(req, res){
    console.log(req)
    res.send("Welcome to my app Aniket ")
}




app.listen(3000)

