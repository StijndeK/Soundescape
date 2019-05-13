class Gameplay
{
  constructor(questions)
  {
    frameRate(60);

    // Initialize camera
    this.camera = new Camera();

    // Initialize questions
    this.questions = questions;
    this.currentQuestion = 0;

    // Initialize map
    this.map = new TileMap();
    this.map.addTile(0, 0);
    this.map.addTile(0, 1);
    this.map.generateQuestion(0, 0, 1);

    // Initialize player and monster
    this.player = new Character(0, 0, color(0, 128, 0));
    this.monster = new Character(0, 100, color(255, 0, 0));
    this._lastPlayerDirection = this.player.direction;

    // Current tile
    this.playerTile = null;
    this._lastPlayerTile = this.playerTile;

    // set which is right awnser, for now just set it to one
    this.wrongAwnser = int(random(2));
    print(this.wrongAwnser);

    // player only plays once Check
    this.playerMoved = 0;

    // move player
    this.moveLeft = 0;
    this.moveRight = 0;

    // speedvariable
    this.speedVar = height / 700.0;

    // distance for junction
    this.junctionDistance = height / 5

    // score
    this.score = 0;

    // print(this.questions[this.currentQuestion].getAnswer())
  }

  keyPressed()
  {
    if (key === 'a') {
      this.player.direction -= 90;
    }
    if (key === 'd') {
      this.player.direction += 90;
    }

    // check if movement is possible
    if (this.squareLength + this.junctionDistance > this.playerY && this.squareLength < this.playerY && this.playerMoved === 0)
    {
      this.playerMoved = 1;
      if (key == 'a') {
        this.player.direction -= 90;
        this.moveLeft = 1;
        this.questions[this.currentQuestion].answer(0);
      }
      if (key == 'd') {
        this.player.direction += 90;
        this.moveRight = 1;
        this.questions[this.currentQuestion].answer(1);
      }
    }
  }

  resetMap()
  {
    this.squareLength = 0;
    this.x = width / 2 ;
    this.playerX = this.x;
    this.currentQuestion++;
    this.playerMoved = 0;

  }

  gameOver()
  {
    this.squareLength = 0;
    this.x = width / 2 ;
    this.playerX = this.x;
    this.playerMoved = 0;

    this.questions[this.currentQuestion].timer = 0;

    console.log('GAMEOVER');
  }

  // Draw function
  draw()
  {
    // scale(windowWidth/800);
    background(0);

    // Begin drawing the camera
    this.camera.beginDraw();

    // Draw the map
    this.map.draw();

    // Draw player and monster
    this.player.draw();
    this.monster.draw();

    /*

    // draw obstacle
    rect(this.squareX - (width/32/2), this.squareY, width/32, this.squareLength);

    // draw lanes
    rect(width / 4, this.squareLength + this.junctionDistance, width / 8, height - this.squareLength);
    rect((width / 8) * 5, this.squareLength + this.junctionDistance, width / 8, height - this.squareLength);

    // draw borders
    rect(0, 0, width / 4, height);
    rect(width - width / 4, 0, width / 4, height);

    // draw score
    textSize(width/50);
    fill(255, 255, 255);
    text(this.score, (width / 8) * 7, 200);

    // Draw the question
    this.question.draw();

    // If the question is answered
    if (this.question.givenAnswer !== null)
    {
      if (this.question.givenAnswer === this.question.correctAnswer)
        fill("green");
      else
        fill("red");
      circle(width / 2, this.squareLength - height / 4, height / 8);
    }

    // reset map after lane has been chosen
    if (this.squareLength > (height * 1.2)) {
      this.resetMap();
    }

    // check for collision with obstacle
    if (this.squareLength >= this.playerY && this.playerMoved == 0) {
      this.gameOver();
    }

    textSize(width/50);
    fill(255, 255, 255);
    text('Welke toon klinkt hoger?', 0, 50);*/

    // End drawing the camera
    this.camera.endDraw();
  }

  // Update function
  update()
  {
    // Update the map
    this.map.update();

    // Update the camera
    this.camera.update();

    // Update the player and monster
    this.player.update();
    this.monster.update();

    // Update the camera position
    this.camera.x = -this.player.x;
    this.camera.y = -this.player.y;
    if (this.player.direction !== this._lastPlayerDirection)
      this.camera.doRotateDelta(this._lastPlayerDirection - this.player.direction, 20);
    this._lastPlayerDirection = this.player.direction;

    // Update current tile
    this.playerTile = this.map.getPlayerTile(this.player.x, this.player.y);
    if (this.playerTile !== this._lastPlayerTile)
    {
      if (this.playerTile !== null && this.playerTile.trigger !== null)
        this.playerTile.trigger(this.playerTile);
    }
    this._lastPlayerTile = this.playerTile;

    // update speed
    if (this.speedVar < 2) {
      this.speedVar = height / (700.0 - (this.currentQuestion * 50));
    }

    // check movement
    if (this.moveLeft === 1 && this.squareLength+(this.junctionDistance/2) > this.playerY) {
      this.playerX = this.playerX - width / 8;
      this.moveLeft = 0;
      // move monster
      if (this.questions[this.currentQuestion].getAnswer() == 1) {
        this.y = this.y - 40;
      }
      else if (this.y > height) {
        this.y = this.y + 40;
      }

      // update score
      if (this.questions[this.currentQuestion].getAnswer() ==  0) {
        this.score++;
      }
    }
    if (this.moveRight === 1 && this.squareLength+(this.junctionDistance/2) > this.playerY) {
      this.playerX = this.playerX + width / 8;
      this.moveRight = 0
      // move monster
      if (this.questions[this.currentQuestion].getAnswer() == 0) {
        this.y = this.y - 40;
      }
      else if (this.y > height) {
        this.y = this.y + 40;
      }

      // update score
      if (this.questions[this.currentQuestion].getAnswer() ==  1) {
        this.score++;
      }
    }

    // move obstacle
    this.squareLength = this.squareLength + (1 * this.speedVar);

    // Update the question
    this.question = this.questions[this.currentQuestion];
    this.question.sampleInterval = int(60 / this.speedVar);
  }
}
