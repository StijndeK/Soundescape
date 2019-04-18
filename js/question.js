// Question class
class Question
{
  // Constructor
  constructor(samples, answer)
  {
    // Constructor variables
    this.samples = samples;
    this.answer = answer;

    // Internal variables
    this.givenAnswer = null;
  }

  // Return the right answer
  getAnswer()
  {
    return this.answer;
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
    return this.givenAnswer === this.answer;
  }

  // Update logic
  draw()
  {
    // Increase the timer
    this.timer ++;

    // After one second: play the first sample
    if (timer == 60)
      this.samples[0].play();

    // After two seconds: play the second sample
    if (timer == 120)
      this.samples[1].play();

    // If the question has been answered: play the correct sample
    if (this.givenAnswer !== null)
      this.getAnswerSample().play();
  }
}
