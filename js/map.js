let tileSize = 64;

class Tile
{
  constructor(x, y)
  {
    // Position of the tile
    this.x = x;
    this.y = y;

    // Opacity of the tile
    this._opacity = 1.0;
    this._opacityVelocity = 0.0;

    // Boolean if the tile should be removed
    this._markedForRemoval = false;
    this._remove = false;
  }

  // Draw function
  draw()
  {
    noStroke();
    fill(255, 255, 255, this._opacity * 255.0);
    rectMode(CORNER);
    rect(this.x * tileSize - tileSize * 0.5, this.y * tileSize + tileSize * 0.5, tileSize, tileSize);
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

class Map
{
  constructor()
  {
    this.tiles = [];
  }

  // Add a tile and return the tile
  addTile(x, y, ...constructorArgs)
  {
    // Check if a tile exists and remove it
    let tile = this.getTile(x, y);
    if (tile !== null)
      this.removeTile(x, y);

    // Add the tile to the array
    tile = new Tile(x, y, ...constructorArgs);
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

  // Return a tile at a position or null if no tile
  getTile(x, y)
  {
    // Iterate over the tiles
    for (let tile of this.tiles)
      if (tile.x === x && tile.y === y)
        return tile;

    // No tile found, so return null
    return null;
  }

  // Return a tile at a player position
  getPlayerTile(px, py)
  {
    let x = (px - tileSize * 0.5) / tileSize;
    let y = (py - tileSize * 0.5) / tileSize;
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
}
