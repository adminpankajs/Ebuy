const mongoose= require("mongoose");

const Schema = mongoose.Schema;

const orderPaymentSchema = new Schema({
    payment_id: {
        type: String,
        required: true
    },
    order_id: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true,
        trim: true
    },
    payment_secure_key: {
        type: Number,
        require: true,
        unique: true
    },
    oem: {
        type: String
    },
    mobileNo: {
        type: Number,
        require: true
    }
})

const Payment = mongoose.model('Payment',orderPaymentSchema);

module.exports = Payment;