const apiKey = "_prPxWW9H3fJS9ofyOLu6jT3CfLKNIW2d0Lx9D85p0Y"; // Replace with your actual HERE API key

async function fetchLocationSuggestions() {
    let query = document.getElementById("location-input").value;
    if (query.length < 2) return; // Avoid too many API calls

    let url = `https://autosuggest.search.hereapi.com/v1/autosuggest?at=37.7749,-122.4194&limit=5&q=${query}&apiKey=${apiKey}`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        showSuggestions(data.items);
    } catch (error) {
        console.error("Error fetching location suggestions:", error);
    }
}

function showSuggestions(suggestions) {
    let suggestionsList = document.getElementById("suggestions");
    suggestionsList.innerHTML = ""; // Clear previous results

    suggestions.forEach((item) => {
        let li = document.createElement("li");
        li.textContent = item.title;
        li.onclick = () => selectLocation(item.title);
        suggestionsList.appendChild(li);
    });
}

function selectLocation(location) {
    document.getElementById("location-input").value = location;
    document.getElementById("suggestions").innerHTML = "";
}
