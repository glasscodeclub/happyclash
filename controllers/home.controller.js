const Clash = require('./../models/clash.models');
const Video = require('./../models/video.models');
const _ = require("lodash");


exports.getChallengePage = async (req, res) => {

   try {
      // Getting all the challenges of particular clash

      const clash = await Clash.findById(req.params.clashId);

      if (_.isEmpty(clash)) return res.redirect(`/error?message=Clash Not Found&status=404`);

      const view = [req.user.username, ...clash.view];

      if (clash.mode === 'Friend' && clash.isSeenByAllForFriends === false) {
         if (!view.includes(req.user.username)) return res.redirect(`/error?message=This Page Is Not Accessible&status=503`);
      }

      let videosPromiseArray = []; // followerDetails should be name

      //3) Now we need full details of follwers in order to render over page
      clash.videos.forEach(el => {
         videosPromiseArray.push(Video.findById(el));
      })

      Promise.allSettled(videosPromiseArray).then(data => {
         return res.render("Homemodule/challenge", { url: req.url, challenges: data, title: clash.title });
      }).catch(err => {
         console.log(err);
         return res.redirect(`/error?message=${err}`);
      })
   }catch (err) {
      console.log(err);
      res.redirect(`/error?message=${err}`);
   }
}
