
// get spans used in HTML to separate the "GAME OVER" letter to make them an HTML collection and manipulate them separately
let spans = document.getElementsByTagName("span");

// game sounds
let gameOn = new Sound("./sounds/background.mp3");
let eatSound = new Sound("./sounds/eat.mp3");
let gameOverSound = new Sound("./sounds/GameOver.mp3");
let crashSound = new Sound("./sounds/collision.mp3");
let rPowerSound = new Sound("./sounds/power.mp3");

// initial game speed
let fps = 115;

let isPlaying = true;

// this function activates the game over sounds, set the display to block so the div shows on the screen, activates the spanColors function and takes any key input to refresh the page
function gameOver() {

  // this was necessary to avoid the gameOver function from being called over and over when the snake collision with the borders and stays there
  snake = 0;

  // stops the background music of the game
  gameOn.stop();

  // activates the crash sound
  crashSound.play();

  // the setTimeout is used to separate the crash sound and the game over sound by a second
  setTimeout( function () {gameOverSound.play();},1000);

  // shows the game over screen 
  document.getElementById("gameOver").style.display = "block";

  spanColors();

  document.querySelector(".score").innerHTML += score;


  // this functions loops over the "GAME OVER" letters using the saved HTML collection set before and switching their colors
  function spanColors() {
    for (i = 0; i < spans.length; i++) {

      spans[i].style.color = "rgb(" + Math.random()*256 + "," + Math.random()*256 + "," + Math.random()*256 + ")";
  }

  // animates the letters color changes
  setTimeout( function () {spanColors();},100);

  // takes any key input to refresh the page
  document.onkeydown = function() {
    document.location.reload();};
}
}

// this function takes a key input and if the player hits the "enter" key, the first screen goes hidden and the legend screen shows. It also activates the game background music, makes it a loop music, takes a key input again to hide the legend screen and makes a function to animate the game calling itself over and over
function startGame ()
{

 document.onkeydown = function(e) {
    

  // takes a key input and checks if it's "enter" to activate the function 
    if (e.keyCode === 13) {

      // hides the starting screen

      startScreen.style.display = "none";  

      // shows the legend screen
      document.getElementById("legend").style.display = "block";

      // activates game background music
      gameOn.play();

      // sets the music to loop
      gameOn.sound.loop = true;

      // takes a key input to hide the legend screen and start the game
      document.onkeydown = function() {

        // hides legend screen
        document.getElementById("legend").style.display = "none";

           // The setTimeout calls the draw function every 0.115 seconds
        function timeOut() {
            setTimeout(function () {
            draw();
            timeOut();
          }, fps);
        }
        timeOut();
      };
     }
     
  };
}

// constructor function used to make a manipulate sounds in the game
function Sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
      this.sound.play();
  };
  this.stop = function(){
      this.sound.pause();
  };
}
