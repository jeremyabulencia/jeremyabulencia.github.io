(function($) {
    $.fn.carousel = function( options ) {
 		var settings = $.extend({

 		}, options)
        
 		containerWidth = $(this).outerWidth();
 		main = $(this);

        $(this).prepend('<div id="caruchu">'+
				'<div id="left"> < </div>'+
				'<div id="right"> > </div>'+
			'</div>');

       	$(this).mouseover(function(){
       		$(this).find('#caruchu').show()
       	}).mouseout(function(){
       		$(this).find('#caruchu').hide()
       	})

 		$(this).find('#right').on('click',function(){
 			animation = {
 				'margin-left':'-='+containerWidth,
 			}
 			currentDiv = main.find('.active');
 			nextDiv = currentDiv.next();
 			currentDiv.removeClass('active').animate(animation);
 			nextDiv.addClass('active').animate(animation);
 		})

 		$(this).find('#left').on('click',function(){
 			animation = {
 				'margin-left':'+='+containerWidth,	
 			}
 			currentDiv = main.find('.active');
 			previousDiv = currentDiv.prev();
 			currentDiv.removeClass('active').animate(animation);
 			previousDiv.addClass('active').animate(animation);
 		})
    };
}(jQuery));