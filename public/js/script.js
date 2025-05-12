let followersCount = document.querySelector("#followers-count");
let followersList = document.querySelector("#followersList");

let followingCount = document.querySelector("#following-count");
let followingList = document.querySelector("#followingList");

let profilePic = document.querySelector("#profile-pic");

let showBlogPageBlogContent = document.querySelector(".showBlogPageBlogContent");
let showMoreContent = document.querySelector("#showMoreContent");

if (followersCount) {
    followersCount.addEventListener("click", () => {
        followersList.style.display = (followersList.style.display === "none") ? "flex" : "none";
        if (followersList.style.display = "flex") {
            followingList.style.display = "none";
        }
    })
}

if (followersList || followingList || profilePic) {
    window.addEventListener("scroll", () => {
        followersList.style.display = "none";
        followingList.style.display = "none";
        profilePic.style.height = "120px";
        profilePic.style.width = "120px";
    });
}

if (followingCount) {
    followingCount.addEventListener("click", () => {
        followingList.style.display = (followingList.style.display === "none") ? "flex" : "none";
        if (followingList.style.display = "flex") {
            followersList.style.display = "none";
        }
    })
}


if (profilePic) {
    profilePic.addEventListener("click", () => {

        profilePic.style.width = (profilePic.style.width === "120px") ? "280px" : "120px";
        profilePic.style.height = (profilePic.style.height === "120px") ? "280px" : "120px";
    })
}

if (showMoreContent) {
    showMoreContent.addEventListener("click", () => {
        showBlogPageBlogContent.style.height = (showBlogPageBlogContent.style.height === "200px") ? "fit-content" : "200px";
    });
}