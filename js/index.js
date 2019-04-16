// Variable declarations preferably with "let", not with "var"
let sample;

// Setup function
function setup()
{
  // Create a canvas
  createCanvas(windowWidth, windowHeight);

  // Create a new sample class that draws an ellipse
  sample = new SampleClass(100, 100);
}

// Draw function
function draw()
{
  // Draw the background
  background(255);

  // Draw the sample class
  sample.draw();
}

// Resize function
function resize()
{
  // Resize the canvas
  resizeCanvas(windowWidth, windowHeight);
}
