class scene1 extends Phaser.Scene {
  constructor() {
    // Name this scene 
    super("bootGame");
  }

  preload() {
    this.load.image("brick1", "assets/images/brick1_64_32.png");
    this.load.image("brick2", "assets/images/brick2_64_32.png");
    this.load.image("brick3", "assets/images/brick3_64_32.png");
    this.load.image("ball", "assets/images/ball_32_32.png");
    this.load.image("paddle", "assets/images/paddle_128_32.png");
    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml")
  }

  create() {
    this.add.text(20, 20, "Loading Game...");
    // Start the next Scene
    this.scene.start("playGame");
  }

}