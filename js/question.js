// Question class
class Question
{
  // Constructor
  constructor(samples, correctAnswer)
  {
    if (!(samples instanceof Array))
      throw "samples must be an array";

    // Constructor variables
    this.sampleNames = samples;
    this.samples = samples.map(sample => loadSound(sample));
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

  // Return this given answer
  getGivenAnswer()
  {
    return this.givenAnswer;
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
    // Print if timer is 0
    if (this.timer == 0)
      console.log("Currect answer: " + this.correctAnswer);

    // After one second: play the first sample
    if (this.timer == 60)
    {
      console.log("Playing sample: " + this.sampleNames[0]);
      this.samples[0].play();
    }

    // After two seconds: play the second sample
    if (this.timer == 120)
    {
      console.log("Playing sample: " + this.sampleNames[1]);
      this.samples[1].play();
    }

    // If the question has been answered: play the correct sample
    if (this.givenAnswer !== this.lastGivenAnswer && this.givenAnswer !== null)
    {
      console.log("Playing coorect sample: " + this.sampleNames[this.correctAnswer]);
      this.samples[this.correctAnswer].play();
    }

    // Increase the timer
    this.timer ++;

    // Update variables
    this.lastGivenAnswer = this.givenAnswer;
  }

  // Generate an array of pitch questions based on an array of samples of increasing pitch
  static generatePitchQuestions(n, samples)
  {
    let questions = [];
    for (let i = 0; i < n; i ++)
    {
      let sample1 = random(samples);
      let sample2 = random(samples);

      // Don't choose the same sample
      while (sample1 === sample2)
        sample2 = random(samples);

      let answer = int(samples.indexOf(sample2) > samples.indexOf(sample1));
      questions.push(new Question([sample1, sample2], answer));
    }
    return questions;
  }
}
