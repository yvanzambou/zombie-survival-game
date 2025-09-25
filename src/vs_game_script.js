// ============================== Header-Bereich ==============================

const lvl = document.querySelector('.level');
const pts = document.querySelector('.point');

	let level = 1;
	let points = 0;

	const start = () => {
	setInterval(() => {
		points++;
		lvl.innerHTML = "Level "+ level;
		pts.innerHTML = "Points: "+ points;
		if (points % 10 == 0) {
			level++;
		}
		let reachedPoints = points;
		sessionStorage.setItem("reachedPoints", reachedPoints);
	}, 1500)
};

// ============================== Header-Bereich ==============================

let ArrowUp = false;
let ArrowDown = false;
let ArrowLeft = false;
let ArrowRight = false;

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let positionH = {
	cx: canvas.width/2,
	cy: canvas.height/2
}

let positionVleft = [];
let positionVright = [];
let positionVup = [];
let positionVdown = [];

let speedH = 2;
let speedV = 0.125;
let radius = 15;
let distance = 20;

document.onkeydown = function(e) {	// Taste gedrueckt
	if(e.keyCode == 38) ArrowUp = true;
	if(e.keyCode == 40) ArrowDown = true;
	if(e.keyCode == 37) ArrowLeft = true;
	if(e.keyCode == 39) ArrowRight = true;
}

document.onkeyup = function(e) {	// Taste losgelassen
	if(e.keyCode == 38) ArrowUp = false;
	if(e.keyCode == 40) ArrowDown = false;
	if(e.keyCode == 37) ArrowLeft = false;
	if(e.keyCode == 39) ArrowRight = false;
}

function vampire(positionV) {
	// ================ vampire ================
	ctx.beginPath();
	ctx.arc(positionV.cx, positionV.cy, radius, 0, 2*Math.PI, false);
	ctx.fillStyle = 'red';
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#003300';
	ctx.stroke();
	// ================ vampire ================
}

function draw() {
	// ================ human ================
	ctx.beginPath();
	ctx.arc(positionH.cx, positionH.cy, radius, 0, 2*Math.PI, false);
	ctx.fillStyle = 'white';
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#003300';
	ctx.stroke();
	// ================ human ================

	// console.log('x: '+positionH.cx+ '; y: '+positionH.cy);

	positionVleft.forEach((positionV) => {vampire(positionV);});
	positionVright.forEach((positionV) => {vampire(positionV);});
	positionVup.forEach((positionV) => {vampire(positionV);});
	positionVdown.forEach((positionV) => {vampire(positionV);});
	requestAnimationFrame(draw);
}

function followHuman(posV) {
	if(posV.cx < positionH.cx) {
			posV.cx += speedV;
		}
		if(posV.cx > positionH.cx) {
			posV.cx -= speedV;
		}
		if(posV.cy < positionH.cy) {
			posV.cy += speedV;
		}
		if(posV.cy > positionH.cy) {
			posV.cy -= speedV;
		}
}

function update() {
	if(ArrowUp) {
		positionH.cy -= speedH;
		if(positionH.cy == radius) {
			positionH.cy += speedH;
		}
	}
	if(ArrowDown) {
		positionH.cy += speedH;
		if(positionH.cy == canvas.height - radius) {
			positionH.cy -= speedH;
		}
	}
	if(ArrowLeft) {
		positionH.cx -= speedH;
		if(positionH.cx == radius) {
			positionH.cx += speedH;
		}
	}
	if(ArrowRight) {
		positionH.cx += speedH;
		if(positionH.cx == canvas.width - radius) {
			positionH.cx -= speedH;
		}
	}

	positionVleft.forEach((posV) => {followHuman(posV);});
	positionVright.forEach((posV) => {followHuman(posV);});
	positionVup.forEach((posV) => {followHuman(posV);});
	positionVdown.forEach((posV) => {followHuman(posV);});
	
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function vampireAppears() {
	let posVleft = {
		cx: -radius,
		cy: Math.floor(Math.random() * (canvas.height - radius)) + radius
	};
	positionVleft.push(posVleft);

	let posVright = {
		cx: canvas.width + radius,
		cy: Math.floor(Math.random() * (canvas.height - radius)) + radius
	};
	positionVright.push(posVright);

	let posVup = {
		cx: Math.floor(Math.random() * (canvas.width - radius)) + radius,
		cy: -radius
	};
	positionVup.push(posVup);

	let posVdown = {
		cx: Math.floor(Math.random() * (canvas.width - radius)) + radius,
		cy: canvas.height + radius
	};
	positionVdown.push(posVdown);
}

function collision() {
	positionVleft.forEach((positionV) => {
		if(Math.sqrt(Math.pow((positionH.cx - positionV.cx), 2) + Math.pow((positionH.cy - positionV.cy), 2)) < distance) {
			document.location.href = "vs_end.html";
		}
	});
	positionVright.forEach((positionV) => {
		if(Math.sqrt(Math.pow((positionH.cx - positionV.cx), 2) + Math.pow((positionH.cy - positionV.cy), 2)) < distance) {
			document.location.href = "vs_end.html";
		}
	});
	positionVup.forEach((positionV) => {
		if(Math.sqrt(Math.pow((positionH.cx - positionV.cx), 2) + Math.pow((positionH.cy - positionV.cy), 2)) < distance) {
			document.location.href = "vs_end.html";
		}
	});
	positionVdown.forEach((positionV) => {
		if(Math.sqrt(Math.pow((positionH.cx - positionV.cx), 2) + Math.pow((positionH.cy - positionV.cy), 2)) < distance) {
			document.location.href = "vs_end.html";
		}
	});
}

function startGame() {
	start();
	setInterval(update, 1);
	setInterval(vampireAppears, 5000);
	setInterval(collision, 1);
	draw();
}