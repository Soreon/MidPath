var canvas = document.getElementById('main-canvas');
var context = canvas.getContext('2d');

var center_point = {x: canvas.scrollHeight / 2, y: canvas.scrollHeight / 2};
var points = [];

function cleanCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function rectangle(x, y, width, height, color) {
    context.beginPath();
    context.rect(x, y, width, height);
    context.fillStyle = color;
    context.fill();
}

function circle(x, y, radius, filled) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.stroke();
    if(filled) {
        context.fill();
    }
    context.closePath();
}

function line(ax, ay, bx, by, color, thickness) {
    var funcStrokeStyle = context.strokeStyle;
    var funcLineWidth = context.lineWidth;

    context.beginPath();
    context.moveTo(ax, ay);
    context.lineTo(bx, by);
    context.strokeStyle = color;
    context.lineWidth = thickness;
    context.stroke();

    context.strokeStyle = funcStrokeStyle;
    context.lineWidth = funcLineWidth;
}

function text(text, x, y, size, color) {
    context.font = size + "px Arial";
    context.fillStyle = color;
    context.fillText(text, x, y); 
}


function distance(ax, ay, bx, by) {
    return Math.sqrt( Math.pow((ax-bx), 2) + Math.pow((ay-by), 2) );
}

function createPoint() {
    var point = {x: -1, y: -1};

    do {
        point.x = Math.floor(Math.random() * canvas.width);
        point.y = Math.floor(Math.random() * canvas.height);
    } while((point.x < 0 || point.x > canvas.width) && (point.y < 0 || point.y > canvas.height));

    return point;
}

function createPoints(n_points) {
    var epoint = {}, angle = 2 * Math.PI / n_points;
    for(var i=0; i < n_points; i++) {
        epoint.x = center_point.x + 240 * Math.cos(i * angle);
        epoint.y = center_point.y + 240 * Math.sin(i * angle);
        points.push(JSON.parse(JSON.stringify(epoint)));
    }
}

function drawBasePoints() {
    for(var i=0; i < points.length; i++) {
        rectangle(points[i].x, points[i].y, 1, 1, "#FF0000");
    }
}

function go(){
    var current_point = { x:points[0].x, y:points[0].y };
    var next_index, going_point, next_point;
    for(var i=0; i < 500000; i++) {
        next_index = Math.floor(Math.random() * points.length);
        going_point = { x:points[next_index].x, y:points[next_index].y };
        next_point = { x:(current_point.x + going_point.x) / 2, y:(current_point.y + going_point.y) / 2 };
        rectangle(next_point.x, next_point.y, 1, 1, "#000000");
        current_point = { x:next_point.x, y:next_point.y };
    }
    
}


function fern() {
    
}

function draw() {
    cleanCanvas();
}



createPoints(5);
draw();
go();