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
}

// Draw function
function draw()
{
  game.update();
  game.draw();
}


// Key press event
function keyPressed()
{
  game.keyPressed();
}

// Resize function
function resize()
{
  // Resize the canvas
  resizeCanvas(windowWidth, windowHeight);
}
