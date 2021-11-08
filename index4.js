var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var btnstart = document.getElementById('btnstart');
var beginmuc = new Audio ('img/begin.mp3');
var fallmuc = new Audio ('img/fall_2.mp3');
var bgmmuc = new Audio ('./img/Endless Summer You – Roa (No Copyright Music).mp3')
let ballId = null;
let drawId = null;


let imgood = document.getElementById("good");
let imgcheep = document.getElementById("cheep");


const cRect = canvas.getBoundingClientRect(); 
let balls = [];
let run = false;

canvas.width = 850;
canvas.height = 420;

let mouse = { x: 0, y: 0 };

// document.onkeyup = function(event){
//   let e = event || window.event
//   if (e&& e.keyCode == 32){
//     btnstart.onclick();
//     e.disabled = false;
//   }
// }

btnstart.onclick = function(){
  run = true;
  beginmuc.play();
  bgmmuc.play();
  draw();
  newball();
  ballId = setInterval(newball, 850);
  drawId = setInterval(draw, 2);
  imgcheep.style.display = "none";
  btnstart.disabled = true;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function newball() {
  balls.push({
    sx: (849 || 1),
    sy: 419,
    vx: (0.2 - Math.random())*1.5,
    vy: (0.2 - Math.random())*1.5,
  });
}


window.addEventListener("mousemove", function (evt) {
  let x = evt.clientX - cRect.left;
  let y = evt.clientY - cRect.top;
  if (x < 850 && x > 0 && y < 420 && y > 0) {
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
      ctx.arc(ball.sx, ball.sy, 7, 0, 2 * Math.PI);
      ctx.fill();
      ball.sx += ball.vx;
      ball.sy += ball.vy;
      if (ball.sx < 0 || ball.sx > 850) {
        ball.vx = -ball.vx;
      }
      if (ball.sy < 0 || ball.sy > 420) {
        ball.vy = -ball.vy;
      }
      if (Math.abs(ball.sx - mouse.x) < 7 && Math.abs(ball.sy - mouse.y) < 7) {
        fallmuc.play();
        imgcheep.style.display = "block";
        gameOver();
      }
      if (balls.length == 60){
        winner();
      }
    }
  }
}


function gameOver() {
  alert(`LOOOOSE`);
  alert(`YOU HELD ON FOR ${balls.length} s`);
  balls = [];
  run = false;
  clearInterval(ballId);
  clearInterval(drawId);
  btnstart.disabled = false;

}


function winner(){
  balls = [];
  imgood.style.display = "block";
  alert(`YOU WIIIIIN!!!  GOT 100SECONDS!! `);
    run = false;
    clearInterval(ballId);
    clearInterval(drawId);
    btnstart.disabled = false;
}

