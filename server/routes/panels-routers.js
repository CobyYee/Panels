const auth = require('../auth')
const express = require('express')
const ComicController = require('../controllers/comic-controller')
const StoryController = require('../controllers/story-controller')
const UserController = require('../controllers/user-controller')
const router = express.Router()

router.get('/comic/:id', ComicController.getComicById)
router.post('/comic', ComicController.createComic)
router.put('/comic', ComicController.updateComic)
router.delete('/comic/:id', ComicController.deleteComic)
router.get('/comics', ComicController.getComics)
router.post('/comicsbygenres', ComicController.getComicsByGenres)
router.get('/comicsbyname/:name', ComicController.getComicsByName)
router.delete('/comicchapter/:id', ComicController.deleteChapter)
router.get('/comicchapter/:id', ComicController.getChapterById)
router.post('/comicchapter', ComicController.createChapter)

router.post('/images', ComicController.getImagesById)


router.get('/story/:id', StoryController.getStoryById)
router.post('/story', StoryController.createStory)
router.put('/story', StoryController.updateStory)
router.delete('/story/:id', StoryController.deleteStory)
router.get('/storiesbygenres', StoryController.getStoriesByGenre)
router.get('/stories/:title', StoryController.getStoriesByName)
router.get('/stories', StoryController.getStories)
router.post('/storychapter/', StoryController.createStoryChapter)
router.put('/storychapter', StoryController.updateStoryChapter)
router.delete('/storychapter/:id', StoryController.deleteStoryChapter)
router.get('/storychapter/:id', StoryController.getStoryChapterById)


router.post('/register', UserController.registerUser)
router.get('/getSession', UserController.getSession)
router.post('/login', UserController.loginUser)
router.get('/user/:id', auth.verifyJWT, UserController.getUserById)
router.put('/user', auth.verifyJWT, UserController.updateUser)
router.get('/logout', UserController.logoutUser)
router.post('/passwordRecovery', UserController.passwordRecovery)
router.post('/saveNewPassword', UserController.saveNewPassword)
router.post('/ban', UserController.ban)
router.post('/unban', UserController.unban)

module.exports = router