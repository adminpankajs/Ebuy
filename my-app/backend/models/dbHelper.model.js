const mongoose= require("mongoose");

const Schema = mongoose.Schema;

const dbHelperSchema = new Schema({
    product_counter: {
        type: Number,
        default: 0
    }
})

const DbHelper = mongoose.model('DbHelper',dbHelperSchema);

module.exports = DbHelper;