import Phaser from "phaser";
import StatusBar from "./stressbar.js";
import MessageBox from "./popUp.js";
import { setupNPCs } from "./npcSetup.js";
import { handleInteraction } from "./handleInteraction.js";
import { getNPCMessage, handleNPCInteraction } from "./npcMessage.js";
import BalanceMiniGame from "./BalanceMiniGame";

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    this.load.image("tiles", "assets/Modern_Exteriors_Complete_Tileset.png");
    this.load.tilemapTiledJSON("map", "assets/RPG-Map18.json");
    this.load.spritesheet("player", "assets/player.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("npcSprite", "assets/npc-male.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.audio("backgroundMusic", ["assets/background.wav"]);
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage(
      "Modern_Exteriors_Complete_Tileset",
      "tiles"
    );
    const aboveLayer = map.createLayer("below player", tileset, 0, 0);
    const worldLayer = map.createLayer("world", tileset, 0, 0);
    const belowLayer = map.createLayer("above player", tileset, 0, 0);
    const wallLayer = map.createLayer("wall", tileset, 0, 0);

    wallLayer.setCollisionByExclusion([-1]);
    worldLayer.setCollisionByExclusion([-1]);
    belowLayer.setCollisionByExclusion([-1]);

    const backgroundMusic = this.sound.add("backgroundMusic", {
      loop: true,
      volume: 0.5,
    });

    // backgroundMusic.play();

    this.player = this.physics.add.sprite(4700, 590, "player");

    // Set up NPCs
    this.npcs = setupNPCs(this, "npcSprite");

    // Add collision between player and NPCs
    this.npcs.forEach((npc) => {
      this.physics.add.collider(this.player, npc, (player, npc) => {
        console.log(`NPC ID: ${npc.id}`);
        handleNPCInteraction(this, player, npc);
      });
    });

    // Initialize MessageBox
    this.messageBox = new MessageBox(this);

    // Set up collisions
    this.physics.add.collider(
      this.player,
      worldLayer,
      this.handleCollision,
      null,
      this
    );

    // Set up collision detection for interaction
    this.physics.add.collider(this.player, wallLayer, (player, tile) => {
      handleInteraction(player, tile, this.messageBox);
    });
    // Example: Show the message box at the player's position when the game starts
    this.messageBox.show(
      this.player.x - 100,
      this.player.y - 100,
      "Press down to scroll Welcome to the game! You are in a new country as an international student. Your first task is to find accommodation. Explore the city, good luck!"
    );

    // Create the money bar (top right corner) and study bar (below money bar)
    // this.moneyBar = new StatusBar(this, 0, 0, 200, 20, 0xffd700); // Gold color
    // this.studyBar = new StatusBar(this, 0, 40, 200, 20, 0x0000ff); // Blue color

    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Define animations for each direction
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player", { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });

    this.input.keyboard.on("keydown-Q", () => {
      console.log("Starting QuestScene...");
      this.scene.start("QuestScene");
    });

    const specialTileIndex = 3220;

    this.miniGame = new BalanceMiniGame(this, 0, 0);

    
    this.physics.add.collider(this.player, wallLayer, (player, tile) => {
      console.log("Collision detected with tile index:", tile.index);
      if (tile.index === specialTileIndex) { // Replace 'specialTileIndex' with the actual index of your special tile
        console.log("Collision detected with special tile, starting mini-game...");
        this.startMiniGame();
      } 
    });



  }

  handleCollision(player, tile) {
    console.log("Collision detected with boundary tile in below player layer!");
    console.log("Tile index:", tile.index);
    console.log(`Tile coordinates: X=${tile.x}, Y=${tile.y}`);
    console.log(
      `Tile pixel coordinates: PixelX=${tile.pixelX}, PixelY=${tile.pixelY}`
    );
  }

  startMiniGame() {
    if (this.miniGame) {
      this.miniGame.startMiniGame();
    } else {
      console.error("Mini-game object is not initialized");
    }
  }

  update() {
    this.player.body.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-300);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(300);
      this.player.anims.play("right", true);
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-300);
      this.player.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(300);
      this.player.anims.play("down", true);
    } else {
      this.player.anims.stop();
    }
    // const depletionRate = 0.002;
    // Deplete the money bar and study bar over time
    // this.moneyBar.decrease(depletionRate);
    // this.studyBar.decrease(depletionRate);

    // Keep the bars fixed relative to the camera
    // this.moneyBar.bar.setPosition(
    //   this.cameras.main.scrollX + this.cameras.main.width - 220,
    //   this.cameras.main.scrollY + 20
    // );
    // this.studyBar.bar.setPosition(
    //   this.cameras.main.scrollX + this.cameras.main.width - 220,
    //   this.cameras.main.scrollY + 60
    // );
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 800,
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
  scene: [MainScene],
};

const game = new Phaser.Game(config);
