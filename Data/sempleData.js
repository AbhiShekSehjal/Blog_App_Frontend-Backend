const users = [
    {
        username: "john_doe",
        profilePic: "https://static.vecteezy.com/system/resources/previews/036/442/773/non_2x/ai-generated-portrait-of-a-young-japanese-man-no-facial-expression-half-body-shot-facing-the-camera-isolated-white-background-ai-generative-free-photo.jpg"
    },
    {
        username: "jane_smith",
        profilePic: "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
    }
]

const allBlogs = [
    {
        title: "Understanding JavaScript Closures",
        content: "A closure is the combination of a function and the lexical environment within which that function was declared...",
        coverImage: "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2017/11/how-to-write-a-blog-post.jpeg",
        category: "JavaScript",
        likes: 25,
        comments: ["wow", "wounderful"]
    },
    {
        title: "CSS Grid vs Flexbox",
        content: "Both CSS Grid and Flexbox are powerful layout systems in CSS. Here's how to choose the right one...",
        coverImage: "https://cookieandkate.com/images/2020/03/how-to-start-a-food-blog.jpg",
        category: "CSS",
        likes: 18,
        comments: []
    },
]

const comments = [
    {
        userId: "jhon doe",
        text: "Great explanation! Really helped me understand closures.",
    },
    {
        userId: "Bill gates",
        text: "Thanks for the feedback!",
    }
]

module.exports = {
    allBlogsData: allBlogs,
    usersData: users,
    commentsData: comments
};