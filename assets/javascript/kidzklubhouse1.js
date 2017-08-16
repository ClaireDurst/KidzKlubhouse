
	$(function () {
    	$("form").on("submit", function(e) {
       		e.preventDefault();
	       	// prepare the request
	       	var vtinput1 = $("#test5").is(":checked");
	       	var vtinput2 = $("#test6").is(":checked");
	       	var vtinput3 = $("input#test7").is(":checked");
	       	$("#videoResults").empty();
	       	//$("#gifResults").empty();
	       	$("#imageResults").empty();
	       	$('#gifResults').animatescroll({scrollSpeed:2000,easing:'easeOutBounce'});
	       	if (vtinput1 == true) {
	       		console.log("Gif is checked");
	       		//fgifs();
	       		fCarousel();
	       	}
	       	if (vtinput2 == true) {
	       		console.log("Video is checked");
	       		fvideos();
	       	}
	       	if (vtinput3 == true) {
	       		console.log("Images is checked");
	       		displayImages();
	       	}
    	});
	});

function fvideos() {
	var request = gapi.client.youtube.search.list({
    part: "snippet",
       	type: "video",
       	q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
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
