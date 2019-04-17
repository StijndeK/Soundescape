// Variable declarations preferably with "let", not with "var"
let sample;
let mySound;
let game;

// Preload function
function preload()
{
  soundFormats('wav', 'mp3');

  // Load the sound
  // mySound = loadSound('assets/blop.wav');
  // mySound.setVolume(1.0);
}

// Setup function
function setup()
{
  // Create a canvas
  createCanvas(windowWidth, windowHeight);

  // Create a new sample class that draws an ellipse
  // sample = new SampleClass(100, 100, 50, mySound);

  // create new gameplay class
  game = new Gameplay();

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
  // Draw the background
  // fill('rgba(0, 0, 0, 0.2)');
  // noStroke();
  // rect(0, 0, windowWidth, windowHeight);

  // Draw the sample class
  // sample.draw();


  game.draw();


}

// Resize function
function resize()
{
  // Resize the canvas
  resizeCanvas(windowWidth, windowHeight);
}
