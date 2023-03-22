var config = {
  width: 800,
  height: 640,
  backgroundColor: 0x000000,
  scene: [scene1, scene2],
  pixelArt: true,
  parent: 'game',
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: false,
    }
  },
  scale: {
    // Center the game canvas both horizontally and vertically within the parent
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
}

var game = new Phaser.Game(config);