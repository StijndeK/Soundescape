let x,y,s;
let playerX, playerY;
let squareX, squareY, squareLength;
let colorMonster, colorMap,colorObst;
let wrongAwnser;


class Gameplay
{
  constructor(){}

   setup() {
    createCanvas(400, 400);

    // monster parameters
    x = width / 2;
    y = height - 20;
    s = 10;

    // player parameters
    playerX = x;
    playerY = height - 60;

    // Obstacle parameters
    squareX = width / 2 - 25;
    squareY = 0;
    squareLength = 50;

    // colours
    colorMonster = color(255, 0, 0);
    colorMap = color(0, 0, 0);
    colorObst = color(255,0,0);

    // set which is right awnser, for now just set it to one
    wrongAwnser = random(2);
    print(wrongAwnser)
  }

   keyPressed() {

    // check if movement is possible
    if (squareLength+50 > playerY && squareLength < playerY){

      if (key == 'a') {
        playerX = playerX - 62;
        if (wrongAwnser <= 1) {
          y = y - 20;
          print('a')
        }
      }
      if (key == 'd') {
        playerX = playerX + 62;
        if (wrongAwnser > 1) {
          y = y - 20;
        }
      }
    }

  }


   draw() {
     background(220);

     fill(colorObst);

     // draw blocade and make monster come closer
     if (squareLength > 400) {
       if (wrongAwnser <= 1) {
         rect(100,squareLength-400,100,50);
       }
       else {
         rect(200,squareLength-400,100,50);
       }
     }

    fill(colorMonster);

    // monster
    circle(playerX,y,s);

    fill(colorMap);

    // player
    circle(playerX,playerY,s);

    // move obstacle
    squareLength = squareLength + 1;

    // draw obstacle
    rect(squareX,squareY,50,squareLength);

    // draw lanes
    rect(250,squareLength + 50,50, 400 - squareLength);
    rect(100,squareLength + 50,50, 400 - squareLength);

    // draw borders
    rect(0,0,100,400);
    rect(width-100,0,100,400);

  }

}
