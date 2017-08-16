$(document).ready(function() {
    $('.slider').slider();
    fCarosel();
});


function fCarosel(){

$("#submitButton").on("click", function(event) {
        event.preventDefault(); //to privent the default action of the button

        var submit = $("#search").val().trim();
        console.log(submit);
        var carousel = $('.carousel');
        carousel.empty();
        carousel.removeClass('initialized');//because carousel creat a class initialized we removed it 
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
            submit + "&api_key=5c281ffd50774151bbfaf5dc85b25558&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(result) {
            console.log(result);
            for (var i = 0; i < 5; i++) {
                // Creating a paragraph tag with the result item's rating
                //var par = $("<p> Rating:" + result.data[i].rating + "</p>");
                // Creating and storing an image tag
                var gifImage = $("<img>");
                gifImage.attr("class", "carousel-item")
                gifImage.attr("src", result.data[i].images.fixed_height.url);

                //$(".carousel-item").append(par);
                carousel.append(gifImage);
                }
            $("#search").val('');
            carousel.carousel();

        });
    });
}
