const Bookmark = require('../models/bookmark')
const validator = require('validator')

module.exports.list = (req,res) => {
    Bookmark.find()
    .then(bookmarks => {
        res.json(bookmarks)
    })
    .catch(err=>console.log(err))
    
}
module.exports.show = (req,res) => {
    const id  = req.params.id
    Bookmark.findById(id)
    .then(bookmark=>{
        if(bookmark){
            res.json(bookmark)
        } else {
            res.json({})

        }
    })
    .catch(err=> res.json(err))

}
module.exports.create = (req,res) => {
    const body = req.body
    const validUrl = validator.isURL(body.original_url)
    
    if(validUrl && body.original_url){
        Bookmark.findOne({original_url:body.original_url},function(err,doc){
            if(doc){
                res.redirect(doc.original_url);
            }
            else {
                const bookmark = new Bookmark(body)
                bookmark.save()
                .then(bookmark=>{
                    res.json(bookmark)
                })
                .catch(err=>console.log(err))
            }
        })      
    } else {
        res.status(401).json("Invalid Url")
    }

}
module.exports.update = (req,res) => {
    const body = req.body
    const id = req.params.id
    Bookmark.findOneAndUpdate({_id:id},body,{new:true,runValidators :true})
    .then(bookmark=>{
        res.json(bookmark)
    })
    .catch(err=> res.json(err))

}
module.exports.destroy = (req,res) => {
    const id  = req.params.id
    Bookmark.findByIdAndDelete(id)
    .then(bookmark=>{
        if(bookmark){
            res.json(bookmark)
        } else {
            res.json({})

        }
    })
    .catch(err=> res.json(err))

}
module.exports.findBookmarkByHash = (req,res) => {
    const hash = req.params.hash
    Bookmark.findOne({hashedUrl:hash},function(err,doc){
        if(doc){
            res.redirect(doc.original_url);
        }
        else {
            res.send('No such url')
        }
    })

}
module.exports.findBookmarkByTag = (req,res) => {
    const name = req.params.name
    Bookmark.find({ tags: name})
    .then(bookmark=>{
        res.json(bookmark)
    })
    .catch(err=> res.json(err))

}
module.exports.findBookmarkByTags = (req,res) => {
    const tags = req.query.names.split(',')
    Bookmark.find({tags: {"$all":tags}})
    .then(bookmarks=>res.json(bookmarks))
    .catch(err=>res.json(err))

   
}