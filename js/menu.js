// Menu screen
class Menu
{
  constructor()
  {
    // Load background image
    this.image = loadImage('assets/menu.png');
    this.selectedGame = null;

    // Sounds
    menuSound.play();
  }

  // Draw function
  draw()
  {
    // Draw background image
    let imageWidth = this.image.width * (3/4);
    let imageHeight = this.image.height * (3/4);

    background(0);
    imageMode(LEFT);
    image(this.image, (width - imageWidth) / 2, (height - imageHeight) / 2, imageWidth, imageHeight);

    // Print text
    let textX = imageWidth + (width - imageWidth)/2 - imageWidth / 32;

    textSize(width / 50);
    textAlign(RIGHT);
    fill(0, 0, 0);
    text('DB-GAST', textX, imageHeight / 16);
    text('SOUNDESCAPE', textX, imageHeight / 16 * 2);
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
