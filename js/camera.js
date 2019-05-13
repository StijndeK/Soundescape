class Transition
{
  constructor(from, to, time, setterFunction)
  {
    this.from = from;
    this.to = to;
    this.time = time;
    this.setterFunction = setterFunction;

    this._currentTime = 0;
    this._remove = false;
  }

  update()
  {
    // Increase the time
    this._currentTime ++;
    if (this._currentTime >= this.time)
      this._remove = true;

    // Set the lerped value
    let lerpedValue = lerp(this.from, this.to, this._currentTime / this.time);
    this.setterFunction(lerpedValue);
  }
}

class Camera
{
  constructor()
  {
    this.x = 0;
    this.y = 0;
    this.rotation = 0.0;
    this.scale = 1.0;

    this.transitions = [];
  }

  // Move with a transition
  doMove(x, y, time = 0)
  {
    this.transitions.push(new Transition(this.x, x, time, function(lerpedValue) {
      this.x = lerpedValue;
    }.bind(this)));

    this.transitions.push(new Transition(this.y, y, time, function(lerpedValue) {
      this.y = lerpedValue;
    }.bind(this)));
  }
  doMoveDelta(dX, dY, time = 0)
  {
    this.doMove(this.x + dX, this.y + dY, time);
  }

  // Rotate with a transition
  doRotate(rotation, time = 0)
  {
    this.transitions.push(new Transition(this.rotation, rotation, time, function(lerpedValue) {
      print(lerpedValue);
      this.rotation = lerpedValue;
    }.bind(this)));
  }
  doRotateDelta(dRotation, time = 0)
  {
    this.doRotate(this.rotation + dRotation, time);
  }

  // Scale with a transition
  doScale(scale, time)
  {
    this.transitions.push(new Transition(this.scale, scale, time, function(lerpedValue) {
      this.scale = lerpedValue;
    }.bind(this)));
  }
  doScaleDelta(dScale, time)
  {
    this.doScale(this.scale * dScale, time);
  }

  // Begin draw
  beginDraw()
  {
    push();
    angleMode(DEGREES);
    translate(width / 2,  height / 2);
    scale(this.scale);
    rotate(this.rotation);
    translate(this.x, this.y);
  }

  // End draw
  endDraw()
  {
    pop();
  }

  // Update function
  update()
  {
    // Iterate over the transitions
    for (let i = 0; i < this.transitions.length; i ++)
    {
      let transition = this.transitions[i];

      // Update the transition
      transition.update();

      // Check for removal
      if (transition._remove)
      {
        this.transitions.splice(i, 1);
        i --;
      }
    }
  }
}
