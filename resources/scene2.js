class scene2 extends Phaser.Scene {
  constructor() {
    // Name this scene
    super("playGame");
  }

  create() {
    // Add text at the top
    this.add.text(20, 20, "Playing Game", {
      font: "25px Arial",
      fill: "yellow",
    });

    // Create score Label
    var graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(config.width, 0);
    graphics.lineTo(config.width, 20);
    graphics.lineTo(0, 20);
    graphics.lineTo(0, 0);
    graphics.closePath();
    graphics.fillPath();
    this.score = 0;
    this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE: ", 35);

    // Add the bricks as sprites
    // this.brick1 = this.add.image(config.width / 2 - 50, config.height / 2, "brick1");
    // this.brick2 = this.add.image(config.width / 2, config.height / 2, "brick2");
    // this.brick3 = this.add.image(config.width / 2 + 50, config.height / 2, "brick3");

    // Add the player
    this.player = this.physics.add.sprite(400, 600, "paddle");

    // Add the ball
    this.ball = this.physics.add.image(400, 565, "ball");

    // Add blue bricks
    this.blueBricks = this.physics.add.group({
      key: 'brick1',
      repeat: 9,
      immovable: true,
      setXY: {
        x: 80,
        y: 155,
        stepX: 70
      }
    });

    // Add yellow bricks
    this.yellowBricks = this.physics.add.group({
      key: 'brick2',
      repeat: 9,
      immovable: true,
      setXY: {
        x: 80,
        y: 125,
        stepX: 70
      }
    });

    // Add red bricks
    this.redBricks = this.physics.add.group({
      key: 'brick3',
      repeat: 9,
      immovable: true,
      setXY: {
        x: 80,
        y: 95,
        stepX: 70
      }
    });

    // Manage key presses
    this.cursors = this.input.keyboard.createCursorKeys();

    // Ensure that the player and ball can't leave the screen
    this.player.setCollideWorldBounds(true);
    this.ball.setCollideWorldBounds(true);

    this.ball.setBounce(1, 1);

    // Disable collision with bottom of screen.
    this.physics.world.checkCollision.down = false;
  }

  zeroPad(number, size) {
    var stringNumber = String(number);
    while (stringNumber.length < (size || 2)) {
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }

}