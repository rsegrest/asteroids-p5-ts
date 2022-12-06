import p5 from "p5";
import Bullet from "../model/Bullet";

class BulletDisplay {
  private static p:p5;
  private static scale:number = 1;

  constructor(p:p5) {
    BulletDisplay.p = p;
  }
  static draw(bullet:Bullet) {
    const p = BulletDisplay.p;
    const scale = BulletDisplay.scale;
    const pos = bullet.getPos();
    const rot = bullet.getRot();
    p.push();
    p.scale(scale);
    if (bullet.checkIfDead()) {
      p.fill('rgb(0,128,255)');
    } else {
      p.fill('rgb(255,0,0)');
    }
    p.noStroke();
    p.translate(pos.x as number, pos.y as number);
    p.rotate(rot);
    p.circle(0,0,5);
    p.pop();
  }
}
export default BulletDisplay;