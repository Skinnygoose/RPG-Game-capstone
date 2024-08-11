import Phaser from 'phaser';
import StatusBar from './stressbar.js'; 
import  MessageBox  from './popUp.js'; 

let player;
let cursors;
let moneyBar;
let studyBar;
let depletionRate = 0.002;  // Rate at which bars deplete per frame
let messageBox;

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
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
  this.load.image('tiles', 'assets/Modern_Exteriors_Complete_Tileset.png');
  this.load.tilemapTiledJSON('map', 'assets/RPG-Map7.json');
  this.load.spritesheet('player', 'assets/player.png', {
    frameWidth: 32,
    frameHeight: 32,
  });
}

function create() {

    
  


  const map = this.make.tilemap({ key: 'map' });
  const tileset = map.addTilesetImage('Modern_Exteriors_Complete_Tileset', 'tiles');
  const aboveLayer = map.createLayer('below player', tileset, 0, 0);
  const worldLayer = map.createLayer('world', tileset, 0, 0);
  const belowLayer = map.createLayer('above player', tileset, 0, 0);

  worldLayer.setCollisionByExclusion([-1]);
  belowLayer.setCollisionByExclusion([-1]);

  player = this.physics.add.sprite(4700, 590, 'player');




  this.physics.add.collider(player, worldLayer);

  
   // Create the dynamic message box
   messageBox = new MessageBox(this, 300, 150);

   // Example: Show the message box at the player's position when the game starts
   messageBox.show(player.x-100, player.y - 100, ' Press down to scroll Welcome to the game! you are in new country as an international student , your first task is to find accomodation , explore the city , good luck!.');
 
   
   



  // Create the money bar (top right corner) and study bar (below money bar)
  moneyBar = new StatusBar(this, 0, 0, 200, 20, 0xffd700);  // Gold color
  studyBar = new StatusBar(this, 0, 40, 200, 20, 0x0000ff);  // Blue color

  cursors = this.input.keyboard.createCursorKeys();
  this.cameras.main.startFollow(player);
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);


  

  
  



// Define animations for each direction
this.anims.create({
  key: 'left',
  frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
  frameRate: 10,
  repeat: -1
});

this.anims.create({
  key: 'right',
  frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
  frameRate: 10,
  repeat: -1
});

this.anims.create({
  key: 'up',
  frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
  frameRate: 10,
  repeat: -1
});

this.anims.create({
  key: 'down',
  frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
  frameRate: 10,
  repeat: -1 
});

}







function update() {
  player.body.setVelocity(0);

  if (cursors.left.isDown) {
    player.body.setVelocityX(-300);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(300);
    player.anims.play('right', true);
  } else if (cursors.up.isDown) {
    player.body.setVelocityY(-300);
    player.anims.play('up', true);
  } else if (cursors.down.isDown)   {
    player.body.setVelocityY(300);
    player.anims.play('down', true);
  } else {
    player.anims.stop();
  }

  // Deplete the money bar and study bar over time
  moneyBar.decrease(depletionRate);
  studyBar.decrease(depletionRate);

  // Keep the bars fixed relative to the camera
  moneyBar.bar.setPosition(this.cameras.main.scrollX + this.cameras.main.width - 220, this.cameras.main.scrollY + 20);
  studyBar.bar.setPosition(this.cameras.main.scrollX + this.cameras.main.width - 220, this.cameras.main.scrollY + 60);
}

