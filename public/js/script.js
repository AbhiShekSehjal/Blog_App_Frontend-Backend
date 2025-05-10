let followersCount = document.getElementById("followers-count");
let followersList = document.getElementById("followersList");

let followingCount = document.getElementById("following-count");
let followingList = document.getElementById("followingList");

let likesCount = document.getElementById("likes-count");
let likesList = document.getElementById("likesList");

followersCount.addEventListener("click", () => {
    followersList.style.display = (followersList.style.display === "none") ? "flex" : "none";
    if (followersList.style.display = "flex") {
        followingList.style.display = "none";
    }
})

window.addEventListener("scroll", () => {
    followersList.style.display = "none";
    followingList.style.display = "none";
});

followingCount.addEventListener("click", () => {
    followingList.style.display = (followingList.style.display === "none") ? "flex" : "none";
    if (followingList.style.display = "flex") {
        followersList.style.display = "none";
    }
})


let profilePic = document.getElementById("profile-pic");

profilePic.addEventListener("click", () => {

    profilePic.style.width = (profilePic.style.width === "120px") ? "400px" : "120px";
    profilePic.style.height = (profilePic.style.height === "120px") ? "400px" : "120px";

    // if (profilePic.style.width === "120px" || profilePic.style.height === "120px") {
    //     profilePic.style.width = "400px";
    //     profilePic.style.height = "400px";
    // }

    // if (profilePic.style.width === "400px" || profilePic.style.height === "400px") {
    //     profilePic.addEventListener("click", () => {
    //         profilePic.style.width = "120px";
    //         profilePic.style.height = "120px";
    //     })
    // }
})
