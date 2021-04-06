class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tile1 = loadImage("Images/tiles/tile1.png");
    this.tile2 = loadImage("Images/tiles/tile2.png");
    this.tile3 = loadImage("Images/tiles/tile3.png");
    this.tile4 = loadImage("Images/tiles/tile4.png");
    this.tile5 = loadImage("Images/tiles/tile5.png");
    this.tile6 = loadImage("Images/tiles/tile6.png");
    this.tile7 = loadImage("Images/tiles/tile7.png");
    this.tile8 = loadImage("Images/tiles/tile8.png");
    this.tile9 = loadImage("Images/tiles/tile9.png");
    this.tile10 = loadImage("Images/tiles/tile10.png");
    this.sprite = createSprite(x, y);
  }
  tileImage() {
    var rand = Math.round(random(1, 10));
    switch (rand) {
      case 1:
        this.sprite.addImage(this.tile1);
        break;
      case 2:
        this.sprite.addImage(this.tile2);
        break;
      case 3:
        this.sprite.addImage(this.tile3);
        break;
      case 4:
        this.sprite.addImage(this.tile4);
        break;
      case 5:
        this.sprite.addImage(this.tile5);
        break;
      case 6:
        this.sprite.addImage(this.tile6);
        break;
      case 7:
        this.sprite.addImage(this.tile7);
        break;
      case 8:
        this.sprite.addImage(this.tile8);
        break;
      case 9:
        this.sprite.addImage(this.tile9);
        break;
      case 10:
        this.sprite.addImage(this.tile10);
        break;
    }
    this.sprite.scale = 0.25;
  }
}
