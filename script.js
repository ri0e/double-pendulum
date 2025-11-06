const c = document.getElementById('canvas');
const ctx = c.getContext('2d');

// HTML Elements
let g_el = document.getElementById('gravity');
let m1_el = document.getElementById('m1');
let m2_el = document.getElementById('m2');
let L1_el = document.getElementById('l1');
let L2_el = document.getElementById('l2');

// Values of HTML Elements
let g = parseFloat(g_el.value);
let m1 = parseFloat(m1_el.value);
let m2 = parseFloat(m2_el.value);
let L1 = parseFloat(L1_el.value);
let L2 = parseFloat(L2_el.value);
// console.log(g, m1, m2, l1, l2);

g_el.addEventListener('change', ()=>{
    g = parseFloat(g_el.value);
    console.log(g);
});

m1_el.addEventListener('change', ()=>{
    m1 = parseFloat(m1_el.value);
    console.log(m1);
});

m2_el.addEventListener('change', ()=>{
    m2 = parseFloat(m2_el.value);
    console.log(m2);
});

L1_el.addEventListener('change', ()=>{
    L1 = parseFloat(L1_el.value);
    console.log(L1);
});

L2_el.addEventListener('change', ()=>{
    L2 = parseFloat(L2_el.value);
    console.log(L2);
});

let theta1 = Math.PI / -2;
let theta2 = Math.PI / -2;
let theta1_v = 0;
let theta2_v = 0;
let theta1_a = 0;
let theta2_a = 0;
// console.log(theta1, theta2);

let x1, y1, x2, y2;
// console.log(x1, x2, y1, y2);

let trail = [];

function update(){
    const num1 = -g * ( 2 * m1 + m2) * Math.sin(theta1) - m2 * g * Math.sin(theta1 - 2 * theta2) - 2 * Math.sin(theta1 - theta2) * m2 * (theta2_v ** 2 * L2 + theta1_v ** 2 * L1 * Math.cos(theta1 - theta2));
    const den1 = L1 * (2 * m1 + m2 - m2 * Math.cos(2 * theta1 - 2 * 2 * theta2));
    theta1_a = num1 / den1;

    const num2 = 2 * Math.sin(theta1 - theta2) * (theta1_v ** 2 * L1 * (m1 + m2) + g * (m1 + m2) * Math.cos(theta1) + theta2_v ** 2 * L2 * m2 * Math.cos(theta1 - theta2));
    const den2 = L2 * (2 * m1 + m2 - m2 * Math.cos(2 * theta1 - 2 * 2 * theta2));
    theta2_a = num2 / den2;

    theta1_v += theta1_a;
    theta2_v += theta2_a;
    theta1 += theta1_v;
    theta2 += theta2_v;

    // Dampping
    theta1_v *= 0.999;
    theta2_v *= 0.999;

    x1 = L1 * Math.sin(theta1);
    y1 = L1 * Math.cos(theta1);
    x2 = x1 + L2 * Math.sin(theta2);
    y2 = y1 + L2 * Math.cos(theta2);

    trail.push({ x: x2, y: y2 });
    if (trail.length > 300) trail.shift();
}

function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.save();
    ctx.translate(c.width / 2, 200);

    // Draw trail
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.beginPath();
    for (let i = 0; i < trail.length - 1; i++) {
        ctx.moveTo(trail[i].x, trail[i].y);
        ctx.lineTo(trail[i + 1].x, trail[i + 1].y);
    }
    ctx.stroke();

    // Rods
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Masses
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x1, y1, m1 / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(x2, y2, m2 / 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();