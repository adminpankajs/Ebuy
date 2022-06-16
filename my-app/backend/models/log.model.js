const mongoose= require("mongoose");

const Schema = mongoose.Schema;

const logsSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    login_time: {
        type: Date,
        require: true,
    },
    session_id: {
        type: Number,
        require: true,
    }
})

const Log = mongoose.model('Log',logsSchema);

module.exports = Log;