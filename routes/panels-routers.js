const auth = require('../auth')
const express = require('express')
const ComicController = require('../controllers/comic-controller')
const StoryController = require('../controllers/story-controller')
const UserController = require('../controllers/user-controller')
const router = express.Router()

router.get('/comic/:id', auth.verifyJWT, ComicController.getComicById)
router.post('/comic', auth.verifyJWT, ComicController.createComic)
router.put('/comic/:id', auth.verifyJWT, ComicController.updateComic)
router.delete('/comic/:id', auth.verifyJWT, ComicController.deleteComic)
router.get('/comics', auth.verifyJWT, ComicController.getComics)
router.get('/comicsbygenre', auth.verifyJWT, ComicController.getComicByGenre)
router.get('/comicsbyname', auth.verifyJWT, ComicController.getComicByName)
router.delete('/comicchapter/:id', auth.verifyJWT, ComicController.deleteChapter)
router.get('/comicchapter/:id', auth.verifyJWT, ComicController.getChapterById)
router.post('/comicchapter/:id', auth.verifyJWT, ComicController.addChapter)


router.get('/story/:id', auth.verifyJWT, StoryController.getStoryById)
router.post('/story', auth.verifyJWT, StoryController.createStory)
router.put('/story/:id', auth.verifyJWT, StoryController.updateStory)
router.delete('/story/:id', auth.verifyJWT, StoryController.deleteStory)
router.get('stories/:genre', auth.verifyJWT, StoryController.getStoriesByGenre)
router.get('/stories/:title', auth.verifyJWT, StoryController.getStoriesByName)
router.get('/stories', auth.verifyJWT, StoryController.getStories)
router.post('/storychapter/', auth.verifyJWT, StoryController.createStoryChapter)
router.put('/storychapter/:id', auth.verifyJWT, StoryController.updateStoryChapter)
router.delete('/storychapter/:id', auth.verifyJWT, StoryController.deleteStoryChapter)

router.post('/register', UserController.registerUser)
router.get('/getSession', UserController.getSession)
router.post('/login', UserController.loginUser)
router.get('/logout', UserController.logoutUser)
router.post('/passwordRecovery', UserController.passwordRecovery)
router.post('/saveNewPassword', UserController.saveNewPassword)
router.post('/ban', UserController.ban)
router.post('/unban', UserController.unban)

module.exports = router