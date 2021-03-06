$(function(){

	var socket = io.connect('http://localhost:3000');

	$("#feed").on("click", ".favorite", function(e){
		e.preventDefault();
		if (!$(this).hasClass("isfavorited")){
			socketid = $(this).attr("data-id");
			name= $("#name").html();
			tweet = $(this).prev().html();
			socket.emit("favorite", socketid, name, tweet);
			$(this).addClass("isfavorited");
		}
	});

	socket.on('login', function(data){
		var name = prompt("Cual es tu nombre?");
		$("#name").html(name);
	});

	$("#tweetbutton").on("click", function(e){
		e.preventDefault();
		if($("#tweetmessage").val()!=""){
			socket.emit("message", JSON.stringify({
				name: $("#name").html(),
				tweet: $("#tweetmessage").val()
			}));
			$("#tweetmessage").val("");
		}
	});
	
	socket.on("message", function(data, socketid){
		var data = JSON.parse(data);
		$('<div><h3>' + data.name + '</h3><p>' + data.tweet + '</p><a class="favorite" data-id="'+socketid+'">Favorito</a></div>').insertAfter($("#feed div").first());
	});

	socket.on("favorite", function(name, tweet){
		$('<div><p><b>' + name + '</b> marcó como favorito un Tweet<br/><span>' + tweet + '</span></div>').insertAfter($("#notifications div").first());
	});

});