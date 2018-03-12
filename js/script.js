callback = $.Callbacks();
introSize = function(){
	docHeight = $(window).height();
	$('#header').css({'height':docHeight});
}
$(document).ready(function(){
	if($(window).width() > 696){
		callback.fire(introSize());
	}
});
$(window).resize(function(){
	if($(window).width() > 696){
		callback.fire(introSize());
	}
})
