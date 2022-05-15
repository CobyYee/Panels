const auth = require('../auth')
const User = require('../models/user-model')
const Token = require('../models/token-model')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const sendEmail = require('../mail/mailbox')

// authenticate user sessions through JWTs
getSession = async(req, res) => {
    auth.verifyJWT(req, res, async function() {
        const existingUser = await User.findOne({ _id: req.userId });
        if (!existingUser) {
            return res.status(400).json({ errorMessage: "User does not exist"});
        }

        if (existingUser.banned) {
            return res.cookie("token", "", {
                httpOnly: true,
                secure: true,
                sameSite: "lax"
            }).status(401).json({ errorMessage: "User has been banned"});
        }

        const token = auth.signJWT(existingUser);
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
                description: existingUser.description,
                follows: existingUser.follows,
                works: existingUser.works,
                drafts: existingUser.drafts,
                comic_bookmarks: existingUser.comic_bookmarks,
                story_bookmarks: existingUser.story_bookmarks
            }
        });
    })
}

// register new user
registerUser = async(req, res) => {
    try {
        const { firstName, lastName, email, username, password, passwordVerify } = req.body;

        if (!firstName || !lastName || !email || !username || !password || !passwordVerify) 
            return res.status(400).json({ errorMessage: "Missing fields!"});

        if (password !== passwordVerify)
            return res.status(400).json({ errorMessage: "Passwords do not match!"});

        // add password requirements here

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
             description: "",
             follows: [],
             works: [],
             drafts: [],
             booksmarks: [],
             banned: false
        })

        await newUser.save();
        return res.status(200)
    }
    catch (err) {
        console.error("User registration failed: " + err);
        res.status(500).send();
    }
}

// log user in
loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            return res.status(400).json({ errorMessage: "An account with this email does not exist! Please register." });
        }

        const match = await bcrypt.compare(password, existingUser.passwordHash)
        if (match) {
            if (existingUser.banned) {
                return res.status(401).json({ errorMessage: "User has been banned" });
            }
            console.log("User login successful");
            const token = auth.signJWT(existingUser);

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
                    description: existingUser.description,
                    follows: existingUser.follows,
                    works: existingUser.works,
                    drafts: existingUser.drafts,
                    comic_bookmarks: existingUser.comic_bookmarks,
                    story_bookmarks: existingUser.story_bookmarks
                }
            })
        }
        else {
            console.log("User login failed: wrong password")
            return res.status(401).json({ errorMessage: "Wrong password" });
        }
    }
    catch (err) {
        console.error("User login failed: " + err);
        res.status(500).send();
    }
}

// get a user
getUserById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id)
            return res.status(400).json({ errorMessage: "Missing user id"});

        const existingUser = await User.findById(id);
        if (!existingUser) 
            return res.status(400).json({ errorMessage: "This user does not exist!" });

        return res.status(200).json({ 
            user: {
                _id: existingUser._id,
                admin: existingUser.admin,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                username: existingUser.username,
                email: existingUser.email,
                profilePicture: existingUser.profilePicture,
                description: existingUser.description,
                follows: existingUser.follows,
                works: existingUser.works,
                drafts: existingUser.drafts,
                comic_bookmarks: existingUser.comic_bookmarks,
                story_bookmarks: existingUser.story_bookmarks
            } 
        });
    }
    catch (err) {
        console.error("Get user by id failed: " + err);
        return res.status(500);
    }
}

// update user, certain fields are unchangeable
updateUser = async (req, res) => {
    try {
        const user = req.body;
        if (!user) {
            return res.status(400).json({ errorMessage: "Missing user to update"})
        }

        const existingUser = await User.findById(user._id);
        if (!existingUser)
            return res.status(400).json({ errorMessage: "This user does not exist!"});

        existingUser.username = user.username;
        existingUser.email = user.email;
        existingUser.profilePicture = user.profilePicture;
        existingUser.description = user.description;
        existingUser.follows = user.follows;
        existingUser.works = user.works;
        existingUser.drafts = user.drafts;
        existingUser.comic_bookmarks = user.comic_bookmarks;
        existingUser.story_bookmarks = user.story_bookmarks;

        await existingUser.save();
        return res.status(200).send();
    }
    catch (err) {
        console.error("User update failed: " + err);
        return res.status(500).send();
    }
}

