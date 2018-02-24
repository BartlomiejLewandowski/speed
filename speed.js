var setClass = function(cls) {
	$("#main").removeClass();
	$("#main").addClass(cls);
};

var setStart = function() {
	setClass('wait');
	$("#main").text('Press space to start');
}

var setReady = function() {
	setClass('ready');
	$("#main").text('Get ready!');
	setTimeout(function() {
		proceed();
		document.getElementById('play').play();
	}, 2000+Math.random()%2000)
}

var timeStarted;
var setClick = function() {
	timeStarted = performance.now();
	setClass('click');
	$("#main").text('Click!');
}

var setClicked = function() {
	var end = performance.now();
	 setClass('clicked');
	 var timeTaken = end - timeStarted;
	$("#main").text('Time taken: ' + timeTaken.toFixed(2) + ' ms.');
}

stateId = 0;
states = [setStart, setReady, setClick, setClicked]

var proceed = function() {
	stateId++;
	stateId = stateId % states.length;
	states[stateId]();	
}

document.addEventListener("keydown", function(event) {
  console.log(event.which);
  if (event.which == 32 && stateId != 1) {
	  proceed();
  }
});

$(function() {
	states[stateId]();
})