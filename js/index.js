// Variable declarations preferably with "let", not with "var"
let sample;
let mySound;
let game;

// Preload function
function preload()
{
  soundFormats('wav', 'mp3');
}

// Setup function
function setup()
{
  // Create a canvas
  createCanvas(windowWidth, windowHeight);

  // create new gameplay class
  game = new Gameplay([
    new Question(["a1", "b1"], 1),
    new Question(["c2", "b1"], 0)
  ]);

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
