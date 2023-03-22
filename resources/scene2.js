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

    // GAME PHYSICS -----------------------------------------
    // Ensure that the player and ball can't leave the screen
    this.player.setCollideWorldBounds(true);
    this.ball.setCollideWorldBounds(true);

    this.ball.setBounce(1, 1);
    // Make the player immovable
    player.setImmovable(true);

    // Disable collision with bottom of screen.
    this.physics.world.checkCollision.down = false;

    // Add collision for the bricks
    this.physics.add.collider(this.ball, this.blueBricks, this.hitBrick, null, this);
    this.physics.add.collider(this.ball, this.yellowBricks, this.hitBrick, null, this);
    this.physics.add.collider(this.ball, this.redBricks, this.hitBrick, null, this);

    // Add collision for the player
    this.physics.add.collider(this.ball, this.player, this.hitPlayer, null, this);
  }

  update() {
  }

  hitBrick(ball, brick) {
    brick.disableBody(true, true);

    if (ball.body.velocity.x == 0) {
      randNum = Math.random();
      if (randNum >= 0.5) {
        ball.body.setVelocityX(150);
      } else {
        ball.body.setVelocityX(-150);
      }
    }
  }

  hitPlayer(ball, player) {
    // Increase the velocity of the ball after it bounces
    ball.setVelocityY(ball.body.velocity.y - 5);

    let newXVelocity = Math.abs(ball.body.velocity.x) + 5;
    // If the ball is to the left of the player, ensure the x velocity is negative
    if (ball.x < player.x) {
      ball.setVelocityX(-newXVelocity);
    } else {
      ball.setVelocityX(newXVelocity);
    }
  }


  zeroPad(number, size) {
    var stringNumber = String(number);
    while (stringNumber.length < (size || 2)) {
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }

}