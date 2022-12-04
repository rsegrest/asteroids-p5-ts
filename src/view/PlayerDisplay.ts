import p5 from 'p5';
import PlayerShip from '../model/PlayerShip';
class PlayerDisplay {
  private p:p5;
  private scale:number;
  constructor(p:p5, scale:number = 1) {
    this.p = p;
    this.scale = scale;
  }
  public static drawPlayer = (
    p:p5,
    position:p5.Vector,
    rotation:number = 0,
    scale:number,
    color:string
  ) => {
    p.push();
    p.stroke(color);
    p.strokeWeight(2);
    p.translate(position);
    p.scale(scale);
    p.rotate((p.HALF_PI)+rotation);
    p.noFill();
    p.beginShape();
    p.vertex(0,-20);
    p.vertex(-20,32);
    p.vertex(-14,22);
    p.vertex(14,22);
    p.vertex(20,32);
    p.endShape(p.CLOSE);
    p.pop();
  }
  draw(player:PlayerShip):void {
    const p = this.p;
    const pos = player.getPos();
    const rotation = player.getRot();
    // const scale = player.getScale();
    const scale = 0.3;
    const color = player.getColor();
    PlayerDisplay.drawPlayer(p, pos, rotation, scale, color);
  }
}
export default PlayerDisplay;