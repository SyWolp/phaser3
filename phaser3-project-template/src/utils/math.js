import Config from "../Config";

export function getRandomPosition(x, y) {
  const randRad = Math.random() * Math.PI * 2;
  const _r =
    Math.sqrt(Config.width * Config.width + Config.height * Config.height) / 2;

  const _x = x + _r * Math.cos(randRad); // 반지름 곱하기 cos(각도) * 캐릭터의 x === 몹의 x
  const _y = y + _r * Math.sin(randRad); // 반지름 곱하기 sin(각도) * 캐릭터의 y === 몹의 y
  return [_x, _y];
}
