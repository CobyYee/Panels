const Story = require('../models/story-model');
const StoryChapter = require('../models/storyChapter-model');
const User = require('../models/user-model');

createStory = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }

    const story = new Story(body);
    console.log("creating story: " + JSON.stringify(story));
    if (!story) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }

    story
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                story: story,
                message: 'Story Created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Story Not Created!'
            })
        })
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
    await Story.findById({ _id: req.params.id }, (err, story) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, story: story })
    }).catch(err => console.log(err))
}

getStoriesByName = async (req, res) => {
    await Story.find({ title: req.params.title }, (err, stories) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: stories })
    }).catch(err => console.log(err))
}

getStoriesByGenre = async (req, res) => {
    await Story.find({ genres: req.params.genre }, (err, stories) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: stories })
    }).catch(err => console.log(err))
}

getStories = async (req, res) => {
    await Story.find({}, (err, stories) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: stories })
    }).catch(err => console.log(err))
}

addStoryChapter = async (req, res) => {
    await Story.findById({ _id: req.params.id }, (err, story) => {
        if(err)
            return res.status(401).json({success: false, error: err})
        story.chapters.push(req.body.newChapter)

        story.save().then(() => {
            return res.status(201).json({
                success: true,
                story: story,
                message: "Story chapter has been added."
            });
        }).catch(err => {
            return res.status(402).json({
                success: false,
                error: err,
                message: "Story chapter could not be added."
            });            
        })
    })
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
    await StoryChapter.findById({ _id: req.params.id }, (err, storyChapter) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        return res.status(200).json({ success: true, storyChapter: storyChapter })
    }).catch(err => console.log(err))
}


module.exports = {
    createStory,
    updateStory,
    deleteStory,
    getStoryById,
    getStoriesByName,
    getStoriesByGenre,
    getStories,
    addStoryChapter,
    updateStoryChapter,
    deleteStoryChapter,
    getStoryChapterById
}