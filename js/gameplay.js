
class gameplay{


  function setup() {
    createCanvas(400, 400);

    // monster parameters
    x = width / 2
    y = height - 20
    s = 10;

    // player parameters
    playerX = x
    playerY = height - 60

    // Obstacle parameters
    squareX = width / 2 - 25
    squareY = 0
    squareLength = 50

    // colours
    colorMonster = color(255, 0, 0);
    colorMap = color(0, 0, 0);

  }

  function keyPressed() {

    // check if movement is possible
    if (squareLength+50 > playerY && squareLength < playerY){

      if (key == 'a') {
        playerX = playerX - 50
      }
      if (key == 'd') {
        playerX = playerX+ 50
      }
    }

  }

  function draw() {

    background(220);

    // player
    circle(playerX,playerY,s);

    fill(colorMonster);
    // monster
    circle(x,y,s);

    fill(colorMap);

    // move obstacle
    squareLength = squareLength + 1

    // draw obstacle
    rect(squareX,squareY,50,squareLength)

    // draw lanes
    rect(250,squareLength + 50,50, 400 - squareLength)
    rect(100,squareLength + 50,50, 400 - squareLength)

    // draw borders
    rect(0,0,100,400)
    rect(width-100,0,100,400)

  }

}
