
 var submit1;
  $(function () {
      $("form").on("submit", function(e) {
          e.preventDefault();
          
          console.log(submit1)
          displayImages();
  
      });
   
  });

function displayImages(){
  var submit1 = $("#idtsearch").val();
     console.log(submit1)
//var settings = 
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
 $("#imagessView").empty();
for (var i = 0; i < 5; i++) {
        var results = response.data[i];
        console.log(results);
console.log(results.link);

var imageDiv = $("<div />");
imageDiv.addClass("imageDiv");
var title = results.title;
console.log(title)
console.log(results.link)
var personImage = $("<img>");
personImage.attr("src",results.images[i].link)
personImage.addClass("img");
var imagecap = $("<div />").text("");
imageDiv.append(personImage);
$("#imageResults").append(personImage);


}

        });
    };



displayImages();

