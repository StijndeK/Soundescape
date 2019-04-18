// Variable declarations preferably with "let", not with "var"
let questions;
let game;

// Preload function
function preload()
{
  soundFormats('wav', 'mp3');

  let samples = ["assets/samples/C2.wav", "assets/samples/Cs2.wav", "assets/samples/D2.wav", "assets/samples/Ds2.wav", "assets/samples/E2.wav", "assets/samples/F2.wav", "assets/samples/Fs2.wav", "assets/samples/G2.wav", "assets/samples/Gs2.wav", "assets/samples/A2.wav", "assets/samples/As2.wav", "assets/samples/B2.wav", "assets/samples/C3.wav", "assets/samples/Cs3.wav", "assets/samples/D3.wav", "assets/samples/Ds3.wav", "assets/samples/E3.wav", "assets/samples/F3.wav", "assets/samples/Fs3.wav", "assets/samples/G3.wav", "assets/samples/Gs3.wav", "assets/samples/A3.wav", "assets/samples/As3.wav", "assets/samples/B3.wav", "assets/samples/C4.wav"];

  questions = Question.generatePitchQuestions(10, samples);
}

// Setup function
function setup()
{
  // Create a canvas
  createCanvas(windowWidth, windowHeight);

  // create new gameplay class
  game = new Gameplay(questions);

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
  game.draw();
}

// Resize function
function resize()
{
  // Resize the canvas
  resizeCanvas(windowWidth, windowHeight);
}
