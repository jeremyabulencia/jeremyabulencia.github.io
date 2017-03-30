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
		$('#content').css({'top':$('#head').height() - 20});
	}

	adjustContentWorks = function(){
		contentWorksWidth = $('#content-works').closest('.subContent').outerWidth();
		$('#content-works ul li').width(contentWorksWidth);
		$('#content-works ul li:not(.active)').css({'margin-left':contentWorksWidth+'px'});
	}

	callbacks.fire(blurScroll($(document).scrollTop()));
	$(document).scroll(function(){
		callbacks.fire(blurScroll($(this).scrollTop()));
	});

	$('#head img').load(function(){
		callbacks.fire(adjustContentPosition());
	});

	callbacks.fire(adjustContentWorks());
	$(window).resize(function(){
		callbacks.fire(adjustContentPosition());
		callbacks.fire(adjustContentWorks());
	});
	
	$('#content-works ul li').on('click',function(){
		window.location.href = $(this).data('href');
	});


	$('#content-works').carousel();
});