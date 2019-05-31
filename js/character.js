// Character base class
class Character
{
  constructor(game, x, y)
  {
    this.game = game;
    this.x = x;
    this.y = y;
    this.velocity = 2;
    this.direction = Direction.NORTH;
  }

  // Update function
  update()
  {
    // Update the position
    this.x -= this.velocity * cos(this.direction.angle);
    this.y -= this.velocity * sin(this.direction.angle);
  }

  // Return the Manhattan distance between two characters (x + y)
  manhattanDistanceTo(other)
  {
    return round(abs(this.x - other.x) + abs(this.y - other.y));
  }
}

//------------------------------------------------------------------------------

// Player class
class Player extends Character
{
  constructor(game, x, y)
  {
    super(game, x, y);

    this.sprite = new AnimSprite(["assets/characters/player0.png", "assets/characters/player1.png"], 15);
  }

  // Draw function
  draw()
  {
    this.sprite.draw(this.x, this.y, 60, 60, this.direction.angle - 90);
  }

  // Update function
  update()
  {
    super.update();
    this.sprite.update();
  }

  // Rotate to the left
  moveLeft()
  {
    let oldDirection = this.direction;
    let newDirection = Direction.left(this.direction);

    this.direction = newDirection;
  }

  // Rotate to the right
  moveRight()
  {
    let oldDirection = this.direction;
    let newDirection = Direction.right(this.direction);

    this.direction = newDirection;
  }
}

//------------------------------------------------------------------------------

// Monster class
class Monster extends Character
{
  constructor(game, x, y)
  {
    super(game, x, y, color(255, 0, 0));

    this.sprite = new Sprite("assets/characters/ghost.png");
  }

  // Draw function
  draw()
  {
    this.sprite.draw(this.x, this.y, 60, 60, this.direction.angle - 90);
  }

  // Update function
  update()
  {
    super.update();
  }
}
