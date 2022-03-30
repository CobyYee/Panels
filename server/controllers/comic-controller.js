const comicModel = require('../models/comic-model');
const Comic = require('../models/comic-model');

createComic = (req, res) => {
    const body = req.body;
    if(!body) {
        return res.status(400).json({
            success: false,
            error: "Must specify information to create the comic."
        });
    }

    const newComic = new Comic(body);
    newComic.save().then(() => {
        return res.status(201).json({
            success: true,
            comic: newComic,
            message: "New comic has been successfully created."
        });
    }).catch(err => {
        return res.status(402).json({
            success: false,
            error: err
        });
    });
}

deleteComic = async (req, res) => {
    Comic.findById({_id: req.params.id}, (err, comicDel) => {
        if(err)
            return res.status(400).json({success: false, message: "Comic not found."});
        Comic.findOneAndDelete({_id: req.params.id}, () => {
            return res.status(200).json({success: true, data: comicDel});
        }).catch(err => {
            return res.status(401).json({
                success: false,
                error: err
            });
        })
    });
}

getComicById = async (req, res) => {
    await Comic.findById({_id: req.params.id}, (err, comicReq) => {
        if(err)
            return res.status(400).json({success: false, messeage: "Comic not found."});
        return res.status(200).json({success: true, comic: comicReq});
    }).catch(err => {
        return res.status(401).json({
            success: false,
            error: err
        });
    });
}

getComics = async(req, res) => {
    await Comic.find({}, (err, comics) => {
        if(err)
            return res.status(400).json({success: false, error: err});
        
        return res.status(200).json({success: true, data: comics});
    }).catch(err => {
        return res.status(401).json({
            success: false,
            error: err
        })
    })
}

updateComic = async (req, res) => {
    const body = req.body;
    if(!body) {
        return res.status(400).json({
            success: false,
            error: "Must specify information to create the comic."
        });
    }

    await Comic.findById({_id: req.params.id}, (err, comicFound) => {
        if(err)
            return res.status(401).json({success: false, error: err});
        comicFound.title = body.title
        comicFound.cover = body.cover
        comicFound.genres = body.genres
        comicFound.ratings = body.ratings
        comicFound.description = body.description
        comicFound.published = body.published
        comicFound.views = body.views
        comicFound.chapters = body.chapters

        comicFound.save().then(() => {
            return res.status(201).json({
                success: true,
                comic: newComic,
                message: "Comic has been updated."
            });
        }).catch(err => {
            return res.status(402).json({
                success: false,
                error: err,
                message: "Comic has not been updated properly."
            });            
        })
    })
}

getComicByGenre = async(req, res) => {
    filterComics = []
    allComics = await this.getComics()
    for(comic in allComics) {
        if(comic.genres.includes(req.body.genre)) {
            filterComics.push(comic);
        }
    }
    if(filterComics.length == 0) {
        return res.status(400).json({
            success: false,
            message: "No comics with that genre"
        });
    }
    return res.status(200).json({
        success: true,
        data: filterComics
    });
}

getComicByName = async(req, res) => {
    filterComics = []
    allComics = await this.getComics()
    for(comic in allComics) {
        if(comic.name === req.body.name) {
            filterChapters.push(comic);
        }
    }
    if(filterComics.length == 0) {
        return res.status(400).json({
            success: false,
            message: "No comics with that name"
        });
    }
    return res.status(200).json({
        success: true,
        data: filterComics
    });
}

addChapter = async(req, res) => {
    await Comic.findById({_id: req.params.id}, (err, comicFound) => {
        if(err)
            return res.status(401).json({success: false, error: err})
        comicFound.chapters.push(req.body.newChapter)

        comicFound.save().then(() => {
            return res.status(201).json({
                success: true,
                comic: newComic,
                message: "Comic chapter has been added."
            });
        }).catch(err => {
            return res.status(402).json({
                success: false,
                error: err,
                message: "Comic chapter has not been added properly."
            });            
        })
    })
}

getChapterById = async(req, res) => {
    const body = req.body;
    comic = await this.getChapterById(body.comicId);
    for(chapter in comic.chapters){
        if(chapter._id = body.chapterId) {
            return res.status(200).json({
                success: true,
                data: chapter
            })
        }
    }
    return res.status(400).json({
        success: false,
        message: "No chapter with that id"
    });
}

deleteChapter = async(req, res) => {
    const body = req.body;
    comic = await this.getComicById(body.comicId);
    for(let i = 0; i < comic.chapters.length; i++) {
        if(chapter.name === body.chapterName) {
            deletedComic = comic.chapters.splice(i, 1);
            return res.status(200).json({
                success: true,
                data: deletedComic
            });
        }
    }
    return res.status(400).json({
        success: false,
        message: "No chapter to delete with that name"
    });
}

module.exports = {
    createComic,
    deleteComic,
    getComicById,
    getComics,
    updateComic,
    addChapter,
    getChapterById,
    deleteChapter,
    getChaptersByFilter
}