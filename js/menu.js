// Menu screen
class Menu
{
  constructor()
  {
    // Load background image
    this.image = loadImage('assets/Hoofdscherm.png');
    this.selectedGame = null;

    // load button image
    this.buttonImage = loadImage('assets/Leeg_Vak.png');

    // Sounds
    menuSound.play();
  }

  // Draw function
  draw()
  {
    background(0);

    // Draw background image
    this.imageWidth = this.image.width / (this.image.width / (width/1.5));
    this.imageHeight = height;
    this.imageX = (width - this.imageWidth) / 2;

    imageMode(LEFT);
    image(this.image, this.imageX, 0, this.imageWidth, this.imageHeight);

    // Draw buttons
    this.buttonX = this.imageX + (this.imageWidth / 4);

    imageMode(LEFT);
    image(this.buttonImage, this.buttonX, (height / 16 * 7), (height / 4), (height / 8));
    image(this.buttonImage, this.buttonX, (height / 16 * 10), (height / 4), (height / 8));
    image(this.buttonImage, this.buttonX, (height / 16 * 13), (height / 4), (height / 8));

    // Print text
    let textX = this.imageWidth + (width - this.imageWidth)/2 - this.imageWidth / 32;
    textSize(width / 50);
    textAlign(CENTER);
    fill(0, 0, 0);
    text('Toonhoogte', this.buttonX + (height / 8), (height / 16 * 8));
    text('Tempo', this.buttonX + (height / 8), (height / 16 * 11));
    text('Boventonen', this.buttonX + (height / 8), (height / 16 * 14));
  }

  // Update function
  update()
  {

  }

  // Key press event
  keyPressed()
  {
  }

  // Mouse press event
  mousePressed()
  {
    if (mouseX >= this.buttonX && mouseX < this.buttonX + (height / 8) && mouseY >= (height / 16 * 7) && mouseY < (height / 16 * 7) + (height / 8))
    {
      this.selectedGame = 1;
      menuSound.stop();
    }
    if (mouseX >= this.buttonX && mouseX < this.buttonX + (height / 8) && mouseY >= (height / 16 * 10) && mouseY < (height / 16 * 10) + (height / 8))
    {
      this.selectedGame = 2;
      menuSound.stop();
    }
    if (mouseX >= this.buttonX && mouseX < this.buttonX + (height / 8) && mouseY >= (height / 16 * 13) && mouseY < (height / 16 * 13) + (height / 8))
    {
      this.selectedGame = 3;
      menuSound.stop();
    }
  }
}
