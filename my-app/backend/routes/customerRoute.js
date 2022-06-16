const router = require('express').Router();
const Customer = require('../models/customer.model');
const Product = require('../models/product.model');
const OrderDetails = require('../models/order_details.model');
var bcrypt = require("bcryptjs");


router.route('/getAll').get((req,res) => {
    Customer.find()
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json('Error:'+ err))

})

router.route('/add').post(async(req,res) => {
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password);
    const name = req.body.name;
    const gender = req.body.gender;
    const dateOfBirth = Date.parse(req.body.dateOfBirth);
    const address = req.body.address;
    const mobileNo = req.body.mobileNo;
    const accessToken = req.body.accessToken;

    const counter = await Customer.count()+1;

    const newCustomer = new Customer({
        customer_email: email,
        customer_password: password,
        customer_name : name,
        customer_id: counter,
        gender : gender,
        dateOfBirth : dateOfBirth,
        address: address,
        mobileNo: mobileNo,
        accessToken: accessToken
    });

    newCustomer.save()
        .then(() => res.json('New Customer added'))
        .catch(err => res.status(400).json('Error: '+err));
})

router.route('/getOne').post(async(req,res) => {
    console.log(req.body);
    Customer.findOne({customer_email : req.body.email})
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json('Error:'+ err))

})

router.route('/update').patch((req,res) => {
    Customer.updateOne({
        email: req.body.credentials.email
    }, {
        $set: req.body.data
    })
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json(err))
})

router.route('/delete').delete((req,res) => {
    Customer.deleteOne(req.body)
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err))
})

router.route('/deleteAll').delete((req,res) => {
    Customer.deleteMany()
        .then(result => res.json(result))
        .catch(err => res.status(404).json('Error: '+err));
})

router.route('/getCart').post((req,res) => {
    console.log('REQUEST');
    console.log(req.body);
    Product.aggregate([
        {
            $lookup: {
                from: "orders",
                localField: "product_id",
                foreignField: "product_id",
                as: "item"

            }
        },
        { $unwind: "$item"},
        {
            $project : {
                none : 0
            }
        },
        {
            $match: {
                'item.customer_id' : req.body.customer_id,
                'item.is_payed': (req.body.is_payed) ? req.body.is_payed : false 
            }
        }
    ])
    .then((result) => {
        res.json(result);
    })
})

router.route('/testing').post((req,res) => {
    
    let conditions = {};
    conditions['$and'] = [];
    Customer.find(conditions)
        .then(function(result){
            console.log(result.count);
        })
})

module.exports = router;