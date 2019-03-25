callbacks = $.Callbacks();

headReady = function(){
	// $('#head').css({'height':$(window).height()});
}

$(document).ready(function(){
	callbacks.fire(headReady());
})
