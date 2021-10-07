var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var btnstart = document.getElementById('btnstart');
var beginmuc = new Audio ('img/begin.mp3');
var fallmuc = new Audio ('img/fall_2.mp3');
let ballId = null;
let drawId = null;

let imgood = document.getElementById("good");


const cRect = canvas.getBoundingClientRect(); //方法返回元素的大小及其相对于视口的位置。矩形盒子。
let balls = [];
let run = false;

canvas.width = 800;
canvas.height = 550;

const mouse = { x: 0, y: 0 };

btnstart.onclick = function(){
  run = true;
  beginmuc.play();
  draw();
  newball();
   ballId = setInterval(newball, 1000);
   drawId = setInterval(draw, 2);
  console.log('click');
}

// function btnstart(){
//   btnstart.innerHTML = 'Start';
//   btnstart.setAttribute ('id', 'btnstart');
// }
// function btnreset (){
//   btnstart.innerHTML = 'Reset';
//   btnstart.setAttribute ('id' , 'btnreset');
// }

// btnreset.onclick = function(){
//   run = true;
//   draw();
//   newball();
//    ballId = setInterval(newball, 1000);
//    drawId = setInterval(draw, 2);
//   console.log('click');
// }

// btnstart.addEventListener('click', function(){
//   if(btnstart.innerHTML === 'Start') {
//     btnstart();
//   } else{
//     btnreset();
//   }
// })

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function newball() {
  balls.push({
    sx: 799,
    sy: 549,
    vx: random(1, 2.5),
    vy: random(1, 2),
  });
}

function randomColor() {
  return (
    "rgb(" +
    random(0, 255) +
    ", " +
    random(0, 255) +
    ", " +
    random(0, 255) +
    ")"
  );
}

window.addEventListener("mousemove", function (evt) {
  const x = evt.clientX - cRect.left;
  const y = evt.clientY - cRect.top;
  if (x < 800 && x > 0 && y < 550 && y > 0) {
    mouse.x = x;
    mouse.y = y;
  }
});

function draw() {
  console.log(run);
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
      if (ball.sx < 0 || ball.sx > 800) {
        ball.vx = -ball.vx;
      }
      if (ball.sy < 0 || ball.sy > 550) {
        ball.vy = -ball.vy;
      }
      if (Math.abs(ball.sx - mouse.x) < 4 && Math.abs(ball.sy - mouse.y) < 4) {
        fallmuc.play();
        gameOver();
      }
      if (balls.length == 5){
        winner();
      }
    }
  }
}


function gameOver() {
  balls = [];
  alert(`gameover YOU HELD ON FOR ${balls.length} s`);
  run = false;
  clearInterval(ballId);
  clearInterval(drawId);
}


function winner(){
  balls = [];
  imgood.style.display = "block";
    run = false;
    clearInterval(ballId);
    clearInterval(drawId);
    alert(`YOU WIIIIIN!!!  GOT 100SECONDS!! `);

}

