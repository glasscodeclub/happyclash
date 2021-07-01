const Clash = require('./../models/clash.models');
const Video = require('./../models/video.models');
const _ = require("lodash");


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

      if(_.isEmpty(challenges)) return res.redirect(`/error?message=Challenges Not Found&status=404`);
     
      res.render("Homemodule/challenge", { url: req.url, challenges, title: clash.title });
           
   }catch (err) {
      console.log(err);
      res.redirect(`/error?message=${err}`);
   }
}
