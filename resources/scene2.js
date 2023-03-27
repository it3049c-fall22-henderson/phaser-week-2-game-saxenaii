class scene2 extends Phaser.Scene {
  constructor() {
    // Name this scene
    super("playGame");
    this.gameStarted = false;
    this.gameResetStatus = false;
  }

  create() {
    // Add text at the top
    // this.add.text(20, 20, "Playing Game", {
    //   font: "25px Arial",
    //   fill: "yellow",
    // });

    if (!this.gameStarted) {
      // Create score Label
      var graphics = this.add.graphics();
      graphics.fillStyle(0x000000, 1);
      graphics.beginPath();
      graphics.moveTo(0, 0);
      graphics.lineTo(config.width, 0);
      graphics.lineTo(config.width, 30);
      graphics.lineTo(0, 30);
      graphics.lineTo(0, 0);
      graphics.closePath();
      graphics.fillPath();
      this.score = 0;
      this.scoreFormatted = this.zeroPad(this.score, 6);
      this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE: " + this.scoreFormatted, 35);
    }

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
      repeat: 1,
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
      repeat: 1,
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
      repeat: 1,
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
    this.player.setImmovable(true);

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

    // Put this in so that the player doesn't move if no key is being pressed
    this.player.body.setVelocityX(0);

    // Check the cursor and move the velocity accordingly. 
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-350);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(350);
    }

    if (!this.gameStarted || !this.gameResetStatus) {
      // The ball should follow the paddle while the user selects where to start
      this.ball.setX(this.player.x);
    }
    if (this.cursors.space.isDown) {
      this.gameResetStatus = true;
      this.gameStarted = true;
      this.ball.setVelocityY(-200);
    }

    // Check for end conditions
    this.resetGame(this.physics.world);
  }

  resetGame(world) {
    // If ball goes out of bounds, reset score to 0, reset player, spawn bricks
    if (this.ball.body.y > world.bounds.height) {
      this.gameStarted = false;
      this.player.disableBody(true, true);
      this.ball.disableBody(true, true);
      this.score = 0;
      this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE: ", 35);
      this.create();
    }
    // If bricks cleared, game won, keep score, reset ball and player, spawn bricks
    if (this.blueBricks.countActive() + this.yellowBricks.countActive() + this.redBricks.countActive() == 0) {
      this.gameResetStatus = false;
      this.player.disableBody(true, true);
      this.ball.disableBody(true, true);
      this.create();
    }
  }

  // Ball and brick collision 
  hitBrick(ball, brick) {
    if (ball.body.velocity.x == 0) {
      let randNum = Math.random();
      if (randNum >= 0.5) {
        ball.body.setVelocityX(150);
      } else {
        ball.body.setVelocityX(-150);
      }
    }
    if (brick.texture.key == "brick1") {
      // 50 points for blueBrick
      this.score += 50;
    }
    if (brick.texture.key == "brick2") {
      // 100 points for yellowBrick
      this.score += 100;
    }
    if (brick.texture.key == "brick3") {
      // 250 points for redBrick
      this.score += 250;
    }
    this.scoreFormatted = this.zeroPad(this.score, 6);
    this.scoreLabel.text = "SCORE: " + this.scoreFormatted;
    brick.disableBody(true, true);
  }

  // Ball and paddle collision
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

  // Scoring
  zeroPad(number, size) {
    var stringNumber = String(number);
    while (stringNumber.length < (size || 2)) {
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }

}