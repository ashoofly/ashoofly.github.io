
var context;
var radius=20;


/* starting positions of balls: [x, y, dx, dy] */
var grey = [20, 100, 2, 2];
var red = [window.innerWidth-20, 300, 2, 2];
var orange = [window.innerWidth-20, window.innerHeight-20, 2, 2];
var green = [100, window.innerHeight-20, 2, 2];
var purple = [window.innerWidth/2, window.innerHeight/2, 2, 2];
var yellow = [20, window.innerHeight/2, 2, 2];


window.onload = function init() {
	context = main.getContext('2d');
	//setName();
	setInterval(draw, 10);
};

window.addEventListener("resize", function() {
	//setName();
});

function getFont(context) {
	return (0.04*context.canvas.width|0) + "px 'Krona One'";
}

function setName() {
	var name = document.getElementById('name');
	var context = name.getContext('2d');
	context.canvas.width = window.innerWidth;
	context.canvas.height = window.innerHeight;
	context.font      = getFont(context);
	console.log(context.font);

	context.textAlign = 'center';
	context.fillStyle = '#BBC5C9';
	context.fillText("angela hsu", context.canvas.width/2, context.canvas.height*(2/3));
}

function draw() {
	/* adjust coordinates upon browser window re-sizing */ 
	context.canvas.width = window.innerWidth;
	context.canvas.height = window.innerHeight;
	
	/* prepare iteration */
	context.clearRect(0,0,context.canvas.width,context.canvas.height);
	context.globalAlpha = 0.5; 
	
	grey = createCircle("#90A3AD", grey);
	red = createCircle("#A6333F", red);
	orange = createCircle("#F2924E", orange);
	green = createCircle("#578C57", green);
	purple = createCircle("#78578C", purple);
	yellow = createCircle("#E3E856", yellow);
}

function createCircle(color, coord) {
	var x = coord[0];
	var y = coord[1];
	var dx = coord[2];
	var dy = coord[3];
	context.beginPath();
	context.fillStyle=color;
	context.arc(x,y,radius,0,Math.PI*2,true);
	context.closePath();
	context.fill();
	/* bounce off the walls */
	if ((x-radius)<0 || (x+radius)>context.canvas.width) dx=-dx;
	if ((y-radius)<0 || (y+radius)>context.canvas.height) dy=-dy;
	x += dx;
	y += dy;
	/* if user resizes window quickly and ball goes out of view */
	if ((x+radius)>context.canvas.width) {
		x=context.canvas.width-radius;
		dx=-2;
	}
	if ((y+radius)>context.canvas.height) {
		y=context.canvas.height-radius;
		dy=-2;
	}
	return [x, y, dx, dy];
}

