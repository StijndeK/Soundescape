class Character
{
  constructor(x, y, color)
  {
    this.x = x;
    this.y = y;
    this.color = color;

    this.velocity = 1;
    this.direction = -90;
  }

  // Draw function
  draw()
  {
    noStroke();
    fill(this.color);
    ellipseMode(CENTER);
    circle(this.x, this.y, 32);
  }

  // Update function
  update()
  {
    // Update the position
    this.x += this.velocity * cos(this.direction);
    this.y += this.velocity * sin(this.direction);
  }
}