// log user out
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

// start password recovery process
passwordRecovery = async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ errorMessage: "An account with this email does not exist!"})
        }

        await Token.findOneAndDelete({ userId: user._id });
        const newToken = new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
        });

        await newToken.save();

        //encryptedUserId = auth.encryptUser(user._id);
        const link = `http://localhost:3000/passwordrecovery/${user._id}/${newToken.token}`;       // need to update baseURL

        const text = "You have requested for a password reset. Please click on the link below to set a new password. The link will expire in 1 hour.\n\n" + link + "\n\n DO NOT share the link with anyone else!\n\nPanels Support Team";

        await sendEmail(user.email, "Panels Password Recovery", text);
        
        return res.status(200).json({ success: true })
    }
    catch(err) {
        console.error("Password recovery iniation process failed: " + err);
        res.status(500).send();
    }
}

// save new password
saveNewPassword = async (req, res) => {
    try {
        const { userId, token, newPassword } = req.body;
        if (!userId || !token || !newPassword)
            return res.status(400).json({ errorMessage: "Fields cannot be empty" });
        
        const foundToken = await Token.findOne({ token: token });
        if (!foundToken) {
            return res.status(400).json({ errorMessage: "This link is expired"});
        }

        if (userId !== foundToken.userId.toString()) {
            return res.status(401).json({ errorMessage: "Unauthorized" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ errorMessage: "This user does not exist!"})
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(newPassword, salt);

        user.passwordHash = passwordHash;
        await user.save();

        await Token.findOneAndDelete({ token: token });

        const text = "Your account password has been updated.\n\nPanels Support Team";
        await sendEmail(user.email, "Panels Account Password Changed", text);

        return res.status(200).json({ success: true });
    }
    catch (err) {
        console.error("Save new password failed: " + err);
        res.status(500).send();
    }
}

// suspend a user, admin privileges required
ban = async (req, res) => {
    auth.verifyJWT(req, res, async function() {
        try {
            const existingUser = await User.findOne({ _id: req.body.userId });
            if (!existingUser) {
                return res.status(400).json({ errorMessage: "User does not exist" });
            }
            if (!existingUser.admin) {
                return res.status(401).json({ errorMessage: "Unauthorized" });
            }

            const targetUserId = req.body.targetUserId;
            const target = await User.findById(targetUserId);
            if (!target) {
                return res.status(400).json({ errorMessage: "User does not exist" });
            }

            if (target.banned) {
                return res.status(400).json({ errorMessage: "User already banned" });
            }

            target.banned = true;
            await target.save();

            console.log("User " + target._id + " has been banned.");
            return res.status(200)
        }
        catch (err) {
            console.error("User ban failed: " + err);
            res.status(500).send();
        }
    })
}

// unsuspend a user, admin privileges required
unban = async (req, res) => {
    auth.verifyJWT(req, res, async function() {
        try {
            const existingUser = await User.findOne({ _id: req.body.userId });
            if (!existingUser) {
                return res.status(400).json({ errorMessage: "User does not exist" });
            }
            if (!existingUser.admin) {
                return res.status(401).json({ errorMessage: "Unauthorized" });
            }

            const target = await User.findById(req.body.targetUserId);
            if (!target) {
                return res.status(400).json({ errorMessage: "User does not exist"});
            }

            if (!target.banned) {
                return res.status(400).json({ errorMessage: "User not banned" });
            }

            target.banned = false;
            await target.save();

            console.log("User " + target._id + " has been unbanned.");
            return res.status(200)
        }
        catch (err) {
            console.error("User unban failed: " + err);
            res.status(500).send();
        }
    })
}

module.exports = {
    getSession,
    registerUser,
    loginUser,
    getUserById,
    updateUser,
    logoutUser,
    passwordRecovery,
    saveNewPassword,
    ban,
    unban,
}