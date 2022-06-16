const router = require('express').Router();
const { model } = require('mongoose');
const Product = require('../models/product.model');
const Order = require('../models/order_details.model');
const DbHelper = require('../models/dbHelper.model')
const fs = require('fs');


var multer = require("multer")
var upload = multer({ dest: '../public/images/product_images/uploads' })


router.route('/getAll').get((req,res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error:'+ err))

})

router.route('/searchProduct').post((req,res) => {
    Product.find({"product_name": {"$regex" : req.body.searchKeyword,"$options" : "i"}})
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error:'+ err))

})

router.route('/getAllByCategory').post((req,res) => {
    console.log(req.body)
    Product.find(req.body)
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error:'+ err))

})

router.route('/getProductById').post((req,res) => {
    Product.find({product_id : req.body.product_id})
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error:'+err))
})

router.route('/addProduct').post(upload.single("myFile"),async (req,res) => {
    await DbHelper.find().then(obj => {
        const newProduct = new Product({
            product_id: parseInt(obj[0].product_counter)+1,
            seller_id: req.body.seller_id ? req.body.seller_id : 1,
            product_name: req.body.product_name ? req.body.product_name : 'Error',
            product_type: req.body.product_type ? req.body.product_type : 1,
            sub_category: req.body.sub_category ? req.body.sub_category : 1,
            product_img_link: req.body.product_img_link ? req.body.product_img_link : ((req.file && req.file.filename) ? req.file.filename : 'blank'),
            launch_date: new Date(),
            oem_address: req.body.oem_address ? req.body.oem_address : 'Delhi',
            oem_mobileNo: req.body.oem_mobileNo ? req.body.oem_mobileNo : "7827321701",
            product_details: req.body.product_details ? req.body.product_details : {
                "serial_no" : "PQCV123F50",
                "features" : [
                    "*Brand New Color Engine",
                    "*No Cost EMI starts from ₹ 4624.17/ month.",
                    "*Crystal Display and HDR",
                    "*Adaptive Sound & Q Symphony",
                    "*Multiple Voice Assistant with One Remote Control"
                ],
                "price" : 5000
            }
        })

        newProduct.product_details.features = req.body.features ? req.body.features : newProduct.product_details.features;
        newProduct.product_details.price = req.body.price ? req.body.price : newProduct.product_details.price;
        newProduct.product_details.serial_no = req.body.serial_no ? req.body.serial_no : newProduct.product_details.serial_no;

        newProduct.save()
            .then(async (result) => { 
                await DbHelper.updateMany({

                },{
                    $set : {
                        product_counter : parseInt(obj[0].product_counter)+1
                    }
                })
                res.json(result); 
            })
            .catch((err) => res.status(404).json("Error "+err));
    })

})

router.route('/update').post((req,res) => {
    Product.updateOne({
        name: req.body.name
    }, {
        $set: req.body
    })
        .then(product => res.json(product))
        .catch(err => res.status(400).json(err))
})

router.route('/delete').delete((req,res) => {
    Product.deleteOne(req.body)
        .then(data => res.json(data))
        .catch(err => res.status(400).json(err))
})

router.route('/deleteAll').delete((req,res) => {
    Product.deleteMany()
        .then(result => {
            process.env.productTableCounter = 0;
            res.json(result);
        })
        .catch(err => res.status(404).json('Error: '+err));
})

module.exports = router;