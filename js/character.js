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

let playerY = 0;
let playerX = 0;
let newDirection;

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
    playerY = this.y;
    playerX = this.x;
  }

  // Rotate to the left
  moveLeft()
  {
    let oldDirection = this.direction;
    newDirection = Direction.left(this.direction);

    this.direction = newDirection;
    this.game.onPlayerMoveLeft({oldDirection: oldDirection, newDirection: newDirection});
  }

  // Rotate to the right
  moveRight()
  {
    let oldDirection = this.direction;
    newDirection = Direction.right(this.direction);

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
    this.onX = 1;
    this.direction == 0;
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

    // set for move left of right
    this.checkValue  = (this.onX == 1) ? this.x : this.y;
    if (this.moveLeftValue == 1 && this.yToMove == this.checkValue) {
      this.moveLeftValue = 0;
      this.direction = newDirection;
    }
    if (this.moveRightValue == 1 && this.yToMove == this.checkValue) {
      this.moveRightValue = 0;
      this.direction = newDirection;
    }
  }

  // Rotate to the left
  moveLeft()
  {
    this.moveLeftValue = 1;
    this.setXorY();
  }

  // Rotate to the right
  moveRight()
  {
    this.moveRightValue = 1;
    this.setXorY();
  }

  // move closer to player
  moveUp()
  {
    // check for x or y
    if (this.onX == 1) {
      // check for direction
      if (this.y > playerY)
        this.y = this.y - 50;
      else
        this.y = this.y + 50;
    }
    else {
      if (this.x > playerX)
        this.x = this.x - 50;
      else
        this.x = this.x + 50;
    }
  }

  // move further from player
  moveDown()
  {
    if (this.onX == 1) {
      // check for direction and max reached
      if (this.y > playerY && this.y < playerY + 99)
        this.y = this.y + 50;
      else if (this.y < playerY && this.y > playerY - 99)
        this.y = this.y - 50;
    }
    else {
      // check for direction and max reached
      if (this.x > playerX && this.x < playerX + 99)
        this.x = this.x + 50;
      else if (this.x < playerX && this.x > playerX - 99)
        this.x = this.x - 50;
    }
  }

  // set x or y
  setXorY()
  {
    if (this.onX == 1) {
      this.onX = 0;
      this.yToMove = playerY;
    }
    else {
      this.onX = 1;
      this.yToMove = playerX;
    }
  }
}
