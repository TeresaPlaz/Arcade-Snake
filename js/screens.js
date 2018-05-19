let spans = document.getElementsByTagName("span");
let gameOn = new Sound("./sounds/background.mp3");
let eatSound = new Sound("./sounds/eat.mp3");
let gameOverSound = new Sound("./sounds/GameOver.mp3");
let crashSound = new Sound("./sounds/collision.mp3");

function gameOver() {

  gameOn.stop();

  document.getElementById("gameOver").style.display = "block";

  for (i = 0; i < spans.length; i++) {

  spans[i].style.color = "rgb(" + Math.random()*256 + "," + Math.random()*256 + "," + Math.random()*256 + ")";
}

  document.onkeydown = function() {
  document.location.reload();};

 setTimeout(function () {gameOver();},100);
}

function startGame() {

 document.onkeydown = function(e) {

    if (e.keyCode === 83) {
    gameOn.play();
    gameOn.sound.loop = true;
    }

    if (e.keyCode === 13) {
      document.getElementById("startScreen").style.display = "none";    
      
      // The set interval calls the draw function every 0.1 seconds
      setInterval (draw,100);}
  };
}

function Sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  this.sound.volume = 0.1;
  document.body.appendChild(this.sound);
  this.play = function(){
      this.sound.play();
  };
  this.stop = function(){
      this.sound.pause();
  };
}