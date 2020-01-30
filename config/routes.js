const express = require('express')
const router = express.Router()

const bookmarksController = require('../app/controllers/bookmarksController')




//Finds the bookmark with the hash value
//and redirect the user the respective
//page

//Find and return all the bookmarks that
//meets the specific tag
router.get('/bookmarks/tags/:name',bookmarksController.findBookmarkByTag)

//Find and return all the bookmarks that meets the provided tags
router.get('/bookmarks/tags',bookmarksController.findBookmarkByTags)
router.get('/bookmarks',bookmarksController.list)
router.post('/bookmarks',bookmarksController.create)
router.get('/bookmarks/:id',bookmarksController.show)
router.put('/bookmarks/:id',bookmarksController.update)
router.delete('/bookmarks/:id',bookmarksController.destroy)
router.get('/:hash',bookmarksController.findBookmarkByHash)


module.exports = router