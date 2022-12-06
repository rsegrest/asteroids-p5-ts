import PlayerDisplay from '../view/PlayerDisplay';
import BulletDisplay from '../view/BulletDisplay';
import PlayerShip from '../model/PlayerShip';
import Bullet from '../model/Bullet';

class PlayerController {
  private playerDisplay:PlayerDisplay;
  private playerModel:PlayerShip;
  constructor(playerDisplay:PlayerDisplay, playerModel:PlayerShip) {
    this.playerDisplay = playerDisplay;
    this.playerModel = playerModel;
  }
  advance():void {
    this.playerModel.advance();
    this.playerDisplay.draw(this.playerModel);
    const bullets = this.playerModel.getBullets();
    // console.log(`bullets.length: ${bullets.length}`);
    for (let i = 0; i < bullets.length; i++) {
      // bullets[i].advance();
      // bullets[i].draw();
      BulletDisplay.draw(bullets[i] as Bullet);
    }
  }
}
export default PlayerController;