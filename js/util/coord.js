// Polyfill for always positive modulo for numbers
Number.prototype.mod = function(n) {
  return ((this % n) + n) % n;
};

//------------------------------------------------------------------------------

// Coordinate class
class Coord
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
  }

  // Add a coordinate
  add(coordinate)
  {
    if (typeof(coordinate.direction) !== 'undefined')
      coordinate = coordinate.direction.transform(coordinate);
    return new Coord(this.x + coordinate.x, this.y + coordinate.y);
  }

  // Subtract a coordinate
  subtract(coordinate)
  {
    if (typeof(coordinate.direction) !== 'undefined')
      coordinate = coordinate.direction.transform(coordinate);
    return new Coord(this.x - coordinate.x, this.y - coordinate.y);
  }

  // Return if this coordinate equals another coordinate
  equals(o)
  {
    return o instanceof Coord && this.x === o.x && this.y === o.y;
  }
}

// Origin coordinate
Coord.ORIGIN = new Coord(0, 0);

//------------------------------------------------------------------------------

// Direction class
class Direction
{
  constructor(angle, transform)
  {
    this.angle = angle;
    this.transform = transform;
  }

  // Return the direction to the left (previous)
  static left(direction)
  {
    let index = Direction._array.indexOf(direction);
    if (index == -1)
      throw new Error('The direction is not supported: ' + direction);
    else
      return Direction._array[(index - 1).mod(Direction._array.length)];
  }

  // Return the direction to the right (next)
  static right(direction)
  {
    let index = Direction._array.indexOf(direction);
    if (index == -1)
      throw new Error('The direction is not supported: ' + direction);
    else
      return Direction._array[(index + 1).mod(Direction._array.length)];
  }
}

// Direction definitions
Direction.EAST = new Direction(0, c => new Coord(c.y, -c.x));
Direction.NORTH = new Direction(90, c => new Coord(-c.x, -c.y));
Direction.WEST = new Direction(180, c => new Coord(-c.y, c.x));
Direction.SOUTH = new Direction(270, c => new Coord(c.x, c.y));

// Array of directions
Direction._array = [Direction.EAST, Direction.NORTH, Direction.WEST, Direction.SOUTH];
