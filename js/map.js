// Constants
const TILE_SIZE = 64;

//------------------------------------------------------------------------------

// Tile class
class Tile
{
  constructor(position, trigger = null)
  {
    this.position = position;
    this.trigger = trigger;

    // Opacity of the tile
    this._opacity = 0.0;
    this._opacityVelocity = 0.05;

    // Boolean if the tile should be removed
    this._markedForRemoval = false;
    this._remove = false;

    this.imgValue = int(random(3));
    this.imgPath = 'assets/Road Tile 1.png'
    this.imgPath = 'assets/Road Tile 2.png'
    this.imgPath = 'assets/Road Tile 3.png'

    switch(this.imgValue) {
      case 0:
        this.imgPath = 'assets/Road Tile 1.png'
          break;
      case 1:
        this.imgPath = 'assets/Road Tile 2.png'
        break;
      case 1:
        this.imgPath = 'assets/Road Tile 3.png'
        break;
      }

    this.img = loadImage(this.imgPath);
    this.tintValue = 255;
  }

  // Draw function
  draw()
  {
    noStroke();

    if ((this.position.y % 2 + this.position.x) % 2 === 0)
      fill(255, 255, 255, this._opacity * 255.0);
    else
      fill(240, 240, 240, this._opacity * 255.0);

    imageMode(CENTER);
    // tint for opacity
    image(this.img, this.position.x * TILE_SIZE, this.position.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  // Update function
  update()
  {
    // Update the opacity
    // this.tintValue -= 100;
    // tint(255, this.tintValue);

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

//------------------------------------------------------------------------------

// Tile map class
class TileMap
{
  constructor(game)
  {
    this.game = game;
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

  // Return a tile adjacent to a position or null if no tile
  getAdjacentTile(position, direction)
  {
    return this.getTile(position.add({x: 1, y: 0, direction: direction}));
  }

  // Return a tile at a player position
  getPlayerTile(px, py)
  {
    let x = floor((px + TILE_SIZE * 0.5) / TILE_SIZE);
    let y = floor((py + TILE_SIZE * 0.5) / TILE_SIZE);
    return this.getTile(new Coord(x, y));
  }

  // Return a tile adjecent to a player position
  getPlayerAdjacentTile(px, py, direction)
  {
    let x = floor((px + TILE_SIZE * 0.5) / TILE_SIZE);
    let y = floor((py + TILE_SIZE * 0.5) / TILE_SIZE);
    return this.getAdjacentTile(new Coord(x, y));
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
