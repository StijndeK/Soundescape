// Variable declarations preferably with "let", not with "var"
let sample;
let mySound;

// Preload function
function preload()
{
  soundFormats('wav', 'mp3');

  // Load the sound
  mySound = loadSound('assets/blop.wav');
  mySound.setVolume(1.0);
}

// Setup function
function setup()
{
  // Create a canvas
  createCanvas(windowWidth, windowHeight);

  // Create a new sample class that draws an ellipse
  sample = new SampleClass(100, 100, 50, mySound);

  // Background
  background(0);
}

// Draw function
function draw()
{
  // Draw the background
  fill('rgba(0, 0, 0, 0.2)');
  noStroke();
  rect(0, 0, windowWidth, windowHeight);

  // Draw the sample class
  sample.draw();
}

// Resize function
function resize()
{
  // Resize the canvas
  resizeCanvas(windowWidth, windowHeight);
}
