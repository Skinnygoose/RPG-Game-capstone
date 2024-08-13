// File: handleInteraction.js
export function handleInteraction(player, tile, messageBox) {
    console.log("Collision detected!");
    console.log("Tile index:", tile.index);
  
    const specificTileIndex = 4241; // Example tile index, replace with your specific tile index
  
    if (tile.index === specificTileIndex) {
      let message;
  
      // Determine the message based on the tile's position or other criteria
      if (tile.pixelX === 4688 && tile.pixelY === 528) {
        message = "As you enter the city and come across a gas station";
      } else if (tile.pixelX === 3760 && tile.pixelY === 432) {
        message = "This is the famous hospital of this city, and they have many branches throughout the city";
      } else if (tile.pixelX === 3520 && tile.pixelY === 496) {
        message = "One of the fire stations of the city";
      } else if (tile.pixelX === 2832 && tile.pixelY === 480) {
        message = "You found one of the rental apartments, monthly rent is $1500! Definitely not this one unless you want to starve yourself ;)";
      } else if (tile.pixelX === 912 && tile.pixelY === 480) {
        message = "Looks like these are within your budget, but wait, what is the catch here? Oh, you need to share a room with someone, and it’s far from your school. At least you won’t go broke lol";
      } else if (tile.pixelX === 688 && tile.pixelY === 1072) {
        message = "This is CIT hospital's main building; it is also the biggest too!";
      } else if (tile.pixelX === 2976 && tile.pixelY === 1264) {
        message = "Welcome to Riverdale Park";
      } else if (tile.pixelX === 3888 && tile.pixelY === 1936) {
        message = "Humber College welcomes you!";
      } else if (tile.pixelX === 3920 && tile.pixelY === 1760) {
        message = "This is the main building where you will spend the next 2 years. Good luck!";
      } else if (tile.pixelX === 4432 && tile.pixelY === 1760) {
        message = "Oh, Humber residence! Wow, that is huge. Life would be much easier if you could stay here. Imagine the time you will save on traveling!";
      } else if (tile.pixelX === 4240 && tile.pixelY === 1328) {
        message = "Humber sports complex";
      } else if (tile.pixelX === 3424 && tile.pixelY === 2784) {
        message = "City beach looks even better in person. Maybe you should come here more often";
      } else {
        message = "There is something here.";
      }
  
      // Display the specific message using the MessageBox
      if (messageBox) {
        messageBox.show(
          tile.pixelX - 100,
          tile.pixelY - 100,
          message
        );
      } else {
        console.error('MessageBox is not available');
      }
    }
  }
  