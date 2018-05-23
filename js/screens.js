let spans = document.getElementsByTagName("span");
let gameOn = new Sound("./sounds/background.mp3");
let eatSound = new Sound("./sounds/eat.mp3");
let gameOverSound = new Sound("./sounds/GameOver.mp3");
let crashSound = new Sound("./sounds/collision.mp3");
let fps = 110;
function gameOver() {

  snake = 0;
  gameOn.stop();
  crashSound.play();
  setTimeout( function () {gameOverSound.play();},1000);
  document.getElementById("gameOver").style.display = "block";
  spanColors();


  function spanColors() {
    for (i = 0; i < spans.length; i++) {

      spans[i].style.color = "rgb(" + Math.random()*256 + "," + Math.random()*256 + "," + Math.random()*256 + ")";
  }

  setTimeout( function () {spanColors();},100);

  document.onkeydown = function() {
    document.location.reload();};
}
}

function startGame() {

 document.onkeydown = function(e) {

    if (e.keyCode === 83) {
    gameOn.play();
    gameOn.sound.loop = true;
    }

    if (e.keyCode === 13) {
      document.getElementById("startScreen").style.display = "none";    
      document.getElementById("Legend").style.display = "block";

      document.onkeydown = function() {

        document.getElementById("Legend").style.display = "none";
           // The set interval calls the draw function every 0.1 seconds
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