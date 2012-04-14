var openChat;

$(document).ready(function(){
	$("#connect-button").click(function(){
		chatConnect();
	});
	$(".chatButton").click(function(){
		toggleChatChild( this );
	});
});

function chatClickHook( target ){
	if (!(/chat/.test(target.className)))
		toggleChat(openMenu, "");
}

function toggleChatChild( button ){
	toggleChat($(button).find("div")[0]);
}

function toggleChat( chat ){
	if ( !chat )
		return;
	if ( openChat && (chat != openChat) )
		hideChat( openChat );

	if ( chat ){
		if ($(chat).is(":hidden"))
			showChat( chat );
		else
			hideChat( chat );
	}
}

function showChat( chat ){
	if (!chat)
		return;

	$(chat).fadeIn(200);
	openChat = chat;
}

function hideChat( chat ){
	if (!chat)
		return;

	openChat = null;
	$(chat).fadeOut(300);
}