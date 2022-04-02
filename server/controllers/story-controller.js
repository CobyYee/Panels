const Story = require('../models/story-model');
const StoryChapter = require('../models/storyChapter-model');
const User = require('../models/user-model');

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
    const body = req.body
    console.log("updateStory: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Story.findOne({ _id: req.params.id }, (err, story) => {
        console.log("story found: " + JSON.stringify(story));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Story not found!',
            })
        }

        story.title = body.title
        story.cover = body.cover
        story.genres = body.genres
        story.ratings = body.ratings
        story.description = body.description
        story.published = body.published
        story.views = body.views
        story.chapters = body.chapters

        story
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: story._id,
                    message: 'Story updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Story not updated!',
                })
            })
    })
}

//STRICTLY DELETES STORY ONLY. MUST MAKE CALLS TO REMOVE RESPECTIVE CHAPTERS ON FRONT-END
deleteStory = async (req, res) => {
    Story.findById({ _id: req.params.id }, (err, story) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Story not found!',
            })
        }
        Story.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: story })
        }).catch(err => console.log(err))
    })
}

getStoryById = async (req, res) => {
    try {
        const found = await Story.findById({ _id: req.params.id });
        if (!found)
            return res.status(400).json({success: false, message: "Story not found"});
        
        return res.status(200).json({success: true, story: found});
    }
    catch (err) {
        console.error("getStoryById failed: " + err);
        return res.status(500).send();
    }
}

getStoriesByName = async (req, res) => {
    try {
        const found = await Story.find({ title: req.params.title });
        if (!found)
            return res.status(400).json({success: false, message: "Stories not found"});
        
        return res.status(200).json({success: true, stories: found});
    }
    catch (err) {
        console.error("getStoriesByName failed: " + err);
        return res.status(500).send();
    }
}

getStoriesByGenre = async (req, res) => {
    try {
        const found = await Story.find({ title: req.params.genre });
        if (!found)
            return res.status(400).json({success: false, message: "Stories not found"});
        
        return res.status(200).json({success: true, stories: found});
    }
    catch (err) {
        console.error("getStoriesByGenre failed: " + err);
        return res.status(500).send();
    }
}

/*
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
*/

getStories = async (req, res) => {
    try {
        const found = await Story.find({});
        if (!found)
            return res.status(400).json({success: false, message: "Stories not found"});
        
        return res.status(200).json({success: true, stories: found});
    }
    catch (err) {
        console.error("getStories failed: " + err);
        return res.status(500).send();
    }
}

createStoryChapter = async (req, res) => {
    try {
        const { name, uploaded, chapter } = req.body;
        if (!name || !uploaded || !chapter) {
            return res.status(400).json({
                success: false,
                error: "Must specify information to create the story chapter."
            });
        }

        const newChapter = new StoryChapter({
            name: name,
            uploaded: uploaded,
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
    const body = req.body
    console.log("updateStoryChapter: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    StoryChapter.findOne({ _id: req.params.id }, (err, storyChapter) => {
        console.log("story found: " + JSON.stringify(storyChapter));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Story Chapter not found!',
            })
        }

        story.name = body.name
        story.uploaded = body.uploaded
        story.chapter = body.chapter

        storyChapter
            .save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: storyChapter._id,
                    message: 'Story Chapter updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Story Chapter not updated!',
                })
            })
    })
}

//STRICTLY DELETES CHAPTER. MUST RETAIN COMIC_ID AND CHAPTER_ID TO REMOVE ID FROM CHAPTERS LIST OF COMIC (FRONT-END)
deleteStoryChapter = async (req, res) => {
    StoryChapter.findById({ _id: req.params.id }, (err, storyChapter) => {
        if (err) {
            return res.status(404).json({
                err,
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
    getStories,
    createStoryChapter,
    updateStoryChapter,
    deleteStoryChapter,
    getStoryChapterById
}