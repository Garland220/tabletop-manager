$(document).ready(function(){
	$("#header").load("header.html");
	$(".menuButton").hover(function(){
		if (this != openMenu)
			toggleMenuChild( this );
	}, function(){});
	LoadContent();
});

function LoadContent(){
	var hash = location.hash;
	$("#main").empty();
	if (hash == null)
		$("#main").load("default.html");
	else if (hash == "#dices")
		$("#main").load("dices.html");
	else if (hash == "#daily")
		$("#main").load("daily.html");
	else if (hash == "#encounter")
		$("#main").load("encounter.html");
	else if (hash == "#inventory")
		$("#main").load("inventory.html");
	else
		$("#main").load("default.html");
	//alert(hash);
}