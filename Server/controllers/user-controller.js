const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

getSession = async(req, res) => {
    auth.verify = function(req, res, next) {
        const sessionUser = await User.findOne({ _id: req.userId });
        if (!sessionUser) {
            return res.status(400).json({ errorMessage: "User does not exist"});
        }
        return res.status(200).json({
            user: {
                admin: sessionUser.admin,
                firstName: sessionUser.firstName,
                lastName: sessionUser.lastName,
                username: sessionUser.username,
                email: sessionUser.email,
                profilePicture: sessionUser.profilePicture,
                follows: sessionUser.follows,
                works: sessionUser.works,
                drafts: sessionUser.drafts,
                bookmarks: sessionUser.bookmarks
            }
        }).send();
    }
}

registerUser = async(req, res) => {
    try {
        const { firstName, lastName, email, username, password } = req.body;

        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ errorMessage: "An account with this email already exists."})
        }

        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res.status(400).json({ errorMessage: "An account with this username already exists."})
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
             admin: false, 
        })

    }
}