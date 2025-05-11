let followersCount = document.getElementById("followers-count");
let followersList = document.getElementById("followersList");

let followingCount = document.getElementById("following-count");
let followingList = document.getElementById("followingList");

let profilePic = document.getElementById("profile-pic");


followersCount.addEventListener("click", () => {
    followersList.style.display = (followersList.style.display === "none") ? "flex" : "none";
    if (followersList.style.display = "flex") {
        followingList.style.display = "none";
    }
})

window.addEventListener("scroll", () => {
    followersList.style.display = "none";
    followingList.style.display = "none";
    profilePic.style.height = "120px";
    profilePic.style.width = "120px";
});

followingCount.addEventListener("click", () => {
    followingList.style.display = (followingList.style.display === "none") ? "flex" : "none";
    if (followingList.style.display = "flex") {
        followersList.style.display = "none";
    }
})



profilePic.addEventListener("click", () => {

    profilePic.style.width = (profilePic.style.width === "120px") ? "280px" : "120px";
    profilePic.style.height = (profilePic.style.height === "120px") ? "280px" : "120px";
})
