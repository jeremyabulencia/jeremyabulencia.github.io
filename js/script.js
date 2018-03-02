callback = $.Callbacks();
introSize = function(){
	docHeight = $(window).height();
	$('#header').css({'height':docHeight});
}
$(document).ready(function(){
	callback.fire(introSize());
});
$(window).resize(function(){
	callback.fire(introSize());
})