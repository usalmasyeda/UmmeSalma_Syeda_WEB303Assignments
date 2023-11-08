document.addEventListener("DOMContentLoaded", function () {
    const photoBox = document.querySelector("#photo-viewer .photo-box img");
    const displayedImage = document.getElementById("displayed-image");
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const closeModalButton = document.getElementById("close-modal");
    const thumbnails = document.querySelectorAll("#thumbnails .thumbnail-anchor");

    thumbnails.forEach(function (thumbnail) {
        thumbnail.addEventListener("click", function (event) {
            event.preventDefault();
            photoBox.src = event.currentTarget.href;
            displayedImage.src = event.currentTarget.href;

            // Remove the "active" class from all thumbnails
            thumbnails.forEach(function (thumb) {
                thumb.classList.remove("active");
            });

            // Add the "active" class to the clicked thumbnail
            event.currentTarget.classList.add("active");
        });
    });

    photoBox.addEventListener("click", function (event) {
        event.preventDefault();
        modal.style.display = "block";
        modalImage.src = displayedImage.src;
    });

    closeModalButton.addEventListener("click", function () {
        modal.style.display = "none";
    });
});
