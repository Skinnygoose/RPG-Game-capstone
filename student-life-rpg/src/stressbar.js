import Phaser from 'phaser';

export default class StatusBar {
  constructor(scene, x, y, width, height, color) {
    this.scene = scene;
    this.level = 100; // Initial level (0 to 100)
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;

    // Create the status bar graphics
    this.bar = this.scene.add.graphics();
    this.draw();
  }

  draw() {
    this.bar.clear();

    // Draw the status bar background (e.g., grey)
    this.bar.fillStyle(0x808080, 1);
    this.bar.fillRect(this.x, this.y, this.width, this.height);

    // Calculate width of status bar based on current level
    const barWidth = this.width * (this.level / 100);

    // Draw the current level bar (e.g., the color passed to the constructor)
    this.bar.fillStyle(this.color, 1);
    this.bar.fillRect(this.x, this.y, barWidth, this.height);

    // Optionally, draw a border around the status bar
    this.bar.lineStyle(2, 0xffffff);
    this.bar.strokeRect(this.x, this.y, this.width, this.height);
  }

  decrease(amount) {
    this.level = Phaser.Math.Clamp(this.level - amount, 0, 100);
    this.draw();
  }

  increase(amount) {
    this.level = Phaser.Math.Clamp(this.level + amount, 0, 100);
    this.draw();
  }
}
