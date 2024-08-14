// npcMessages.js
export function getNPCMessage(npc) {
    const id = npc.id; // Assume each NPC has a unique ID
  
    switch(id) {
      case 1:
        return "Hey young man you look new , well let me tell you finding a place to rent is not easy these days , take me for instance half of my paycheck goes to rent , spend your money wisely!";
      case 2:
        return "This is NPC 2: Need help finding something?";
      case 3:
        return "This is NPC 3: The best place to eat is nearby.";
      case 4:
        return "This is NPC 4: Watch out for the traffic!";
      case 5:
        return "This is NPC 5: Check out the local market!";
      case 6:
        return "This is NPC 5: Check out the local market!";
      case 7:
        return "This is NPC 5: Check out the local market!";
      case 8:
        return "This is NPC 5: Check out the local market!";
      case 9:
        return "This is NPC 5: Check out the local market!";
      case 10:
        return "This is NPC 5: Check out the local market!";
      case 11:
        return "This is NPC 5: Check out the local market!";
      case 12:
        return "This is NPC 5: Check out the local market!";
      case 13:
        return "This is NPC 5: Check out the local market!";
      case 14:
        return "This is NPC 5: Check out the local market!";
      case 15:
        return "This is NPC 5: Check out the local market!";
      case 16:
        return "This is NPC 5: Check out the local market!";
      case 17:
        return "This is NPC 5: Check out the local market!";
      case 18:
        return "This is NPC 5: Check out the local market!";
      case 19:
        return "This is NPC 5: Check out the local market!";
      case 20:
        return "This is NPC 5: Check out the local market!";
      // Add more cases as needed
      default:
        return "Damn it , i lost the bet again.";
    }
  }
  
  export function handleNPCInteraction(scene, player, npc) {
    const message = getNPCMessage(npc);
    // Ensure messageBox is properly initialized in the scene
    if (scene.messageBox) {
      scene.messageBox.show(npc.x - 100, npc.y - 100, message);
    } else {
      console.error("MessageBox is not initialized in the scene.");
    }
  }
  