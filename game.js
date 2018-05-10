const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let radius = 15;
let unit = 30;
let apple = new Apple(generateRandom(1, 29) * unit + 15, generateRandom(3, 29)  * unit + 15, radius);
let score = 0;
let snake = [{x:14 * unit, y: 20 * unit}];
let direction = "up";


function generateRandom(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return (num === 0) ? generateRandom(min, max) : num;
}

function draw() {

  ctx.clearRect( 0, 0, 900, 900);


  scoreDraw();
  scoreLine();
  apple.draw();
  snakeDraw();
  appleCollision();

}

document.onkeydown = function(e) {
  switch(e.keyCode) {
    case 37: if (direction !== "right") 
    {
      direction = "left";
    } else {}
      break;
    case 38:  if (direction !== "down") 
    {
      direction = "up";
    } else {}
      break;
    case 39:  if (direction !== "left") 
    {
      direction = "right";
    } else {}
      break;
    case 40:  if (direction !== "up") 
    {
      direction = "down";
    } else {}
      break;
  }
};


function snakeDraw() {

  ctx.lineWidth = 1;

  snakeDirection(direction);

  for (let i = 0; i < snake.length; i++) {
    console.log(i);

    ctx.fillStyle = "rgb(" + Math.random()*256 + "," + Math.random()*256 + "," + Math.random()*256 + ")";

    ctx.fillRect(snake[i].x,snake[i].y, unit, unit);
    console.log(snake, snake[i].x,snake[i].y, unit, unit, i);
    ctx.strokeStyle = "black";
    ctx.strokeRect(snake[i].x,snake[i].y, unit, unit);
  
  }
}


 

function Apple(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;

  this.draw = function() {

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, 360);
    ctx.fill();

  };
}

function scoreDraw() {
  ctx.fillStyle = "white";
  ctx.font = "250% monospace";
  ctx.fillText("Score " + score,unit,2*unit);
}

function scoreLine() {
  ctx.strokeStyle = "#" + 458107;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 87);
  ctx.lineTo(900, 90);
  ctx.stroke();
}

function snakeDirection(direction) {

  switch(direction) {

    case "right": 
    
      if (snake[0].x === canvas.width - unit) 
          {  
           setTimeout(function(){ alert("GAME OVER"); }, 7);
            document.location.reload();
          }
      else  
          {
            snake.unshift({ x: snake[0].x += unit, y: snake[0].y});
          }
    break;

    case "down": 
    
        if (snake[0].y === canvas.height - unit) 
          {
            setTimeout(function(){ alert("GAME OVER"); }, 7);
            document.location.reload();
          }
        else 
          {
            snake.unshift({ x: snake[0].x, y: snake[0].y += unit});
          }
    break;

    case "up": 
    
        if (snake[0].y === 90 ) 
          {
            setTimeout(function(){ alert("GAME OVER"); }, 7);
            document.location.reload();
          }
        else 
          {
            snake.unshift({ x: snake[0].x, y: snake[0].y -= unit});
          }
    break;

    case "left": 
    
        if (snake[0].x === 0 ) 
          {
            setTimeout(function(){ alert("GAME OVER"); }, 7);
            document.location.reload();
          }
        else 
          {
            snake.unshift({ x: snake[0].x -= unit, y: snake[0].y});
          }
    break;
  }
}

function appleCollision() {
  
  
  if (snake[0].x === apple.x - radius &&  snake[0].y === apple.y - radius) {
    score += 1;
  }
  else {
  snake.pop();
  }

}

window.onload = function() {
setInterval (draw,100);
};