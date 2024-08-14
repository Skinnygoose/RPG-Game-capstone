export default class MessageBox {
  constructor(scene, width = 300, height = 150) {
    this.scene = scene;
    this.width = width;
    this.height = height;
    this.messageParts = [];
    this.currentPart = 0;

    // Create the message box container
    this.container = this.scene.add.container(0, 0);

    // Create a background for the message box
    this.background = this.scene.add.graphics();
    this.background.fillStyle(0x000000, 0.8);  // Black with some transparency
    this.background.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    this.background.setDepth(100);  // Set depth to ensure it appears on top

    // Create a text object for the message
    this.text = this.scene.add.text(0, 0, '', {
      fontSize: '18px',
      fill: '#ffffff',
      align: 'center',
      wordWrap: { width: this.width - 20, useAdvancedWrap: true }
    });
    this.text.setOrigin(0.5);  // Center the text within the box
    this.text.setDepth(101);

    // Add background and text to the container
    this.container.add(this.background);
    this.container.add(this.text);

    // Hide the container initially
    this.container.setVisible(false);

    // Set up input keys
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.enterKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  show(x, y, message) {
    // Split message into parts for scrolling
    this.messageParts = this.splitMessage(message);
    this.currentPart = 0;

    // Set the position, display the first part of the message, and show the container
    this.container.setPosition(x, y);
    this.text.setText(this.messageParts[this.currentPart]);
    this.container.setVisible(true);

    // Pause the game
    this.scene.physics.pause();

    // Set up input handlers
    this.scene.input.keyboard.on('keydown-DOWN', this.scrollMessageDown, this);
    this.scene.input.keyboard.on('keydown-UP', this.scrollMessageUp, this);
    this.scene.input.keyboard.on('keydown-ENTER', this.closeMessageBox, this);
  }

  splitMessage(message) {
    const wrapWidth = this.width - 20;
    const parts = [];
    let currentPart = '';
    const words = message.split(' ');

    words.forEach(word => {
      const testLine = currentPart + word + ' ';
      const testLineWidth = this.scene.add.text(0, 0, testLine, {
        fontSize: '18px'
      }).width;

      if (testLineWidth > wrapWidth) {
        parts.push(currentPart.trim());
        currentPart = word + ' ';
      } else {
        currentPart += word + ' ';
      }
    });

    if (currentPart) {
      parts.push(currentPart.trim());
    }

    return parts;
  }

  scrollMessageDown() {
    if (this.currentPart < this.messageParts.length - 1) {
      this.currentPart++;
      this.text.setText(this.messageParts[this.currentPart]);
    }
  }

  scrollMessageUp() {
    if (this.currentPart > 0) {
      this.currentPart--;
      this.text.setText(this.messageParts[this.currentPart]);
    }
  }

  closeMessageBox() {
    if (this.currentPart === this.messageParts.length - 1) {
      this.hide();
      this.scene.physics.resume();

      // Clean up input listeners
      this.scene.input.keyboard.off('keydown-DOWN', this.scrollMessageDown, this);
      this.scene.input.keyboard.off('keydown-UP', this.scrollMessageUp, this);
      this.scene.input.keyboard.off('keydown-ENTER', this.closeMessageBox, this);
    }
  }

  hide() {
    this.container.setVisible(false);
  }
}
