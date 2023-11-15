// add a table to the page 
let $table = $('<table/>');
// add to the body of document
$('body').append($table);

// add a title for the table before table 

$('table').before('<h1/>');
$('h1').text('Umme Salma Syeda - The BlackList');

// add a thead and tbody on the table 
$('table').append('<thead/>');
$('table').append('<tbody/>');
$('table').addClass('tbl');

//create the heading row
let $headingRow = $('<tr/>').addClass('headingRow');
// add this row to thead
$('thead').append($headingRow);
$headingRow.append($('<td/>').text('firstName'));
$headingRow.append($('<td/>').text('lastName'));
$headingRow.append($('<td/>').text('gender'));
$headingRow.append($('<td/>').text('role'));
$headingRow.append($('<td/>').text('age'));

// create an input box before table

$('h1').after('<input/>');
$('input').attr('id', 'search');

// Add two filter buttons
$('table').after('<button id="filterAM">A - M (0)</button>');
$('table').after('<button id="filterNZ">N - Z (0)</button>');

// get content of json file 

$.ajax({
    type: "get",
    url: "emp.json",
    error: function(){
        $('.tbl').empty().append('<h1> Content can not be retrieved</h1>');
    },
    success: function(response){
        //loop through response received
        $.each(response, function(index, value){
            // create row
            let $row = $('<tr/>').addClass('row');
            // add td to the row
            $row.append($('<td id="char"></td>').text(value.firstName));
            $row.append($('<td></td>').text(value.lastName));
            $row.append($('<td></td>').text(value.gender));
            $row.append($('<td></td>').text(value.role));
            $row.append($('<td></td>').text(value.age));

            // add rows to table 
            $('tbody').append($row);
        });
        // Start SEArching by character
        // lets add an id = char to that cell 

        let $firstName = $('tbody #char');
        let $search = $('#search');
        // create the cache array - element and text
        let cache = [];
        let trr = $('tr');

        $firstName.each(function(){
            cache.push({
                element: this,
                text: this.textContent.trim().toLowerCase()
            });
        });
        console.log(cache);
        // search function
        function searchfirstName(){
            let query = this.value.trim().toLowerCase();
            cache.forEach(function(firstName){
                let index=0;
                if(query){
                    index = firstName.text.indexOf(query);
                }
                firstName.element.style.background = index === -1 ? 'darkgreen' : 'white';
                // firstName.element.style.color = index === -1 ? 'black' : 'white';
                if($(search).val() == " "){
                    firstName.element.style.color = 'black';
                    firstName.element.style.background = 'darkgreen'
                }

            });

        }
       if('oninput' in $search[0]){
           $search.on('input', searchfirstName);
        }else{
            $search.on('input', searchfirstName);
        }

        // Filer only students 
        // add a button

        $('#filterAM').on('click', function(){
          // Filter by last name starting with A-M
          let countAM = 0;
          $('tbody tr').find('td:nth-child(2)').filter(function(){
              let lastName = $(this).text();
              if (lastName >= 'A' && lastName <= 'M') {
                  countAM++;
                  $(this).parent().show();
              } else {
                  $(this).parent().hide();
              }
          })

          $('#filterNZ').on('click', function(){
          // Filter by last name starting with N-Z
          let countNZ = 0;
          $('tbody tr').find('td:nth-child(2)').filter(function(){
              let lastName = $(this).text();
              if (lastName >= 'N' && lastName <= 'Z') {
                  countNZ++;
                  $(this).parent().show();
              } else {
                  $(this).parent().hide();
              }
            })
          })
      });
    }
})

