// Game screen
class Game
{
  constructor(questions)
  {
    // Initialize questions
    this.questions = questions;
    this.currentQuestion = 0;

    // Initialize camera
    this.camera = new Camera();

    // Initialize map
    this.map = new TileMap(this);

    // Initialize player
    this.player = new Player(this, 0, 0);

    // Initialize monster
    this.monsterDistance = 100;
    this.monster = new Monster(this, 0, this.monsterDistance);

    // Generate the first question
    this.generateQuestion(Coord.ORIGIN, Direction.NORTH);

    // Score
    this.score = 0;
    this.gameOver = false;
    this.rightAnswers = 0;
    this.wrongAnswers = 0;

    // Sounds
    this.levelMusic = loadSound('assets/beat.wav');
    this.levelMusic.setVolume(0.05);
  }

  // Draw function
  draw()
  {
    background(0);

    // Begin drawing the camera
    this.camera.beginDraw();

    // Draw the map
    this.map.draw();

    // Draw the player
    this.player.draw();

    // Draw the monster
    this.monster.draw();

    // End drawing the camera
    this.camera.endDraw();

    // HUD
    textAlign(LEFT);
    textSize(width/40);
    fill(255, 255, 255);
    text('Welke toon klinkt hoger?', 20, 40);
    textSize(width/50);
    textAlign(RIGHT);
    text('SCORE:', width-(width/8), 40);
    text(this.score, width-(width/40), 40);
    text('RIGHT ANSWERS:', width-(width/8), 80);
    text(this.rightAnswers, width-(width/40), 80);
    text('WRONG ANSWERS:', width-(width/8), 120);
    text(this.wrongAnswers, width-(width/40), 120);
  }

  // Update function
  update()
  {
    // Update the camera
    this.camera.update();

    // Update the map
    this.map.update();

    // Update the player
    this.player.update();

    // Update the monster
    this.monster.update();

    // Update velocity of the monster
    if (this.monster.manhattanDistanceTo(this.player) === this.monsterDistance)
      this.monster.velocity = 2;

    // Update direction of the monster
    if (this.monster.direction !== this.player.direction)
    {
      if (this.player.direction.x !== 0)
      {
        if (abs(this.monster.y - this.player.y) <= max(this.monster.velocity, this.player.velocity))
          this.monster.direction = this.player.direction;
      }
      else if (this.player.direction.y !== 0)
      {
        if (abs(this.monster.x - this.player.x) <= max(this.monster.velocity, this.player.velocity))
          this.monster.direction = this.player.direction;
      }
    }

    // Update the camera position
    this.camera.x = -this.player.x;
    this.camera.y = -this.player.y;

    // Check monster on player
    if (this.monster.manhattanDistanceTo(this.player) <= this.monster.velocity)
      this.gameOver = true;

    // Check if a decision is made, otherwise game over
    if (this.map.getPlayerTile(this.player.x, this.player.y) == null)
      this.gameOver = true;

    // Update the question
    this.question = this.questions[this.currentQuestion];
    this.question.sampleInterval = 50;
  }

  // Key press event
  keyPressed()
  {
    if (key === 'a')
    {
      // Move left if possible
      let tile = this.map.getPlayerAdjacentTile(this.player.x, this.player.y, this.player.direction);
      if (tile != null)
      {
        // Give answer and move monster
        let correct = this.questions[this.currentQuestion].answer(0);
        if (correct)
        {
          this.moveMonsterDown();
          this.rightAnswers ++;
        }
        else
        {
          this.moveMonsterUp();
          this.wrongAnswers ++;
        }

        // Next question
        this.currentQuestion++;

        // Rotate the player
        this.player.moveLeft();

        // Rotate the camera
        this.camera.doRotateDelta(90, 20);
      }
    }

    if (key === 'd')
    {
      // Move right if possible
      let tile = this.map.getPlayerAdjacentTile(this.player.x, this.player.y, this.player.direction);
      if (tile != null)
      {
        // Give answer and move monster
        let correct = this.questions[this.currentQuestion].answer(1);
        if (correct)
        {
          this.moveMonsterDown();
          this.rightAnswers ++;
        }
        else
        {
          this.moveMonsterUp();
          this.wrongAnswers ++;
        }

        // Next question
        this.currentQuestion++;

        // Rotate the player
        this.player.moveRight();

        // Rotate the camera
        this.camera.doRotateDelta(-90, 20);
      }
    }

    if (key === 's')
    {
      // when right awnser
      this.moveMonsterDown();
    }

    if (key === 'w')
    {
      // when wrong awnser
      this.moveMonsterUp();
    }
  }

  // Move the monster closer
  moveMonsterUp()
  {
    this.monsterDistance -= 50;
    this.monster.velocity = 4;
    /*let monsterPosition = this.monster.direction.transform(0, -50);
    this.monster.x += monsterPosition.x;
    this.monster.y += monsterPosition.y;*/

    /*// Check for x or y and move monster
    if (this.onX == 1)
      this.monster.y = (this.monster.y > this.player.y) ? this.monster.y - 50 : this.monster.y + 50;
    else
      this.monster.x = (this.monster.x > this.player.x) ? this.monster.x - 50 : this.monster.x + 50;*/
  }

  // Move the monster further away
  moveMonsterDown()
  {
    this.monsterDistance += 50;
    this.monster.velocity = 0.5;
    /*let monsterPosition = this.monster.direction.transform(0, 50);
    this.monster.x += monsterPosition.x;
    this.monster.y += monsterPosition.y;*/
    /*if (this.onX == 1) {
      // Check for direction and max reached
      if (this.monster.y > this.player.y && this.monster.y < this.player.y + 99)
        this.monster.y = this.monster.y + 50;
      else if (this.monster.y < this.player.x && this.monster.y > this.player.y - 99)
        this.monster.y = this.monster.y - 50;
    }
    else {
      // Check for direction and max reached
      if (this.monster.x > this.player.x && this.monster.x < this.player.x + 99)
        this.monster.x = this.monster.x + 50;
      else if (this.monster.x < this.player.x && this.monster.x > this.player.x - 99)
        this.monster.x = this.monster.x - 50;
    }*/
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
    fased = (this.turned == 0) ? ((this.onX == 1) ? 0 : 1) : ((this.onX == 1) ? 1 : 0);

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
    this.turned = 1 - this.turned;

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
