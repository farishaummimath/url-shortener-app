const express = require('express')
const setupDB = require('./config/database')
const router = require('./config/routes')
const app = express()
const port = 3020
setupDB()
app.use(express.json())
app.use('/',router)
app.get('/', function (req, res) {
  res.send('Hello World, Welcome to Bookmark & URL Shortener APP')
})
app.listen(port,()=>{
    console.log("Listening to port",port)
})