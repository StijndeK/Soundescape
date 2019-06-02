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

    // Tile variables
    this.playerTile = null
    this.lastPlayerTile = null;

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

    if (selectedGameChoice === 1)
      text('Welke toon klinkt hoger?', 20, 40);
    else if (selectedGameChoice === 2)
      text('Welke tempo is sneller?', 20, 40);
    else if (selectedGameChoice === 3)
      text('Welke toon heeft meer boventonen?', 20, 40);

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
    if (abs(this.monsterDistance - this.monster.manhattanDistanceTo(this.player)) <= this.monster.velocity)
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

    // Update current tile
    this.playerTile = this.map.getPlayerTile(this.player.x, this.player.y);
    if (this.playerTile !== this.lastPlayerTile)
    {
      // Trigger current tile
      if (this.playerTile !== null && this.playerTile.trigger !== null)
        this.playerTile.trigger(this.playerTile);

      // Update score
      if (!this.gameOver)
        this.score ++;
    }
    this.lastPlayerTile = this.playerTile;

    // Check monster on player
    if (this.monster.manhattanDistanceTo(this.player) <= this.monster.velocity * 2)
      this.gameOver = true;

    // Check if a decision is made, otherwise game over
    if (this.playerTile == null)
      this.gameOver = true;

    // Update the question
    this.question = this.questions[this.currentQuestion];
    this.question.sampleInterval = 50;
    this.question.update();
  }

  // Key press event
  keyPressed()
  {
    if (key === 'a')
    {
      // Move left if possible
      let tile = this.map.getPlayerAdjacentTile(this.player.x, this.player.y, this.player.direction);
      if (tile != null && !tile.type.solid)
      {
        // Give answer and move monster
        let correct = this.questions[this.currentQuestion].answer(0);
        if (correct)
        {
          this.moveMonsterDown();
          this.rightAnswers ++;

          // Next question
          if (this.currentQuestion != 19)
            this.currentQuestion++;
            // go faster when all questions have already been awnsered
            if (this.question.sampleInterval != 50)
              this.question.sampleInterval = this.question.sampleInterval - 5;
        }
        else
        {
          this.moveMonsterUp();
          this.wrongAnswers ++;
        }

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
      if (tile != null && !tile.type.solid)
      {
        // Give answer and move monster
        let correct = this.questions[this.currentQuestion].answer(1);
        if (correct)
        {
          this.moveMonsterDown();
          this.rightAnswers ++;

          // Next question
          if (this.currentQuestion != 19)
            this.currentQuestion++;
            // go faster when all questions have already been awnsered
            if (this.question.sampleInterval != 50)
              this.question.sampleInterval = this.question.sampleInterval - 5;
        }
        else
        {
          this.moveMonsterUp();
          this.wrongAnswers ++;
        }

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
  }

  // Move the monster further away
  moveMonsterDown()
  {
    if (this.monsterDistance < 150)
    {
      this.monsterDistance += 50;
      this.monster.velocity = 1;
    }
  }

  // Generate a new question
  generateQuestion(position, direction, baseLength = 10, baseWidth = 2)
  {
    let newTiles = [];

    // Add base
    for (let i = 0; i < baseLength; i ++)
    {
      // Road
      newTiles.push(new Tile(position.add({x: 0, y: i, direction: direction}), TileType.roadFor(direction)));

      // Wall
      newTiles.push(new Tile(position.add({x: 1, y: i, direction: direction}), TileType.WALL));
      newTiles.push(new Tile(position.add({x: -1, y: i, direction: direction}), TileType.WALL));
    }

    // Add split road
    newTiles.push(new Tile(position.add({x: 0, y: baseLength, direction: direction}), TileType.splitFor(direction)));

    // Add split walls
    for (let i = -1; i <= 1; i ++)
      newTiles.push(new Tile(position.add({x: i, y: baseLength + 1, direction: direction}), TileType.WALL));

    // Add first branches with triggers
    let leftDirection = Direction.left(direction);
    let leftPosition = position.add({x: -1, y: baseLength, direction: direction});
    let leftNewPosition = position.add({x: -(baseWidth + 1), y: baseLength, direction: direction});
    newTiles.push(new Tile(leftPosition, TileType.roadFor(leftDirection), tile => {
      this.generateQuestion(leftNewPosition, leftDirection);
      this.map.removeTiles(newTiles);
    }));

    let rightDirection = Direction.right(direction);
    let rightPosition = position.add({x: 1, y: baseLength, direction: direction});
    let rightNewPosition = position.add({x: baseWidth + 1, y: baseLength, direction: direction});
    newTiles.push(new Tile(rightPosition, TileType.roadFor(rightDirection), tile => {
      this.generateQuestion(rightNewPosition, rightDirection);
      this.map.removeTiles(newTiles);
    }));

    // Add branches
    for (let i = 1; i < baseWidth; i ++)
    {
      // Roads
      newTiles.push(new Tile(position.add({x: i + 1, y: baseLength, direction: direction}), TileType.roadFor(leftDirection)));
      newTiles.push(new Tile(position.add({x: -(i + 1), y: baseLength, direction: direction}), TileType.roadFor(rightDirection)));

      // Walls
      newTiles.push(new Tile(position.add({x: i + 1, y: baseLength - 1, direction: direction}), TileType.WALL));
      newTiles.push(new Tile(position.add({x: i + 1, y: baseLength + 1, direction: direction}), TileType.WALL));
      newTiles.push(new Tile(position.add({x: -(i + 1), y: baseLength - 1, direction: direction}), TileType.WALL));
      newTiles.push(new Tile(position.add({x: -(i + 1), y: baseLength + 1, direction: direction}), TileType.WALL));
    }

    // Add the tiles
    this.map.addTiles(newTiles);
  }
}
