const express = require('express')
const app = express()
const router = require('./router/router')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.use(router)


app.listen('3000',()=>{
    console.log('3000 running')
})