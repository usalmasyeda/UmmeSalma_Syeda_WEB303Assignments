let charactersData; // Store the original characters data

$(document).ready(function () {
  $.ajax({
    type: "get",
    url: "emp.json",
    dataType: 'json',
    success: function (data) {
      charactersData = data; // Store the original characters data
      displayCharacters(data);

      $('#search').on('input', function () {
        highlightRows($(this).val());
      });

      $('#filterAM').on('click', function () {
        filterCharacters('A', 'M');
      });

      $('#filterNZ').on('click', function () {
        filterCharacters('N', 'Z');
      });
    },
    error: function () {
      alert('Failed to retrieve data.');
    }
  });
});

function displayCharacters(characters) {
  $('#charactersTable tbody').empty();
  $.each(characters, function (index, character) {
    $('#charactersTable tbody').append(`
                <tr>
                    <td>${character.firstName}</td>
                    <td>${character.lastName}</td>
                    <td>${character.gender}</td>
                    <td>${character.role}</td>
                    <td>${character.age}</td>
                </tr>
            `);
  });
  // Reset highlighting when displaying characters
  $('#charactersTable tbody tr').removeClass('highlight');
}

function highlightRows(searchTerm) {
  searchTerm = searchTerm.toLowerCase().trim(); // Trim leading and trailing whitespaces
  
  $('#charactersTable tbody tr').each(function () {
    const firstName = $(this).find('td:first').text().toLowerCase();
    
    // Check if the search term is not empty and is included in the first name
    if (searchTerm !== '' && firstName.includes(searchTerm)) {
      $(this).addClass('highlight');
    } else {
      $(this).removeClass('highlight');
    }
  });
}

function filterCharacters(startLetterA, startLetterB) {
  const filteredData = charactersData.filter(function (character) {
    const lastName = character.lastName.charAt(0).toUpperCase();
    return lastName >= startLetterA && lastName <= startLetterB;
  });

  displayCharacters(filteredData);
}