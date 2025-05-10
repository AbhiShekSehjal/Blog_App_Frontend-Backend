const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    likes: {
        type: Number,
        default: 1
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Likes = mongoose.model("Likes", likeSchema);

module.exports = Likes;