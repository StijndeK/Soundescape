// Sample class
class SampleClass
{
  // Constructor
  constructor(x, y, size, collisionSound)
  {
    // Variable declarations go here
    this.x = x;
    this.y = y;
    this.size = size;
    this.collisionSound = collisionSound;

    this.vx = random(-5, 5);
    this.vy = random(-5, 5);
  }

  // Draw function
  // (Deze gebruik ik normaal om elke class elk frame iets te laten tekenen)
  draw()
  {
    // Check if the circle is outside of the window
    if (this.vx < 0 && this.x - this.size / 2 < 0) {
      this.vx *= -1;
      this.collisionSound.play();
    }
    if (this.vx > 0 && this.x + this.size / 2 >= windowWidth) {
      this.vx *= -1;
      this.collisionSound.play();
    }

    if (this.vy < 0 && this.y - this.size / 2 < 0) {
      this.vy *= -1;
      this.collisionSound.play();
    }
    if (this.vy > 0 && this.y + this.size / 2 >= windowHeight) {
      this.vy *= -1;
      this.collisionSound.play();
    }

    // Move the circle
    this.x += this.vx;
    this.y += this.vy;

    // Draw the circle
    fill(255);
    noStroke();
    circle(this.x, this.y, this.size);
  }
}
