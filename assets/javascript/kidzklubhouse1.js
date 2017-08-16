
	$(function () {
    	$("form").on("submit", function(e) {
       		e.preventDefault();
	       	// prepare the request
    	   	fvideos();
    	   	fgifs();
    	});
	});

function fvideos() {
	$("#videoResults").empty();
	var request = gapi.client.youtube.search.list({
    part: "snippet",
       	type: "video",
       	q: encodeURIComponent($("#idtsearch").val()).replace(/%20/g, "+"),
       	maxResults: 4,
       	order: "viewCount",
       	safeSearch: "strict"
    }); 
    // execute the request
    request.execute(function(response) {
    	console.log(response);
		var results = response.result;
   		$("#videoResults").html("");
   		$.each(results.items, function(index, item) {
   			$.get("assets/item.html", function(data) {
   	   			$("#videoResults").append(vdoin(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
    		});
    	});
    });	
}

function fgifs() {
	$("#gifResults").empty();
    // retrieve the value of the search input
    var person = encodeURIComponent($("#idtsearch").val()).replace(/%20/g, "+");
    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=dc6zaTOxFJmzC&limit=4";
    // Performing our AJAX GET request
    $.ajax({
    	url: queryURL,
    	method: "GET"
    })
    // After the data comes back from the API
    .done(function(response) {
    	// Storing an array of results in the results variable
        var results = response.data;
        console.log(response)
        // Looping over every result item
        for (var i = 0; i < results.length; i++) {
        	// Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "gallery"
              var gifDiv = $("<div />");
              gifDiv.addClass("gallery");
              // Storing the result item's rating
              var rating = results[i].rating;
              // Creating an image tag
              var personImage = $("<img>");
              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height_still.url);
              // give a data still value
              personImage.attr("data-still",results[i].images.fixed_height_still.url);
              // give a data animate value
              personImage.attr("data-animate",results[i].images.fixed_height.url);
              // give the data state value
              personImage.attr("data-state","still");
              // give the image a data class
              personImage.addClass("gif");
              //giving the images a specific size
              personImage.addClass("imagesize responsive-img");
              //creating a div for displaying the rating
              //var gifcap = $("<div />").text("Rating: " + rating);
              var gifcap = $("<div />").text("");
              //adding color and centering the text
              //gifcap.addClass("atcenter");
              //appending the image and the text
              gifDiv.append(personImage);
              gifDiv.append(gifcap);
              // appending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifResults").append(gifDiv);
            }
        }
		$(".gif").on("click", function() {
      		// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      		var state = $(this).attr("data-state");
    		// If the clicked image's state is still, update its src attribute to what its data-animate value is.
      		// Then, set the image's data-state to animate
      		// Else set src to the data-still value
      		if (state === "still") {
        		$(this).attr("src", $(this).attr("data-animate"));
        		$(this).attr("data-state", "animate");
      		} else {
        		$(this).attr("src", $(this).attr("data-still"));
        		$(this).attr("data-state", "still");
      		}
    	});
    });
}

function vdoin(e,t){
	res=e;
	for(var n=0;n<t.length;n++){
		res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){
			return t[n][r]}
		)}
	return res
}

function init() {
    gapi.client.setApiKey("AIzaSyBvkV3wEtShoYRzcCJ4jegR_rFL1ST1_gM");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}
