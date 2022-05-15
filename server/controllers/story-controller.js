const Story = require('../models/story-model');
const StoryChapter = require('../models/storyChapter-model');
const Image = require('../models/image-model');

createStory = (req, res) => {
    try {
        const { title, creatorId, creatorName, genres, description, cover_data } = req.body;
        if (!title || !creatorId || !creatorName || !cover_data || !genres) {
            return res.status(400).json({
                success: false,
                error: "Must specify information to create the story."
            });
        }

        const cover = new Image({data: cover_data});
        cover.save().then(() => {
            console.log("Story cover saved")
        }).catch(err => {
            console.log("Story cover not saved")
            return res.status(500).json({
                success: false,
                error: err
            });
        });

        const newStory = new Story({
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
        
        newStory.save().then(() => {
            return res.status(200).json({   
                success: true,
                story: newStory,
                message: "New story has been successfully created."
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

updateStory = async (req, res) => {
    try {
        const body = req.body;
        if(!body) {
            return res.status(400).json({
                success: false,
                message: "Must specify information to update the story."
            });
        }

        const old = await Story.findById(body._id);
        if (!old)
            return res.status(400).json({success: false, message: "This story does not exist!"});

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

//STRICTLY DELETES STORY ONLY. MUST MAKE CALLS TO REMOVE RESPECTIVE CHAPTERS ON FRONT-END
deleteStory = async (req, res) => {
    try {
        /*
        let id = req.params.id;
        const story = await Story.findById(id);
        if (!story) {
            return res.status(400).json({success: false, message: "Story not found."});
        }

        const deleted = await Story.findOneAndDelete({ _id: id });
        return res.status(200).json({ success: true, data: deleted });
        */
        Story.findById({ _id: req.params.id}, (err, story) => {
            if (err) {
                return res.status(400).json({success: false, message: "Story not found."});
            }

            Story.findOneAndDelete({ _id: req.params.id }, () => {
                return res.status(200).json({ success: true, data: story });
            })
        })
    }
    catch (err) {
        console.error("deleteStory failed: " + err);
        return res.status(500);
    }
}

getStoryById = async (req, res) => {
    try {
        /*
        const found = await Story.findById({ _id: req.params.id });
        if (!found)
            return res.status(400).json({success: false, message: "Story not found"});
        
        return res.status(200).json({success: true, story: found});
        */
        Story.findById({ _id: req.params.id}, (err, story) => {
            if (err || !story) {
                return res.status(400).json({success: false, message: "Story not found."});
            }

            return res.status(200).json({ success: true, story: story });
        })
    }
    catch (err) {
        console.error("getStoryById failed: " + err);
        return res.status(500).send();
    }
}

getStoriesByName = async(req, res) => {      // tested 200
    try {
        const allStories = await Story.find({title: new RegExp(req.params.name, "i")});
        return res.status(200).json({
            success: true,
            data: allStories
        });
    }
    catch (err) {
        return res.status(500);
    }
}

getStoriesByGenre = async (req, res) => {
    try {
        let filterStories = [];
        const genres = req.body.genres;
        const stories = await Story.find({});
        for(let i = 0; i < stories.length; i++) {
            let good = true;
            for (let j = 0; j < genres.length; j++) {
                console.log(genres[j])
                if (!stories[i].genres.includes(genres[j])) {
                    good = false;
                    break;
                }
            }
            if (good === true)
                filterStories.push(stories[i]);
        }
        return res.status(200).json({
            success: true,
            data: filterStories  
        });
    }
    catch (err) {
        return res.status(500);
    }
}

getStoriesByCreator = async (req, res) => {
    try {
        const found = await Story.find({ creatorId: req.params.id });
        if (!found)
            return res.status(400).json({success: false, message: "Stories not found"});
        
        return res.status(200).json({success: true, stories: found});
    }
    catch (err) {
        console.error("getStoriesByCreator failed: " + err);
        return res.status(500).send();
    }
}

getStories = async (req, res) => {
    try {
        const found = await Story.find({});
        if (!found)
            return res.status(400).json({success: false, message: "Stories not found"});
        
        return res.status(200).json({success: true, data: found});
    }
    catch (err) {
        console.error("getStories failed: " + err);
        return res.status(500).send();
    }
}

getStoriesById = async (req, res) => {
    try {
        const ids = req.body;
        if (!ids)
            return res.status(400).json({ success: false, errorMessage: "Missing image ids"});
        let arr = [];
        for (let i = 0; i < ids.length; i++) {
            let found = await Story.findById(ids[i]);
            if (!found)
                return res.status(400).json({ success: false, errorMessage: "Image " + ids[i] + " not found!"});
            else   
                arr.push(found);
        }
        
        return res.status(200).json({ success: true, data: arr });
    }
    catch (err) {
        return res.status(500);
    }
}

createStoryChapter = async (req, res) => {
    try {
        const { name, chapter } = req.body;
        //console.log(name + " " + chapter);
        if (!name) {
            return res.status(400).json({
                success: false,
                error: "Must specify information to create the story chapter."
            });
        }

        const newChapter = new StoryChapter({
            name: name,
            uploaded: new Date(),
            chapter: chapter
        });
        
        await newChapter.save();
        return res.status(200).json({success: true, data: newChapter}).send();
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
}

updateStoryChapter = async (req, res) => {
    try {
        const body = req.body;
        console.log(body)
        if(!body) {
            return res.status(400).json({
                success: false,
                message: "Must specify information to update the story chapter."
            });
        }

        const old = await StoryChapter.findById(body._id);
        if (!old)
            return res.status(400).json({success: false, message: "This story chapter does not exist!"});

        old.name = body.name;
        old.uploaded = body.uploaded;
        old.chapter = body.chapter;

        await old.save();
        return res.status(200).json({success: true, data: old});
    }
    catch (err) {
        return res.status(500);
    }
}

//STRICTLY DELETES CHAPTER. MUST RETAIN STORY_ID AND CHAPTER_ID TO REMOVE ID FROM CHAPTERS LIST OF STORY (FRONT-END)
deleteStoryChapter = async (req, res) => {
    StoryChapter.findById({ _id: req.params.id }, (err, storyChapter) => {
        if (err) {
            return res.status(404).json({
                success: false,
                message: 'Story Chapter not found!',
            })
        }
        StoryChapter.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: storyChapter })
        }).catch(err => console.log(err))
    })
}

getStoryChapterById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) 
            return res.status(400).json({success: false, message: "id field cannot be empty!"});

        const chapter = await StoryChapter.findById(id);
        if (!chapter)
            return res.status.json({success: false, message: "Story chapter with this id does not exist!"})

        return res.status(200).json({success: true, data: chapter}).send();
    }
    catch (err) {
        return res.status(500);
    }
}


module.exports = {
    createStory,
    updateStory,
    deleteStory,
    getStoryById,
    getStoriesByName,
    getStoriesByGenre,
    getStoriesByCreator,
    getStories,
    getStoriesById,
    createStoryChapter,
    updateStoryChapter,
    deleteStoryChapter,
    getStoryChapterById
}