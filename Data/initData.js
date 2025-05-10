const mongoose = require("mongoose");
const initData = require("./sempleData");
const Blogs = require("../Models/allBlogs");
const Users = require("../Models/users");
const Comments = require("../Models/comments");

main().then((res) => {
    console.log("Database connection successfully!");
}).catch((err) => {
    console.log("Database connection failed!", err);
})

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/BlogApp');
}

async function insertData() {
    await Blogs.deleteMany({});
    await Users.deleteMany({});
    await Comments.deleteMany({});

    initData.allBlogsData = initData.allBlogsData.map((obj) => ({ ...obj, user: "68173016c2d1cf397ab7b405" }))

    let insertBlogs = await Blogs.insertMany(initData.allBlogsData);
    // let insertUsers = await Users.insertMany(initData.usersData);
    // let insertComments = await Comments.insertMany(initData.commentsData);

    console.log("Blogs Data ------", insertBlogs);
    // console.log("users Data ------", insertUsers);
    // console.log("comments Data ------", insertComments);

    mongoose.connection.close();
}

insertData();