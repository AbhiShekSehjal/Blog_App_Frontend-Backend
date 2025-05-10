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
        type: String,
        default: "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
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