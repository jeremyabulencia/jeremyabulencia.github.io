$(document).ready(function(){
	$('.navBar li').click(function(){
		window.open($(this).find('a').attr('href'));
	})
	$('.Cells').mouseover(function(){
		// rgb(0, 90, 109) 
		$(this).css({backgroundColor:'rgb(0, 90, 109)',color:'#FFFFFF'})
	})
	$('.Cells').mouseout(function(){
		$(this).css({backgroundColor:'#FFFFFF',color:'#7A7A7A'})
	})
})