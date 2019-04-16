let x,y,s;
let playerX, playerY;
let squareX, squareY, squareLength;
let colorMonster, colorMap;
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

    // set which is right awnser, for now just set it to one
    wrongAwnser = 1;

  }

   keyPressed() {

    // check if movement is possible
    if (squareLength+50 > playerY && squareLength < playerY){

      if (key == 'a') {
        playerX = playerX - 50;
      }
      if (key == 'd') {
        playerX = playerX+ 50;
      }
    }

  }
   draw() {

     // draw blocade and make monster come closer
     if (squareLength == height) {
       

     }

    background(220);

    // player
    circle(playerX,playerY,s);

    fill(colorMonster);
    // monster
    circle(playerX,y,s);

    fill(colorMap);

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
