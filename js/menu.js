// Menu screen
class Menu
{
  constructor()
  {
    // Load background image
    this.image = loadImage('assets/Hoofdscherm.png');
    this.selectedGame = null;

    // load start image
    this.startImage = loadImage('assets/Leeg_Vak.png');

    // Sounds
    menuSound.play();
  }

  // Draw function
  draw()
  {
    background(0);

    // Draw background image
    let imageWidth = this.image.width / (this.image.width / (width/1.5));
    let imageHeight = height;

    imageMode(LEFT);
    image(this.image, (width - imageWidth) / 2, 0, imageWidth, imageHeight);

    // Print text
    let textX = imageWidth + (width - imageWidth)/2 - imageWidth / 32;
    textSize(width / 50);
    textAlign(RIGHT);
    fill(0, 0, 0);
    text('Druk op 1 om toonhoogte game te spelen', textX, imageHeight / 32 * 6);
    text('Druk op 2 om tempo game te spelen', textX, imageHeight / 32 * 7);
    text('Druk op 3 om boventoon game te spelen', textX, imageHeight / 32 * 8);
  }

  // Update function
  update()
  {

  }

  // Key press event
  keyPressed()
  {
    if (key === '1')
      this.selectedGame = 1;
    if (key === '2')
      this.selectedGame = 2;
    if (key === '3')
      this.selectedGame = 3;

    menuSound.stop();
  }
}
