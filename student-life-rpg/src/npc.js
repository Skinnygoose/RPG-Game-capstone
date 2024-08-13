import Phaser from "phaser";

export  function createNPC(scene, x, y, spriteKey) {
  // Create the NPC sprite
  const npc = scene.physics.add.sprite(x, y, spriteKey);

  // Set up basic properties for the NPC
  npc.setCollideWorldBounds(true);
  npc.body.immovable = true;

  return npc;
}

export function setNPCLoopMovement(scene, npc, leftX, rightX, duration) {
    scene.tweens.add({
      targets: npc,
      x: { from: leftX, to: rightX },
      duration: duration,
      yoyo: true,
      repeat: -1,
      ease: 'Linear',
      onStart: () => {
        npc.setFlipX(false); // Ensure it's not flipped
        npc.anims.play('npc-right', true); // Play right animation when moving right
      },
      onYoyo: () => {
        npc.setFlipX(true); // Reset the flip before playing left animation
        npc.anims.play('npc-left', true); // Play left animation when moving left
      },
      onRepeat: () => {
        npc.setFlipX(true); // Reset flip on repeat
        npc.anims.play('npc-right', true); // Play right animation when moving right
      }
    });
}
  
