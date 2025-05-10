const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentsSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    text: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Comments = mongoose.model("Comments", commentsSchema);

module.exports = Comments;