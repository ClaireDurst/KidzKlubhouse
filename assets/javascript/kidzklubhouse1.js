
	$(function () {
    	$("form").on("submit", function(e) {
       		e.preventDefault();
	       	// prepare the request
	       	var vtinput1 = $("#test5").is(":checked");
	       	var vtinput2 = $("#test6").is(":checked");
	       	var vtinput3 = $("input#test7").is(":checked");
	       	$("#videoResults").empty();
	       	$("#gifResults").empty();
	       	$("#imageResults").empty();
	       	$('#gifResults').animatescroll({scrollSpeed:2000,easing:'easeOutBounce'});
	       	if (vtinput1 == true) {
	       		console.log("Gif is checked");
	       		fgifs();
	       	}
	       	if (vtinput2 == true) {
	       		console.log("Video is checked");
	       		fvideos();
	       	}
	       	if (vtinput3 == true) {
	       		console.log("Images is checked");
	       	}
    	});
	});

function fvideos() {
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
    // retrieve the value of the search input
    var person = encodeURIComponent($("#idtsearch").val()).replace(/%20/g, "+");
    // Constructing a URL to search Giphy for the string with rating g
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=dc6zaTOxFJmzC&limit=10&rating=g";
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
              // Creating a div with the class "gallery"
              var gifDiv = $("<div />");
              gifDiv.addClass("gallery");
              // Creating an image tag
              var personImage = $("<img>");
              // Giving the image tag an src attribute of a proprety pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height.url);
              personImage.addClass("circle");
              //giving the images a specific size
              personImage.addClass("responsive-img");
              gifDiv.append(personImage);
              // appending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifResults").append(gifDiv);
        }
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
