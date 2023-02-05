/** @type {HTMLCanvasElement} */

// const canvas = document.getElementById('canvas1');
// const ctx = canvas.getContext('2d');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// Mengganti warna canvas
// ctx.fillStyle = 'salmon';
// ctx.fillRect(0, 0, 150, 150);

// Membuat garis
// ctx.moveTo(150, 0);
// ctx.lineTo(0, 150);
// ctx.stroke();

// Membuat lingkaran (x, y, size, path, 3.14 * 2)
// ctx.beginPath();
// ctx.arc(75, 75, 30, 0, 2 * Math.PI);
// ctx.stroke();

// Membuat linier gradient (x, y, x1, y1)
// let grd = ctx.createLinearGradient(0, 0, 300, 0);
// grd.addColorStop(0, 'lightblue');
// grd.addColorStop(1, 'salmon');
// Mewarnai dengan gradient
// ctx.fillStyle = grd;
// ctx.fillRect(10, 10, 150, 60);

// Membuat radial gradient (x, y, r, x1, y1, r1)
// let radgrad = ctx.createRadialGradient(71, 50, 20, 90, 70, 100);
// radgrad.addColorStop(0, 'blue');
// radgrad.addColorStop(1, 'white');
// Mewarnai radial gradient
// ctx.fillStyle = radgrad;
// ctx.fillRect(10, 10, 150, 80);

// Menulis teks pada canvas
// ctx.font = "30px Georgia";
// ctx.strokeText('Halo Programmers', canvas.width/2, canvas.height/2);
// ctx.fillStyle = 'blue';
// ctx.fillText('Halo Programmers', 30, 25);

const c2 = document.getElementById('canvas2');
const ctx2 = c2.getContext('2d');
let radius = c2.height / 2;
ctx2.translate(radius, radius);
radius = radius * 0.90;
drawClock();

function drawClock() {
    drawFace(ctx2, radius);
    drawNumbers(ctx2, radius);
    drawTime(ctx2, radius);
}

function drawFace(ctx, radius){
    let grad;
    ctx2.beginPath();
    ctx2.arc(0, 0, radius, 0, Math.PI * 2);
    ctx2.fillStyle = 'white';
    ctx.fill();

    grad = ctx2.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, '#fff');
    grad.addColorStop(1, '#333');
    ctx2.strokeStyle = grad;
    ctx2.lineWidth = radius * 0.1;
    ctx2.stroke();

    ctx2.beginPath();
    ctx2.arc(0, 0, radius * 0.1, 0, Math.PI * 2);
    ctx2.fillStyle = '#333';
    ctx2.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for(num = 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour%12;
    hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second = (second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

setInterval(drawClock, 1000);