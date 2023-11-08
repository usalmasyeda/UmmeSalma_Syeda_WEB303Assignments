(function ($) {
    $.fn.photoViewer = function () {
      return this.each(function () {
        var $photoBox = $(this);
  
        // Click event to open modal when photo box is clicked
        $photoBox.click(function (e) {
          e.preventDefault();
          var fullImage = $photoBox.find('img').attr('src');
          $('#modal-image').attr('src', fullImage);
          $('#modal').show();
        });
      });
    };
  });
  