// Game over screen
class GameOver
{
  constructor(game)
  {
    this.newGame = false;

    // Copy the score etc.
    this.score = game.score;

    // Sounds
    gameOverSound.play();
  }

  // Draw function
  draw()
  {
    background(0);

    fill(255);
    textAlign(LEFT);
    textSize(width/8);
    text('GAME OVER', 0 ,height/2);
    text(this.score, 0, height/4*3);
    text('press r to play again', 0, height/4);
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
