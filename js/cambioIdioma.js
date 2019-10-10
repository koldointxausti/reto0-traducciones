$(document).ready(function(){

	$(".selector").click(function() {
		var idioma = $(this).attr("data-value");
		translator = $('body').translate({lang: idioma, t: dic});
		$("#datos").attr({src: 'js/datos_'+idioma+'.js'	});
	});

});