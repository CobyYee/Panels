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
            return res.status(400).json({ errorMessage: "An account with this email already exists. Please log in."})
        }

        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res.status(400).json({ errorMessage: "An account with this username already exists. Please log in."})
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
             admin: false, 
             firstName: firstName,
             lastName: lastName,
             username: username,
             passwordHash: passwordHash,
             email: email,
             profilePicture: null,
             follows: 0,
             works: [],
             drafts: [],
             booksmarks: []
        })

        await newUser.save();

        const token = auth.signToken(newUser);
        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax"
        }).status(200).send();
    }
    catch (err) {
        console.log("User registration failed: " + err);
        res.status(500).send();
    }

    loginUser = async (req, res) => {
        try {
            const { email, password } = req.body;

            const existingUser = await User.findOne({ email: email });

            if (!existingUser) {
                return res.status(400).json({ errorMessage: "An account with this email does not exist! Please register." });
            }

            const match = await bcrypt.compare(password, existingUser.passwordHash)
            if (match) {
                console.log("User login successful");
                const token = auth.signToken(existingUser);

                await res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "lax"
                }).status(200).json({
                    user: {
                        admin: existingUser.admin,
                        firstName: existingUser.firstName,
                        lastName: existingUser.lastName,
                        username: existingUser.username,
                        email: existingUser.email,
                        profilePicture: existingUser.profilePicture,
                        follows: existingUser.follows,
                        works: existingUser.works,
                        drafts: existingUser.drafts,
                        bookmarks: existingUser.bookmarks
                    }
                }).send()
            }
            else {
                console.log("User login failed: wrong password")
                return res.status(400).json({ errorMessage: "Wrong password" });
            }
        }
        catch (err) {
            console.log("User login failed: " + err);
            res.status(500).send();
        }
    }
}