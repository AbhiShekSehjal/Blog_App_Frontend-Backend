const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const usersSchema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },


    profilePic: {
        url: String,
        filename: String,
    },

    gender: {
        type: String
    },

    bio: {
        type: String
    },
    dob: {
        type: Date
    },

    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    following: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
});

usersSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", usersSchema);

module.exports = User;