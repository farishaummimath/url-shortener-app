const mongoose = require('mongoose')

const setupDB = () => {
    mongoose.connect('mongodb://localhost:27017/bookmark-url-shortener',{useNewUrlParser:true, useUnifiedTopology: true})
    .then(()=>{
        console.log('Connected to DB')
    })
    .catch(err => console.log('ERROR',err))
}
module.exports = setupDB