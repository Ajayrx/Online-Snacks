// Function to get the user's current location using GPS
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                let apiKey = 'pk.d296c91deaa0f1dcafbdfb79772dca60';
                let url = `https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${lat}&lon=${lon}&format=json`;

                try {
                    let response = await fetch(url);
                    let data = await response.json();
                    document.getElementById("location-input").value = data.display_name; 
                } catch (error) {
                    console.error("Error fetching location data:", error);
                }
            },
            (error) => {
                console.error("Geolocation error:", error);
                alert("Location access denied or unavailable.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to fetch location suggestions as the user types
async function fetchLocationSuggestions() {
    let input = document.getElementById("location-input").value;
    if (input.length < 3) return; // Only fetch if at least 3 characters

    let apiKey = 'pk.d296c91deaa0f1dcafbdfb79772dca60';
    let url = `https://us1.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${input}&format=json`;

    try {
        let response = await fetch(url);
        let suggestions = await response.json();
        
        let dropdown = document.getElementById("location-suggestions");
        dropdown.innerHTML = ""; // Clear old suggestions

        suggestions.forEach((place) => {
            let listItem = document.createElement("li");
            listItem.textContent = place.display_name;
            listItem.onclick = function () {
                document.getElementById("location-input").value = place.display_name;
                dropdown.innerHTML = ""; // Hide suggestions after selection
            };
            dropdown.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
    }
}
function toggleDropdown(show) {
    let dropdown = document.getElementById("location-suggestions");
    if (show) {
        dropdown.classList.add("active");
    } else {
        dropdown.classList.remove("active");
    }
}
