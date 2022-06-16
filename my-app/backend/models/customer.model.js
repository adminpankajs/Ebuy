const mongoose= require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    customer_email: {
        type: String,
        required: true
    },
    customer_id: {
        type: Number
    },
    customer_password: {
        type: String,
        required: true
    },
    customer_name: {
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
    accessToken: {
        type: String
    }
})

const Customer = mongoose.model('Customer',customerSchema);

module.exports = Customer;