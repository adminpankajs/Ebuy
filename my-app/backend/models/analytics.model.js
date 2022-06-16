const mongoose= require("mongoose");

const Schema = mongoose.Schema;

const analyticsSchema = new Schema({
    customer_email: {
        type: String,
        required: true
    },
    product_type: {
        type: String,
        required: true,
        trim: true
    },
    purchase_date: {
        type: Number,
        require: true,
        unique: true
    },
    sub_category: {
        type: String
    }
})

const Analytics = mongoose.model('Analytics',analyticsSchema);

module.exports = Analytics;