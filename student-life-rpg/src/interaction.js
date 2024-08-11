export default class Interaction {
    constructor(scene, player, wallLayer, messageBox, TileIndex) {
      this.scene = scene;
      this.player = player;
      this.wallLayer = wallLayer;
      this.messageBox = messageBox;
      this.TileIndex = TileIndex;
  
      // Set up collision detection
      this.scene.physics.add.collider(this.player, this.wallLayer, this.handleInteraction, null, this);
    }
  
    handleInteraction(player, tile) {
      // Check if the tile is the flower tile
      if (tile.index === this.TileIndex) {
        let message;
  
       
  
        // Determine the message based on the tile's position
        if (tile.pixelX === 4688 && tile.pixelY === 528) {
          message = 'This is the entrance to your accommodation.';
        } else if (tile.pixelX === 300 && tile.pixelY === 400) {
          message = 'You found a hidden garden!';
        } else if (tile.pixelX === 500 && tile.pixelY === 600) {
          message = 'This flower seems special...';
        } else {
          message = 'There is something here.';
        }
  
        // Display the specific message
        this.messageBox.show(tile.pixelX, tile.pixelY - 50, message);
  
        // Log the message being shown for debugging
        console.log(`Message displayed: ${message}`);
      }
    }
  }
  