// Question class
class Question
{
  // Constructor
  constructor(samples, correctAnswer)
  {
    if (!(samples instanceof Array))
      throw "samples must be an array";

    // Constructor variables
    this.samples = samples;
    this.correctAnswer = correctAnswer;

    // Internal variables
    this.timer = 0;
    this.sampleInterval = 60;
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
  update()
  {
    // Print if timer is 0
    if (this.timer == 0)
      console.log("Currect answer: " + this.correctAnswer);

    // After one second: play the first sample
    if (this.timer == this.sampleInterval)
      this.samples[0].play();

    // After two seconds: play the second sample
    if (this.timer == this.sampleInterval * 2)
      this.samples[1].play();

    // If the question has been answered: play the correct sample
    if (this.givenAnswer !== this.lastGivenAnswer && this.givenAnswer !== null)
    {
      // this doesnt work because question gets updated
      this.samples[this.correctAnswer].play();

      // reset timer
      this.timer = -50;
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
      // set the notes (samples) based on i
      // TODO: base it on a smarter system then just using i
      let interVal = 12 - i;
      let sampleArrayValue1 = int(random(i+1));
      let sampleArrayValue2 = sampleArrayValue1 + interVal;

      let sampleArrayValues = [sampleArrayValue1, sampleArrayValue2];

      let decideSample = int(random(2));


      // decide which sample is first

      let sample1 = samples[sampleArrayValues[decideSample]];
      let sample2 = samples[sampleArrayValues[1-decideSample]];


      let answer = int(samples.indexOf(sample2) > samples.indexOf(sample1));
      questions.push(new Question([sample1, sample2], answer));
    }
    return questions;
  }
}
