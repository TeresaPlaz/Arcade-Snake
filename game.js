const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let radius = 15;
let unit = 30;
let apple = new Apple(generateRandom(1, 29) * unit + 15, generateRandom(3, 29)  * unit + 15, radius);
let score = 0;
let snake = [{x:14 * unit, y: 20 * unit}];
let direction = "up";


  // generates a random number except zero to avoid issues with the canvas borders
function generateRandom(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return (num === 0) ? generateRandom(min, max) : num;
}

  // draw functions creates the animation by clearing the canvas and redrawing everything
function draw() {

  ctx.clearRect( 0, 0, canvas.width, canvas.height);


  scoreDraw();
  scoreLine();
  apple.draw();
  snakeDraw();
  appleCollision();
  snakeCollision();

}

  // function to get the pressed arrow key and change the direction of the snake
document.onkeydown = function(e) {

  switch(e.keyCode) {

    // the if conditions avoid to go the opposite of the current direction
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


  // function to draw the snake with a for loop going through the snake array of objects and getting the x and y coordinates
function snakeDraw() {

  // this is necessary to avoid the width of the green score line to affect the width of the black borders of the snake
  ctx.lineWidth = 1;

  // this function is being called here to set the new coordinates of the snake before drawing it on canvas
  snakeDirection(direction);

  // this for loop goes through the set coordinates of the snake and draws it
  for (let i = 0; i < snake.length; i++) {

    // fill style is set to random between the 3 variable numbers in the rgb
    ctx.fillStyle = "rgb(" + Math.random()*256 + "," + Math.random()*256 + "," + Math.random()*256 + ")";

    // goes through the i value in the loop and draws the x and y coordinates with the set unit for width and height
    ctx.fillRect(snake[i].x,snake[i].y, unit, unit);

    // black border gives a nicer look to the snake
    ctx.strokeStyle = "black";
    ctx.strokeRect(snake[i].x,snake[i].y, unit, unit);
  
  }
}


 
// this constructor function creates a new apple taking the x and y coordinates and the radius also
function Apple(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;

  // method function used to draw the apple
  this.draw = function() {

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(this.x, this.y, radius, 0, 360);
    ctx.fill();

  };
}

// function used to draw the Score text
function scoreDraw() {
  ctx.fillStyle = "white";
  ctx.font = "250% monospace";
  ctx.fillText("Score " + score,unit,2*unit);
}

// function used to draw the green line below the score
function scoreLine() {
  ctx.strokeStyle = "#" + 458107;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 87);
  ctx.lineTo(900, 90);
  ctx.stroke();
}

// this function takes the set direction of the snake a checks it to add or reduce the value of the x or y coordinates to make the movement of the snake. It does this by adding a new object in the first position "0" of the snake array, so it controls the head of the snake. It also takes the direction to check depending on it which border of the canvas it could crash and if the coordinates of the head of the snake based on the direction equal those of the proximate border, detects the collision and shows the "Game over" alert.
function snakeDirection(direction) {

  switch(direction) {

    case "right": 
    
      if (snake[0].x === canvas.width - unit) 
          {  
            alert("GAME OVER");

            // reloads the page after the alert is removed
            document.location.reload();
          }
      else  
          {
            // predefined function that adds a new object with new coordinates to the start of the snake array
            snake.unshift({ x: snake[0].x += unit, y: snake[0].y});
          }
    break;

    case "down": 
    
        if (snake[0].y === canvas.height - unit) 
          {
            alert("GAME OVER");
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
            alert("GAME OVER");
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
            alert("GAME OVER");
            document.location.reload();
          }
        else 
          {
            snake.unshift({ x: snake[0].x -= unit, y: snake[0].y});
          }
    break;
  }
}

// this function checks if the coordinates of the head of the snake (first object in the snake array) are equal to those of the current apple on the canvas, if so, detects the collision and adds 1 point to the score, generates a new apple and prevents the elimination of the last object in the snake array making the tail longer. If the collision doesn't occur it elilminates the last object of the snake array preventing it from growing
function appleCollision() {
  
  
  if (snake[0].x === apple.x - radius &&  snake[0].y === apple.y - radius) {

    score += 1;

    // generates a new apple object with random x and y values and a set radius
    apple = new Apple(generateRandom(1, 29) * unit + 15, generateRandom(3, 29)  * unit + 15, radius);
  }
  else {
  // predefined function that eliminates the last element of the snake array
  snake.pop();
  }

}

// this function uses a for loop to check the coordinates of the head of the snake (first object in the array) and compare it with the following objects (the tail) starting from the second because if it starts at zero it will collision from the start with itself and it's impossible to crash with the second object(square) so it starts from the third object in the array. If the coordinates of the head equals the coordinates of the proximate object it detects the collision and pops the "Game over" alert 
function snakeCollision() {

  for (i = 2; i < snake.length; i++) {

    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      
      alert("GAME OVER");

      // reloads the page after the alert is removed
      document.location.reload();

    }
  }

}

// when the page is loaded this function calls the draw function and this one calls the other functions and starts the game. The set interval calls the draw function every 0.1 seconds
window.onload = function() {
setInterval (draw,100);
};