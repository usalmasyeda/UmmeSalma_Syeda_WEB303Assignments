/*
    Assignment #4
    Umme Salma Syeda
*/

$(function () {
    // Check if geolocation is supported
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(success, fail);
    } else {
        $("#locationhere").html("<h1>Geolocation is not supported in your browser</h1>");
    }

    // Callback function when geolocation is successful
    function success(pos) {
        // Extract latitude and longitude from the position object
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const accuracy = pos.coords.accuracy;

        // Display latitude, longitude, and accuracy
        $("#locationhere").html("<p>Your Latitude is: " + lat + "</p>");
        $("#locationhere").append("<p>Your Longitude is: " + lon + "</p>");
        $("#locationhere").append("<p>Accuracy: " + accuracy + " meters</p>");

        // Create a link to open a map with the current location
        const mapLink = `<a href="https://www.openstreetmap.org/#map=18/${lat}/${lon}" target="_blank">Map is here</a>`;
        $("#locationhere").append(mapLink);

        // Check if there's a stored location in localStorage
        const storedLat = localStorage.getItem("Latitude");
        const storedLon = localStorage.getItem("Longitude");

        if (storedLat && storedLon) {
            const distance = calcDistanceBetweenPoints(lat, lon, parseFloat(storedLat), parseFloat(storedLon)) / 1000; // Convert meters to kilometers
            $("#locationhere").append("<h2>Welcome back to the page!</h2>");
            $("#locationhere").append("<p>You traveled " + distance.toFixed(2) + " km since your last visit.</p>");
        } else {
            $("#locationhere").append("<h2>Welcome to the page for the first time!</h2>");
        }

        // Store the current location in localStorage
        localStorage.setItem("Longitude", lon);
        localStorage.setItem("Latitude", lat);
    }

    // Callback function when geolocation fails
    function fail(error) {
        $("#locationhere").html("<h1>We cannot get the location: " + error.message + "</h1>");
    }

    // DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINTION
    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        var toRadians = function (num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2 - lat1);
        var Δλ = toRadians(lon2 - lon1);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (R * c);
    }
});


