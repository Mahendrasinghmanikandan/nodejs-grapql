const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
        authorName: {
                type: String,
                require: true
        },
        article: {
                type: String,
                require: true,
        },
        authorId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
        }
}, { timestamps: true });



module.exports = mongoose.model('article', articleSchema);