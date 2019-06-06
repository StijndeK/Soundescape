// Game over screen
class GameOver
{
  constructor(game)
  {
    this.newGame = false;

    // Copy the score etc.
    this.score = game.score;
    this.right = game.rightAnswers;
    this.wrong = game.wrongAnswers;
    this.currentQuestion = game.currentQuestion;

    // Sounds
    gameOverSound.play();

    // images
    this.gameOverImage = loadImage('assets/Game Over.png')
  }

  // Draw function
  draw()
  {
    background(0);

    fill(255);
    textAlign(CENTER);
    imageMode(CENTER);


    // Game over info
    textSize(width/30);

    // image
    image(this.gameOverImage, width / 2 , height/10*2, width/4.5, height / 3);

    textSize(width/40);
    text('Druk op de r toets om opnieuw te spelen', width / 2, height/10*5);

    // SCORE
    textSize(width/50);
    var score = ['Score: ', this.score];
    var separator = ' ';
    text(join(score, separator), width / 2, height/10*6);
    var rightWrong = ['Goed / Fout: ', this.right, '/' , this.wrong];
    text(join(rightWrong, separator), width / 2, height/10*6.5);

    // JND
    var justNoticableDifference;
    if (selectedGameChoice === 1)
      justNoticableDifference = ['Just noticable difference: ', pitchIntervals[this.currentQuestion] * 5, 'Hz'];
    else if (selectedGameChoice === 2)
      justNoticableDifference = ['Just noticable difference: ', tempoIntervals[this.currentQuestion] * 10, 'ms'];
    else if (selectedGameChoice === 3)
      justNoticableDifference = ['Just noticable difference: ', overtoneIntervals[this.currentQuestion] * 250, 'Hz'];
    text(join(justNoticableDifference, separator), width / 2, height/10*7);
  }

  // Update function
  update()
  {
  }

  // Key press event
  keyPressed()
  {
    if (key === 'r')
    {
      // werkt niet dus maar voor nu refreshen
      // this.newGame = true;
      window.location.reload();
    }
  }

  // Mouse press event
  mousePressed()
  {
  }
}
