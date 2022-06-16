const mongoose= require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_id: {
        type: Number,
        index: true,
        unique: true,
        required: true
    },
    product_details: {
        type: JSON,
        default: {
            serial_no : '',
            features : {
                type: Array,
                default: []
            },
            price: {
                type: Number,
                default: 0,
                required: true
            }
        },
        required: true
    },
    seller_id: {
        type: Number,
        required: true
    },
    product_name: {
        type: String,
        required: true,
        trim: true
    },
    product_type: {
        type: Number,
        require: true,
        unique: false
    },
    sub_category: {
        type: Number,
        require: true
    },
    product_img_link: {
        type: String,
        unique: true
    },
    launch_date : {
        type: Date,
        require: true
    },
    oem_address: {
        type: String,
        require: true
    },
    oem_mobileNo: {
        type: Number,
        require: true
    }
})

const Product = mongoose.model('Product',productSchema);

module.exports = Product;