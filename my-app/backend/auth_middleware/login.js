const router = require('express').Router();
const Seller = require('../models/seller.model');
const Customer = require('../models/customer.model');
const jwt = require("jsonwebtoken")
const secretToken = "abc123"
var bcrypt = require('bcryptjs');

router.route('/seller/generateToken').post(async(req,res) => {
    console.log('Hit to sller');
    const mySeller = await Seller.find({'email': req.body.email});
    if(mySeller != "") {
        const validPass = await bcrypt.compare(req.body.password,mySeller[0].seller_password)
        if(validPass) {
            await jwt.verify(mySeller[0].accessToken,secretToken,(err,verfiedJWT) => {
                if(err) {
                    const accessToken = jwt.sign(
                        {"email": mySeller.email},
                        secretToken,
                        { expiresIn: '1d' }
                    );
                    mySeller[0].accessToken = accessToken

                    Seller.updateOne({
                        email: mySeller[0].email
                    }, {
                        $set: {
                            accessToken: accessToken
                        }
                    })
                        .then(data => {
                            res.json(mySeller);
                        })
                        .catch(err => console.log(err))

                }
                else {
                    res.json(mySeller);
                }
            })
            
        }
    }
    else {
        res.json(mySeller)
    }
})

router.route('/customer/generateToken').post(async(req,res) => {
    const myCustomer = await Customer.find({'customer_email': req.body.email});
    if(myCustomer != "") {
        const validPass = await bcrypt.compare(req.body.password,myCustomer[0].customer_password)
        if(validPass) {
            await jwt.verify(myCustomer[0].accessToken,secretToken,(err,verfiedJWT) => {
                if(err) {
                    const accessToken = jwt.sign(
                        {"email": myCustomer.email},
                        secretToken,
                        { expiresIn: '1d' }
                    );
                    myCustomer[0].accessToken = accessToken

                    Customer.updateOne({
                        email: myCustomer[0].email
                    }, {
                        $set: {
                            accessToken: accessToken
                        }
                    })
                        .then(data => {
                            res.json(myCustomer);
                        })
                        .catch(err => console.log(err))

                }
                else {
                    res.json(myCustomer);
                }
            })
            
        }
    }
    else {
        res.json(myCustomer)
    }
})


module.exports = router;