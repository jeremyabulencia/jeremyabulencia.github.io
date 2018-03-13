callback = $.Callbacks();
introSize = function(){
	docHeight = $(window).height();
	$('#header').css({'height':docHeight});
}
$(document).ready(function(){
	if($(window).width() > 696){
		callback.fire(introSize());
	}
	p = new Date();
	b = new Date('1990-03-15')
	c = new Date(p-b);
	c = parseInt(c/(1000*60*60*24*365));
	console.log(c)
});
$(window).resize(function(){
	if($(window).width() > 696){
		callback.fire(introSize());
	}
})
