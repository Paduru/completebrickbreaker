class Paddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.animation1 = loadAnimation(
      "Images/NormalPaddle/paddle1.png",
      "Images/NormalPaddle/paddle2.png",
      "Images/NormalPaddle/paddle3.png"
    );
    this.animation2 = loadAnimation(
      "Images/BulletPaddle/bulletP1.png",
      "Images/BulletPaddle/bulletP2.png",
      "Images/BulletPaddle/bulletP3.png"
    );
    this.lives = 3;
    this.sprite = createSprite(this.x, this.y);
    this.sprite.addImage("extended paddle", bigPaddle);
    this.sprite.addAnimation("bullet paddle", this.animation2);
    this.sprite.addAnimation("regular paddle", this.animation1);
    this.sprite.changeAnimation("regular paddle");
    this.sprite.scale = 1 / 2;
    this.bullets = [];
    this.fireballs = [];
  }
  bulletPaddle() {
    this.sprite.changeAnimation("bullet paddle");
    var bullet1 = createSprite(0, 0);
    var bullet2 = createSprite(0, 0);

    bullet1.addImage(bulletImg);
    bullet2.addImage(bulletImg);
    bullet1.x = this.sprite.x - 100;
    bullet1.y = this.sprite.y - 25;
    bullet2.x = this.sprite.x + 100;
    bullet2.y = this.sprite.y - 25;
    bullet1.setVelocity(0, -10);
    bullet2.setVelocity(0, -10);
    this.bullets.push(bullet1);
    this.bullets.push(bullet2);
    for (var y = 0; y < tiles.length; y++) {
      if (bullet1.isTouching(tiles[y].sprite)) {
        tiles[y].sprite.destroy();
        popSound.play();
      }
      if (bullet2.isTouching(tiles[y].sprite)) {
        tiles[y].sprite.destroy();
        popSound.play();
      }
    }
  }
  biggerPaddle() {
    this.sprite.changeAnimation("extended paddle");
    console.log(this.sprite);
  }
  firePaddle() {
    this.sprite.changeAnimation("bullet paddle");
    var fireball1 = createSprite(0, 0);
    var fireball2 = createSprite(0, 0);
    fireball1.addAnimation("fireball", fireAnimation);
    fireball2.addAnimation("fireball", fireAnimation);
    fireball1.x = this.sprite.x - 100;
    fireball1.y = this.sprite.y - 25;
    fireball2.x = this.sprite.x + 100;
    fireball2.y = this.sprite.y - 25;
    fireball1.setVelocity(0, -10);
    fireball2.setVelocity(0, -10);
    this.fireballs.push(fireball1);
    this.fireballs.push(fireball2);
    for (var y = 0; y < tiles.length; y++) {
      if (fireball1.isTouching(tiles[y].sprite)) {
        tiles[y].sprite.destroy();
        popSound.play();
      }
      if (fireball2.isTouching(tiles[y].sprite)) {
        tiles[y].sprite.destroy();
        popSound.play();
      }
    }
  }
  bulletDestroy() {
    for (var x = 0; x < this.bullets.length; x++) {
      for (var i = 0; i < tiles.length; i++) {
        if (this.bullets[x].isTouching(tiles[i].sprite)) {
          tiles[i].sprite.destroy();
          this.bullets[x].destroy();
          popSound.play();
          score += 10;
        }
      }
    }
  }
  fireDestroy() {
    for (var x = 0; x < this.fireballs.length; x++) {
      for (var i = 0; i < tiles.length; i++) {
        if (this.fireballs[x].isTouching(tiles[i].sprite)) {
          tiles[i].sprite.destroy();
          this.fireballs[x].destroy();
          popSound.play();
          score += 10;
        }
      }
    }
  }
  destroyProjectiles() {
    for (var x = 0; x < this.fireballs.length; x++) {
      this.fireballs[x].destroy();
    }
    for (var x = 0; x < this.bullets.length; x++) {
      this.bullets[x].destroy();
    }
  }
}
