$(document).ready(function(){
	
	callbacks = $.Callbacks();

	blurScroll = function(scrollTop){
		scrollTop = (scrollTop > 200) ? 200 : scrollTop;
		if(scrollTop <= 200){
			$('#head').css({
				'-webkit-filter': 'blur('+scrollTop/33+'px)',
				'-moz-filter': 'blur('+scrollTop/33+'px)',
				'-o-filter': 'blur('+scrollTop/33+'px)',
				'-ms-filter': 'blur('+scrollTop/33+'px)',
				'filter': 'blur('+scrollTop/33+'px)',
			})
		}
	}

	adjustContentPosition = function(){
		$('#content').css({'top':$('#head').height() - 20})
	}

	callbacks.fire(blurScroll($(document).scrollTop()));
	$(document).scroll(function(){
		callbacks.fire(blurScroll($(this).scrollTop()))
	})

	$('#head img').load(function(){
		callbacks.fire(adjustContentPosition());
	})
	$(window).resize(function(){
		callbacks.fire(adjustContentPosition())
	})
	
})