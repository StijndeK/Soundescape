let tileSize = 64;

// Functions for direction
let south = function(x, y, originX, originY) {
  return [x, y];
};
let west = function(x, y, originX, originY) {
  return [originX - (y - originY), originY + (x - originX)];
};
let north = function(x, y, originX, originY) {
  return [originX - (x - originX), originY - (y - originY)];
};
let east = function(x, y, originX, originY) {
  return [originX + (y - originY), originY - (x - originX)];
};
let directions = [east, north, west, south];

class Tile
{
  constructor(x, y, trigger = null)
  {
    // Position of the tile
    this.x = x;
    this.y = y;

    if (trigger !== null)
      this.trigger = trigger;
    else
      this.trigger = null;

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

    if ((this.y % 2 + this.x) % 2 === 0)
      fill(255, 255, 255, this._opacity * 255.0);
    else
      fill(240, 240, 240, this._opacity * 255.0);

    rectMode(CENTER);
    rect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
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
    this._opacityVelocity = -0.01;
  }
}

class TileMap
{
  constructor()
  {
    this.tiles = [];
  }

  // Return a tile at a position or null if no tile
  getTile(x, y)
  {
    // Iterate over the tiles
    for (let i = 0; i < this.tiles.length; i ++)
    {
      let tile = this.tiles[i];
      if (tile.x === floor(x) && tile.y === floor(y))
        return tile;
    }

    // No tile found, so return null
    return null;
  }

  // Return a tile at a player position
  getPlayerTile(px, py)
  {
    let x = floor((px + tileSize * 0.5) / tileSize);
    let y = floor((py + tileSize * 0.5) / tileSize);
    return this.getTile(x, y);
  }

  // Add a tile and return the tile
  addTile(x, y, trigger = null)
  {
    // Check if a tile exists and remove it
    let tile = this.getTile(x, y);
    if (tile !== null)
      this.removeTile(x, y);

    // Add the tile to the array
    tile = new Tile(x, y, trigger);
    this.tiles.push(tile);
    return tile;
  }

  // Remove a tile
  removeTile(x, y)
  {
    let tile = this.getTile(x, y);
    if (tile !== null)
      tile.markForRemoval();
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
  generateQuestion(x, y, direction)
  {
    let baseLength = 4;
    let baseWidth = 2;

    print(direction);

    // Add base
    for (let i = 0; i < baseLength + 1; i ++)
    {
      let pos = directions[direction](x, y + i, x, y);
      this.addTile(pos[0], pos[1]);
    }

    // Add first directions
    let pos1 = directions[direction](x + 1, y + baseLength, x, y);
    let triggerPos1 = directions[direction](x + baseWidth + 1, y + baseLength, x, y);
    this.addTile(pos1[0], pos1[1], function(tile) {
      let newDirection = (directions.indexOf(direction) + 1) % 4;
      this.generateQuestion(triggerPos1[0], triggerPos1[1], newDirection);
    }.bind(this));

    let pos2 = directions[direction](x - 1, y + baseLength, x, y);
    let triggerPos2 = directions[direction](x - baseWidth - 1, y + baseLength, x, y);
    this.addTile(pos2[0], pos2[1], function(tile) {
      let newDirection = (directions.indexOf(direction) - 1) % 4;
      this.generateQuestion(triggerPos2[0], triggerPos2[1], newDirection);
    }.bind(this));

    // Add directions
    for (let i = 1; i < baseWidth; i ++)
    {
      let pos1 = directions[direction](x + i + 1, y + baseLength, x, y);
      let pos2 = directions[direction](x - i - 1, y + baseLength, x, y);

      this.addTile(pos1[0], pos1[1]);
      this.addTile(pos2[0], pos2[1]);
    }
  }
}
