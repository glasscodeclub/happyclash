const url = require("url")
const User = require("../models/user.models")
const Video = require("../models/video.models")
const Clash = require("../models/clash.models")
const Userdetail = require("../models/userdetails.models")

module.exports.career = async (req, res) => {
    try {
        const { username } = req.user
        const userDetails = await Userdetail.findOne({ username: { $eq: username } })
        const videos = await Video.find({ username: { $eq: username } })
        const clashes = await Clash.find({ username: { $eq: username } })
        const days = Math.floor((new Date() - new Date(userDetails.joinDate)) / (1000 * 60 * 60 * 24))
        res.render("./careermodule/career", { url: req.url, userDetails, days, videos, clashes });
    } catch (err) {
        console.log(err)
        res.redirect(url.format({
            pathname: "/error",
            query: {
                message: err.message,
                status: 404
            }
        }))
    }
}

module.exports.editForm = async (req, res) => {
    try {
        const { username, phone } = req.user;
        const user = await Userdetail.findOne({ username: { $eq: username } })
        res.render("./careermodule/editProfile", { url: req.url, user, phone });
    } catch (err) {
        console.log(err)
        res.redirect(url.format({
            pathname: "/error",
            query: {
                message: err.message,
                status: 404
            }
        }))
    }
}

module.exports.updateDetails = async (req, res) => {
    try {
        const { name, city, phone } = req.body
        const { username } = req.user;
        const userDetails = await Userdetail.findOne({ username: { $eq: username } })
        const user = await User.findOne({ username: { $eq: username } })
        user.phone = phone
        userDetails.name = name
        userDetails.city = city
        await user.save()
        await userDetails.save()
        res.redirect("/career/edit")
    } catch (err) {
        console.log(err)
        res.redirect(url.format({
            pathname: "/error",
            query: {
                message: err.message,
                status: 404
            }
        }))
    }
}

module.exports.profile = async (req, res) => {
    try {
        const { username } = req.user
        const userDetails = await Userdetail.findOne({ username: { $eq: username } })

        let docs = await Video.find({ username: { $eq: username } })
        docs = docs.reverse().slice(0, 5)

        res.render("./careermodule/profile", { url: req.url, videosArray: docs, userDetails });
    } catch (err) {
        console.log(err)
        res.redirect(url.format({
            pathname: "/error",
            query: {
                message: err.message,
                status: 404
            }
        }))
    }
}

module.exports.postPage = async (req, res) => {
    try {
        let { page, size, username } = req.query
        let docs

        if (!page) page = 1
        if (!size) size = 10

        const limit = parseInt(size)
        const skip = (parseInt(page) - 1) * parseInt(size)

        if (username) {
            docs = await Video.find({ username: { $eq: username } })
        } else {
            const { username } = req.user
            docs = await Video.find({ username: { $eq: username } })
        }
        docs = docs.reverse().slice(skip, limit + skip)

        res.render("./careermodule/post", { page: "Post", url: req.url, videosArray: docs })
    } catch (err) {
        console.log(err)
        res.redirect(url.format({
            pathname: "/error",
            query: {
                message: err.message,
                status: 404
            }
        }))
    }
}

module.exports.loadMore = async (req, res) => {
    try {
        let { page, size } = req.body
        if (!page) page = 1
        if (!size) size = 10

        const limit = parseInt(size)
        const skip = (parseInt(page) - 1) * parseInt(size)

        const { username } = req.user
        let docs = await Video.find({ username: { $eq: username } })
        docs = docs.reverse().slice(skip, limit + skip)

        res.status(200).json(docs)
    } catch (err) {
        console.log(err)
        res.redirect(url.format({
            pathname: "/error",
            query: {
                message: err.message,
                status: 404
            }
        }))
    }
}

