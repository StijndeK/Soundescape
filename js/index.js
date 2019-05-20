// Variable declarations preferably with "let", not with "var"
let questions;
let game;

// Preload function
function preload()
{
  soundFormats('wav', 'mp3');

  let samples = ["assets/samples/Klarinet/Klarinet1.wav", "assets/samples/Klarinet/Klarinet2.wav", "assets/samples/Klarinet/Klarinet3.wav",
  "assets/samples/Klarinet/Klarinet4.wav", "assets/samples/Klarinet/Klarinet5.wav", "assets/samples/Klarinet/Klarinet6.wav",
  "assets/samples/Klarinet/Klarinet7.wav", "assets/samples/Klarinet/Klarinet8.wav", "assets/samples/Klarinet/Klarinet9.wav",
  "assets/samples/Klarinet/Klarinet10.wav", "assets/samples/Klarinet/Klarinet11.wav", "assets/samples/Klarinet/Klarinet12.wav",
  "assets/samples/Klarinet/Klarinet13.wav", ];

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
}

// Draw function
function draw()
{
  if (this.drawGame == 1) {
    game.update();
    game.draw();
  }
  else {
    // instructions etcetera
    background(0);

    textSize(width/50);
    textAlign(CENTER);
    fill(255, 255, 255);
    text('DB-GAST', width/2, 50);
    text('SOUNDESCAPE', width/2, 100);
    text('Druk op s om te beginnen', width/2, 150);
  }
}


// Key press event
function keyPressed()
{
  game.keyPressed();
  if (key == 's')
  {
    this.drawGame = 1;
  }

}

// Resize function
function resize()
{
  // Resize the canvas
  resizeCanvas(windowWidth, windowHeight);
}
