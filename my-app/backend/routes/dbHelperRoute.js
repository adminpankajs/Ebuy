const router = require('express').Router();
const { model } = require('mongoose');
const DbHelper = require('../models/dbHelper.model');

router.route('/getAll').get((req,res) => {
    DbHelper.find()
        .then(Logs => res.json(Logs))
        .catch(err => res.status(400).json('Error:'+ err))

})

router.route('/add').post((req,res) => {
    const newDbHelper = new DbHelper()
    newDbHelper.save()
        .then(() => res.json("Counter Successfully Added."))
        .catch((err) => res.status(404).json("Error "+err));
})

router.route('/update').patch(async(req,res) => {
    await DbHelper.updateOne({
    }, {
        $set: {
            product_counter: req.body.product_counter
        }
    })
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err))
})

router.route('/deleteAll').delete((req,res) => {
    DbHelper.deleteMany()
        .then(result => res.json(result))
        .catch(err => res.status(404).json('Error: '+err));
})

module.exports = router;