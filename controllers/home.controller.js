const Clash = require('./../models/clash.models');
const Video = require('./../models/video.models');
const Userdetail = require("../models/userdetails.models")
const _ = require("lodash");


module.exports.home = async (req, res) => {
   try {

      const user = await Userdetail.findOne({ username: { $eq: req.user.username } })
      if (!user) throw "You need to be logged In."

      const today = new Date()
      const clashes = []
      let videos = []
      let randIndices = []
      let randVideos = []
      let randVideoIds = []

      const publicClashes = await Clash.find({ mode: { $eq: "Public" } }).populate({ path: 'videos', model: 'Video' })

      publicClashes.forEach(clash => {
         let startDate = new Date(clash.startDate)
         let endDate = new Date(clash.endDate)
         if (today >= startDate && today <= endDate) {
            clashes.push(clash)
            videos = [...videos, ...clash.videos]
         }
      })

      videos = videos.map(async video => {
         const userData = await Userdetail.findOne({ username: { $eq: video.username } })
         const clashData = await Clash.findOne({ _id: { $eq: video.clash } })
         return { video, userData, clashData }
      })
      videos = await Promise.all(videos)

      // Get random 5 videos
      let count = videos.length > 5 ? 5 : videos.length
      while (count) {
         let randIndex = Math.floor(Math.random() * videos.length)
         if (randIndices.includes(randIndex)) continue
         randIndices.push(randIndex)
         randVideos.push(videos[randIndex])
         randVideoIds.push(videos[randIndex].video._id)
         count--
      }

      res.render("Homemodule/feedhome", { page: "HappyClash homefeed", url: req.url, videos: randVideos, randVideoIds, mode: 'Public', user })
   } catch (err) {
      console.log(err);
      res.redirect(`/error?message=${err}`);
   }
}

module.exports.getRandomVideos = async (req, res) => {
   try {
      const { mode } = req.body;

      const today = new Date()
      const clashes = []
      let dbClashes
      let videos = []
      let randIndices = []
      let randVideos = []
      let randVideoIds = []

      if (mode === "Public") dbClashes = await Clash.find({ mode: { $eq: mode } }).populate({ path: 'videos', model: 'Video' })
      else if (mode === "Friend") dbClashes = await Clash.find({ mode: { $eq: mode }, isSeenByAllForFriends: true }).populate({ path: 'videos', model: 'Video' })

      dbClashes.forEach(clash => {
         let startDate = new Date(clash.startDate)
         let endDate = new Date(clash.endDate)
         if (today >= startDate && today <= endDate) {
            clashes.push(clash)
            videos = [...videos, ...clash.videos]
         }
      })

      videos = videos.map(async video => {
         const userData = await Userdetail.findOne({ username: { $eq: video.username } })
         const clashData = await Clash.findOne({ _id: { $eq: video.clash } })
         return { video, userData, clashData }
      })
      videos = await Promise.all(videos)

      // Get random 5 videos
      let count = videos.length > 5 ? 5 : videos.length
      while (count) {
         let randIndex = Math.floor(Math.random() * videos.length)
         if (randIndices.includes(randIndex)) continue
         randIndices.push(randIndex)
         randVideos.push(videos[randIndex])
         randVideoIds.push(videos[randIndex].video._id)
         count--
      }
      res.status(200).json({ videos: randVideos, randVideoIds, mode })
   } catch (err) {
      console.log(err);
      res.redirect(`/error?message=${err}`);
   }
}

module.exports.loadMore = async (req, res) => {
   try {
      const { mode, randVideoIds } = req.body;

      const today = new Date()
      const clashes = []
      let videos = []
      let randIndices = []
      let randVideos = []
      let moreClashes = []

      if (mode === "Public") moreClashes = await Clash.find({ mode: { $eq: mode } }).populate({ path: 'videos', model: 'Video' })
      else if (mode === "Friend") moreClashes = await Clash.find({ mode: { $eq: mode }, isSeenByAllForFriends: true }).populate({ path: 'videos', model: 'Video' })

      moreClashes.forEach(clash => {
         let startDate = new Date(clash.startDate)
         let endDate = new Date(clash.endDate)
         if (today >= startDate && today <= endDate) {
            clashes.push(clash)
            videos = [...videos, ...clash.videos]
         }
      })

      videos = videos.map(async video => {
         if (!randVideoIds.includes(video._id.toString())) {
            const userData = await Userdetail.findOne({ username: { $eq: video.username } })
            const clashData = await Clash.findOne({ _id: { $eq: video.clash } })
            return { video, userData, clashData }
         }
      })
      videos = await Promise.all(videos)

      videos = videos.filter(video => video !== undefined)

      // Get random 5 videos
      let count = videos.length > 5 ? 5 : videos.length
      while (count) {
         let randIndex = Math.floor(Math.random() * videos.length)
         if (randIndices.includes(randIndex)) continue
         randIndices.push(randIndex)
         randVideos.push(videos[randIndex])
         randVideoIds.push(videos[randIndex].video._id)
         count--
      }
      res.status(200).json({ videos: randVideos, randVideoIds, mode })
   } catch (err) {
      console.log(err);
      res.redirect(`/error?message=${err}`);
   }
}

exports.getChallengePage = async (req, res) => {

   try {
      // Getting all the challenges of particular clash
      const clash = await Clash.findById(req.params.clashId);

      if (_.isEmpty(clash)) return res.redirect(`/error?message=Clash Not Found&status=404`);

      const view = [clash.username, ...clash.view];

      if (clash.mode === 'Friend' && clash.isSeenByAllForFriends === false) {
         if (!view.includes(req.user.username)) return res.redirect(`/error?message=This Page Is Not Accessible&status=503`);
      }

      const challenges = await Video.find({ clash: clash._id });

      if (_.isEmpty(challenges)) return res.redirect(`/error?message=Challenges Not Found&status=404`);

      res.render("Homemodule/challenge", { url: req.url, challenges, title: clash.title });

   } catch (err) {
      console.log(err);
      res.redirect(`/error?message=${err}`);
   }
}
