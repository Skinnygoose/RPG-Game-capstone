export function createNPC(scene, x, y, spriteKey) {
  // Create the NPC sprite
  const npc = scene.physics.add.sprite(x, y, spriteKey);

  // Set up basic properties for the NPC
  //   npc.setCollideWorldBounds(true);
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
    ease: "Linear",
    onStart: () => {
      npc.setFlipX(false); // Ensure it's not flipped
      npc.anims.play("npc-right", true); // Play right animation when moving right
    },
    onYoyo: () => {
      npc.setFlipX(true); // Reset the flip before playing left animation
      npc.anims.play("npc-left", true); // Play left animation when moving left
    },
    onRepeat: () => {
      npc.setFlipX(true); // Reset flip on repeat
      npc.anims.play("npc-right", true); // Play right animation when moving right
    },
  });
}

export function createNPCAnimations(scene, spriteKey) {
  // Define NPC animations
  scene.anims.create({
    key: "npc-left",
    frames: scene.anims.generateFrameNumbers(spriteKey, { start: 3, end: 5 }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: "npc-right",
    frames: scene.anims.generateFrameNumbers(spriteKey, { start: 6, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: "npc-up",
    frames: scene.anims.generateFrameNumbers(spriteKey, { start: 9, end: 11 }),
    frameRate: 10,
    repeat: -1,
  });

  scene.anims.create({
    key: "npc-down",
    frames: scene.anims.generateFrameNumbers(spriteKey, { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1,
  });
}
let npcs = [];
export function setupNPCs(scene, spriteKey) {
  // Create animations for the NPC
  createNPCAnimations(scene, spriteKey);

  // Create and set movement for NPCs
  const npc1 = createNPC(scene, 4300, 500, spriteKey);
  setNPCLoopMovement(scene, npc1, 4300, 4200, 2000);

  const npc2 = createNPC(scene, 4096, 768, spriteKey);
  setNPCLoopMovement(scene, npc2, 4096, 4086, 2000);

  const npc3 = createNPC(scene, 3472, 448, spriteKey);
  setNPCLoopMovement(scene, npc3, 3472, 3482, 2000);

  const npc4 = createNPC(scene, 2800, 528, spriteKey);
  setNPCLoopMovement(scene, npc4, 2800, 2810, 2000);

  const npc5 = createNPC(scene, 1440, 528, spriteKey);
  setNPCLoopMovement(scene, npc5, 1440, 1430, 2000);

  const npc6 = createNPC(scene, 2800, 528, spriteKey);
  setNPCLoopMovement(scene, npc6, 2800, 2810, 2000);

  const npc7 = createNPC(scene, 96, 500, spriteKey);
  setNPCLoopMovement(scene, npc7, 96, 86, 2000);

  const npc8 = createNPC(scene, 1488, 1024, spriteKey);
  setNPCLoopMovement(scene, npc8, 1488, 1478, 2000);

  const npc9 = createNPC(scene, 2016, 1184, spriteKey);
  setNPCLoopMovement(scene, npc9, 2016, 2026, 2000);

  const npc10 = createNPC(scene, 3040, 1168, spriteKey);
  setNPCLoopMovement(scene, npc10, 3040, 3030, 2000);

  const npc11 = createNPC(scene, 4480, 1184, spriteKey);
  setNPCLoopMovement(scene, npc11, 4480, 4470, 2000);

  const npc12 = createNPC(scene, 4528, 1176, spriteKey);
  setNPCLoopMovement(scene, npc12, 4528, 4538, 2000);

  const npc13 = createNPC(scene, 3648, 1840, spriteKey);
  setNPCLoopMovement(scene, npc13, 3648, 3638, 2000);

  const npc14 = createNPC(scene, 3760, 1840, spriteKey);
  setNPCLoopMovement(scene, npc14, 3760, 3770, 2000);

  const npc15 = createNPC(scene, 2496, 2160, spriteKey);
  setNPCLoopMovement(scene, npc15, 2496, 2486, 2000);

  const npc16 = createNPC(scene, 3168, 2768, spriteKey);
  setNPCLoopMovement(scene, npc16, 3168, 3178, 2000);

  const npc17 = createNPC(scene, 224, 2928, spriteKey);
  setNPCLoopMovement(scene, npc17, 224, 234, 2000);

  const npc18 = createNPC(scene, 4720, 2896, spriteKey);
  setNPCLoopMovement(scene, npc18, 4720, 4710, 2000);

  const npc19 = createNPC(scene, 3280, 2976, spriteKey);
  setNPCLoopMovement(scene, npc19, 3280, 3270, 2000);

  const npc20 = createNPC(scene, 3312, 768, spriteKey);
  setNPCLoopMovement(scene, npc20, 3312, 3322, 2000);

  // Add NPCs to the array for cleanup
  //   npcs = [npc1, npc2 /* other NPCs */];

  //   scene.events.on("popupClosed", () => {
  //     console.log(
  //       "Before cleanup:",
  //       npcs.map((npc) => ({ x: npc.x, y: npc.y }))
  //     );
  //     cleanupNPCs(scene);
  //     console.log("After cleanup:", npcs);
  //     setupNPCs(scene, spriteKey); // Recreate NPCs
  //     npcs.forEach(npc => npc.setCollideWorldBounds(true));
  //   });
}
