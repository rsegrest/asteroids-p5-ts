import PlayerDisplay from '../view/PlayerDisplay';
import BulletDisplay from '../view/BulletDisplay';
import PlayerShip from '../model/PlayerShip';
import Bullet from '../model/Bullet';

class PlayerController {
  private playerNumber:number = 1;
  private playerDisplay:PlayerDisplay;
  private playerModel:PlayerShip;
  constructor(
    playerDisplay:PlayerDisplay,
    playerModel:PlayerShip,
    playerNumber:number = 1
  ) {
    this.playerDisplay = playerDisplay;
    this.playerModel = playerModel;
    this.playerNumber = playerNumber;
  }
  advance():void {
    this.playerModel.advance();
    this.playerDisplay.draw(this.playerModel);
    const bullets = this.playerModel.getBullets();
    for (let i = 0; i < bullets.length; i++) {
      BulletDisplay.draw(bullets[i] as Bullet);
    }
  }
}
export default PlayerController;