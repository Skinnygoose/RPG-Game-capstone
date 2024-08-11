import Phaser from "phaser";
import StatusBar from "./stressbar.js";
import MessageBox from "./popUp.js";
import Interaction from "./interaction.js";

let player;
let cursors;
let moneyBar;
let studyBar;
let depletionRate = 0.002; // Rate at which bars deplete per frame
let messageBox;

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  pixelArt: true,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("tiles", "assets/Modern_Exteriors_Complete_Tileset.png");
  this.load.tilemapTiledJSON("map", "assets/RPG-Map11.json");
  this.load.spritesheet("player", "assets/player.png", {
    frameWidth: 32,
    frameHeight: 32,
  });
}

function create() {

  const map = this.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });
  const tileset = map.addTilesetImage('Modern_Exteriors_Complete_Tileset', 'tiles');
  
  const aboveLayer = map.createLayer('below player', tileset, 0, 0);
  const worldLayer = map.createLayer('world', tileset, 0, 0);
  const belowLayer = map.createLayer('above player', tileset, 0, 0);
  const wallLayer = map.createLayer('wall', tileset, 0, 0);

  if (!worldLayer || !wallLayer) {
    console.error('World or wall layer failed to load or create.');
    return;
  }

  worldLayer.setCollisionByExclusion([-1]);
  belowLayer.setCollisionByExclusion([-1]);
  wallLayer.setCollisionByExclusion([-1]);

  player = this.physics.add.sprite(4700, 590, 'player');
  player.body.setSize(16, 16);

  this.physics.add.collider(player, wallLayer, handleCollision, null, this);
  this.physics.add.collider(player, worldLayer, handleCollision, null, this);
  this.physics.add.collider(player, belowLayer, handleCollision, null, this);

  // Debugging graphics for collision
  const debugGraphics = this.add.graphics().setAlpha(0.75);
  wallLayer.renderDebug(debugGraphics, {
    tileColor: null,
    collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
    faceColor: new Phaser.Display.Color(40, 39, 37, 255)
  });

  // Create the dynamic message box
  messageBox = new MessageBox(this, 300, 150);

  // Show the message box at the player's position when the game starts
  messageBox.show(player.x - 100, player.y - 100, 'Press down to scroll. Welcome to the game!');

  // Create the money bar and study bar
  moneyBar = new StatusBar(this, 0, 0, 200, 20, 0xffd700);
  studyBar = new StatusBar(this, 0, 40, 200, 20, 0x0000ff);

  cursors = this.input.keyboard.createCursorKeys();
  this.cameras.main.startFollow(player);
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
}

// Define a separate collision handling function
function handleCollision(player, tile) {
  console.log('Collision detected!');

  // Log player's position
  console.log(`Player coordinates: X=${player.x}, Y=${player.y}`);

  // Log collided tile's position and index
  console.log(`Collided Tile coordinates: Tile X=${tile.x}, Tile Y=${tile.y}, Pixel X=${tile.pixelX}, Pixel Y=${tile.pixelY}, Index=${tile.index}`);

  // Check if the collided tile is the flower tile or any specific tile
  if (tile.index === 4240) {  // Replace with the actual tile index
    console.log('Correct tile detected. Triggering message box.');
    const message = 'This is a specific message for this tile.';
    messageBox.show(tile.pixelX, tile.pixelY - 50, message);
  } else {
    console.log('Collided with a tile, but it is not the target tile.');
  }
}





  

function update() {
  player.body.setVelocity(0);

  if (cursors.left.isDown) {
    player.body.setVelocityX(-300);
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(300);
    player.anims.play("right", true);
  } else if (cursors.up.isDown) {
    player.body.setVelocityY(-300);
    player.anims.play("up", true);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(300);
    player.anims.play("down", true);
  } else {
    player.anims.stop();
  }

  // Deplete the money bar and study bar over time
  moneyBar.decrease(depletionRate);
  studyBar.decrease(depletionRate);

  // Keep the bars fixed relative to the camera
  moneyBar.bar.setPosition(
    this.cameras.main.scrollX + this.cameras.main.width - 220,
    this.cameras.main.scrollY + 20
  );
  studyBar.bar.setPosition(
    this.cameras.main.scrollX + this.cameras.main.width - 220,
    this.cameras.main.scrollY + 60
  );
}
