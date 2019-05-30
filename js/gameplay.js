// Gameplay class
class Gameplay
{
  constructor(questions)
  {
    frameRate(60);

    // check if screen is turned
    this.turned = 0;

    // Initialize questions
    this.questions = questions;
    this.currentQuestion = 0;

    // Initialize camera
    this.camera = new Camera();

    // Initialize objects
    this.map = new TileMap(this);
    this.player = new Player(this, 0, 0);
    this.monster = new Monster(this, 0, 100);

    // Generate the first question
    this.generateQuestion(Coord.ORIGIN, Direction.NORTH);

    // Current tile
    this.playerTile = null;
    this._lastPlayerTile = this.playerTile;

    // Score
    this.score = 0;
    this.gameOver = 0;
    this.rightAwnsers = 0;
    this.wrongAwnsers = 0;

    // sounds
    this.gameOverSound = loadSound('assets/gameOver.wav');
    this.levelMusic = loadSound('assets/beat.wav');
    this.levelMusic.setVolume(0.05);
  }


  // Draw function
  draw()
  {
    background(0);
    textAlign(LEFT);

    // check if game over
    if (this.gameOver == 1){
      textSize(width/8);
      text('GAME OVER', 0 ,height/2);
      text(this.score, 0, height/4*3);
      text('press r to play again', 0, height/4);
    }
    else {
      // Begin drawing the camera
      this.camera.beginDraw();

      // Draw objects
      this.map.draw();
      this.player.draw();
      this.monster.draw();

      // End drawing the camera
      this.camera.endDraw();

      // score
      textSize(width/40);
      fill(255, 255, 255);
      text('Welke toon klinkt hoger?', 20, 40);
      textSize(width/50);
      textAlign(RIGHT);
      text('SCORE:', width-(width/8), 40);
      text(this.score, width-(width/40), 40);
      text('RIGHT AWNSERS:', width-(width/8), 80);
      text(this.rightAwnsers, width-(width/40), 80);
      text('WRONG AWNSERS:', width-(width/8), 120);
      text(this.wrongAwnsers, width-(width/40), 120);
    }

    // Draw the question
    this.question.draw();
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
  }

  // Update function
  update()
  {
    // Update the camera
    this.camera.update();

    // Update the objects
    this.map.update();
    this.player.update();
    this.monster.update();

    // Update the camera position
    this.camera.x = -this.player.x;
    this.camera.y = -this.player.y;

    // Update current tile
    this.playerTile = this.map.getPlayerTile(this.player.x, this.player.y);
    if (this.playerTile !== this._lastPlayerTile)
    {
      if (this.playerTile !== null && this.playerTile.trigger !== null)
        this.playerTile.trigger(this.playerTile);
      // update score
      if (this.gameOver == 0)
        this.score++;
    }
    this._lastPlayerTile = this.playerTile;

    // check monster on player
    if (playerX <= this.monster.x + 2 && playerX >= this.monster.x - 2 && playerY <= this.monster.y + 2 && playerY >= this.monster.y - 2) {
      this.gameOver = 1;
      this.gameOverSound.play();
    }

    /*// check movement
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

    // Update the question
    this.question = this.questions[this.currentQuestion];
    this.question.sampleInterval = int(60 / this.speedVar);*/

    // check if a decision is made, otherwise game over
    if (this.playerTile == null) {
      this.gameOver = 1;
    }

    // Update the question
    this.question = this.questions[this.currentQuestion];
    this.question.sampleInterval = 50;
  }

  // Key press event
  keyPressed()
  {
    if (key === 'a')
    {
      // move left if possible
      if (this.map.getPlayerAdjacentTile(this.player.x, this.player.y, this.player.direction) != null) {

        // give awnser
        this.questions[this.currentQuestion].answer(0);

        // move monster
        if (this.questions[this.currentQuestion].getAnswer() == 0) {
          print('MOVEDOWN')
          this.monster.moveDown();
          this.rightAwnsers++;
        }
        else {
          print('MOVEUP')
          this.monster.moveUp();
          this.wrongAwnsers++;
        }

        // next question
        this.currentQuestion++;

        // Rotate the player
        this.player.moveLeft();
        this.monster.moveLeft();
      }
    }

    if (key === 'd')
    {
      // move right if possible
        if (this.map.getPlayerAdjacentTile(this.player.x, this.player.y, this.player.direction) != null) {

          // give awnser
          this.questions[this.currentQuestion].answer(1);

          // move monster
          if (this.questions[this.currentQuestion].getAnswer() == 1) {
            print('MOVEDOWN')
            this.monster.moveDown();
            this.rightAwnsers++;
          }
          else {
            print('MOVEUP')
            this.monster.moveUp();
            this.wrongAwnsers++;
          }
          // next question
          this.currentQuestion++;

          // Rotate the player
          this.player.moveRight();
          this.monster.moveRight();
        }
    }

    if (key === 's')
    {
      // when right awnser
      this.monster.moveDown();
      this.levelMusic.loop();
    }

    if (key === 'w')
    {
      // when wrong awnser
      this.monster.moveUp();
    }
    if (key === 'r')
    {
      // refresh
      window.location.reload();
    }
    /*
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
    }*/

    // check if movement is possible
  }

  // Event when the player moves left
  onPlayerMoveLeft(e)
  {
    // Answer the question
    // this.currentQuestion.answer(0);

    // Rotate the camera
    this.camera.doRotateDelta(90, 20);
  }

  // Event when the player moves right
  onPlayerMoveRight(e)
  {
    // Answer the question
    // this.currentQuestion.answer(1);

    // Rotate the camera
    this.camera.doRotateDelta(-90, 20);
  }

  // Generate a new question
  generateQuestion(position, direction, baseLength = 6, baseWidth = 2)
  {
    let newTiles = [];

    // set fasing
    fased = (this.turned == 0) ? ((this.onX == 1) ? 1 : 0) : ((this.onX == 1) ? 0 : 1)

    // Add base
    for (let i = 0; i < baseLength + 1; i ++) {
      newTiles.push(new Tile(position.add({x: 0, y: i, direction: direction})));
      // TODO teken muur
      // newTiles.push(new Tile(position.add({x: 1, y: i, direction: direction})));
      // newTiles.push(new Tile(position.add({x: -1, y: i, direction: direction})));
    }

    // set fasing
    fased = (this.turned == 0) ? ((this.onX == 1) ? 0 : 1) : ((this.onX == 1) ? 1 : 0)
    // Add first branches with triggers
    let leftPosition = position.add({x: -1, y: baseLength, direction: direction});
    let leftNewPosition = position.add({x: -(baseWidth + 1), y: baseLength, direction: direction});
    newTiles.push(new Tile(leftPosition, tile => {
      this.generateQuestion(leftNewPosition, Direction.left(direction));
      this.map.removeTiles(newTiles);
    }));

    let rightPosition = position.add({x: 1, y: baseLength, direction: direction});
    let rightNewPosition = position.add({x: baseWidth + 1, y: baseLength, direction: direction});
    newTiles.push(new Tile(rightPosition, tile => {
      this.generateQuestion(rightNewPosition, Direction.right(direction));
      this.map.removeTiles(newTiles);
    }));

    // update turned
    this.turned = (this.turned == 0) ? 1 : 0;

    // Add branches
    for (let i = 1; i < baseWidth; i ++)
    {
      newTiles.push(new Tile(position.add({x: i + 1, y: baseLength, direction: direction})));
      newTiles.push(new Tile(position.add({x: -(i + 1), y: baseLength, direction: direction})));
    }

    // Add the tiles
    this.map.addTiles(newTiles);
  }
}
