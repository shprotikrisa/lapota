document.querySelector("#add").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "flex";
});
document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none";
});

document.querySelector("#add-ad-form").addEventListener("submit", (e) => {
    e.preventDefault();
    fetch("/add", {
        method: "POST",
        body: new FormData(e.target)
    }).then(() => {
        location.reload();
    })
})