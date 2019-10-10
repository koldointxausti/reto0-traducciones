$(document).ready(function() {
	//Merchandising info

	let tShirts = '';

	tShirts += '<h2 class="trn" data-trn-key="tshirts"> T-Shirts </h2>';

	for(let i = 0; i < merchandising.tshirts.length; i++){
		tShirts+=
		'<div class="tshirt"><a href="#">'+
			'<img src="img/merchandising/tshirts/'+(i+1)+'.jpg">'+
			'<h3>'+ merchandising.tshirts[i].name +'</h3>'+
			'<p>'+ merchandising.tshirts[i].color +' </p>'+
			'<p>'+ merchandising.tshirts[i].price +'€</p>'+
		'</a></div>';
	}

	$('#tshirts').html(tShirts);

	/*PROVISIONAL*/

	let mugs = '';

	mugs += '<h2 class="trn" data-trn-key="mugs"> Mugs </h2>';

	for(let i = 0; i < merchandising.mugs.length; i++){
		mugs+=
		'<div class="mug"><a href="#">'+
			'<img src="img/merchandising/mugs/'+(i+1)+'.jpg">'+
			'<h3>'+ merchandising.mugs[i].name +' </h3>'+
			'<p>'+ merchandising.tshirts[i].price +'€</p>'+
		'</a></div>';
	}


	$('#mugs').html(mugs);

	
	let phoneCases = '';

	phoneCases += '<h2 class="trn" data-trn-key="phonecases"> Phone cases </h2>';

	for(let i = 0; i < merchandising.phoneCases.length; i++){
		phoneCases+=
		'<div class="phonecase"><a href="#">'+
			'<img src="img/merchandising/phone-cases/'+(i+1)+'.jpg">'+
			'<h3>'+ merchandising.phoneCases[i].name +' </h3>'+ 
			'<p>'+ merchandising.tshirts[i].color +' </p>'+
			'<p>'+ merchandising.tshirts[i].price +'€</p>'+
		'</a></div>';
	}

	$('#phoneCases').html(phoneCases);


});