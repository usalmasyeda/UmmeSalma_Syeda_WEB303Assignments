$(document).ready(function(){
json();
//ajax();

})

//Function for $.getJSON request
function json(){
    $.getJSON("team.json", function(method1){
        console.log(method1);
    
        //Appending each data to div #team
        $.each(method1.members, function(index, obj){
           $("#team").append("<h2>" + obj.name + "</h2>");
           $("#team").append("<h5>" + obj.position + "</h5>");
           $("#team").append("<p>" + obj.bio + "</p>");
        });
    });

}

//Function for $.ajax request

function ajax(){
    $.ajax({
        type: "GET",
        url: "team.json",
        dataType: "JSON",

        //To display text before the data is loaded 
        beforeSend: function(){
            $("#team").text("Loading...");
    
        },

        //This will display error if the data is not loaded
        error: function(){
            $("#team").text("Error: Content could not be retrieved");

        },
        
        success: function(method2){
            console.log(method2);
                
                 //Appending each data to div #team
                setTimeout(function() {
                $.each(method2.members, function(index, obj){
                    $("#team").append("<h2>" + obj.name + "</h2>");
                    $("#team").append("<h5>" + obj.position + "</h5>");
                    $("#team").append("<p>" + obj.bio + "</p>");
                });  
        }, 3000);
            
        }
    });  
};



