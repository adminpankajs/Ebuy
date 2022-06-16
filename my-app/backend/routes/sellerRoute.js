const router = require('express').Router();
const Seller = require('../models/seller.model');
var bcrypt = require("bcryptjs");


router.route('/getAll').get((req,res) => {
    Seller.find()
        .then(Sellers => res.json(Sellers))
        .catch(err => res.status(400).json('Error:'+ err))

})

router.route('/add').post((req,res) => {
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password);
    const name = req.body.name;
    const gender = req.body.gender;
    const dateOfBirth = Date.parse(req.body.dateOfBirth);
    const address = req.body.address;
    const mobileNo = req.body.mobileNo;
    const accessToken = req.body.accessToken;

    const newSeller = new Seller({
        seller_email: email,
        seller_password: password,
        seller_name : name,
        gender : gender,
        dateOfBirth : dateOfBirth,
        address: address,
        mobileNo: mobileNo,
        accessToken: accessToken
    });

    newSeller.save()
        .then(() => res.json('New Seller added'))
        .catch(err => res.status(400).json('Error: '+err));
})

router.route('/getOne').post((req,res) => {
    Seller.find(req.body)
        .then(Sellers => res.json(Sellers))
        .catch(err => res.status(400).json('Error:'+ err))

})

router.route('/updateAccessToken').patch((req,res) => {
    Seller.updateOne({
        email: req.body.email
    }, {
        $set: {
            accessToken: req.body.accessToken
        }
    })
        .then(Seller => res.json(Seller))
        .catch(err => res.status(400).json(err))
})

router.route('/deleteAll').delete((req,res) => {
    Seller.deleteMany()
        .then(result => res.json(result))
        .catch(err => res.status(404).json('Error: '+err));
})

module.exports = router;