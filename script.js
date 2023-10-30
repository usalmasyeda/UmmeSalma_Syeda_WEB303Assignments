
/*Event handler FOR ACCORD #1*/
$('.accord-label1').on('click', function(e){

    // Prevent the button from the default action "submit"
    e.preventDefault();

    // get the button that were clicking
    let $this = $(this);

    // loop for every panel
    $('.accord-panel1').each(function(){
        //make sure that showing class is removed - no panel is removed
        $this.removeClass('showing');
    })

    // show the panel that is for the button we clicked
    $this.toggleClass('showing');
    $this.next().slideToggle();

    // hide other panels
    $('.accord-panel1').not($this.next()).slideUp();
});

/*Event handler FOR ACCORD #2*/

$('.accord-label2').on('click', function(e){

    // Prevent the button from the default action "submit"
    e.preventDefault();

    // get the button that were clicking
    let $this = $(this);

    // loop for every panel
    $('.accord-panel2').each(function(){
        //make sure that showing class is removed - no panel is removed
        $this.removeClass('showing');
    })

    // show the panel that is for the button we clicked
    $this.toggleClass('showing');
    $this.next().slideToggle();

    // hide other panels
    $('.accord-panel2').not($this.next()).slideUp();
});

// TAB PANELS
//hidden all panels
$('.tab-panel').hide();
$('#tab1').show();

$('.tab-list li').on('click', function(e){
    e.preventDefault();

     // remove current active class
    $('.tab-list li').removeClass('active'); 

    // hide current tab panel
    $('.tab-panel').hide();
  
    // add active class to new tab
    $(this).addClass('active');

     // show new tab panel
     let panel = $(this).find('a').attr('href');
     $(panel).show();
     return false;
});