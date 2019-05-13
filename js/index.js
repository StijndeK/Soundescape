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

  // create new gameplay class
  game = new Gameplay(questions);
  game.camera.x = windowWidth / 2;
  game.camera.y = windowWidth / 2;
  game.camera.doScale(2.0, 120);
  game.camera.doMoveDelta(0, -200, 300);
  game.camera.doRotateDelta(-90, 60);

  // Background
  background(0);
}

// keypressed function
function keyPressed() {
  game.keyPressed();

}

// Draw function
function draw()
{
  game.update();
  game.draw();
}

// Resize function
function resize()
{
  // Resize the canvas
  resizeCanvas(windowWidth, windowHeight);
}
