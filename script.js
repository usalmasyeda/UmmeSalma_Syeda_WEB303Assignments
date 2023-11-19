// Add a table to the page
let $table = $('<table/>');
// Add to the body of the document
$('body').append($table);

// Add a title for the table before the table
$('table').before('<h1/>');
$('h1').text('Sorting Employees tables');

// Add thead and tbody to the table
$('table').append('<thead/>');
$('table').append('<tbody/>');
$('table').addClass('sortable'); // Changed from 'tbl' to 'sortable'

// Create the heading row
let $headingRow = $('<tr/>').addClass('headingRow');
// Add this row to the thead
$('thead').append($headingRow);
$headingRow.append($('<th/>').html('<a data-sort="name">First Name</a>'));
$headingRow.append($('<th/>').html('<a data-sort="name">Last Name</a>'));
$headingRow.append($('<th/>').html('<a data-sort="name">Gender</a>'));
$headingRow.append($('<th/>').html('<a data-sort="name">Role</a>'));
$headingRow.append($('<th/>').html('<a data-sort="name">Age</a>'));
$headingRow.append($('<th/>').html('<a data-sort="date">Birth Date</a>'));

// Uncomment these lines to create an input box before the table
// $('h1').after('<input/>');
// $('input').attr('id', 'search');

// Uncomment this line to add a button after the table
// $('table').after('<button id="btn"> Students </button>')

// Get content from the JSON file
$.ajax({
    type: "get",
    url: "emp.json",
    error: function () {
        $('.sortable').empty().append('<h1> Content can not be retrieved</h1>');
    },
    success: function (response) {
        // Loop through the response received
        $.each(response, function (index, value) {
            // Create a row
            let $row = $('<tr/>').addClass('row');
            // Add td to the row
            $row.append($('<td></td>').text(value.firstName));
            $row.append($('<td></td>').text(value.lastName));
            $row.append($('<td></td>').text(value.gender));
            $row.append($('<td></td>').text(value.role)); // Made changes here
            $row.append($('<td></td>').text(value.age));
            $row.append($('<td></td>').text(value.birthdate));

            // Add rows to the table
            $('tbody').append($row);
        });

        // Sorting code starts here

        var compare = {
            name: function (a, b) {
                a = a.replace(/^the /i, '');
                b = b.replace(/^the /i, '');

                if (a < b) {
                    return -1;
                } else {
                    return a > b ? 1 : 0;
                }
            },
            duration: function (a, b) {
                a = a.split('-');
                b = b.split('-');

                return a - b;
            },
            date: function (a, b) {
                a = new Date(a);
                b = new Date(b);

                return a - b;
            }
        };

        $('.sortable').each(function () {
            var $table = $(this);
            var $tbody = $table.find('tbody');
            var $controls = $table.find('th a');
            var rows = $tbody.find('tr').toArray();
            var originalOrder = rows.slice(0);
            // copy/clone the array that is existing now
            const deepCopy = [...rows];

            $controls.on('click', function () {
                var $header = $(this);
                var order = $header.data('sort');
                var column;

                // Wrap the text of each heading in an anchor tag
                $controls.each(function (index, element) {
                    $(element).html('<a href="#">' + $(element).text() + '</a>');
                });

                // If selected item has ascending or descending class, reverse contents
                if ($header.is('.ascending')) {
                    $header.removeClass('ascending no-sort');
                    $header.addClass('descending');

                } else if ($header.is('.descending')) {
                    $header.removeClass('descending ascending');
                    $header.addClass('no-sort');
                    $tbody.append(deepCopy);

                } else {
                    $header.addClass('ascending');
                    $header.removeClass('no-sort');
                    // Remove asc or desc from all other headers
                    $header.siblings().removeClass('ascending descending no-sort');

                    if (compare.hasOwnProperty(order)) {
                        column = $controls.index(this);
                        rows.sort(function (a, b) {
                            a = $(a).find('td').eq(column).text();
                            b = $(b).find('td').eq(column).text();
                            console.log('a: ', a, '   b: ', b)
                            return compare[order](a, b);
                        });

                        // Reset to the original order if clicked a third time
                        if ($header.is('.reset')) {
                            rows = originalOrder.slice(0);
                            $controls.removeClass('ascending descending reset');
                        }
                        $tbody.append(rows);
                    }
                }
            });
        });

    }
});
