const router = require('express').Router();
const { model } = require('mongoose');
const Log = require('../models/log.model');

router.route('/getAll').get((req,res) => {
    Log.find()
        .then(Logs => res.json(Logs))
        .catch(err => res.status(400).json('Error:'+ err))

})

router.route('/add').post((req,res) => {
    const newLog = new Log({
        email: req.body.email,
        subject: req.body.subject,
        Log: req.body.Log
    })
    newLog.save()
        .then(() => res.json("Log Successfully Added."))
        .catch((err) => res.status(404).json("Error "+err));
})

router.route('/getOne').post((req,res) => {
    Log.find(req.body)
        .then(Logs => res.json(Logs))
        .catch(err => res.status(400).json('Error:'+ err))

})

router.route('/update').patch(async(req,res) => {
    await Log.updateOne({
        email: req.body.email,
        subject: req.body.subject
    }, {
        $set: {
            Log: req.body.Log
        }
    })
        .then(student => res.json(student))
        .catch(err => res.status(400).json(err))
})

router.route('/deleteAll').delete((req,res) => {
    Log.deleteMany()
        .then(result => res.json(result))
        .catch(err => res.status(404).json('Error: '+err));
})

module.exports = router;