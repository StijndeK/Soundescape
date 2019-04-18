// Question class
class Question
{
  // Constructor
  constructor(samples, correctAnswer)
  {
    if (!(samples instanceof Array))
      throw "samples must be an array";

    // Constructor variables
    //this.samples = samples.map(sample => loadSound(sample));
    this.samples = samples;
    this.correctAnswer = correctAnswer;

    // Internal variables
    this.timer = 0;
    this.givenAnswer = null;
    this.lastGivenAnswer = null;
  }

  // Return the right answer
  getAnswer()
  {
    return this.correctAnswer;
  }

  // Return the sample that is the answer
  getAnswerSample()
  {
    return this.samples[this.answer];
  }

  // Answer the question
  answer(givenAnswer)
  {
    this.givenAnswer = givenAnswer;
    return this.givenAnswer === this.correctAnswer;
  }

  // Update logic
  draw()
  {
    // Increase the timer
    this.timer ++;

    // After one second: play the first sample
    if (this.timer == 60)
      //this.samples[0].play();
      console.log("sample1");

    // After two seconds: play the second sample
    if (this.timer == 120)
      //this.samples[1].play();
      console.log("sample2");

    // If the question has been answered: play the correct sample
    if (this.givenAnswer !== this.lastGivenAnswer && this.givenAnswer !== null)
      //this.getAnswerSample().play();
      console.log("answerSample");

    // Update variables
    this.lastGivenAnswer = this.givenAnswer;
  }
}
