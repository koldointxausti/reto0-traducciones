
$(document).ready(function() {
	var interval = setInterval(function() {
		let now = moment();
		$('#hour').html(now.format('HH:mm:ss'));
	}, 100);

});
