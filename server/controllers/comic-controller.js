const Comic = require('../models/comic-model');
const Image = require('../models/image-model');
const ComicChapter = require('../models/comicChapter-model.js');
const Konva = require('../models/konva-model')

createComic = (req, res) => {   // tested 200
    try {
        const { title, creatorId, creatorName, genres, description, cover_data } = req.body;
        if (!title || !creatorId || !creatorName || !cover_data || !genres || !description) {
            console.log(creatorName)
            return res.status(400).json({
                success: false,
                error: "Must specify information to create the comic."
            });
        }

        const cover = new Image({data: cover_data});
        cover.save().then(() => {
            console.log("comic cover saved")
        }).catch(err => {
            console.log("comic cover not saved")
            return res.status(500).json({
                success: false,
                error: err
            });
        });

        const newComic = new Comic({
            title: title,
            creatorId: creatorId,
            creatorName: creatorName,
            cover: cover._id,
            genres: genres,
            ratings: [],
            description: description,
            published: null,
            views: 0,
            chapters: [],
            comments: []
        });
        
        newComic.save().then(() => {
            return res.status(200).json({   
                success: true,
                comic: newComic,
                message: "New comic has been successfully created."
            });
        }).catch(err => {
            return res.status(500).json({
                success: false,
                error: err
            });
        });
    }
    catch (err) {
        return res.status(500).send();
    }
}

deleteComic = async (req, res) => {     // tested 200
    try {
        let id = req.params.id;
        const comic = await Comic.findById(id);
        if (!comic) {
            return res.status(400).json({success: false, message: "Comic not found."});
        }

        const deleted = await Comic.findOneAndDelete({_id: id});
        return res.status(200).json({ success: true, data: deleted });
    }
    catch (err) {
        return res.status(400);
    }
}

getComicById = async (req, res) => {        // tested 200
    try {
        const found = await Comic.findById(req.params.id);
        if (!found)
            return res.status(400).json({success: false, message: "Comic not found"});

        found.views++;
        await found.save();
        
        return res.status(200).json({success: true, comic: found});
    }
    catch (err) {
        console.error("getComicById failed: " + err);
        return res.status(500).send();
    }
}

getComics = async(req, res) => {        // tested 200
    try {
        const comics = await Comic.find({});
        return res.status(200).json({success: true, data: comics});
    }
    catch (err) {
        return res.status(500);
    }
}

getComicsById = async (req, res) => {
    try {
        const ids = req.body;
        if (!ids)
            return res.status(400).json({ success: false, errorMessage: "Missing image ids"});
        let arr = [];
        for (let i = 0; i < ids.length; i++) {
            let found = await Comic.findById(ids[i]);
            if (!found)
                return res.status(400).json({ success: false, errorMessage: "Comic " + ids[i] + " not found!"});
            arr.push(found);
        }
        
        return res.status(200).json({ success: true, data: arr });
    }
    catch (err) {
        return res.status(500);
    }
}

getImagesById = async (req, res) => {
    try {
        const ids = req.body;
        if (!ids)
            return res.status(400).json({ success: false, errorMessage: "Missing image ids"});
        let arr = [];
        for (let i = 0; i < ids.length; i++) {
            let found = await Image.findById(ids[i]);
            if (!found)
                return res.status(400).json({ success: false, errorMessage: "Image " + ids[i] + " not found!"})
            arr.push(found.data.toString())
        }
        return res.status(200).json({ success: true, data: arr });
    }
    catch (err) {
        return res.status(500);
    }
}

updateComic = async (req, res) => {     // tested 200
    try {
        const body = req.body;
        if(!body) {
            return res.status(400).json({
                success: false,
                message: "Must specify information to update the comic."
            });
        }

        const old = await Comic.findById(body._id);
        if (!old)
            return res.status(400).json({success: false, message: "This comic does not exist!"});

        if (body.cover !== old.cover.toString()) {
            //console.log("HERE");
            const oldCover = await Image.findById(old.cover);
            oldCover.data = body.cover;
            await oldCover.save();
        }

        old.title = body.title;
        old.genres = body.genres;
        old.description = body.description;
        old.published = body.published;
        old.ratings = body.ratings;
        old.chapters = body.chapters;
        //old.comments = body.comments;

        await old.save();
        return res.status(200).json({success: true, data: old});
    }
    catch (err) {
        return res.status(500);
    }   
}

getComicsByGenres = async(req, res) => {    // tested 200
    try {
        let filterComics = [];
        const genres = req.body.genres;
        const allComics = await Comic.find({});
        for(let i = 0; i < allComics.length; i++) {
            let good = true;
            for (let j = 0; j < genres.length; j++) {
                //console.log(genres[j])
                if (!allComics[i].genres.includes(genres[j])) {
                    good = false;
                    break;
                }
            }
            if (good === true)
                filterComics.push(allComics[i]);
        }
        return res.status(200).json({
            success: true,
            data: filterComics  
        });
    }
    catch (err) {
        return res.status(500);
    }
}

