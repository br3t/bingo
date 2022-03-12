var loto = {
	numbers: [],
	position: -1,
	interval: null,
	intervalTime: 3000,
	audio: null,
	voice: null,
	gameState: 0
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

	$('#number-display').click(function() {
		switch(t.gameState) {
			case 0:
				t.start();
			break;
			case 1:
				t.pause();
			break;
			case 2:
				t.resume();
			break;
		}
	});


	$('#showHide').click(function() {
		$('.numbrs').toggle();
	});
}

loto.resize = function() {
	$('#number-display').css({
		height: window.innerHeight,
		fontSize: 0.9*window.innerHeight
	});
}

loto.start = function() {
	var t = this;
	t.gameState = 1; // game started
	t.position = -1;
	t.intervalTime = parseInt($('#interval').val())*1000 || 3000;
	t.voice = document.querySelector('#voice').value;
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
	t.audio.src = 'voices/' + t.voice + '/n' + number + '.mp3';
	t.audio.play();
}

loto.pause = function() {
	var t = this;
	t.gameState = 2; // game paused
	clearInterval(t.interval);
	$('body').removeClass().addClass('pause');
}

loto.resume = function() {
	var t = this;
	t.gameState = 1; // game started
	t.runInterval();
	$('body').removeClass().addClass('play');
}

loto.finish = function() {
	var t = this;
	t.gameState = 0; // game finished
	clearInterval(t.interval);
	t.displayNumber('&#9654;');
	$('body').removeClass().addClass('wait');
}

$(document).ready(function() {
	loto.init();
});