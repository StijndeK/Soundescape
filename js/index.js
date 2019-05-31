// Questions
let questions;

// The active screen
let activeScreen = null;

// Samples for pitch
let pitchSamplesFagot = Array.range(48, 60).map(i => "assets/samples/pitch/Fagot/Fagot" + i + ".wav");
let pitchSamplesHobo = Array.range(60, 72).map(i => "assets/samples/pitch/Hobo/Hobo" + i + ".wav");
let pitchSamplesKlarinet = Array.range(60, 72).map(i => "assets/samples/pitch/Klarinet/Klarinet" + i + ".wav");
let pitchSamplesSawtooth = Array.range(48, 72).map(i => "assets/samples/pitch/Sawtooth/Sawtooth" + i + ".wav");
let pitchSamplesStrijkers = Array.range(60, 72).map(i => "assets/samples/pitch/Strijkers/Strijkers" + i + ".wav");

// Samples for tempo
let tempoSamples = Array.range(1, 44).map(i => "assets/samples/tempo/Tempo " + i + ".wav");

// Other sounds
let gameOverSound;

// Preload function
function preload()
{
  soundFormats('wav', 'mp3');

  // Load samples
  pitchSamplesFagot = pitchSamplesFagot.map(path => loadSound(path));
  pitchSamplesHobo = pitchSamplesHobo.map(path => loadSound(path));
  pitchSamplesKlarinet = pitchSamplesKlarinet.map(path => loadSound(path));
  pitchSamplesSawtooth = pitchSamplesSawtooth.map(path => loadSound(path));
  pitchSamplesStrijkers = pitchSamplesStrijkers.map(path => loadSound(path));
  tempoSamples = tempoSamples.map(path => loadSound(path));

  // Load other sounds
  gameOverSound = loadSound('assets/gameOver.wav');

  // Initialize questions
  questions = Question.generatePitchQuestions(10, pitchSamplesKlarinet);
}

// Setup function
function setup()
{
  // Create a canvas
  createCanvas(windowWidth, windowHeight);

  // Set the frame rate
  frameRate(60);

  // Set the active screen
  activeScreen = new Menu();
}

// Draw function
function draw()
{
  // Update the active screen
  activeScreen.update();

  // Update states
  if (activeScreen instanceof Menu)
  {
    // TODO: Add other game types
    if (activeScreen.selectedGame === 1)
      activeScreen = new Game(questions);
  }
  else if (activeScreen instanceof Game)
  {
    if (activeScreen.gameOver)
      activeScreen = new GameOver(activeScreen);
  }
  else if (activeScreen instanceof GameOver)
  {
    if (activeScreen.newGame)
      activeScreen = new Menu();
  }

  // Draw the active screen
  activeScreen.draw();
}

// Key press event
function keyPressed()
{
  activeScreen.keyPressed();
}

// Resize function
function resize()
{
  // Resize the canvas
  resizeCanvas(windowWidth, windowHeight);
}
