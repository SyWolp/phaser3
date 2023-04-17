import Phaser from "phaser";
import background from "./assets/background.png";
import playerImg from "./assets/player.png";

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("background", background);
    // this.load.image("player", playerImg);

    this.load.spritesheet("player", playerImg, {
      frameWidth: 32,
      frameHeight: 36,
    });
  }

  create() {
    console.log("create");
    // const logo = this.add.image(400, 150, "logo");
    // this.tweens.add({
    //   targets: logo,
    //   y: 450,
    //   duration: 2000,
    //   ease: "Power2",
    //   yoyo: true,
    //   loop: -1,
    // });
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);

    // this.player = this.add.image(config.width / 2, config.height / 2, "player"); //이미지 추가 및 위치 조정
    // this.player.scale = 2; // 이미지 크기
    // this.player.flipX // 좌우반전
    // this.player.flipY // 상하반전
    // this.player.angle ++= 10 // 앵글 조절

    this.player = this.add.sprite(
      config.width / 2,
      config.height / 2,
      "player",
    ); //이미지 추가 및 위치 조정

    // 움직이는 캐릭터
    this.anims.create({
      key: "player_anim", // 애니메이션 키
      frames: this.anims.generateFrameNumbers("player"), // 무엇을 프레임으로
      frameRate: 12, // 초당 프레임
      repeat: -1, // 몇번 반복
    });

    // 멈춰 있는 캐릭터
    this.anims.create({
      key: "player_idle", // 애니메이션 키
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 0,
      }), // 무엇을 프레임으로
      frameRate: 1, // 초당 프레임
      repeat: 0, // 몇번 반복
    });

    // this.player.play("player_anim"); // 해당 키를 움직임(실행)

    this.keyInput = this.input.keyboard.addKeys({
      up: "W",
      left: "A",
      down: "S",
      right: "D",
    }); // 키보드 정보를 가져옴
    this.player.moving = false; // 움직임 변수 추가

    // this.player.stop("player_idle");
    this.add.text(10, 10, "Hello World", {
      font: "25px 배달의민족 주아 OTF",
      fill: "skyblue",
    });
  }
  update() {
    this.move(this.player); // 업데이트 될 떄의 행동 추가
  }

  // 움직이는 함수 추가
  move(player) {
    const PLAYER_SPEED = 0.5;
    if (
      this.keyInput.up.isDown ||
      this.keyInput.down.isDown ||
      this.keyInput.left.isDown ||
      this.keyInput.right.isDown
    ) {
      if (!player.moving) {
        // 키가 눌렸을 때 플레이어 무빙이 false 이면
        player.play("player_anim"); // 움직여 준다
      }
      player.moving = true; // 무빙을 true 바꿔주고

      //움직임을 설정해준다.
      if (this.keyInput.up.isDown) {
        player.y -= PLAYER_SPEED;
      }
      if (this.keyInput.down.isDown) {
        player.y += PLAYER_SPEED;
      }
      if (this.keyInput.left.isDown) {
        player.x -= PLAYER_SPEED;
        player.flipX = false;
      }
      if (this.keyInput.right.isDown) {
        player.x += PLAYER_SPEED;
        player.flipX = true;
      }
    } else {
      // 만약 키가 눌리지 않았는데
      if (player.moving) {
        // 움직임이 있다면
        player.play("player_idle"); // 정지해주고
      }
      player.moving = false; // 움직임을 false 로 바꿔준다
    }
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  backgroundColor: 0x00000,
  physics: {
    default: "arcade",
    arcade: {
      debug: process.env.DEBUG === "true",
    },
  },
  scene: MyGame,
};

const game = new Phaser.Game(config);
