import p5 from "p5";
import Bullet from "../model/Bullet";

class BulletDisplay {
  private static p:p5;
  private static scale:number = 1;

  constructor(p:p5, scale:number = 1) {
    BulletDisplay.p = p;
    BulletDisplay.scale = scale;
  }
  static draw(bullet:Bullet) {
    const p = BulletDisplay.p;
    const scale = BulletDisplay.scale;
    const pos = bullet.getPos();
    const rot = bullet.getRot();
    p.push();
    p.translate(pos.x as number, pos.y as number);
    p.rotate(rot);
    if (bullet.checkIfDead()) {
      p.fill('rgb(0,128,255)');
      p.stroke('rgb(0,128,255)')
      p.circle(0,0,3);
      p.point(0,0);
    } else if (bullet.getOwner() === 'saucer') {
      // Saucer bullets: Thicker, brighter (white), larger radius
      console.log("saucer bullet");
      // p.stroke(255);
      // p.strokeWeight(2);
      p.fill('rgb(128,255,128)');
      p.circle(0, 0, 6); // Significantly larger
      p.fill(255);
      p.point(0,0);
    } else {
      p.stroke('rgb(0,64,0)');
      p.fill('rgb(128,255,128)');
      p.circle(0,0,3);
      p.point(0,0);
    }
    p.pop();
  }
}
export default BulletDisplay;