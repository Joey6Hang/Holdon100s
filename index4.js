var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var btnstart = document.getElementById('btnstart');
var beginmuc = new Audio ('img/begin.mp3');
var fallmuc = new Audio ('img/fall_2.mp3');
var bgmmuc = new Audio ('./img/Endless Summer You – Roa (No Copyright Music).mp3')
let ballId = null;
let drawId = null;


let imgood = document.getElementById("good");
let imgcheep = document.getElementById("cheep");


const cRect = canvas.getBoundingClientRect(); //方法返回元素的大小及其相对于视口的位置。矩形盒子。
let balls = [];
let run = false;

canvas.width = 850;
canvas.height = 540;

let mouse = { x: 0, y: 0 };

btnstart.onclick = function(){
  run = true;
  beginmuc.play();
  bgmmuc.play();
  draw();
  newball();
   ballId = setInterval(newball, 1000);
   drawId = setInterval(draw, 2);
   imgcheep.style.display = "none";
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function newball() {
  balls.push({
    sx: 845,
    sy: 535,
    vx: random(1, 4),
    vy: random(1, 3),
  });
}


window.addEventListener("mousemove", function (evt) {
  let x = evt.clientX - cRect.left;
  let y = evt.clientY - cRect.top;
  if (x < 850 && x > 0 && y < 540 && y > 0) {
    mouse.x = x;
    mouse.y = y;
  }
});

function draw() {
  if (run) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "30px fantasy";
    ctx.fillStyle = "yellow";
    ctx.fillText(balls.length, 5, 20);


    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "white";
    for (let i = 0; i < balls.length; i++) {
      ball = balls[i];
      ctx.beginPath();
      ctx.arc(ball.sx, ball.sy, 3, 0, 2 * Math.PI);
      ctx.fill();
      ball.sx += ball.vx;
      ball.sy += ball.vy;
      if (ball.sx < 0 || ball.sx > 850) {
        ball.vx = -ball.vx;
      }
      if (ball.sy < 0 || ball.sy > 540) {
        ball.vy = -ball.vy;
      }
      if (Math.abs(ball.sx - mouse.x) < 4 && Math.abs(ball.sy - mouse.y) < 4) {
        fallmuc.play();
        imgcheep.style.display = "block";
        gameOver();
      }
      if (balls.length == 101){
        winner();
      }
    }
  }
}


function gameOver() {
  alert(`gameover YOU HELD ON FOR ${balls.length} s`);
  balls = [];
  run = false;
  clearInterval(ballId);
  clearInterval(drawId);
}


function winner(){
  balls = [];
  imgood.style.display = "block";
  alert(`YOU WIIIIIN!!!  GOT 100SECONDS!! `);
    run = false;
    clearInterval(ballId);
    clearInterval(drawId);
}

