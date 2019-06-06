// Questions
let pitchQuestions, overtoneQuestions, tempoQuestions;

// The active screen
let activeScreen = null;

// Samples for pitch
let pitchSamplesKlarinet = Array.range(1, 72).map(i => "assets/samples/Toonhoogte/Klarinet " + i + ".wav");

// Samples for tempo
let tempoSamples = Array.range(1, 44).map(i => "assets/samples/tempo/Tempo " + i + ".wav");

// Samples for overtones
let overtoneSamples = Array.range(1, 100).map(i => "assets/samples/Boventonen/Boventonen " + i + ".wav");

// Other sounds
let gameOverSound;
let menuSound;

// selected game
let selectedGameChoice;

// amount of Questions
let questionAmount = 30;

// Preload function
function preload()
{
  soundFormats('wav', 'mp3');

  // Load samples
  pitchSamplesKlarinet = pitchSamplesKlarinet.map(path => loadSound(path));
  tempoSamples = tempoSamples.map(path => loadSound(path));
  overtoneSamples = overtoneSamples.map(path => loadSound(path));

  // Load other sounds
  gameOverSound = loadSound('assets/gameOver.wav');
  menuSound = loadSound('assets/LUMC_MenuTrack.wav');


  // Initialize questions
  pitchQuestions = Question.generatePitchQuestions(questionAmount, pitchSamplesKlarinet);
  overtoneQuestions = Question.generateOvertoneQuestions(questionAmount, overtoneSamples);
  tempoQuestions = Question.generateTempoQuestions(questionAmount, tempoSamples);
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
    selectedGameChoice = activeScreen.selectedGame;
    if (activeScreen.selectedGame === 1)
      activeScreen = new Game(pitchQuestions);
    else if (activeScreen.selectedGame === 2)
      activeScreen = new Game(tempoQuestions);
    else if (activeScreen.selectedGame === 3)
      activeScreen = new Game(overtoneQuestions);
  }
  else if (activeScreen instanceof Game)
  {
    if (activeScreen.gameOver) {
      activeScreen = new GameOver(activeScreen);
    }
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

// Mouse press event
function mousePressed()
{
  activeScreen.mousePressed();
}

// Resize function
function resize()
{
  // Resize the canvas
  resizeCanvas(windowWidth, windowHeight);
}
