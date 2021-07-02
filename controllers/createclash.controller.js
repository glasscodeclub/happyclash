var moment = require('moment');

const Clash = require('../models/clash.models');
const Video = require('./../models/video.models');
const UserDetails = require('./../models/userdetails.models');
const User = require('./../models/user.models');
const _ = require("lodash");

// Without video is selected clash can not be created

exports.getCreateNewClashPage = (req, res) => {

   const today = new Date();
   let tomorrow = new Date(today);
   tomorrow.setDate(tomorrow.getDate() + 1);
   tomorrow = tomorrow.toLocaleDateString().split('/');

   const date = tomorrow[1].split('').length === 1 ? `0${tomorrow[1]}` : tomorrow[1];
   const month = tomorrow[0].split('').length === 1 ? `0${tomorrow[0]}` : tomorrow[0];
   const year = tomorrow[2];

   tomorrow = `${year}-${month}-${date}`;

   res.render("createclashmodule/newClash", { url: req.url, tomorrow});
}

exports.getWhoCanWatchPage = (req, res) => {
   res.render("createclashmodule/whoCanWatch", { url: req.url })
}

exports.getClashCreatedPage = async (req, res) => {
   try {
      const clash = await Clash.findOne({ _id: req.params.clashId, username: req.user.username });

      if (_.isEmpty(clash)) return res.redirect(`/error?message=This Page Is Not Accessible&status=404`);

      const endDateCorrectFormat = moment(clash.endDate).format('YYYY-MM-DD');

      const shareableLink = req.headers.host === 'localhost:3000' ? `http://${req.headers.host}/home/challenge/${clash._id}` : `https://${req.headers.host}/home/challenge/${clash._id}`;

      if (clash.mode === 'Friend') {
         let participantsDetailsPromiseArray = [];

         clash.participants.forEach(el => {
            participantsDetailsPromiseArray.push(UserDetails.findOne({ username: el }));
         })

         // Runing all promises in parallel
         Promise.allSettled(participantsDetailsPromiseArray).then(data => {
            let count;
            if (data.length < 4) count = data.length;
            res.render('createclashmodule/clashCreated', {mode: clash.mode, title: clash.title, description: clash.description, shareableLink, isSeenByAllForFriends : clash.isSeenByAllForFriends,endDate : endDateCorrectFormat, participantsDetails: data, count : count || 4, url: req.url });  
         }).catch(err => {
            console.log(err);
            return res.redirect(`/error?message=${err}`);
         })

      } else {
         res.render('createclashmodule/clashCreated', {mode: clash.mode, title: clash.title, shareableLink ,description : clash.description, isSeenByAllForFriends : clash.isSeenByAllForFriends, endDate: endDateCorrectFormat, url: req.url });
      }

   } catch (err) {
      res.redirect(`/error?message=${err}`);
   }
};

exports.createClash = async (req, res) => {

   try {
      // 1) req body will not be empty
      if (_.isEmpty(req.body)) return res.status(201).redirect('/createclash/createNewClash');

      // 4) Creating a clash
      const newClash = await Clash.create({
            mode : req.body.mode,
            title : req.body.title,
            description : req.body.description,
            endDate :  moment(req.body.endDate).toISOString(),
            category : req.body.category,
            keywords : req.body.keywords,
            videos : req.body.videos,
            participants : req.body.participants,
            suggestions : req.body.suggestions,
            view : req.body.view,
            isSeenByAllForFriends : req.body.isSeenByAllForFriends,
            isSelectedAllFollowers : req.body.isSelectedAllFollowers,
            rank: req.body.rank,
            username: req.user.username
      });

      if (_.isEmpty(newClash)) return res.redirect(`/error?message=Some Error Occured. Clash Not Created&status=406`);
      
      const video = await Video.findByIdAndUpdate(newClash.videos[0], { clash: newClash._id } , {
         new: true,
         runValidators: true
      });

      // 5) Sending response after creating
      res.status(201).json({
         status: 'success',
         newClash
      })
   }catch (err) {
      res.redirect(`/error?message=${err}`);
   }
}

exports.getAddParticipantsPage = async(req, res) => {
   try {

      const clash = await Clash.findOne({ _id: req.params.clashId, username: req.user.username });
      
      if (_.isEmpty(clash)) return res.redirect(`/error?message=Clash Not Found&status=404`);

      if(clash.mode === 'Public') return res.redirect(`/createclash/clashcreated/${req.params.clashId}`)
      
      const userDetails = await UserDetails.findOne({ username: req.user.username });

      if (_.isEmpty(userDetails)) return res.redirect(`/error?message=User Not Found&status=404`);

      let followersDetailsPromiseArray = []; // followerDetails should be name

      userDetails.followers.forEach(el => {
         followersDetailsPromiseArray.push(UserDetails.findOne({ username: el }));
      })

      // Runing all promises in parallel
      Promise.allSettled(followersDetailsPromiseArray).then(data => {
         let count;
         if (data.length < 4) count = data.length;
         return res.render("createclashmodule/addParticipants", { url: req.url, followerDetails: data, count : count || 4 });     
      }).catch(err => {
         console.log(err);
         return res.redirect(`/error?message=${err}`);
      })

   } catch (err) {
      console.log(err);
      res.redirect(`/error?message=${err}`);
   }
   
}

