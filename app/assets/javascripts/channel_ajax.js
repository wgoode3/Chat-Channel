document.addEventListener("turbolinks:load", function(){

$(".channels.show").ready(function(){

console.log("channel_ajax.js");

	// some useful variables
	var channel = $('#channelID').val();
	var socket = io.connect('http://192.168.1.250:3001');
	var user = $('#userID').val();

	// the scroll chat gets called a few times so it's a good candidate to be a function
	function scrollChat(){
		var objDiv = document.getElementById("comments");
		objDiv.scrollTop = objDiv.scrollHeight;
	}
	scrollChat();

	// on loading the chat viewer emits to the server
	if(user){
		socket.emit("new_viewer", {channel: channel, viewer: user});
	}else{
		socket.emit("new_viewer", {channel: channel, viewer: 'unknown'});
	}

	// on page unload tell the sockets we're leaving!!!
	window.onbeforeunload =function(){
		if(user){
			socket.emit("leaving", {channel: channel, viewer: user});
		}else{
			socket.emit("leaving", {channel: channel, viewer: 'unknown'});
		}
	};

	// or if they click on a link that directs them somewhere else!
	$(document).on('click', 'a', function(){
		if(user){
			socket.emit("leaving", {channel: channel, viewer: user});
		}else{
			socket.emit("leaving", {channel: channel, viewer: 'unknown'});
		}
	})

	// submits a message to the chat
	$('#new_message').submit(function(){
		var comment = $('#new_comment').serialize();
		$.post(`/channels/${channel}/comment`, comment, function(data){
			socket.emit("new_post", {channel: channel, comment: comment});
			$('#new_comment').val('');
			$('#comments').append(data);
			scrollChat();
		});
	return false;
	});

	// allows channel owner to delete a comment
	$(document).on('click', '.delete', function(){
		var del = {};
		// this is the worst line of code I've ever written and it works
		var comment_id = $(this).parent().parent().parent().parent().parent().attr('id');
 		del.comment = comment_id;
		del.user = user;
		$.post(`/comments/${comment_id}/delete`, del, function(data){
			$(`#${comment_id}`).remove();
			if(data.response == "deleted"){
				socket.emit("delete_post", {channel: channel, comment_id: comment_id});
			}
		})
	})

	// allows a user to follow the channel
	$(document).on('click', '#follow', function(){
		console.log("follow button clicked");
		$('#follow').attr('class', 'btn btn-danger');
		$('#follow').html("Unfollow");
		$('#follow').attr('id', 'unfollow');
	})

	// allows a user to unfollow the channel
	$(document).on('click', '#unfollow', function(){
		console.log("unfollow button clicked");
		$('#unfollow').attr('class', 'btn btn-success');
		$('#unfollow').html("Follow");
		$('#unfollow').attr('id', 'follow');
	})

	// fetches a comment from another user
	socket.on('broadcast', function(data){
		if(data.response.channel == channel){
			$.get(`/channels/${channel}/comment`, function(data){
				$('#comments').append(data);
				scrollChat();
			})
		}
	})

	// removes a comment deleted by channel owner
	socket.on('delete', function(data){
		if(data.response.channel == channel){
			$(`#${data.response.comment_id}`).remove();
		}
	})

	// tooltips
	$('[data-toggle="tooltip"]').tooltip();

});

});