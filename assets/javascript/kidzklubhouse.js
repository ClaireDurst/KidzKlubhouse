$(document).ready(function() {

    $('.slider').slider({
      height: 350
    });
    
});

function fCarousel(){
  //$("#submitButton").on("click", function(event) {
  //      event.preventDefault(); //to privent the default action of the button
        var submit = $("#search").val().trim();
        console.log(submit);
        var gifDiv = $("<div />");
        gifDiv.addClass("carousel");
        $("#gifResults").append(gifDiv);
        var carousel = $('.carousel');
        carousel.empty();
        carousel.removeClass('initialized');//because carousel creat a class initialized we removed it 
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            submit + "&api_key=5c281ffd50774151bbfaf5dc85b25558&limit=10&rating=g";
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
            //$("#search").val('');
            carousel.carousel();
        });
  //  });
};



function displayImages(){
  //var submit1;
  var submit1 = $("#search").val();
  console.log(submit1)
  $.ajax({
    async: true,
    crossDomain: true,
    url: "https://api.imgur.com/3/gallery/search/?q=" + submit1 + "", 
    method: "GET",
    headers: {
      authorization: "Client-ID f68be402270b032"
    }
  }).done(function(response) {
    console.log(response);
    //$("#imagessView").empty();
    for (var i = 0; i < 5; i++) {
      var results = response.data[i];
      console.log(results);
      console.log(results.link);
      var imageDiv = $("<div />");
      //imageDiv.addClass("imageDiv");
      //var title = results.title;
      //console.log(title)
      var personImage = $("<img>");
      personImage.attr("src",results.images[i].link)
      //personImage.addClass("img");
      //var imagecap = $("<div />").text(""); 
      imageDiv.append(personImage);
      $("#imageResults").append(personImage);
    }
  });
};
