// Constants
const TILE_SIZE = 64;

// Mixins
Number.prototype.mod = function(n) {
  return ((this % n) + n) % n;
};

// Point class
class Point
{
  constructor(x, y)
  {
    this.x = x;
    this.y = y;
  }

  // Add a point
  add(point)
  {
    return new Point(this.x + point.x, this.y + point.y);
  }

  // Subtract a point
  subtract(point)
  {
    return new Point(this.x - point.x, this.y - point.y);
  }

  // Return if this point equals another point
  equals(point)
  {
    return point instanceof Point && this.x === point.x && this.y === point.y;
  }
}

// Direction class
class Direction
{
  constructor(angle, transform)
  {
    this.angle = angle;
    this.transform = transform;
  }
}

// Direction definitions
Direction.EAST = new Direction(0, p => new Point(p.y, -p.x));
Direction.NORTH = new Direction(90, p => new Point(-p.x, -p.y));
Direction.WEST = new Direction(180, p => new Point(-p.y, p.x));
Direction.SOUTH = new Direction(270, p => new Point(p.x, p.y));

// Return the direction to the left (previous)
Direction.left = function(direction)
{
  let array = [Direction.EAST, Direction.NORTH, Direction.WEST, Direction.SOUTH];
  let index = array.indexOf(direction);
  if (index == -1)
    throw new Error('The direction is not supported: ' + direction);

  return array[(index - 1).mod(array.length)];
}

// Return the direction to the right (next)
Direction.right = function(direction)
{
  let array = [Direction.EAST, Direction.NORTH, Direction.WEST, Direction.SOUTH];
  let index = array.indexOf(direction);
  if (index == -1)
    throw new Error('The direction is not supported: ' + direction);
  else
    return array[(index + 1).mod(array.length)];
}

// Tile class
class Tile
{
  constructor(position, trigger = null)
  {
    // Position of the tile
    this.position = position;

    // Trigger function
    this.trigger = trigger;

    // Opacity of the tile
    this._opacity = 0.0;
    this._opacityVelocity = 0.05;

    // Boolean if the tile should be removed
    this._markedForRemoval = false;
    this._remove = false;
  }

  // Draw function
  draw()
  {
    noStroke();

    if ((this.position.y % 2 + this.position.x) % 2 === 0)
      fill(255, 255, 255, this._opacity * 255.0);
    else
      fill(240, 240, 240, this._opacity * 255.0);

    rectMode(CENTER);
    rect(this.position.x * TILE_SIZE, this.position.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  // Update function
  update()
  {
    // Update the opacity
    this._opacity += this._opacityVelocity;
    if (this._opacity <= 0.0)
    {
      this._opacityVelocity = 0.0;
      this._remove = true;
    }
    if (this._opacity >= 1.0)
    {
      this._opacityVelocity = 0.0;
      this._opacity = 1.0;
    }
  }

  // Mark this time for removal
  markForRemoval()
  {
    this._markedForRemoval = true;
    this._opacityVelocity = -0.005;
  }
}

// Tile map class
class TileMap
{
  constructor()
  {
    this.tiles = [];
  }

  // Return a tile at a position or null if no tile
  getTile(position)
  {
    // Iterate over the tiles
    for (let i = 0; i < this.tiles.length; i ++)
    {
      let tile = this.tiles[i];
      if (tile.position.equals(position))
        return tile;
    }

    // No tile found, so return null
    return null;
  }

  // Return a tile at a player position
  getPlayerTile(px, py)
  {
    let x = floor((px + TILE_SIZE * 0.5) / TILE_SIZE);
    let y = floor((py + TILE_SIZE * 0.5) / TILE_SIZE);
    return this.getTile(new Point(x, y));
  }

  // Add a tile and return the tile
  addTile(tile)
  {
    // Check if a tile exists and remove it
    let oldTile = this.getTile(tile.position);
    if (oldTile !== null)
      this.removeTile(oldTile);

    // Add the tile to the array
    this.tiles.push(tile);
    return tile;
  }

  // Add multiple tiles
  addTiles(tiles)
  {
    for (let tile of tiles)
      this.addTile(tile);
  }

  // Remove a tile
  removeTile(tile)
  {
    tile.markForRemoval();
  }

  // Remove multiple tiles
  removeTiles(tiles)
  {
    for (let tile of tiles)
      this.removeTile(tile);
  }

  // Draw function
  draw()
  {
    // Iterate over the tiles
    for (let i = 0; i < this.tiles.length; i ++)
    {
      let tile = this.tiles[i];

      // Draw the tile
      tile.draw();
    }
  }

  // Update function
  update()
  {
    // Iterate over the tiles
    for (let i = 0; i < this.tiles.length; i ++)
    {
      let tile = this.tiles[i];

      // Update the tile
      tile.update();

      // Check for removal
      if (tile._remove)
      {
        this.tiles.splice(i, 1);
        i --;
      }
    }
  }

  // Generate a new question
  generateQuestion(position, direction)
  {
    let baseLength = 4;
    let baseWidth = 2;

    let newTiles = [];

    // Add base
    for (let i = 0; i < baseLength + 1; i ++)
      newTiles.push(new Tile(position.add(direction.transform(new Point(0, i)))));

    // Add first directions with triggers
    let leftPosition = position.add(direction.transform(new Point(-1, baseLength)));
    let leftNewPosition = position.add(direction.transform(new Point(-(baseWidth + 1), baseLength)));
    newTiles.push(new Tile(leftPosition, tile => {
      this.generateQuestion(leftNewPosition, Direction.left(direction));
      this.removeTiles(newTiles);
    }));

    let rightPosition = position.add(direction.transform(new Point(1, baseLength)));
    let rightNewPosition = position.add(direction.transform(new Point(baseWidth + 1, baseLength)));
    newTiles.push(new Tile(rightPosition, tile => {
      this.generateQuestion(rightNewPosition, Direction.right(direction));
      this.removeTiles(newTiles);
    }));

    // Add directions
    for (let i = 1; i < baseWidth; i ++)
    {
      newTiles.push(new Tile(position.add(direction.transform(new Point(i + 1, baseLength)))));
      newTiles.push(new Tile(position.add(direction.transform(new Point(-(i + 1), baseLength)))));
    }

    // Add the tiles
    this.addTiles(newTiles);
  }
}
