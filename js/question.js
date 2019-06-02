let pitchIntervals = [];
let overtoneIntervals = [];
let tempoIntervals = [];


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
    if (this.timer == this.sampleInterval * 4)
      this.samples[1].play();

    // If the question has been answered: play the correct sample
    if (this.givenAnswer !== this.lastGivenAnswer && this.givenAnswer !== null)
    {
      // this doesnt work because question gets updated
      // this.samples[this.correctAnswer].play();

      // reset timer
      this.timer = -50;
    }

    // Increase the timer
    this.timer ++;

    // Update variables
    this.lastGivenAnswer = this.givenAnswer;
  }

  // houd de generate questions nog als aparte functies omdat het voordeel kan hebben om ze later mss op andere manieren in te stellen

  // Generate an array of pitch questions based on an array of samples of increasing pitch
  static generatePitchQuestions(n, samples)
  {
    let questions = [];

    for (let i = 0; i < n; i ++)
    {
      // set the notes (samples) based on i
      // todo maybe make this an exponentional system?
      let sampleArrayValue1 = int(int(random(i+1)) * 3.5); // *3.5 because 70 samples
      let interVal = int((n - i) * 3.5);
      let sampleArrayValue2 = sampleArrayValue1 + interVal;

      // also create list with sample intervals for showing jnd
      pitchIntervals.push(interVal);

      // decide which sample is first
      let sampleArrayValues = [sampleArrayValue1, sampleArrayValue2];
      let decideSample = int(random(2));
      let sample1 = samples[sampleArrayValues[decideSample]];
      let sample2 = samples[sampleArrayValues[1-decideSample]];

      let answer = int(samples.indexOf(sample2) > samples.indexOf(sample1));
      questions.push(new Question([sample1, sample2], answer));
    }
    return questions;
  }

  // Generate an array of pitch questions based on an array of samples of increasing tempo
  static generateTempoQuestions(n, samples)
  {
    let questions = [];
    for (let i = 0; i < n; i ++)
    {
      // set the notes (samples) based on i
      // todo maybe make this an exponentional system?
      let sampleArrayValue1 = int(int(random(i+1)) * 2); // *2 because 40 samples
      let interVal = int((n - i) * 2);
      let sampleArrayValue2 = sampleArrayValue1 + interVal;

      // also create list with sample intervals for showing jnd
      tempoIntervals.push(interVal);

      // decide which sample is first
      let sampleArrayValues = [sampleArrayValue1, sampleArrayValue2];
      let decideSample = int(random(2));
      let sample1 = samples[sampleArrayValues[decideSample]];
      let sample2 = samples[sampleArrayValues[1-decideSample]];

      let answer = int(samples.indexOf(sample2) > samples.indexOf(sample1));
      questions.push(new Question([sample1, sample2], answer));
    }
    print(tempoIntervals)
    return questions;
  }

  // Generate an array of pitch questions based on an array of samples of increasing tempo
  static generateOvertoneQuestions(n, samples)
  {
    let questions = [];
    for (let i = 0; i < n; i ++)
    {
      // set the notes (samples) based on i
      // todo maybe make this an exponentional system?
      let sampleArrayValue1 = int(int(random(i+1)));
      let interVal = int((n - i));
      let sampleArrayValue2 = sampleArrayValue1 + interVal;

      // also create list with sample intervals for showing jnd
      overtoneIntervals.push(interVal);

      // decide which sample is first
      let sampleArrayValues = [sampleArrayValue1, sampleArrayValue2];
      let decideSample = int(random(2));
      let sample1 = samples[sampleArrayValues[decideSample]];
      let sample2 = samples[sampleArrayValues[1-decideSample]];

      let answer = int(samples.indexOf(sample2) > samples.indexOf(sample1));
      questions.push(new Question([sample1, sample2], answer));
    }
    return questions;
  }
}
