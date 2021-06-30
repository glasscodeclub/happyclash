const url = require("url")
const Userdetail = require("../models/userdetails.models")

module.exports.follow = async (req, res) => {
    try {
        const { username } = req.user
        const { user, keyword } = req.body
        if(!username || !user || !keyword) throw "Problem while sending the payload."
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
