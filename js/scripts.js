$(document).ready(function(){
	$('.switch .switchBtn').on('click',function(){
		$('.content').stop();
		if($('.content').hasClass('activated')){
			$('.content').removeClass('activated').animate({'margin-top':'-150px'})
		}else{
			$('.content').addClass('activated').animate({'margin-top':'0px'})
		}
	})
	$('.crumbs').each(function(){
		$(this).css({
			'height':$(this).parent().height()+'px',
			'line-height':parseInt($(this).parent().height()-10)+'px',
		})
	})
})