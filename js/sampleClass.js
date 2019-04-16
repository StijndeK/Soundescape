// Sample class
class SampleClass
{
  // Constructor
  constructor(x, y, size = 50)
  {
    // Variable declarations go here
    this.x = x;
    this.y = y;
    this.size = size;

    this.vx = 5;
    this.vy = 5;
  }

  // Draw function
  // (Deze gebruik ik normaal om elke class elk frame iets te laten tekenen)
  draw()
  {
    // Check if the circle is outside of the window
    if (this.vx < 0 && this.x < 0)
      this.vx *= -1;
    if (this.vx > 0 && this.x + this.size >= windowWidth)
      this.vx *= -1;

    if (this.vy < 0 && this.y < 0)
      this.vy *= -1;
    if (this.vy > 0 && this.y + this.size >= windowHeight)
      this.vy *= -1;

    // Move the circle
    this.x += this.vx;
    this.y += this.vy;

    // Draw the circle
    ellipse(this.x, this.y, this.size, this.size);
  }
}
