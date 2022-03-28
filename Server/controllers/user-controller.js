const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

getSession = async(req, res) => {
    auth.verify(req, res, async function() {
        const existingUser = await User.findOne({ _id: req.userId });
        if (!existingUser) {
            return res.status(400).json({ errorMessage: "User does not exist"});
        }

        const token = auth.signToken(existingUser);
        return res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax"
        }).status(200).json({
            user: {
                _id: existingUser._id,
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
        }).send();
    })
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
             booksmarks: [],
             banned: false
        })

        await newUser.save();

        return res.status(200).send();
    }
    catch (err) {
        console.error("User registration failed: " + err);
        res.status(500).send();
    }
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
                    _id: existingUser._id,
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
        console.error("User login failed: " + err);
        res.status(500).send();
    }
}

logoutUser = async (req, res) => {
    try {
        await res.cookie("token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "lax"
        }).status(200).send();
    }
    catch (err) {
        console.error("User logout failed: " + err);
        res.status(500).send();
    }
}

ban = async (req, res) => {
    auth.verify(req, res, async function() {
        try {
            const existingUser = await User.findOne({ _id: req.userId });
            if (!existingUser) {
                return res.status(400).json({ errorMessage: "User does not exist" });
            }
            if (!existingUser.admin) {
                return res.status(401).json({ errorMessage: "Unauthorized" });
            }

            const target = await User.findOne({ _id: req.target._id});
            if (!target) {
                return res.status(400).json({ errorMessage: "User does not exist" });
            }

            if (target.banned) {
                return res.status(400).json({ errorMessage: "User already banned" });
            }

            target.banned = true;
            await target.save();

            console.log("User " + target._id + " has been banned.");
            return res.status(200).send();
        }
        catch (err) {
            console.error("User ban failed: " + err);
            res.status(500).send();
        }
    })
}

unban = async (req, res) => {
    auth.verify(req, res, async function() {
        try {
            const existingUser = await User.findOne({ _id: req.userId });
            if (!existingUser) {
                return res.status(400).json({ errorMessage: "User does not exist" });
            }
            if (!existingUser.admin) {
                return res.status(401).json({ errorMessage: "Unauthorized" });
            }

            const target = await User.findOne({ _id: req.target._id});
            if (!target) {
                return res.status(400).json({ errorMessage: "User does not exist"});
            }

            if (!target.banned) {
                return res.status(400).json({ errorMessage: "User not banned" });
            }

            target.banned = false;
            await target.save();

            console.log("User " + target._id + " has been unbanned.");
            return res.status(200).send();
        }
        catch (err) {
            console.error("User unban failed: " + err);
            res.status(500).send();
        }
    })
}