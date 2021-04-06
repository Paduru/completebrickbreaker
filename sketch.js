var PLAY = 1;
var END = 0;

var gameState;

var backgroundImg;
var paddle, ball, tiles, powerUps, score;
var startImg, restartImg, playButton;
var popSound, heartImg;
var bullet,
  bulletPower,
  extendPower,
  firePower,
  bulletImg,
  fireAnimation,
  bigPaddle;

function preload() {
  backgroundImg = loadImage("Images/bg.png");

  startImg = loadImage("Images/start.png");
  restartImg = loadImage("Images/restart.png");

  popSound = loadSound("Audio/pop.mp3");
  heartImg = loadImage("Images/life.png");

  bulletPower = loadImage("Images/power-ups/bulletpower.png");
  extendPower = loadImage("Images/power-ups/extendpower.png");
  firePower = loadImage("Images/power-ups/firepower.png");

  bulletImg = loadImage("Images/bullet.png");

  fireAnimation = fireAnimation = loadAnimation(
    "Images/Fireball/fireball.png",
    "Images/Fireball/fireball1.png",
    "Images/Fireball/fireball2.png"
  );

  bigPaddle = loadImage("Images/extendPaddle.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  tiles = [];
  score = 0;
  powerUps = [];
  ball = new Ball(0.5 * windowWidth, 0.6 * windowHeight);
  paddle = new Paddle(0.5 * windowWidth, 0.9 * windowHeight);
  for (var i = 0.05; i <= 1; i += 0.1) {
    for (var x = 0.05; x < 0.5; x += 0.05) {
      tiles.push(new Tile(i * windowWidth, x * windowHeight));
    }
  }
  for (var z = 0; z < tiles.length; z++) {
    tiles[z].tileImage();
  }
  playButton = createSprite(windowWidth / 2, windowHeight / 2);
  playButton.addImage(startImg);
}

function draw() {
  background(backgroundImg);

  var edges = createEdgeSprites();
  paddle.sprite.x = mouseX;

  if (gameState === undefined) {
    playButton.visible = true;
    playButton.addImage(startImg);

    if (mousePressedOver(playButton)) {
      gameState = PLAY;
      ball.sprite.setVelocity(5, 5);
    }
  }
  if (gameState === PLAY) {
    for (var i = 0; i < paddle.lives; i++) {
      image(heartImg, 75 * i, windowHeight - 75, 50, 50);
    }

    textSize(50);
    fill("white");
    text("Score:" + score, 0.75 * windowWidth, windowHeight - 25);

    if (frameCount % 500 === 0) {
      addRow();
    }

    playButton.visible = false;
    ball.sprite.bounceOff(paddle.sprite);
    ball.sprite.bounceOff(edges[0]);
    ball.sprite.bounceOff(edges[1]);
    ball.sprite.bounceOff(edges[2]);
    if (ball.sprite.isTouching(edges[3])) {
      paddle.lives -= 1;
      ball.sprite.x = 0.5 * windowWidth;
      ball.sprite.y = 0.6 * windowHeight;
    }
    if (paddle.lives === 0) {
      gameState = END;
      ball.sprite.setVelocity(0, 0);
    }
    for (var y = 0; y < tiles.length; y++) {
      if (ball.sprite.isTouching(tiles[y].sprite)) {
        ball.sprite.bounceOff(tiles[y].sprite);
        tiles[y].sprite.destroy();
        popSound.play();
        score += 10;
      }
    }

    spawnPowerUp();

    for (var z = 0; z < powerUps.length; z++) {
      if (paddle.sprite.isTouching(powerUps[z].sprite)) {
        switch (powerUps[z].type) {
          case 1:
            paddle.biggerPaddle();
            break;
          case 2:
            paddle.bulletPaddle();
            break;
          case 3:
            paddle.firePaddle();
            break;
        }
        powerUps[z].sprite.destroy();
      }
    }

    paddle.bulletDestroy();
    paddle.fireDestroy();

    for (var t = 0; t < tiles.length; t++) {
      console.log(tiles[t].sprite.y / windowHeight);
      if (tiles[t].sprite.y >= 0.9 * windowHeight) {
        gameState = END;
        ball.sprite.setVelocity(0, 0);
      }
    }
  }
  if (gameState === END) {
    paddle.destroyProjectiles();
    for (var p = 0; p < powerUps.length; p++) {
      powerUps[p].sprite.destroy();
    }
    playButton.addImage(restartImg);
    playButton.visible = true;

    if (mousePressedOver(playButton)) {
      score = 0;
      paddle.lives = 3;
      restartRow();
      gameState = PLAY;
      ball.sprite.x = 0.5 * windowWidth;
      ball.sprite.y = 0.6 * windowHeight;
      ball.sprite.setVelocity(5, 5);
    }
  }

  drawSprites();
}

function spawnPowerUp() {
  if (frameCount % 100 === 0) {
    powerUps.push(new Power(Math.ceil(random(0, 3))));
  }
}

function addRow() {
  for (var z = 0; z < tiles.length; z++) {
    tiles[z].sprite.y += 0.05 * windowHeight;
  }
  for (var i = 0.05; i <= 1; i += 0.1) {
    tiles.push(new Tile(i * windowWidth, 0.05 * windowHeight));
  }
  for (var y = 0; y < tiles.length; y++) {
    tiles[y].tileImage();
  }
}

function restartRow() {
  for (var y = 0; y < tiles.length; y++) {
    tiles[y].sprite.destroy();
  }
  tiles = [];
  for (var i = 0.05; i <= 1; i += 0.1) {
    for (var x = 0.05; x < 0.5; x += 0.05) {
      tiles.push(new Tile(i * windowWidth, x * windowHeight));
    }
  }
  for (var z = 0; z < tiles.length; z++) {
    tiles[z].tileImage();
  }
}

function chackTilePosition() {
  for (var i = 0; i < tiles.length; i++) {
    console.log(tiles[i].sprite.y / windowHeight);
    if (tiles[i].sprite.y >= 0.9 * windowHeight) {
      gameState = END;
      ball.sprite.setVelocity(0, 0);
    }
  }
}
