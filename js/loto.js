var loto = {

	numbers: [],

	position: -1,

	interval: null,

	intervalTime: 3000,

	audio: null

}



loto.init = function() {

	var t = this;

	t.audio = document.getElementById('number-audio');

	t.resize();



	$('#start').click(function() {

		t.start();

	});



	$('#pause').click(function() {

		t.pause();

	});



	$('#resume').click(function() {

		t.resume();

	});



	$('#finish').click(function() {

		t.finish();

	});



	$('#showHide').click(function() {

		$('.numbrs').toggle();

	});

}



loto.resize = function() {

	$('#number-display').css({

		height: 0.9*window.innerHeight,

		fontSize: 0.9*window.innerHeight,

		lineHeight: '90%'

	});

}



loto.start = function() {

	var t = this;

	t.position = -1;

	t.intervalTime = parseInt($('#interval').val())*1000 || 3000;

	clearInterval(t.interval);

	$('.numbrs').html('');



	t.numbers = [];

	for(var i = 1; i < 91; i++) {

		t.numbers.push(i);

	}

	t.numbers = _.shuffle(t.numbers);

	console.log(t.numbers);

	t.runInterval();



	$('body').removeClass().addClass('play');

}



loto.runInterval = function() {
	var t = this;
	t.interval = setInterval(function(){
		t.position++;
		t.displayNumber(t.numbers[t.position]);
		t.say(t.numbers[t.position]);
	}, t.intervalTime);

}



loto.displayNumber = function(number) {

	$('#number-display').html(number);

	$('.numbrs').html($('.numbrs').html() + '<br />' + number);

}



loto.say = function(number) {
	var t = this;
	//if(number < 20 || number%10 == 0) {
		t.audio.src = 'mp3/n' + number + '.mp3';
		t.audio.play();
	/*} else {
		var parts = [parseInt(number/10)*10, number%10];
		t.say(parts[0]);
		setTimeout(function() {
			t.say(parts[1]);
		}, 950);
	}*/
}



loto.pause = function() {
	clearInterval(this.interval);
	$('body').removeClass().addClass('pause');
}



loto.resume = function() {
	this.runInterval();
	$('body').removeClass().addClass('play');
}



loto.finish = function() {
	clearInterval(this.interval);
	this.displayNumber('');
	$('body').removeClass().addClass('wait');
}



$(document).ready(function() {

	loto.init();

});