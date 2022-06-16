const mongoose= require("mongoose");

const Schema = mongoose.Schema;

const sellerSchema = new Schema({
    seller_email: {
        type: String,
        required: true
    },
    seller_password: {
        type: String,
        required: true
    },
    seller_name: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String
    },
    dateOfBirth : {
        type: Date,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    mobileNo: {
        type: Number,
        require: true
    },
    accessToken : {
        type: String,
        unique: true
    }
})

const Seller = mongoose.model('Seller',sellerSchema);

module.exports = Seller;