exports.addParticipants = async (req, res) => {
   try {
    
      //3) Check if the req.body is null , even though it will not but still
      if (_.isEmpty(req.body)) return res.redirect(`/error?Message=You have sent empty body&status=406`);

     //4) here we are checking for both two cases of adding participants
      let newParticipantsArray , isSelectedAllFollowers;

      if (req.body.isAllSelected && req.body.isAllSelected === true && req.body.newParticipantsArray && req.body.newParticipantsArray.length === 0) {
         const { followers } = await UserDetails.findOne({ username: req.user.username });
         newParticipantsArray = followers;
         isSelectedAllFollowers = true;
      } else if(!req.body.isAllSelected && req.body.newParticipantsArray && req.body.newParticipantsArray.length > 0) {
         newParticipantsArray = req.body.newParticipantsArray;
         isSelectedAllFollowers = false;
      } else if (req.body.byInvite && req.body.byInvite === true && (req.body.username || req.body.email)) {

         if ((req.body.email === req.user.email) || (req.body.username === req.user.username)) return res.status(406).json({ status: 'Not Acceptable', message: 'Can Not Request To Self' });

         const { participants } = await Clash.findOne({ _id: req.params.clashId, username: req.user.username });
         const { followers } = await UserDetails.findOne({ username: req.user.username });

         let user;

         if (req.body.username) {

            // Checking if a user is already a participant or a follower
            if (participants.includes(req.body.username)) return res.status(406).json({ status: 'Not Acceptable', message: 'Already A Participant' });
            if (followers.includes(req.body.username)) return res.status(406).json({ status: 'Not Acceptable', message: 'Choose Followers From Below' });

            user = await User.findOne({ username: req.body.username });
            if (user === null) return res.status(404).json({ status: 'Not Found', message : 'User Not Found' });
            newParticipantsArray = [user.username];
         } else if (req.body.email) {
            
            
            user = await User.findOne({ email: req.body.email });
            if (user === null) return res.status(404).json({ status: 'Not Found', message: 'User Not Found' });

            // Checking if a user is already a participant
            if (participants.includes(user.username)) return res.status(406).json({ status: 'Not Acceptable', message: 'Already A Participant' });
            if (followers.includes(user.username)) return res.status(406).json({ status: 'Not Acceptable', message: 'Choose Followers From Below' });

            newParticipantsArray = [user.username];
         }
      }

     //5) Updating the document
      const clash = await Clash.findByIdAndUpdate({"_id": req.params.clashId}, { $push: { participants: { $each: newParticipantsArray } , view: { $each: newParticipantsArray } } , isSelectedAllFollowers: isSelectedAllFollowers}, {
         new: true,
         runValidators: true
      });

      res.status(201).json({
         status: 'success',
         clash
      });

   // handling the normal array and select all feature.
         
   } catch (err) {
      console.log(err);
      res.redirect(`/error?message=${err}`);
   }
}

exports.getWhoCanWatchPage = async(req, res) => {

   try {
      //1) Check if the clash id is right or  Redirect to success page if the  mode is public
      const clash = await Clash.findOne({ _id: req.params.clashId, username: req.user.username });

      if (_.isEmpty(clash)) return res.redirect('/error?message=Clash Not Found&status=404');
      
      if(clash.mode === 'Public') return res.redirect(`/createclash/clashcreated/${req.params.clashId}`)
      

      //2) Now we will need all the followers of the user and send it as array
      const { followers } = await UserDetails.findOne({ username: req.user.username });

      let followersDetailsPromiseArray = []; // followerDetails should be name

      //3) Now we need full details of follwers in order to render over page
      followers.forEach(el => {
         followersDetailsPromiseArray.push(UserDetails.findOne({ username: el }));
      })
      
      // Runing all promises in parallel
      Promise.allSettled(followersDetailsPromiseArray).then(data => {
         let count;
         if (data.length < 4) count = data.length;
         return res.render("createclashmodule/whoCanWatch", { url: req.url, view: clash.view, isSelectedAllFollowers: clash.isSelectedAllFollowers ,followerDetails: data, count : count || 4 });     
      }).catch(err => {
         console.log(err);
         return res.redirect(`/error?message=${err}`);
      })

   } catch (err) {
      console.log(err);
      res.redirect(`/error?message=${err}`);
   }
   
}

