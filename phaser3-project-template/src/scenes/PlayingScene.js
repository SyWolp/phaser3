import Phaser from "phaser";
import Config from "../Config";
import Player from "../characters/Player";
import Mob from "../characters/Mob";
import { setBackground } from "../utils/backgroundManager";
import { addMobEvent } from "../utils/mobManager";
import { addAttackEvent } from "../utils/attackManager";
console.log(Phaser);

export default class PlayingScene extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    // 사용할 sound들을 추가해놓는 부분입니다.
    // load는 전역적으로 어떤 scene에서든 asset을 사용할 수 있도록 load 해주는 것이고,
    // add는 해당 scene에서 사용할 수 있도록 scene의 멤버 변수로 추가할 때 사용하는 것입니다.
    this.sound.pauseOnBlur = false;
    this.m_beamSound = this.sound.add("audio_beam");
    this.m_scratchSound = this.sound.add("audio_scratch");
    this.m_hitMobSound = this.sound.add("audio_hitMob");
    this.m_growlSound = this.sound.add("audio_growl");
    this.m_explosionSound = this.sound.add("audio_explosion");
    this.m_expUpSound = this.sound.add("audio_expUp");
    this.m_hurtSound = this.sound.add("audio_hurt");
    this.m_nextLevelSound = this.sound.add("audio_nextLevel");
    this.m_gameOverSound = this.sound.add("audio_gameOver");
    this.m_gameClearSound = this.sound.add("audio_gameClear");
    this.m_pauseInSound = this.sound.add("audio_pauseIn");
    this.m_pauseOutSound = this.sound.add("audio_pauseOut");

    // player를 m_player라는 멤버 변수로 추가합니다.
    this.m_player = new Player(this);
    this.cameras.main.startFollow(this.m_player); // 카메라 기준을 설정 함
    // this.m_playerMoving = false;
    this.m_keyboard = this.input.keyboard.addKeys({
      up: "W",
      left: "A",
      down: "S",
      right: "D",
    }); // 키보드 정보를 가져옴
    // PlayingScene의 background를 설정합니다.
    setBackground(this, "background1");

    this.m_mobs = this.physics.add.group(); // 그룹에 속한 오브젝트들이 같은 물리법칙을 받겠다
    this.m_mobs.add(new Mob(this, 0, 0, "mob2", "mob2_anim", 10, 0.9));
    this.m_mobEvents = [];
    //  scene, repeatGap, mobTexture, mobAnim, mobHp, mobDropRate
    addMobEvent(this, 1000, "mob2", "mob2_anim", 10, 0.9);

    // Attack
    this.m_weaponDynamic = this.add.group();
    this.m_weaponStatic = this.add.group();
    this.m_attackEvents = {};
    // scene, attackType, attackDamage, attackScale, repeatGap
    addAttackEvent(this, "beam", 10, 1, 1000);

    // collisions
    /**
     * 어떤 오브젝트들이 충돌했을 때 동작을 발생시키려면 physics.add.overlap 함수를 사용합니다.
     * @param object1 오버랩되는지 검사할 오브젝트 1
     * @param object2 오버랩되는지 검사할 오브젝트 2
     * @param collideCallback 오브젝트 1과 오브젝트 2가 충돌하면 실행될 콜백함수입니다.
     * @param processCallback 두 오브젝트가 겹치는 경우 추가 검사를 수행할 수 있는 선택적 콜백 함수입니다. 이것이 설정되면 이 콜백이 true를 반환하는 경우에만 collideCallback이 호출됩니다.
     * @param callbackContext 콜백 스코프입니다. (this를 사용하시면 됩니다.)
     */

    // Player와 mob이 부딪혔을 경우 player에 데미지 10을 줍니다.
    // (Player.js에서 hitByMob 함수 확인)
    this.physics.add.overlap(
      this.m_player,
      this.m_mobs,
      () => this.m_player.hitByMob(10),
      null,
      this,
    );

    // mob이 dynamic 공격에 부딪혓을 경우 mob에 해당 공격의 데미지만큼 데미지를 줍니다.
    // (Mob.js에서 hitByDynamic 함수 확인)
    this.physics.add.overlap(
      this.m_weaponDynamic,
      this.m_mobs,
      (weapon, mob) => {
        mob.hitByDynamic(weapon, weapon.m_damage);
      },
      null,
      this,
    );

    // mob이 static 공격에 부딪혓을 경우 mob에 해당 공격의 데미지만큼 데미지를 줍니다.
    // (Mob.js에서 hitByStatic 함수 확인)
    this.physics.add.overlap(
      this.m_weaponStatic,
      this.m_mobs,
      (weapon, mob) => {
        mob.hitByStatic(weapon.m_damage);
      },
      null,
      this,
    );
  }

  update() {
    this.movePlayerManager();
    this.m_background.setX(this.m_player.x - Config.width / 2);
    this.m_background.setY(this.m_player.y - Config.height / 2);

    this.m_background.tilePositionX = this.m_player.x - Config.width / 2;
    this.m_background.tilePositionY = this.m_player.y - Config.height / 2;

    const closest = this.physics.closest(
      this.m_player,
      this.m_mobs.getChildren(),
    );
    this.m_closest = closest;
  }

  movePlayerManager() {
    let vector = [0, 0];
    if (
      this.m_keyboard.up.isDown ||
      this.m_keyboard.right.isDown ||
      this.m_keyboard.down.isDown ||
      this.m_keyboard.left.isDown
    ) {
      if (!this.m_player.m_playerMoving) {
        this.m_player.play("player_anim");
      }
      if (this.m_keyboard.up.isDown) vector[1] -= 1;
      else if (this.m_keyboard.down.isDown) vector[1] += 1;
      if (this.m_keyboard.left.isDown) vector[0] -= 1;
      else if (this.m_keyboard.right.isDown) vector[0] += 1;

      this.m_player.m_playerMoving = true;
    } else {
      if (this.m_player.m_playerMoving) {
        this.m_player.play("player_idle");
      }
      this.m_player.m_playerMoving = false;
    }
    this.m_player.move(vector);
  }
}
