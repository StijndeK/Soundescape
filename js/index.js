// Variable declarations preferably with "let", not with "var"
let questions;
let game;

// Preload function
function preload()
{
  soundFormats('wav', 'mp3');
  this.samples = [
  "assets/samples/Klarinet/Klarinet1.wav", "assets/samples/Klarinet/Klarinet2.wav", "assets/samples/Klarinet/Klarinet3.wav",
  "assets/samples/Klarinet/Klarinet4.wav", "assets/samples/Klarinet/Klarinet5.wav", "assets/samples/Klarinet/Klarinet6.wav",
  "assets/samples/Klarinet/Klarinet7.wav", "assets/samples/Klarinet/Klarinet8.wav", "assets/samples/Klarinet/Klarinet9.wav",
  "assets/samples/Klarinet/Klarinet10.wav", "assets/samples/Klarinet/Klarinet11.wav", "assets/samples/Klarinet/Klarinet12.wav",
  "assets/samples/Klarinet/Klarinet13.wav"
  ];
  let tempoSamples = [
  "assets/Tempo 1.wav", "assets/Tempo 2.wav" , "assets/Tempo 3.wav", "assets/Tempo 4.wav", "assets/Tempo 5.wav", "assets/Tempo 6.wav", "assets/Tempo 7.wav", "assets/Tempo 8.wav",
  "assets/Tempo 9.wav", "assets/Tempo 10.wav", "assets/Tempo 11.wav", "assets/Tempo 12.wav", "assets/Tempo 13.wav", "assets/Tempo 14.wav", "assets/Tempo 15.wav", "assets/Tempo 16.wav", "assets/Tempo 17.wav",
  "assets/Tempo 18.wav", "assets/Tempo 19.wav", "assets/Tempo 20.wav", "assets/Tempo 21.wav", "assets/Tempo 22.wav", "assets/Tempo 23.wav", "assets/Tempo 24.wav", "assets/Tempo 25.wav", "assets/Tempo 26.wav",
  "assets/Tempo 27.wav", "assets/Tempo 28.wav", "assets/Tempo 29.wav", "assets/Tempo 30.wav", "assets/Tempo 31.wav", "assets/Tempo 32.wav", "assets/Tempo 33.wav", "assets/Tempo 34.wav", "assets/Tempo 35.wav",
  "assets/Tempo 36.wav", "assets/Tempo 37.wav", "assets/Tempo 38.wav", "assets/Tempo 39.wav", "assets/Tempo 40.wav", "assets/Tempo 41.wav", "assets/Tempo 42.wav", "assets/Tempo 43.wav", "assets/Tempo 44.wav",
  ];

  questions = Question.generatePitchQuestions(10, samples);
}

// Setup function
function setup()
{
  // Create a canvas
  createCanvas(windowWidth, windowHeight);

  // Create new gameplay class
  game = new Gameplay(questions);

  this.drawGame = 0;

  this.backImg = loadImage('assets/LUMC Concept Art.png');
}

// Draw function
function draw()
{
  // if not on menu
  if (this.drawGame == 1) {
    game.update();
    game.draw();
  }
  // if menu
  else {
    // instructions etcetera
    background(0);
    this.imgWidth = this.backImg.width * (3/4)
    this.imgHeight = this.backImg.height * (3/4)
    imageMode(LEFT);
    image(this.backImg, (width-this.imgWidth)/2, (height-this.imgHeight)/2, this.imgWidth, this.imgHeight);

    textSize(width/50);
    textAlign(RIGHT);
    fill(0, 0, 0);
    this.textX = this.imgWidth + (width-this.imgWidth)/2 - this.imgWidth / 32  ;
    text('DB-GAST', this.textX , this.imgHeight / 16);
    text('SOUNDESCAPE', this.textX, this.imgHeight / 16 * 2);
    text('Druk op 1 om toonhoogte game te spelen', this.textX, this.imgHeight / 32 * 6);
    text('Druk op 2 om tempo game te spelen', this.textX, this.imgHeight / 32 * 7);
    text('Druk op 3 om boventoon game te spelen', this.textX, this.imgHeight / 32 * 8);
  }
}


// Key press event
function keyPressed()
{
  game.keyPressed();
  // draw game
  if (key == '1')
  {
    this.drawGame = 1;
  }
  if (key == '2')
  {
    // TODO andere game toevoegen
    this.drawGame = 1;
  }
  if (key == '3')
  {
    // TODO andere game toevoegen
    this.drawGame = 1;
  }
}

// Resize function
function resize()
{
  // Resize the canvas
  resizeCanvas(windowWidth, windowHeight);
}
