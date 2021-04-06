class Power {
  constructor(type) {
    this.type = type;
    this.sprite = createSprite(0, -100);

    this.sprite.x = Math.ceil(random(0, windowWidth));

    switch (this.type) {
      case 1:
        this.sprite.addImage(extendPower);
        break;
      case 2:
        this.sprite.addImage(bulletPower);
        break;
      case 3:
        this.sprite.addImage(firePower);
        break;
    }

    this.sprite.setVelocity(0, 10);
    this.sprite.scale = 0.25;

    this.sprite.life = (150 + windowHeight) / 10;
  }
}
