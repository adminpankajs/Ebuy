const mongoose= require("mongoose");

const Schema = mongoose.Schema;

const orderDetailsSchema = new Schema({
    customer_id: {
        type: Number,
        required: true,
    },
    product_id: {
        type: Number,
        required: true,
    },
    is_payed: {
        type: Boolean,
        required: true
    },
    payment_id: {
        type:  Number,
        default: null
    }
})

const Order = mongoose.model('Order',orderDetailsSchema);

module.exports = Order;