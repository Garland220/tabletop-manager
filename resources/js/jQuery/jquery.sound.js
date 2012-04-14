/*
 *
 * jquery.sound.js
 * (c) Vipin Kumar Rajput
 *
 */
(function($){
	$.fn.soundPlay = function(options){
		var opts = $.extend({}, $.fn.soundPlay.defaults, options);
		if(opts.command == "play")
			$.fn.soundPlay.play(opts);
		else if(opts.command == "stop")
			$.fn.soundPlay.stop(opts);
	};

	function debug($obj){
		if (window.console && window.console.log)
			window.console.log('soundPlay: ' + $obj.size());
	};

    $.fn.soundPlay.play = function(opts){
        url = opts.url;
        id = opts.playerId;
		//if ( $(id) )
			$.fn.soundPlay.stop(opts);
		$("body").append('<embed id="' + id + '" src="'+url+'" autostart="true" hidden="true"></embed>');
        return false;
    };

	$.fn.soundPlay.stop = function(opts){
		$('#'+opts.playerId).remove();
		return false;
	};

	$.fn.soundPlay.defaults = {
		url: '',
		playerId: 'player',
		command: 'play'
	};
})(jQuery);