// Constants
const TILE_SIZE = 64;

//------------------------------------------------------------------------------

// Tile type class
class TileType
{
  constructor(solid, imagePath)
  {
    this.solid = solid;
    this.imagePath = imagePath;
    this.image = null;
  }

  // Get an image
  getImage()
  {
    if (this.imagePath instanceof Array)
      return loadImage(this.imagePath.random());
    else
      return loadImage(this.imagePath);
  }
}

// Tile type definitions
TileType.ROAD_X = new TileType(false, ["assets/tiles/road0x_128.png", "assets/tiles/road1x_128.png"]);
TileType.ROAD_Y = new TileType(false, ["assets/tiles/road0y_128.png", "assets/tiles/road1y_128.png"]);
TileType.SPLIT_EAST = new TileType(false, "assets/tiles/Tsplitsing_Tile_1_x_west.png");
TileType.SPLIT_NORTH = new TileType(false, "assets/tiles/Tsplitsing_Tile_1_y.png");
TileType.SPLIT_WEST = new TileType(false, "assets/tiles/Tsplitsing_Tile_1_x_east.png");
TileType.SPLIT_SOUTH = new TileType(false, "assets/tiles/Tsplitsing_Tile_1_y.png");
TileType.WALL = new TileType(true, "assets/tiles/wall_128.png");

// Get road type for direction
TileType.roadFor = function(direction)
{
  if (direction.x !== 0 & direction.y === 0)
    return TileType.ROAD_X;
  else if (direction.y !== 0 & direction.x === 0)
    return TileType.ROAD_Y;
  else
    throw new Error('The direction is not supported: ' + direction);
}

// Get split type for direction
TileType.splitFor = function(direction)
{
  if (direction === Direction.EAST)
    return TileType.SPLIT_EAST;
  else if (direction === Direction.NORTH)
    return TileType.SPLIT_NORTH;
  else if (direction === Direction.WEST)
    return TileType.SPLIT_WEST;
  else if (direction === Direction.SOUTH)
    return TileType.SPLIT_SOUTH;
  else
    throw new Error('The direction is not supported: ' + direction);
}

//------------------------------------------------------------------------------

// Tile class
class Tile
{
  constructor(position, type, trigger = null)
  {
    this.position = position;
    this.type = type;
    this.trigger = trigger;

    // Sprite
    this.image = this.type.getImage();

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
    //tint(int(this.opacity * 256.0));
    imageMode(CENTER);
    image(this.image, this.position.x * TILE_SIZE, this.position.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
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
    return this.getAdjacentTile(new Coord(x, y), direction);
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
