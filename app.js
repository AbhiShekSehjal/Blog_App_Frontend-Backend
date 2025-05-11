const express = require("express");
const engine = require("ejs-mate");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const localStatergy = require("passport-local");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo");

if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const { storage } = require("./cloudConfig")
const multer = require("multer");
const upload = multer({ storage: storage });

const AllBlogs = require("./Models/allBlogs");
const Comments = require("./Models/comments");
const Users = require("./Models/users");
const Likes = require("./Models/likes");
const path = require("path");
const User = require("./Models/users");
const app = express();
const port = 3000;

// const DBURL = process.env.MONGO_URL;

app.engine("ejs", engine);

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/Views"));

app.use(session({
    secret: process.env.SECRET_CODE,
    resave: true,
    saveUninitialized: true,

    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        collectionName: "sessions"
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStatergy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next()
})

main().then((res) => {
    console.log("Database connection successfully!");
}).catch((err) => {
    console.log("Database connection failed!", err);
})

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

// home page route
app.get("/", (req, res) => {
    res.render("./pages/home.ejs")
})

// allBlogs routes
app.get("/allBlogs", async (req, res) => {
    try {
        let AllBlogsData = await AllBlogs.find({});

        res.render("./pages/allBlogs.ejs", { AllBlogsData: AllBlogsData });

    } catch (err) {
        res.status(500).send("Error from fatching Data");
    }
})

// create blog route (get request)
app.get("/createBlog", (req, res) => {
    if (req.user) {
        res.render("./pages/createBlog.ejs")
    } else {
        res.render("./pages/redirectToLogin.ejs")
    }
})

// create blog route (post request)
app.post("/allBlogs", upload.single("coverImage"), async (req, res) => {

    let { title, content, category } = req.body;

    let url = req.file.path;

    let filename = req.file.filename;

    let newBlog = new AllBlogs({
        user: req.user._id,
        title: title,
        content: content,
        category: category,
    })
    newBlog.coverImage = { url, filename };

    await newBlog.save().then((result) => {
        console.log(result);
    }).catch((err) => {
        res.status(400).send("error : ", err)
    });

    // console.log(newBlog);

    res.redirect("/allBlogs");
});

// show blog 
app.get("/showBlog/:id", async (req, res) => {
    let { id } = req.params;
    if (req.user) {
        let findBlog = await AllBlogs.findById(id).populate({ path: "comments", populate: { path: "from" } })
            .populate("user")
            .populate({ path: "likes", populate: { path: "from" } });
        let allBlogs = await AllBlogs.find();

        res.render("./pages/showBlog.ejs", { findBlog, allBlogs })
    } else {
        res.render("./pages/redirectToLogin.ejs")
    }
})

// destroy blog route (delete request)
app.delete("/deleteBlog/:id", async (req, res) => {
    let { id } = req.params;

    await AllBlogs.findByIdAndDelete(id);

    res.redirect("/allBlogs")
})

// edit blog route (get request)
app.get("/editBlog/:id", async (req, res) => {
    let { id } = req.params;
    let findBlog = await AllBlogs.findById(id);
    res.render("./pages/editBlog.ejs", { findBlog })
});

// update blog route (patch request)
app.patch("/showBlog/:id", upload.single("coverImage"), async (req, res) => {
    let { title, content, category } = req.body;

    let { id } = req.params;

    let url = req.file.path;

    let filename = req.file.filename;

    const updateInfo = {
        title: title,
        content: content,
        category: category,
        coverImage: { url, filename }
    }

    let updatedBlog = await AllBlogs.findByIdAndUpdate(id, updateInfo, { new: true, runValidators: true });
    console.log(updatedBlog);

    res.redirect(`/showBlog/${id}`)
})

// signUp page
app.get("/signUp", (req, res) => {
    res.render("./pages/signUp.ejs")
});

//signUp page (post request)
app.post("/signUp", async (req, res) => {
    let { username, email, password } = req.body;
    let newUser = new Users({ username, email });
    let registeredUser = await User.register(newUser, password);

    req.logIn(registeredUser, (err) => {
        if (err) {
            console.log("signUp failed : ", err);
            req.flash("error", err.message);
        } else {
            req.flash("success", "Welcome to Art Blogs!");
            res.render("./pages/userInfoSave.ejs", { registeredUser })
        }
    })
});

// login page
app.get("/login", (req, res) => {
    res.render("./pages/login.ejs", { error: req.flash("error") })
});

// login page(post request)
app.post("/login", async (req, res, next) => {

    passport.authenticate("local", (err, user, info) => {

        if (!user) {
            req.flash("error", "Invalid username or password.");
            console.log("Invalid username or password.", user);
            // console.log(currentUser);

            return res.redirect("/login");
        }

        req.logIn(user, (err) => {
            if (err) return next(err);
            req.flash("success", `Welcome back ${user.email} on Art Blogs!`);
            // console.log(user);
            return res.redirect("/allBlogs");
        });
    })(req, res, next);
});

// logOut route
app.get("/logout", (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err)
        }
        req.flash("success", "Logout successfuly!");
        res.redirect("/allBlogs")
    })
});

