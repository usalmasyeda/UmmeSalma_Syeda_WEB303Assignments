/*
    Assignment 05
*/
$(document).ready(function () {
    class ContentItem {
        constructor(IdNumber, name, description, category) {
            this.IdNumber = IdNumber;
            this.name = name;
            this.description = description;
            this.category = category;
        }

        updateContentItem(IdNumber, name, description, category) {
            if (this.IdNumber === IdNumber && name !== null && description !== null && category !== null) {
                this.name = name;
                this.description = description;
                this.category = category;
            }
        }

        toString() {
            return `
              <div class="content-item-wrapper" id="content-item-${this.IdNumber}">
                <h2>${this.name}</h2>
                <p>${this.description}</p>
                <div>${this.category}</div>
              </div>
            `;
        }
    }

    let contentItems = [
        new ContentItem(0, "To Kill a Mockingbird", "A classic novel by Harper Lee.", "Fiction"),
        new ContentItem(1, "1984", "George Orwell's dystopian masterpiece.", "Science Fiction"),
        new ContentItem(2, "The Great Gatsby", "F. Scott Fitzgerald's iconic work.", "Fiction"),
        new ContentItem(3, "Pride and Prejudice", "Jane Austen's timeless romance.", "Romance"),
        new ContentItem(4, "Moby-Dick", "Herman Melville's epic tale of the sea.", "Adventure"),
    ];

    let $contentItemList = $("#content-item-list");

    contentItems.forEach((item) => {
        let $contentItem = $(item.toString());

        $contentItem.css({
            border: "2px solid #333",
            width: "300px",
            padding: "10px",
            margin: "20px auto",
        });

        $contentItemList.append($contentItem);
    });

    $("#theme-name").text("Famous Books");

    // Add buttons
    let $successfulUpdateButton = $("<button>Successful Update</button>");
    let $unsuccessfulUpdateButton = $("<button>Unsuccessful Update</button>");

    $successfulUpdateButton.click(function () {
        // Attempt to update successfully
        contentItems[0].updateContentItem(0, "New Name", "New Description", "New Category");
        // Update the displayed content item
        $contentItemList.empty(); // Clear the list
        contentItems.forEach((item) => {
            let $contentItem = $(item.toString());
            $contentItem.css({
                border: "2px solid #333",
                width: "300px",
                padding: "10px",
                margin: "20px auto",
            });
            $contentItemList.append($contentItem);
        });
    });

    $unsuccessfulUpdateButton.click(function () {
        // Attempt to update unsuccessfully
        contentItems[0].updateContentItem(1, "New Name", "New Description", "New Category");
        // Update the displayed content item
        $contentItemList.empty(); // Clear the list
        contentItems.forEach((item) => {
            let $contentItem = $(item.toString());
            $contentItem.css({
                border: "2px solid #333",
                width: "300px",
                padding: "10px",
                margin: "20px auto",
            });
            $contentItemList.append($contentItem);
        });
    });

    // Add the buttons to the page
    $("#buttons-container").append($successfulUpdateButton, $unsuccessfulUpdateButton);
});




