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
}

//------------------------------------------------------------------------------

// Player class
class Player extends Character
{
  constructor(game, x, y)
  {
    super(game, x, y);
  }

  // Draw function
  draw()
  {
    noStroke();
    fill(color(0, 128, 0));
    ellipseMode(CENTER);
    circle(this.x, this.y, 32);
  }

  // Update function
  update()
  {
    super.update();
  }

  // Rotate to the left
  moveLeft()
  {
    let oldDirection = this.direction;
    let newDirection = Direction.left(this.direction);

    this.direction = newDirection;
    this.game.onPlayerMoveLeft({oldDirection: oldDirection, newDirection: newDirection});
  }

  // Rotate to the right
  moveRight()
  {
    let oldDirection = this.direction;
    let newDirection = Direction.right(this.direction);

    this.direction = newDirection;
    this.game.onPlayerMoveRight({oldDirection: oldDirection, newDirection: newDirection});
  }
}

//------------------------------------------------------------------------------

// Monster class
class Monster extends Character
{
  constructor(game, x, y)
  {
    super(game, x, y, color(255, 0, 0));
  }

  // Draw function
  draw()
  {
    noStroke();
    fill(color(255, 0, 0));
    ellipseMode(CENTER);
    circle(this.x, this.y, 32);
  }

  // Update function
  update()
  {
    super.update();
  }
}
