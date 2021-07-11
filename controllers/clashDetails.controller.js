const url = require("url")
const Userdetail = require("../models/userdetails.models")
const Video = require("../models/video.models")
const Clash = require("../models/clash.models")
const Report = require("../models/report.models")
const Comment = require("../models/comment.models")
const _ = require("lodash");
const { result } = require("lodash")

module.exports.clashDetails = async (req, res) => {
    try {
        const { id } = req.params
        let isFollowed
        if (!id) throw "Reference Id is required inorder to view details."

        const video = await Video.findOne({ _id: { $eq: id } })
        if (!video) throw "Their is no details associated with this reference id."

        const clash = await Clash.findOne({ _id: { $eq: video.clash } })
        if (!clash) throw "This video is not associated with any clash"

        // List of comments
        let comments = video.comments.map(async id => {
            return await Comment.findOne({ _id: { $eq: id } })
        })
        comments = await Promise.all(comments)
        comments = comments.map(async c => {
            let { profilePic } = await Userdetail.findOne({ username: { $eq: c.username } })
            return { c, profilePic }
        })
        comments = await Promise.all(comments)

        // List of paricipants
        let participants = clash.participants.map(async p => {
            return await Userdetail.findOne({ username: { $eq: p } })
        })
        participants = await Promise.all(participants)

        const user = await Userdetail.findOne({ username: { $eq: clash.username } })
        if (!user) throw "Their is no user with this username."

        const currUser = await Userdetail.findOne({ username: { $eq: req.user.username } })
        if (!currUser) throw "Something went wrong"

        const present = currUser.following.find(follower => follower === user.username)
        if (present) isFollowed = true
        else isFollowed = false
        participants = [user, ...participants]

        res.render("ClashDetailsmodule/clashDetails", { url: req.url, video, clash, user, participants, isFollowed, comments: comments.reverse() });
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

module.exports.notAdminClashDetails = async (req, res) => {
    try {
        const { id } = req.params
        let isFollowed
        if (!id) throw "Reference Id is required inorder to view details."

        const video = await Video.findOne({ _id: { $eq: id } })
        if (!video) throw "Their is no details associated with this reference id."

        const clash = await Clash.findOne({ _id: { $eq: video.clash } })
        if (!clash) throw "This video is not associated with any clash"

        // List of comments
        let comments = video.comments.map(async id => {
            return await Comment.findOne({ _id: { $eq: id } })
        })
        comments = await Promise.all(comments)
        comments = comments.map(async c => {
            let { profilePic } = await Userdetail.findOne({ username: { $eq: c.username } })
            return { c, profilePic }
        })
        comments = await Promise.all(comments)

        // List of paricipants
        let participants = clash.participants.map(async p => {
            return await Userdetail.findOne({ username: { $eq: p } })
        })
        participants = await Promise.all(participants)

        const user = await Userdetail.findOne({ username: { $eq: clash.username } })
        if (!user) throw "Their is no user with this username."

        const currUser = await Userdetail.findOne({ username: { $eq: req.user.username } })
        if (!currUser) throw "Something went wrong"

        const present = currUser.following.find(follower => follower === user.username)
        if (present) isFollowed = true
        else isFollowed = false
        participants = [user, ...participants]

        res.render("ClashDetailsmodule/clashDetailsNotAdmin", { url: req.url, video, clash, user, participants, isFollowed, comments: comments.reverse() });
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

module.exports.whenInvitedDetails = async (req, res) => {
    try {
        const { id } = req.params
        let isFollowed
        if (!id) throw "Reference Id is required inorder to view details."

        const video = await Video.findOne({ _id: { $eq: id } })
        if (!video) throw "Their is no details associated with this reference id."

        const clash = await Clash.findOne({ _id: { $eq: video.clash } })
        if (!clash) throw "This video is not associated with any clash"

        // List of comments
        let comments = video.comments.map(async id => {
            return await Comment.findOne({ _id: { $eq: id } })
        })
        comments = await Promise.all(comments)
        comments = comments.map(async c => {
            let { profilePic } = await Userdetail.findOne({ username: { $eq: c.username } })
            return { c, profilePic }
        })
        comments = await Promise.all(comments)

        // List of paricipants
        let participants = clash.participants.map(async p => {
            return await Userdetail.findOne({ username: { $eq: p } })
        })
        participants = await Promise.all(participants)

        const user = await Userdetail.findOne({ username: { $eq: clash.username } })
        if (!user) throw "Their is no user with this username."

        const currUser = await Userdetail.findOne({ username: { $eq: req.user.username } })
        if (!currUser) throw "Something went wrong"

        const present = currUser.following.find(follower => follower === user.username)
        if (present) isFollowed = true
        else isFollowed = false
        participants = [user, ...participants]

        res.render("ClashDetailsmodule/clashDetailsWhenInvited", { url: req.url, video, clash, user, participants, isFollowed, comments: comments.reverse() });
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

module.exports.publicDetails = async (req, res) => {
    try {
        const { id } = req.params
        let isFollowed
        if (!id) throw "Reference Id is required inorder to view details."

        const video = await Video.findOne({ _id: { $eq: id } })
        if (!video) throw "Their is no details associated with this reference id."

        const clash = await Clash.findOne({ _id: { $eq: video.clash } })
        if (!clash) throw "This video is not associated with any clash"

        // List of comments
        let comments = video.comments.map(async id => {
            return await Comment.findOne({ _id: { $eq: id } })
        })
        comments = await Promise.all(comments)
        comments = comments.map(async c => {
            let { profilePic } = await Userdetail.findOne({ username: { $eq: c.username } })
            return { c, profilePic }
        })
        comments = await Promise.all(comments)

        // List of paricipants
        let participants = clash.participants.map(async p => {
            return await Userdetail.findOne({ username: { $eq: p } })
        })
        participants = await Promise.all(participants)

        const user = await Userdetail.findOne({ username: { $eq: clash.username } })
        if (!user) throw "Their is no user with this username."

        const currUser = await Userdetail.findOne({ username: { $eq: req.user.username } })
        if (!currUser) throw "Something went wrong"

        const present = currUser.following.find(follower => follower === user.username)
        if (present) isFollowed = true
        else isFollowed = false
        participants = [user, ...participants]

        res.render("ClashDetailsmodule/clashDetailsPublic", { url: req.url, video, clash, user, participants, isFollowed, comments: comments.reverse() });
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

module.exports.profile = async (req, res) => {
    try {
        const { username } = req.params
        let isFollowed
        const userDetails = await Userdetail.findOne({ username: { $eq: username } })

        const present = userDetails.followers.find(follower => follower === req.user.username)
        if (present) isFollowed = true
        else isFollowed = false

        let docs = await Video.find({ username: { $eq: username } })
        docs = docs.reverse().slice(0, 5)

        res.render("ClashDetailsmodule/profile", { url: req.url, videosArray: docs, userDetails, isFollowed })
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

module.exports.follow = async (req, res) => {
    try {
        const { username } = req.user
        const { user, keyword } = req.body
        if (!username || !user || !keyword) throw "Problem while sending the payload."
        if (username === user) throw "You can't able to follow or unfollow yourself."

        const userdetails = await Userdetail.findOne({ username: { $eq: user } })
        const currUser = await Userdetail.findOne({ username: { $eq: username } })

        if (keyword === "follow") {
            userdetails.followers.push(username)
            currUser.following.push(user)
        } else if (keyword === "unfollow") {
            const followers = userdetails.followers.filter(follower => follower !== username)
            userdetails.followers = followers

            const following = currUser.following.filter(follower => follower !== user)
            currUser.following = following
        }
        await userdetails.save()
        await currUser.save()
        res.status(200).json({ message: "Updated successfully" })
    } catch (err) {
        console.log(err)
        res.status(200).json({ message: err ? err : err.message })
    }
}

module.exports.participants = async (req, res) => {
    try {
        //
        const clash = await Clash.findOne({ _id: req.params.clashId, $or: [{ username: req.user.username }, { view: req.user.username }] });

        if (_.isEmpty(clash)) return res.redirect(`/error?errorMessage=Clash Not Found`);

        let participantsDetailsPromiseArray = []; // followerDetails should be name

        //3) Now we need full details of follwers in order to render over page
        participantsDetailsPromiseArray.push(Userdetail.findOne({ username: clash.username }));
        clash.participants.forEach(el => {
            participantsDetailsPromiseArray.push(Userdetail.findOne({ username: el }));
        })

        Promise.allSettled(participantsDetailsPromiseArray).then(data => {
            return res.render("ClashDetailsmodule/participants", { url: req.url, participantsDetails: data });
        }).catch(err => {
            console.log(err);
            return res.redirect(`/error?errorMessage=${err}`);
        })

    } catch (err) {
        console.log(err);
        res.redirect(`/error?errorMessage=${err}`);
    }
}

module.exports.comments = async (req, res) => {
    try {
        const { videoId } = req.params
        if (!videoId) throw "Reference Id is required inorder to view comments."

        const video = await Video.findOne({ _id: { $eq: videoId } })
        if (!video) throw "Their is no details associated with this reference id."
        if(video.clash==null) throw "cannot comment on the video which is not linked with a clash"
        const clash= await Clash.findOne({_id:video.clash})
        if(!clash) throw "clash does not exist for this video"
        if(clash.mode=="Friend"&&clash.isSeenByAllForFriends==false){
            let isPresent=clash.view.includes(req.user.username);
           if(!isPresent){
               if(clash.username==req.user.username){

               }
               else{
               throw "don't have permission for this"
               }
           } 
        }
        // List of comments
        let comments = video.comments.map(async id => {
            return await Comment.findOne({ _id: { $eq: id } }).populate('subComments')
        })
        comments = await Promise.all(comments)
        comments = comments.map(async c => {
            let { profilePic } = await Userdetail.findOne({ username: { $eq: c.username } })
            let sc = c.subComments.map(async sc => {
                let { profilePic } = await Userdetail.findOne({ username: { $eq: sc.username } })
                return { sc, profilePic }
            })
            sc = await Promise.all(sc)
            return { c, profilePic, sc }
        })
        comments = await Promise.all(comments)
        res.render("ClashDetailsmodule/clashComments", { url: req.url, comments: comments.reverse(), videoId });
    } catch (err) {

        res.redirect(url.format({
            pathname: "/error",
            query: {
                message: err ? err : err.message,
                status: 404
            }
        }))
    }
}

module.exports.formComment = async (req, res) => {
    try {
        const { videoId } = req.params
        const { comment } = req.body
        const { username } = req.user
        if (!username) throw "You need to be loggedIn to post a comment"

        const video = await Video.findOne({ _id: { $eq: videoId } })
        if (!video) throw "Their is no video with this reference id."

        const newComment = new Comment({ username, video: videoId, message: comment })
        await newComment.save()

        video.comments.push(newComment._id)
        await video.save()
        res.redirect(`/clashDetails/comments/${videoId}`)
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

module.exports.subComment = async (req, res) => {
    try {
        const { comment, toComment } = req.body
        const { videoId } = req.params
        const { username } = req.user
        if (!username) throw "You need to be loggedIn to post a comment"

        const user = await Comment.findOne({ _id: { $eq: toComment } })
        if (!user) throw "Their is no comment that you are try to comment for."

        const newComment = new Comment({
            username, video: videoId, message: comment, isReplied: true
        })
        await newComment.save()

        user.subComments.push(newComment._id)
        await user.save()
        res.redirect(`/clashDetails/comments/${videoId}`)
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

module.exports.reportForm = (req, res) => {
    const { id } = req.params
    res.render("ClashDetailsmodule/ReportClash", { url: req.url, id });
}

module.exports.report = async (req, res) => {
    const { id } = req.params
    const { username, email } = req.user
    const { message } = req.body
    const reasons = []
    try {
        Object.keys(req.body).forEach(ele => {
            if (ele.includes("reason")) reasons.push(req.body[ele])
        })

        const clash = await Clash.findOne({ _id: { $eq: id } })
        if (!clash) throw "Their is no clash with this reference id"

        const { isSeenByAllForFriends, mode, _id } = clash
        if (mode === "Public" || (mode === "Friend" && isSeenByAllForFriends)) {
            const newReport = new Report({
                username, email, message, for: reasons, clashAdmin: clash.username, clashId: _id, status: false
            })
            await newReport.save()
        } else {
            const present = clash.view.filter(user => user === username)
            if (present.length === 0) throw "You don't have access to report this clash"
            else {
                const newReport = new Report({
                    username, email, message, for: reasons, clashAdmin: clash.username, clashId: _id, status: false
                })
                await newReport.save()
            }
        }
        res.redirect("/library")
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
