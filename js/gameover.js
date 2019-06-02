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

    print(selectedGameChoice)
  }

  // Draw function
  draw()
  {
    background(0);

    fill(255);
    textAlign(CENTER);

    // Game over info
    textSize(width/30);
    text('GAME OVER', width / 2 ,height/10);
    textSize(width/40);
    text('Press the r key to play again', width / 2, height/10*2);

    // SCORE
    textSize(width/50);
    var score = ['Score: ', this.score];
    var separator = ' ';
    text(join(score, separator), width / 2, height/10*3);
    var rightWrong = ['Right / Wrong: ', this.right, '/' , this.wrong];
    text(join(rightWrong, separator), width / 2, height/10*3.5);

    // JND
    var justNoticableDifference;
    if (selectedGameChoice === 1)
      justNoticableDifference = ['Just noticable difference: ', pitchIntervals[this.currentQuestion] * 5, 'Hz'];
    else if (selectedGameChoice === 2)
      justNoticableDifference = ['Just noticable difference: ', tempoIntervals[this.currentQuestion], 'bpm'];
    else if (selectedGameChoice === 3)
      justNoticableDifference = ['Just noticable difference: ', overtoneIntervals[this.currentQuestion], 'overtone'];
    text(join(justNoticableDifference, separator), width / 2, height/10*4);
  }

  // Update function
  update()
  {
  }

  // Key press function
  keyPressed()
  {
    if (key === 'r')
    {
      this.newGame = true;
    }
  }
}
