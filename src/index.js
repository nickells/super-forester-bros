import Phaser from 'phaser';
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
  this.load.spritesheet(
      'car', 
      require('../static/assets/sprites/sprite.png'),
      {frameWidth: 87, frameHeight: 37});
  
  this.load.image('bg', 'https://phaser.io/content/tutorials/making-your-first-phaser-3-game/part3.png')
  this.load.image('ground', 'https://phaser.io/content/tutorials/making-your-first-phaser-3-game/platform.png');
}

let playerPhysics
let cursors
function create ()
{
  this.add.image(400, 300, 'bg');


  const platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  player = this.physics.add.sprite(100, 450, 'car');

  
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('car', { start: 6, end: 0 }),
        frameRate: 28,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'car', frame: 4 } ],
        frameRate: 28
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('car', { start: 0, end: 6 }),
        frameRate: 28,
        repeat: -1
    });

  

  player.setBounce(0.2);
  player.body.setGravityY(300)
  player.setCollideWorldBounds(true);
  this.physics.add.collider(player, platforms);


  cursors = this.input.keyboard.createCursorKeys();

}

function update ()
{
if (cursors.left.isDown)
{
    player.setVelocityX(-160);

    player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

    player.anims.play('right', true);
}
else
{
    player.setVelocityX(0);

    player.anims.play('turn');
}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}

}