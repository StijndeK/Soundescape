class Gameplay
{
  constructor()
  {
    frameRate(60);

    // monster parameters
    this.x = width / 2;
    this.y = height - (height / 100);
    this.s = width / 75;

    // player parameters
    this.playerX = this.x;
    this.playerY = height - (height / 10);

    // Obstacle parameters
    this.squareX = width / 2 - 25;
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
  }

  keyPressed()
  {
    // check if movement is possible
    if (this.squareLength+this.junctionDistance > this.playerY && this.squareLength < this.playerY && this.playerMoved === 0){
      this.playerMoved = 1;
      if (key == 'a') {
        this.moveLeft = 1;
      }
      if (key == 'd') {
        this.moveRight = 1;
      }
    }
  }

  draw()
  {



    // alle snelheid * de hoeveelheid doen. dat 1 frame altijd laten we zeggen van 1000 gaat.
    // dus als scherm 1000 hoog is is het * 1
    // als het scherm 2000 hoog is is het * 2
    // als het scherm 500 is is het * 0.5
    // dus delen door 1000

     // scale(windowWidth/800);
     background(220);




     // check movement
     if (this.moveLeft === 1 && this.squareLength+(this.junctionDistance/2) > this.playerY) {
       this.playerX = this.playerX - width / 8;
       this.moveLeft = 0;
       if (this.wrongAwnser == 0) {
         this.y = this.y - 20;
       }
     }
     if (this.moveRight === 1 && this.squareLength+(this.junctionDistance/2) > this.playerY) {
       this.playerX = this.playerX + width / 8;
       this.moveRight = 0
       if (this.wrongAwnser == 1) {
         this.y = this.y - 20;
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
    rect(this.squareX, this.squareY, 50, this.squareLength);

    // draw lanes
    rect(width / 4, this.squareLength + this.junctionDistance, width / 8, height - this.squareLength);
    rect((width / 8) * 5, this.squareLength + this.junctionDistance, width / 8, height - this.squareLength);

    // draw borders
    rect(0, 0, width / 4, height);
    rect(width - width / 4, 0, width / 4, height);

    // draw score
    textSize(150);
    fill(255, 255, 255);
    text(int(this.squareLength/ 100) , (width / 8) * 7, 200);
  }

}
