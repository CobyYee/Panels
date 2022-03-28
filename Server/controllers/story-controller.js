const Story = require('../models/story-model');
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

getStories = async (req, res) => {
    await Story.find({}, (err, stories) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: stories })
    }).catch(err => console.log(err))
}

addChapter = async(req, res) => {
    await Story.findById({_id: req.params.id}, (err, story) => {
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

module.exports = {
    createStory,
    updateStory,
    deleteStory,
    getStoryById,
    getStories
}