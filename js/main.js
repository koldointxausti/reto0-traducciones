$(document).ready(function(){

	$('#scrollDownButton').click(function(){
		$('html, body').animate({
		   scrollTop: $("#main").offset().top
		}, 500);
	});
	$('nav a').click(function(){
		let href = $(this).attr('href');
		$('html, body').animate({
		   scrollTop: $(href).offset().top
		}, 500);
	});

	// INSERCIÓN DE DATOS DE CAST

	let castContent = '<div>' +
		'<h1 class="title">CAST</h1><div class="actorContent">';
	for (let index = 0; index < actores.length; index++) {
		castContent += '<div class="actor">' +
			'<div class="actorInformation">'+
				'<img src = "img/cast/'+actores[index].nombre +'.jpg" alt="Cast '+actores[index].nombre+'">'+
				'<h4>' + actores[index].nombre + '</h4>' +
				'<span>' + actores[index].personaje + '</span>' +
				'<span><span class="trn" data-trn-key="age">Age</span>: <span>' + (2019 - actores[index].añoNac) + '</span></span>' +
			'</div>'+
			'</div>';
	}
	castContent += '</div>';
	$('#cast').html(castContent);

	
	// GENERA NAV Y PICKER DEPENDIENDO CUÁNTAS TEMPORADAS HAYA

	for(let index = 0; index < temporadas.length; index++){
		$('#seasonsNav').append('<li><a href="#season'+(index+1)+'"><span class="trn" data-trn-key="season">Season</span> '+(index+1)+'</a></li>');
		$('#seasonPicker').append('<option value="'+(index+1)+'"><span class="trn" data-trn-key="season">Season</span> '+(index+1)+'</option>');
	}

	// INSERCIÓN DE DATOS DE TEMPORADAS

	let selectedSeason = 1;
	
	$('#seasonPicker').change(function(){
		fillSeasonsContent();
	})

	function fillSeasonsContent(){
		let seasonContent = '';
		selectedSeason = $('#seasonPicker').val();
		let index = $('#seasonPicker').val()-1;
		seasonContent += '<div class="seasonInfo">' +
			'<div class = "seasonDescription">' +
			'<p class="trn" data-trn-key="sinopsis'+(index+1)+'">' + temporadas[index].sinopsis + '</p>' +
			'</div>' +
			'<iframe src = "' + temporadas[index].video + '"></iframe>' +
		'</div>'+
		'<div class="caps" id="seasonContent">'+
			'<img src="img/left-arrow.png" alt="left-arrow" id="capBack" class="arrows">';

		for(let i = 0; i < temporadas[index].capitulos.length; i++){
			seasonContent +=
				'<div class="capitulo" id="s'+temporadas[index].numTemporada+'c'+temporadas[index].capitulos[i].numCap+'">'+
					'<img src="img/season'+temporadas[index].numTemporada+'/'+temporadas[index].capitulos[i].numCap+'.jpg">'+
					'<div class="capInfo"><h3><strong>'+ temporadas[index].capitulos[i].numCap + '.</strong> <span class="trn" data-trn-key="s'+temporadas[index].numTemporada+'c'+temporadas[index].capitulos[i].numCap+'title">' +temporadas[index].capitulos[i].title +'</span></h3>'+
					'<p class="capDesc trn" data-trn-key="s'+temporadas[index].numTemporada+'c'+temporadas[index].capitulos[i].numCap+'description">'+ temporadas[index].capitulos[i].description +'</p></div>'+
				'</div>';
		}
		seasonContent += '<img src="img/right-arrow.png" alt="left-arrow" id="capNext" class="arrows">'+
		'</div>';
		$('#seasonContainer').html(seasonContent);
		generateCarrousel(selectedSeason);
	}
	fillSeasonsContent();

	// CARRUSEL	

	

	function generateCarrousel(selectedSeason){
		let selectedCap = 1;
		/*
			Muestra la descripción del capítulo seleccionado por defecto en las definiciones
			de variable de arriba
		*/
		let stepsByScreen = $(window).width() < 1100 ? 39 : 30;

		$('#s'+selectedSeason+'c1').find('.capDesc').show();
		$('#capBack').addClass('disabled');
		$('#s'+selectedSeason+'c1').addClass('capSelected');
		
		/*
			Cuando haces click sobre una tarjeta de capítulo se mueve a la posición de selección
			y añade la clase capSelected.
		*/

		$('.capitulo').click(function(){
			let oldSelectedCap = selectedCap;
			$('#s'+selectedSeason+'c'+selectedCap).removeClass('capSelected');
			selectedSeason = parseInt($(this).attr('id').charAt(1));
			selectedCap = parseInt($(this).attr('id').substring(3));
			console.log(stepsByScreen);
			capsToMove = Math.max(oldSelectedCap, selectedCap) - Math.min(oldSelectedCap, selectedCap);
			$('#s'+selectedSeason+'c1').animate({'marginLeft':(Math.max(oldSelectedCap, selectedCap) === selectedCap ? '-=' : '+=')+(stepsByScreen*capsToMove) +'%'},500);
			$('#s'+selectedSeason+'c'+selectedCap).addClass('capSelected');
			$('#s'+selectedSeason+'c'+oldSelectedCap).find('.capDesc').fadeOut(50);
			$('#s'+selectedSeason+'c'+selectedCap).find('.capDesc').fadeIn(200);

			if(selectedCap === temporadas[selectedSeason-1].capitulos.length)
				$('#capNext').addClass('disabled');
			else
				$('#capNext').removeClass('disabled');

			if(selectedCap === 1)
				$('#capBack').addClass('disabled');
			else
				$('#capBack').removeClass('disabled');
		});

		/*
			Mueve y cambia el capítulo seleccíonado al hacer click con los botones
		*/

		$('#capNext').click(function(){
			$('#capBack').removeClass('disabled');
			if(selectedCap === temporadas[selectedSeason-1].capitulos.length-1)
				$('#capNext').addClass('disabled');
			if(selectedCap < temporadas[selectedSeason-1].capitulos.length){
				console.log(selectedCap)
				if(selectedCap != 1){
					$('#s'+selectedSeason+'c1').animate({'marginLeft':'-='+stepsByScreen+'%'},800);
				}else{
					$('#s'+selectedSeason+'c'+selectedCap).animate({'marginLeft':'-='+stepsByScreen+'%'},800);
				}
				$('#s'+selectedSeason+'c'+selectedCap).removeClass('capSelected');
				$('#s'+selectedSeason+'c'+selectedCap).find('.capDesc').fadeOut(100);
				selectedCap++;
				$('#s'+selectedSeason+'c'+selectedCap).addClass('capSelected');
				$('#s'+selectedSeason+'c'+selectedCap).find('.capDesc').fadeIn(100);
			}
		});
		$('#capBack').click(function(){
			$('#capNext').removeClass('disabled');
			if(selectedCap === 2)
				$('#capBack').addClass('disabled');

			if(selectedCap > 1){
				$('#s'+selectedSeason+'c'+selectedCap).find('.capDesc').fadeOut(50);
				$('#s'+selectedSeason+'c'+selectedCap).removeClass('capSelected');
				selectedCap--;
				$('#s'+selectedSeason+'c1').animate({'marginLeft':'+='+stepsByScreen+'%'},800);
				$('#s'+selectedSeason+'c'+selectedCap).addClass('capSelected');
				$('#s'+selectedSeason+'c'+selectedCap).find('.capDesc').fadeIn(50);
			}else{
				$('#capBack').addClass('disabled');
			}
		});
	}
	

});