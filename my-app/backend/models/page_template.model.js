const mongoose= require("mongoose");

const Schema = mongoose.Schema;

const pageTemplateNameSchema = new Schema({
    page_template_name: {
        type: String,
        required: true,
        trim: true
    },
    page_link: {
        type: String,
        require: true,
    },
    hit_count: {
        type: Number,
        require: true,
    }
})

const pageTemplateName = mongoose.model('Score',pageTemplateNameSchema);

module.exports = pageTemplateName;