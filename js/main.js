// WEB303 Assignment 2

document.addEventListener("DOMContentLoaded", function () {
    // Function to load content via AJAX
    function loadContent(url) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                // Animate the content div to display the new content
                var contentDiv = document.getElementById("content");
                contentDiv.style.display = "none";
                contentDiv.innerHTML = xhr.responseText;
                contentDiv.style.display = "block";
            } else {
                var contentDiv = document.getElementById("content");
                contentDiv.innerHTML = "Error loading content.";
            }
        };

        xhr.onerror = function () {
            var contentDiv = document.getElementById("content");
            contentDiv.innerHTML = "Error loading content.";
        };

        xhr.send();
    }

    // Event handler for clicking on the links
    document.getElementById("prospect").addEventListener("click", function (e) {
        e.preventDefault();
        loadContent("prospect.html");
    });

    document.getElementById("convert").addEventListener("click", function (e) {
        e.preventDefault();
        loadContent("convert.html");
    });

    document.getElementById("retain").addEventListener("click", function (e) {
        e.preventDefault();
        loadContent("retain.html");
    });
});