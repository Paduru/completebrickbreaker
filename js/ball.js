class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.image = loadImage("Images/ball.png");
    this.sprite = createSprite(x, y);
    this.sprite.addAnimation("ball", this.image);
    this.sprite.scale = 1 / 2;
  }
}
