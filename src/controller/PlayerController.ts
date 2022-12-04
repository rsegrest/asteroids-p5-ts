import PlayerDisplay from '../view/PlayerDisplay';
import PlayerShip from '../model/PlayerShip';

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
  }
}
export default PlayerController;