let spans = document.getElementsByTagName("span");

function gameOver() {

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
    if (e.keyCode === 13) {
      document.getElementById("startScreen").style.display = "none";

      // The set interval calls the draw function every 0.1 seconds
      setInterval (draw,100);}
  };
}