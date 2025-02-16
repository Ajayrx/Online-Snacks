document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.querySelector(".search-bar button");
    const searchInput = document.querySelector(".search-bar input");

    searchBtn.addEventListener("click", () => {
        let query = searchInput.value.trim();
        if (query !== "") {
            alert(`Searching for: ${query}`);
        } else {
            alert("Please enter a snack name to search.");
        }
    });
});
