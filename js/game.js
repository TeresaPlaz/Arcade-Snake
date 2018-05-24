const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// set apple radius
let radius = 15;

// set amount of pixels for positioning
let unit = 30;

// first apple
let apple = new Apple(generateRandom(1, 35) * unit + 15, generateRandom(3, 25)  * unit + 15, radius);

// initial score
let score = 0;

//starting position of the snake
let snake = [{x:14 * unit, y: 20 * unit}];

//initial direction of the snake
let direction = "up";


  // generates a random number except zero to avoid issues with the canvas borders
function generateRandom(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return (num === 0) ? generateRandom(min, max) : num;
}

  // draw function creates the animation by clearing the canvas and redrawing everything while also keeping active the event listeners
function draw() {

  ctx.clearRect( 0, 0, canvas.width, canvas.height);

  arrowKeys();
  scoreDraw();
  scoreLine();
  apple.draw();
  snakeDraw();
  appleCollision();
  snakeCollision(); 
  slowMotion();
      
}

  // function to get the pressed arrow key and change the direction of the snake (see else)
function arrowKeys() {

  // before the score hits 3 and after it goes over 9, the keyboard has the normal functions
    if (score < 3 || score >= 9 && score < 12) {

      document.onkeydown = function(e) {

            switch(e.keyCode) {

              // the if conditions avoid to go the opposite of the current direction
              case 37: if (direction !== "right") 
              {

                // setTimeout is used to avoid going the opposite direction if you hit the keys too fast
               setTimeout(function() {direction = "left";}, 80); 
              }
                break;
              case 38:  if (direction !== "down") 
              {
                 setTimeout(function() {direction = "up";}, 80); 
              }
                break;
              case 39:  if (direction !== "left") 
              {
                 setTimeout(function() {direction = "right";}, 80); 
              }
                break;
              case 40:  if (direction !== "up") 
              {
                 setTimeout(function() {direction = "down";}, 80); 
              }
                break;
              case 83:    gameOn.play();
              break;
            }
          };

  }

  // when the score goes over 3 and before it hits 9, the arrow keys are inverted
  else if (score >= 3 && score <= 8) {

    // this inverts the direction from the pressed arrow keys after 3 eaten apples and switches back at 6 
      document.onkeydown = function(e) {

        switch(e.keyCode) {
      
          case 37: if (direction !== "left") 
          {
            setTimeout(function() {direction = "right";}, 80);
          }
            break;
          case 38:  if (direction !== "up") 
          {
             setTimeout(function() {direction = "down";}, 80);
          }
            break;
          case 39:  if (direction !== "right") 
          {
             setTimeout(function() {direction = "left";}, 80);
          }
            break;
          case 40:  if (direction !== "down") 
          {
             setTimeout(function() {direction = "up";}, 80);
          }
            break;
        }
      };

    }

    // to increase difficulty, when the score goes over 12 and before it hits 20, the keys start turning in a clockwise manner
   else if ( score >= 12 && score <= 20) {

    document.onkeydown = function(e) {

      switch(e.keyCode) {
    
        case 37: if (direction !== "up") 
        {
          setTimeout(function() {direction = "down";}, 80); 
        }
          break;
        case 38:  if (direction !== "right") 
        {
          setTimeout(function() {direction = "left";}, 80); 
        }
          break;
        case 39:  if (direction !== "down") 
        {
         setTimeout(function() {direction = "up";}, 80);
        }
          break;
        case 40:  if (direction !== "left") 
        {
          setTimeout(function() {direction = "right";}, 80);
        }
          break;
      }
    };

   } 
}

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


 
// this constructor function creates a new apple taking the x and y coordinates and the radius
function Apple(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;

  // method function used to draw the apple
  this.draw = function() {

    // conditions used to show when the keys change functionality

    // blue changes the keys, gold gets them back to normal and red doesn't change anything
    if (score === 2 || score === 11 ) { ctx.fillStyle = "blue";} 
    else if (score === 8 || score === 19) {ctx.fillStyle = "#ccac00";}
    else{ctx.fillStyle = "red";}
    
    // apple draw
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
  ctx.lineTo(canvas.width, 90);
  ctx.stroke();
}

// this function takes the set direction of the snake a checks it to add or reduce the value of the x or y coordinates to make the movement of the snake. It does this by adding a new object in the first position ("0") of the snake array, so it controls the head of the snake. It also takes the direction to check, depending on it, which border of the canvas it could crash and if the coordinates of the head of the snake based on the direction equal those of the proximate border, detects the collision and shows the "GAME OVER" screen.
function snakeDirection(direction) {

  switch(direction) {

    case "right": 
    
    // collision detection with right border
      if (snake[0].x === canvas.width - unit) 
          {  
            gameOver();
          }
      else  
          {
            // predefined function that adds a new object with new coordinates to the start of the snake array
            snake.unshift({ x: snake[0].x += unit, y: snake[0].y});
          }
    break;

    case "down": 
    
     // collision detection with bottom border
        if (snake[0].y === canvas.height - unit) 
          {
            gameOver();
          }
        else 
          {
            snake.unshift({ x: snake[0].x, y: snake[0].y += unit});
          }
    break;

    case "up": 
          
          // collision detection with upper border, which in this case is the score line, not the canvas border
        if (snake[0].y === 90) 
          {
            gameOver();
          }
        else 
          {
            snake.unshift({ x: snake[0].x, y: snake[0].y -= unit});
          }
    break;

    case "left": 
    
          // collision detection with left border
        if (snake[0].x === 0) 
          {
            gameOver();
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

    // apple eaten sound
    eatSound.play();

    // generates a new apple object with random x and y values and a set radius
    apple = new Apple(generateRandom(1, 35) * unit + 15, generateRandom(3, 25)  * unit + 15, radius);
  }
  else {
  // predefined function that eliminates the last element of the snake array
  snake.pop();
  }

}

// this function uses a for loop to check the coordinates of the head of the snake (first object in the array) and compare it with the following objects (the tail) starting from the second because if it starts at zero it will collision from the start with itself and it's impossible to crash with the second object(square) so it starts from the third object in the array. If the coordinates of the head equals the coordinates of the proximate object it detects the collision and shows the "GAME OVER" screen. 
function snakeCollision() {

  for (i = 2; i < snake.length; i++) {

    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      
     snake = snake.slice(0,1);
      gameOver();
    }
  }
}


  // function used to make a slow motion power. It takes the variable used to set the frames per second of the animation and changes it to an upper       value that makes the game go slower for 10 seconds. Works with the "R" key and only when score is a 5 multiple.
function slowMotion() {
  
  document.onkeyup = function(e) {

    // condition to check if score is a multiple of 5
    if (score % 5 === 0) {

    // checks if player hits the "R" key
    if (e.keyCode === 82) {

        // set frames per second to 500 which makes the game almost 5 times slower
        fps = 500;

        // after 10 seconds sets the speed back to the original
        setTimeout(function(){fps = 115;},10000);
      }
    }
  };
}

// when the page is loaded this function calls the startGame function and this one shows the first screen and after that calls the other functions and starts the game. 
window.onload = function() {

  startGame();
};