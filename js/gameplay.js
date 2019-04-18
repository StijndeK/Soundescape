class Gameplay
{
  constructor(questions)
  {
    frameRate(60);

    // Initialize questions
    this.questions = questions;
    this.currentQuestion = 0;

    // monster parameters
    this.y = height - (height / 100);
    this.s = width / 60;
    this.x = width / 2 ;


    // player parameters
    this.playerX = this.x;
    this.playerY = height - (height / 10);

    // Obstacle parameters
    this.squareX = width;
    this.squareY = 0;
    this.squareLength = 50;

    // colours
    this.colorMonster = color(255, 0, 0);
    this.colorMap = color(0, 0, 0);
    this.colorObst = color(255, 0, 0);

    // set which is right awnser, for now just set it to one
    this.wrongAwnser = int(random(2));
    print(this.wrongAwnser);

    // player only plays once Check
    this.playerMoved = 0;

    // move player
    this.moveLeft = 0;
    this.moveRight = 0;

    // speedvariable
    this.speedVar = height/1000;
    print('speedVar', this.speedVar)

    // distance for junction
    this.junctionDistance = height / 5

    // print(this.questions[this.currentQuestion].getAnswer())
  }

  keyPressed()
  {
    // check if movement is possible
    if (this.squareLength + this.junctionDistance > this.playerY && this.squareLength < this.playerY && this.playerMoved === 0)
    {
      this.playerMoved = 1;
      if (key == 'a') {
        this.moveLeft = 1;
        this.questions[this.currentQuestion].answer(0);
      }
      if (key == 'd') {
        this.moveRight = 1;
        this.questions[this.currentQuestion].answer(1);
      }
    }
  }

  resetMap()
  {
    this.squareLength = 0;
    this.x = width / 2 ;
    this.playerX = this.x;
    this.currentQuestion++;
  }

  gameOver()
  {
    this.squareLength = 0;
    this.x = width / 2 ;
    this.playerX = this.x;
    print('GAMEOVER')
  }

  draw()
  {
     // check for collision with obstacle
     if (this.squareLength >= this.playerY) {
       this.gameOver();
     }

     // scale(windowWidth/800);
     background(220);

     // Update the question
     this.questions[this.currentQuestion].draw();

     // check movement
     if (this.moveLeft === 1 && this.squareLength+(this.junctionDistance/2) > this.playerY) {
       this.playerX = this.playerX - width / 8;
       this.moveLeft = 0;
       // move monster
       if (this.questions[this.currentQuestion].getAnswer() == 1) {
         this.y = this.y - 40;
       }
     }
     if (this.moveRight === 1 && this.squareLength+(this.junctionDistance/2) > this.playerY) {
       this.playerX = this.playerX + width / 8;
       this.moveRight = 0
       // move monster
       if (this.questions[this.currentQuestion].getAnswer() == 0) {
         this.y = this.y - 40;
       }
     }

     fill(this.colorObst);

     // draw blocade and make monster come closer
     if (this.squareLength > 400) {
       if (this.wrongAwnser == 1) {
         rect(100,this.squareLength - 400, 100, 50);
       }
       else {
         rect(200,this.squareLength - 400, 100, 50);
       }
     }

    fill(this.colorMonster);

    // monster
    circle(this.playerX, this.y, this.s);

    fill(this.colorMap);

    // player
    circle(this.playerX, this.playerY, this.s);

    // move obstacle
    this.squareLength = this.squareLength + (1 * this.speedVar);

    // draw obstacle
    rect(this.squareX - (width/32/2), this.squareY, width/32, this.squareLength);

    // draw lanes
    rect(width / 4, this.squareLength + this.junctionDistance, width / 8, height - this.squareLength);
    rect((width / 8) * 5, this.squareLength + this.junctionDistance, width / 8, height - this.squareLength);

    // draw borders
    rect(0, 0, width / 4, height);
    rect(width - width / 4, 0, width / 4, height);

    // draw score
    textSize(width/50);
    fill(255, 255, 255);
    text(int(this.squareLength/ 100) , (width / 8) * 7, 200);

    // reset map after lane has been chosen
    if (this.squareLength > (width * 1.2)) {
      this.resetMap();
    }
  }

}
