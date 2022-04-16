const Story = require('../models/story-model');
const StoryChapter = require('../models/storyChapter-model');
const Image = require('../models/image-model');

createStory = (req, res) => {
    try {
        const { title, creatorId, creatorName, genres, description, cover_data } = req.body;
        if (!title || !creatorId || !creatorName || !cover_data || !genres || !description) {
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
            chapters: []
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
            console.log("HERE");
            const oldCover = await Image.findById(old.cover);
            oldCover.data = body.cover;
            await oldCover.save();
        }

        old.genres = body.genres;
        old.ratings = body.ratings;
        old.description = body.description;
        old.views = body.views;
        old.chapters = body.chapters;

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

            return res.status(200).json({ success: true, data: story });
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
        const found = await Story.find({ creatorId: req.params.creatorId });
        if (!found)
            return res.status(400).json({success: false, message: "Stories not found"});
        
        return res.status(200).json({success: true, stories: found});
    }
    catch (err) {
        console.error("getStoriesByGenre failed: " + err);
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

createStoryChapter = async (req, res) => {
    try {
        const { name, chapter } = req.body;
        if (!name || !chapter) {
            return res.status(400).json({
                success: false,
                error: "Must specify information to create the story chapter."
            });
        }

        const newChapter = new StoryChapter({
            name: name,
            chapter: chapter
        });
        
        newChapter.save().then(() => {
            return res.status(200).json({   
                success: true,
                chapter: newChapter,
                message: "New story chapter has been successfully created."
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

updateStoryChapter = async (req, res) => {
    try {
        const body = req.body;
        if(!body) {
            return res.status(400).json({
                success: false,
                message: "Must specify information to update the story chapter."
            });
        }

        StoryChapter.findById({ _id: body._id }, (err, chapter) => {
            if (err || !chapter) {
                return res.status(400).json({
                    success: false,
                    message: "Cannot find story chapter."
                });
            }

            chapter.name = body.name
            chapter.chapter = body.chapter

            chapter.save().then(() => {
                return res.status(200).json({   
                    success: true,
                    chapter: chapter,
                    message: "Story chapter has been successfully updated."
                });
            })
        })
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
        const found = await StoryChapter.findById({ _id: req.params.id });
        if (!found)
            return res.status(400).json({success: false, message: "Story chapter not found"});
        
        return res.status(200).json({success: true, story: found});
    }
    catch (err) {
        console.error("getStoryChapterById failed: " + err);
        return res.status(500).send();
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
    createStoryChapter,
    updateStoryChapter,
    deleteStoryChapter,
    getStoryChapterById
}