module.exports.adminControls = async (req, res) => {
    try {
        if(!req.user) throw "You need to be loggedIn."
        const today = new Date()
        const ongoingClashes = []
        const prevClashes = []

        const { followers } = await Userdetail.findOne({ username: { $eq: req.user.username } })
        const followersData = await Userdetail.find({ username: { $in: followers } })
        const clashs = await Clash.find({ username: { $eq: req.user.username } })

        clashs.forEach(clash => {
            let startDate = new Date(clash.startDate)
            let endDate = new Date(clash.endDate)
            if (today >= startDate && today <= endDate) ongoingClashes.push(clash)
            else if (today > endDate) prevClashes.push(clash)
        })

        // Collecting data for ongoing clashes
        let ongoingVideos = ongoingClashes.map(async clash => {
            return await Video.findOne({ _id: { $eq: clash.videos[0] } })
        })
        ongoingVideos = await Promise.all(ongoingVideos)

        let ongoingParticipantsList = ongoingClashes.map(async clash => {
            return await Userdetail.find({ username: { $in: clash.participants } })
        })
        ongoingParticipantsList = await Promise.all(ongoingParticipantsList)

        // Collecting data for previous clash
        let prevVideos = prevClashes.map(async clash => {
            return await Video.findOne({ _id: { $eq: clash.videos[0] } })
        })
        prevVideos = await Promise.all(prevVideos)

        let prevParticipantsList = prevClashes.map(async clash => {
            return await Userdetail.find({ username: { $in: clash.participants } })
        })
        prevParticipantsList = await Promise.all(prevParticipantsList)

        res.render("./careermodule/admincontrols", { url: req.url, ongoingClashes, ongoingVideos, ongoingParticipantsList, prevClashes, prevVideos, prevParticipantsList, followersData })
    } catch (err) {
        console.log(err)
        res.redirect(url.format({
            pathname: "/error",
            query: {
                message: err ? err : err.message,
                status: 404
            }
        }))
    }
}

module.exports.searchFrnds = async (req, res) => {
    try {
        if (!req.body) throw "Their is no input"
        const { value } = req.body;

        const filter = value.split('').includes('@') ? { email: { $regex: value, $options: '$i' } } : { username: { $regex: value, $options: "$i" } }

        const data = await Userdetail.find(filter)
        res.status(200).send(data)
    } catch (err) {
        console.log(err)
        res.redirect(url.format({
            pathname: "/error",
            query: {
                message: err ? err : err.message,
                status: 404
            }
        }))
    }
}

module.exports.addParticipants = async (req, res) => {
    if (!req.body) throw "Their is no payload."
    if (!req.params) throw "Reference id is required."
        
    try {
        let newParticipantsArray = [], isSelectedAllFollowers;

        if (req.body.isAllSelected && req.body.isAllSelected === true && req.body.newParticipantsArray && req.body.newParticipantsArray.length === 0) {
            const { followers } = await Userdetail.findOne({ username: req.user.username });
            newParticipantsArray = followers;
            isSelectedAllFollowers = true;
        } else if (!req.body.isAllSelected && req.body.newParticipantsArray && req.body.newParticipantsArray.length > 0) {
            newParticipantsArray = req.body.newParticipantsArray;
            isSelectedAllFollowers = false;
        } else if (req.body.byInvite && req.body.byInvite === true && (req.body.username || req.body.email)) {

            if ((req.body.email === req.user.email) || (req.body.username === req.user.username)) return res.status(406).json({ status: 'Not Acceptable', message: 'Can Not Request To Self' });

            const { participants } = await Clash.findOne({ _id: req.params.id, username: req.user.username });
            const { followers } = await Userdetail.findOne({ username: req.user.username });

            let user;

            if (req.body.username) {

                // Checking if a user is already a participant or a follower
                if (participants.includes(req.body.username)) return res.status(406).json({ status: 'Not Acceptable', message: 'Already A Participant' });
                if (followers.includes(req.body.username)) return res.status(406).json({ status: 'Not Acceptable', message: 'Inorder to select your followers click on "See All" button' });

                user = await User.findOne({ username: req.body.username });
                if (user === null) return res.status(406).json({ status: 'Not Found', message: 'User Not Found' });
                newParticipantsArray = [user.username];

            } else if (req.body.email) {

                user = await User.findOne({ email: req.body.email });
                if (user === null) return res.status(404).json({ status: 'Not Found', message: 'User Not Found' });

                // Checking if a user is already a participant
                if (participants.includes(user.username)) return res.status(406).json({ status: 'Not Acceptable', message: 'Already A Participant' });
                if (followers.includes(user.username)) return res.status(406).json({ status: 'Not Acceptable', message: 'Inorder to select your followers click on "See All" button' });

                newParticipantsArray = [user.username];
            }
        }

        if (!newParticipantsArray.length) throw "Select atleast one follower inorder to save changes."

        //5) Updating the document
        const clash = await Clash.findOne({ _id: { $eq: req.params.id } })
        clash.participants = [...new Set([...clash.participants, ...newParticipantsArray])]
        clash.view = [...new Set([...clash.view, ...newParticipantsArray])]
        clash.isSelectedAllFollowers = isSelectedAllFollowers
        await clash.save()

        res.status(201).json({
            status: 'success',
            clash
        });
    } catch (err) {
        console.log(err)
        res.redirect(url.format({
            pathname: "/error",
            query: {
                message: err ? err : err.message,
                status: 404
            }
        }))
    }
}