exports.addViewers = async (req, res) => {
   try {
      //1) Getting clash and followers doc first
      const clash = await Clash.findOne({ _id: req.params.clashId, username: req.user.username });
      
      //3) Check if the req.body is null , even though it will not but still
      if(_.isEmpty(req.body)) return res.redirect(`/error?message=You have sent empty newViewersArray&status=406`);

     //4) Adding Viewers
      let updatedClash;
      
      if (req.body.isAllSelected && req.body.isAllSelected === true && clash.isSelectedAllFollowers === false && req.body.newViewersArray && req.body.newViewersArray.length === 0) {
         // accesing user follower
         const { followers } = await UserDetails.findOne({ username: req.user.username });

         // some viewers pehle se hi hai
         // we have to create an array and push all the followers who are not in the view.
         let newViewersArray = followers.filter(el => !clash.view.includes(el));

         updatedClash = await Clash.findByIdAndUpdate(req.params.clashId, { $push: {view: { $each: newViewersArray } } }, {
            new: true,
            runValidators: true
         });

      } else if (!req.body.isAllSelected && req.body.newViewersArray && req.body.newViewersArray.length > 0) {
         // In this case we will just push the array
         updatedClash = await Clash.findByIdAndUpdate(req.params.clashId, { $push: {view: { $each: req.body.newViewersArray } } }, {
            new: true,
            runValidators: true
         });

      } else if (req.body.everyoneSelected && req.body.everyoneSelected === true && req.body.newViewersArray && req.body.newViewersArray.length === 0) {
         updatedClash = await Clash.findByIdAndUpdate(req.params.clashId, {view: [] , isSeenByAllForFriends: true}, {
            new: true,
            runValidators: true
         });

      } else if (req.body.byInvite && req.body.byInvite === true && (req.body.username || req.body.email)) {

         if ((req.body.email === req.user.email) || (req.body.username === req.user.username)) return res.status(406).json({ status: 'Not Acceptable', message: 'Can Not Request To Self' });

         // const clash = await Clash.findOne({ _id: req.params.clashId, username: req.user.username });
         const { followers } = await UserDetails.findOne({ username: req.user.username });

         if (req.body.username) {
            // Checking if a user is already a Viewer or a follower
            if (clash.view.includes(req.body.username)) return res.status(406).json({ status: 'Not Acceptable', message: 'Already A Viewer' });
            if (followers.includes(req.body.username)) return res.status(406).json({ status: 'Not Acceptable', message: 'Choose Followers From Below' });

            const user = await User.findOne({ username: req.body.username });

            if (user === null) return res.status(404).json({ status: 'Not Found', message : 'User Not Found' });
            
            let newViewersArray = [user.username];

            updatedClash = await Clash.findByIdAndUpdate(req.params.clashId, { $push: {view: { $each: newViewersArray } } }, {
               new: true,
               runValidators: true
            });

         } else if (req.body.email) {
            const user = await User.findOne({ email: req.body.email });
            if (user === null) return res.status(404).json({ status: 'Not Found', message: 'User Not Found' });

            // Checking if a user is already a participant
            if (clash.view.includes(user.username)) return res.status(406).json({ status: 'Not Acceptable', message: 'Already A Viewer' });
            if (followers.includes(user.username)) return res.status(406).json({ status: 'Not Acceptable', message: 'Choose Followers From Below' });

            let newViewersArray = [user.username];

            updatedClash = await Clash.findByIdAndUpdate(req.params.clashId, { $push: {view: { $each: newViewersArray } } }, {
               new: true,
               runValidators: true
            });
         }
      }

      res.status(201).json({
         status: 'success',
         updatedClash
      });

   } catch (err) {
      console.log(err);
      res.redirect(`/error?message=${err}`);
   }
}

exports.deleteClash = async (req, res) => {

   const deletedClash = await Clash.findOneAndDelete({ _id: req.params.clashId });

   if (_.isEmpty(deletedClash)) return res.redirect('/error?message=Clash Not Found To Delete&status=404');

   const video = await Video.findByIdAndUpdate(deletedClash.videos[0], { clash: null } , {
      new: true,
      runValidators: true
   });

   res.status(204).json({
      status: 'success',
      data: null
   });
};

exports.getAllByNames = async (req, res, next) => {
   const key = new RegExp(`^${req.params.key}`);

   const filter = req.params.key.split('').includes('@') ? { email: { $in: [key] } } : { username: { $in: [key] } };

   const users = await UserDetails.find(filter);

   if (users.length > 0) {
      res.status(200).json({
         status: 'success',
         users: [users[0], users[1], users[2]]
       });
   } else if(users.length === 0) {
      res.status(200).json({
         status: 'success',
         users: []
       });
   }
};