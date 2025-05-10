const mongoose = require("mongoose");
const { Schema } = mongoose;

const allBlogsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    title: {
        type: String,
    },

    content: {
        type: String,
    },

    coverImage: {
        url: String,
        filename: String,
    },

    category: {
        type: String,
        default: "Any"
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Likes"
        }
    ],

    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comments"
        }
    ]
});

const AllBlogs = mongoose.model("AllBlogs", allBlogsSchema);

module.exports = AllBlogs; 