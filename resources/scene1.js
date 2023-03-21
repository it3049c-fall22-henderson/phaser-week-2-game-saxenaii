class scene1 extends Phaser.Scene {
  constructor() {
    // Name this scene 
    super("bootGame");
  }

  preload() {
    this.load("brick1", "assets/images/brick1_64_32.png");
    this.load("brick2", "assets/images/brick2_64_32.png");
    this.load("brick3", "assets/images/brick3_64_32.png");
    this.load("ball", "assets/images/ball_32_32.png");
    this.load("paddle", "assets/images/paddle_128_32.png");
    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml")
  }

  create() {
  }

}