getComicsByName = async(req, res) => {      // tested 200
    try {
        const allComics = await Comic.find({title: new RegExp(req.params.name, "i")});
        return res.status(200).json({
            success: true,
            data: allComics
        });
    }
    catch (err) {
        return res.status(500);
    }
}

getComicsByCreator = async (req, res) => {
    try {
        const found = await Comic.find({ creatorId: req.params.id });
        if (!found)
            return res.status(400).json({success: false, message: "Comics not found"});

        return res.status(200).json({success: true, comics: found});
    }
    catch (err) {
        console.error("getComicsByCreator failed: " + err);
        return res.status(500).send();
    }
}

createComicChapter = async (req, res) => {       // tested 200
    try {
        const { name, images } = req.body;
        if (!images || !name)
            return res.status(400).json({success: false, message: "New comic chapter fields cannot be empty!"});
        let arr = [];
        for (let i = 0; i < images.length; i++) {
            let newImage = new Image({data: images[i]});
            await newImage.save();
            arr.push(newImage._id);
        }
        const newChapter = new ComicChapter({
            name: name,
            uploaded: new Date(),
            images: arr
        });
        await newChapter.save();

        return res.status(200).json({success: true, data: newChapter}).send();
    }
    catch (err) {
        return res.status(500);
    }
}

updateComicChapter = async (req, res) => {
    try {
        const body = req.body;
        if(!body) {
            return res.status(400).json({
                success: false,
                message: "Must specify information to update the comic chapter."
            });
        }

        const old = await ComicChapter.findById(body._id);
        if (!old)
            return res.status(400).json({success: false, message: "This comic chapter does not exist!"});

        for (let i = 0; i < old.images.length; i++) {
            await Image.findOneAndDelete(old.images[i]._id);
        }

        let images = body.images;
        let arr = [];
        for (let i = 0; i < images.length; i++) {
            let newImage = new Image({data: images[i]});
            await newImage.save();
            arr.push(newImage._id);
        }

        old.name = body.name;
        old.uploaded = body.uploaded;
        old.images = images;

        await old.save();
        return res.status(200).json({success: true, data: old});
    }
    catch (err) {
        return res.status(500);
    }   
}

getComicChapterById = async(req, res) => {       // tested 200
    try {
        const id = req.params.id;
        if (!id) 
            return res.status(400).json({success: false, message: "id field cannot be empty!"});

        const chapter = await ComicChapter.findById(id);
        if (!chapter)
            return res.status.json({success: false, message: "Comic chapter with this id does not exist!"})

        return res.status(200).json({success: true, data: chapter}).send();
    }
    catch (err) {
        return res.status(500);
    }
}

deleteComicChapter = async(req, res) => {    // tested 200
    try {
        const id = req.params.id;
        const deleted = await ComicChapter.deleteOne({_id: id});
        if (deleted.deletedCount === 0)
            return res.status(400).json({success: false, message: "Chapter with this id does not exist!"})

        return res.status(200).json({success: true, data: deleted});
    }
    catch (err) {
        return res.status(500);
    }
}

createKonva = async(req, res) => {
    try {
        const { data } = req.body;
        if (!data)
            return res.status(400).json({ success: false, message: "Konva missing data!"})

        const konva = new Konva({ data: data });
        const saved = await konva.save();

        if (!saved)
            return res.status(500);

        console.log("konva created")
        return res.status(200).json({success: true, data: saved})
    }
    catch (err) {
        console.error("create konva error: " + err);
        return res.status(500);
    }
}

getKonvasById = async(req, res) => {
    try {
        const ids = req.body;
        if (!ids)
            return res.status(400).json({success: false, message: "missing konva ids"});

        let arr = [];
        for (let i = 0; i < ids.length; i++) {
            let found = await Konva.findById(ids[i]);
            if (!found)
                return res.status(400).json({ success: false, errorMessage: "Konva " + ids[i] + " not found!"})
            arr.push(found.data.toString())
        }

        return res.status(200).json({success: true, data: arr});
    }
    catch (err) {
        console.error("get konvas error: " + err);
        return res.status(500);
    }
}

module.exports = {
    createComic,
    deleteComic,
    getComicById,
    getComicsByGenres,
    getComicsByName,
    getComicsByCreator,
    getComics,
    getComicsById,
    getImagesById,
    updateComic,
    createComicChapter,
    updateComicChapter,
    getComicChapterById,
    deleteComicChapter,
    createKonva,
    getKonvasById,
    //getChaptersByFilter
}