document.addEventListener("turbolinks:load", function(){

$(".channels.show").ready(function(){

console.log('video_player.js');

	function resize(){
		// make video size based on screen size
		// also adjust chat height while we're at it

		var full = window.matchMedia("(min-width: 1660px)");
		var memium = window.matchMedia("(min-width: 1350px)");
		var low = window.matchMedia("(min-width: 1030px)");

		if(full.matches){
			// full settings
			var w = 1280;
			$('#chat').css("height","720px");
			$('#comments').css("height","650px");
		}else if(memium.matches){
			// medium settings
			var w = 960;
			$('#chat').css("height","540px");
			$('#comments').css("height","470px");
		}else if(low.matches){
			// low settings
			var w = 640;
			$('#chat').css("height","360px");
			$('#comments').css("height","290px");
		}else{
			// chat collapses below, let's make it bigger then?
			var w = 640;
			$('#chat').css("height","520px");
			$('#chat').css("margin-bottom","50px");
			$('#comments').css("height","450px");
		}

		var secret = $('#secret').val();

		// the jwplayer player
		var playerInstance = jwplayer("stream");

		playerInstance.setup({
			file: `rtmp://192.168.1.28:1935/live/flv:${secret}`,
			width: w,
			height: w*9/16,
			primary: "flash",
			autostart: true,
			controls: true,
			stretching: "exactfit",
		}); 
	}

	// on window resize we can change the video player and chat size
	$(window).resize(function(){
		console.log('window is being resized');
		resize();
	})
	
	resize();

});

});