// user profile route (get request)
app.get("/user/:id", async (req, res) => {

    let { id } = req.params;

    let user = await Users.findById(id).populate("followers").populate("following");

    res.render("./pages/userPage.ejs", { user })
})

// completeProfile route
app.post("/completeProfile/:id", upload.single("profilePic"), async (req, res) => {
    try {

        let { id } = req.params;
        let { gender, bio, dob } = req.body;
        let url = req.file.path;

        let filename = req.file.filename;

        let updatedUser = {
            gender: gender,
            bio: bio,
            dob: dob,
            profilePic: { url, filename }
        }

        let user = await Users.findByIdAndUpdate(id, updatedUser, { new: true, runValidators: true });

        console.log(user);

        res.redirect("/allBlogs");
    } catch (err) {
        console.error(err);
        res.status(500).send('completeProfile error');
    }

})

// /follow user route
app.post("/follow/:id", async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const targetUserId = req.params.id;

        if (currentUserId.toString() === targetUserId) {
            return res.status(400).send("You can't follow yourself");
        }

        const currentUser = await User.findById(currentUserId);
        const targetUser = await User.findById(targetUserId);

        if (!targetUser.followers.includes(currentUserId)) {
            targetUser.followers.push(currentUserId);
            currentUser.following.push(targetUserId);

            await targetUser.save();
            await currentUser.save();
        }

        res.redirect(`/user/${req.params.id}`);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// add comment
app.post("/findBlog/:id/comment", async (req, res) => {
    try {
        let { id } = req.params;
        let { comments } = req.body;

        if (comments !== "") {
            const newComment = new Comments({
                from: req.user._id,
                text: comments
            });

            await newComment.save();

            const blog = await AllBlogs.findById(id);
            blog.comments.push(newComment._id);
            await blog.save();

            res.redirect(`/showBlog/${id}`);
        }
        else {
            res.redirect(`/showBlog/${id}`);
        }

    } catch (err) {
        console.log("Error adding comment:", err);
        res.status(500).send("Failed to add comment.");
    }
});

// like btn route
app.post("/findBlog/:id/like", async (req, res) => {
    try {
        let { id } = req.params;

        const newLike = new Likes({
            from: req.user._id,
        });

        await newLike.save();

        const blog = await AllBlogs.findById(id);
        blog.likes.push(newLike._id);
        await blog.save();

        console.log("Like ----- ", blog);

        res.redirect(`/showBlog/${id}`);
    } catch (err) {
        console.log("Error adding comment:", err);
        res.status(500).send("Failed to add like.");
    }
})

// 404 handler (should be the last middleware)
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

app.listen(port, () => {
    console.log("Server is listening at port : ", port);
})