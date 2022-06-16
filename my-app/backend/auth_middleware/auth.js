const router = require('express').Router();
const Seller = require('../models/seller.model');
const Customer = require('../models/customer.model')
const jwt = require("jsonwebtoken")
const secretToken = "abc123"

router.route('/seller/verifyToken').post((req,res) => {
    const token = req.body.accessToken
    jwt.verify(token,secretToken,(err,verfiedJWT) => {
        if(err) {
            res.status(404).send("Unauthorized Token");
        }
        else {
            Seller.find({accessToken: token})
                .then(Seller => res.json(Seller))
                .catch(err => res.status(400).json('Error:'+ err))
        }
    })

})

router.route('/customer/verifyToken').post((req,res) => {
    const token = req.body.accessToken
    jwt.verify(token,secretToken,(err,verfiedJWT) => {
        if(err) {
            res.status(404).send("Unauthorized Token");
        }
        else {
            Customer.find({accessToken: token})
                .then(Customer => res.json(Customer))
                .catch(err => res.status(400).json('Error:'+ err))
        }
    })

})

module.exports = router;