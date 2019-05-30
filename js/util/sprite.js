// Sprite class
class Sprite
{
  constructor(path)
  {
    this.image = loadImage(path);
  }

  // Draw function
  draw(x, y, width, height, rotation = 0)
  {
    push();
      translate(x, y);
      angleMode(DEGREES);
      rotate(rotation, createVector(x, y));
      imageMode(CENTER);
      image(this.image, 0, 0, width, height);
    pop();
  }
}

// Animated sprite class
class AnimSprite
{
  constructor(paths, interval)
  {
    this.images = paths.map(path => loadImage(path));
    this.interval = interval;
    this.index = 0;
    this.time = 0;
  }

  // Draw function
  draw(x, y, width, height, rotation = 0)
  {
    push();
      translate(x, y);
      angleMode(DEGREES);
      rotate(rotation, createVector(x, y));
      imageMode(CENTER);
      image(this.images[this.index], 0, 0, width, height);
    pop();
  }

  // Update function
  update()
  {
    this.time ++;
    if (this.time >= this.interval)
    {
      this.index = (this.index + 1) % this.images.length;
      this.time = 0;
    }
  }
}
