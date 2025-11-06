const c = document.getElementById('canvas');
const ctx = c.getContext('2d');

// HTML Elements
let g_el = document.getElementById('gravity');
let m1_el = document.getElementById('m1');
let m2_el = document.getElementById('m2');
let l1_el = document.getElementById('l1');
let l2_el = document.getElementById('l2');

// Values of HTML Elements
let g = parseFloat(g_el.value);
let m1 = parseFloat(m1_el.value);
let m2 = parseFloat(m2_el.value);
let l1 = parseFloat(l1_el.value);
let l2 = parseFloat(l2_el.value);
// console.log(g, m1, m2, l1, l2);

let theta1 = Math.PI / 1;
let theta2 = Math.PI / 2;
// console.log(theta1, theta2);

x1 = l1 * Math.sin(theta1);
y1 = -l1 * Math.cos(theta1);
x2 = x1 + l2 * Math.sin(theta2);
y2 = y1 - l2 * Math.cos(theta2);
// console.log(x1, x2, y1, y2);


function draw(){
    ctx.clearRect(0 , 0, c.width, c.height);
    ctx.save();
    ctx.translate(c.width / 2, 200);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Draw masses
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x1, y1, m1/2, 0, Math.PI*2);
    ctx.fill();

    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(x2, y2, m2/2, 0, Math.PI*2);
    ctx.fill();

    ctx.restore();
}

draw();
