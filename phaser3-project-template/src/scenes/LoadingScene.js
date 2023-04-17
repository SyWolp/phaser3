import { MY_AUDIO, MY_IMAGES, MY_SPRITESHEETS } from "../images/path";
import fontPng from "../assets/font/font.png";
import fontXml from "../assets/font/font.xml";

export default class LoadingScene extends Phaser.Scene {
  // 게임에서 쓰일 에셋들을 load할 scene // load 한 에셋은 전역적으로 사용 가능
  constructor() {
    super("loadGame");
  }

  preload() {
    //IMAGE
    this.load.image("backgrround1", MY_IMAGES.images.background1);
    this.load.image("backgrround2", MY_IMAGES.images.background2);
    this.load.image("backgrround3", MY_IMAGES.images.background3);
    this.load.image("beam", MY_IMAGES.images.beam);

    //SPRITESHEETS
    this.load.spritesheet("player", MY_SPRITESHEETS.spritesheets.player, {
      frameWidth: 32,
      frameHeight: 36,
    });

    this.load.spritesheet("mob1", MY_SPRITESHEETS.spritesheets.mob1, {
      frameWidth: 28,
      frameHeight: 28,
    });

    this.load.spritesheet("mob2", MY_SPRITESHEETS.spritesheets.mob2, {
      frameWidth: 28,
      frameHeight: 28,
    });
    this.load.spritesheet("mob3", MY_SPRITESHEETS.spritesheets.mob3, {
      frameWidth: 28,
      frameHeight: 28,
    });
    this.load.spritesheet("mob4", MY_SPRITESHEETS.spritesheets.mob4, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("lion", MY_SPRITESHEETS.spritesheets.lion, {
      frameWidth: 48,
      frameHeight: 64,
    });
    this.load.spritesheet("explosion", MY_SPRITESHEETS.spritesheets.explosion, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet(
      "claw_white",
      MY_SPRITESHEETS.spritesheets.clawWhite,
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );
    this.load.spritesheet(
      "claw_yellow",
      MY_SPRITESHEETS.spritesheets.clawYellow,
      {
        frameWidth: 32,
        frameHeight: 32,
      },
    );
    this.load.spritesheet("catnip", MY_SPRITESHEETS.spritesheets.catnip, {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("exp-up", MY_SPRITESHEETS.spritesheets.expUp, {
      frameWidth: 16,
      frameHeight: 16,
    });
    // AUDIOS
    this.load.audio("audio_beam", MY_AUDIO.audios.beam);
    this.load.audio("audio_scratch", MY_AUDIO.audios.scratch);
    this.load.audio("audio_hitMob", MY_AUDIO.audios.hitMob);
    this.load.audio("audio_growl", MY_AUDIO.audios.growl);
    this.load.audio("audio_explosion", MY_AUDIO.audios.explosion);
    this.load.audio("audio_expUp", MY_AUDIO.audios.expUp);
    this.load.audio("audio_hurt", MY_AUDIO.audios.hurt);
    this.load.audio("audio_nextLevel", MY_AUDIO.audios.nextLevel);
    this.load.audio("audio_gameOver", MY_AUDIO.audios.gameover);
    this.load.audio("audio_gameClear", MY_AUDIO.audios.gameClear);
    this.load.audio("audio_pauseIn", MY_AUDIO.audios.pauseIn);
    this.load.audio("audio_pauseOut", MY_AUDIO.audios.pauseOut);

    this.load.bitmapFont("pixelFont", fontPng, fontXml);
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("playGame");

    // MOBS
    this.anims.create({
      key: "mob1_anim",
      frames: this.anims.generateFrameNumbers("mob1"),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "mob2_anim",
      frames: this.anims.generateFrameNumbers("mob2"),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "mob3_anim",
      frames: this.anims.generateFrameNumbers("mob3"),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "mob4_anim",
      frames: this.anims.generateFrameNumbers("mob4"),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "lion_anim",
      frames: this.anims.generateFrameNumbers("lion"),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "lion_idle",
      frames: this.anims.generateFrameNumbers("lion", {
        start: 0,
        end: 0,
      }),
      frameRate: 1,
      repeat: 0,
    });

    // PLAYERS
    this.anims.create({
      key: "player_anim",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "player_idle",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 0,
      }),
      frameRate: 1,
      repeat: 0,
    });

    // EFFECT
    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    });

    // ATTACKS
    this.anims.create({
      key: "scratch_white",
      frames: this.anims.generateFrameNumbers("claw_white"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    });
    this.anims.create({
      key: "scratch_yellow",
      frames: this.anims.generateFrameNumbers("claw_yellow"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    });
    this.anims.create({
      key: "catnip_anim",
      frames: this.anims.generateFrameNumbers("catnip"),
      frameRate: 20,
      repeat: -1,
    });

    // EXP UP ITEMS
    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("exp-up", {
        start: 0,
        end: 0,
      }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "blue",
      frames: this.anims.generateFrameNumbers("exp-up", {
        start: 1,
        end: 1,
      }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "yellow",
      frames: this.anims.generateFrameNumbers("exp-up", {
        start: 2,
        end: 2,
      }),
      frameRate: 20,
      repeat: 0,
    });
    this.anims.create({
      key: "green",
      frames: this.anims.generateFrameNumbers("exp-up", {
        start: 3,
        end: 3,
      }),
      frameRate: 20,
      repeat: 0,
    });
  }
}
