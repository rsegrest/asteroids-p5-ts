import p5 from "p5";
import Asteroid from "../model/Asteroid";
import { AsteroidType } from "../type/AsteroidType";
import * as AsteroidTypes from "../type/AsteroidType";
class AsteroidDisplay {
  public static asteroidColor = 'rgb(0,200,0)';
  public static vectorStrokeWeight = 1;
  private static p:p5;

  constructor(p:p5) {
    AsteroidDisplay.p = p;
  }
  static drawLargeAsteroidType1(
    asteroid:Asteroid):void {
      const p = AsteroidDisplay.p;
      p.push();
      p.stroke(AsteroidDisplay.asteroidColor);
      p.strokeWeight(AsteroidDisplay.vectorStrokeWeight);
      p.translate(asteroid.getPos());
      p.translate(-5,-5);
      p.scale(0.7);
      p.noFill();
      p.beginShape();
      p.vertex(7,-38);
      p.vertex(42,-60); // top right
      p.vertex(78,-32); // right top
      p.vertex(54,0); // right middle
      p.vertex(80,34); // right bottom
      p.vertex(28,76); // bottom right edge
      p.vertex(-32,76); // bottom left edge
      p.vertex(-60,45);
      p.vertex(-60,-22);
      p.vertex(-22,-60); // top left
      p.endShape(p.CLOSE);
      p.pop();
  }
  static drawLargeAsteroidType2(
    asteroid:Asteroid
  ):void {
    const p = AsteroidDisplay.p;
    const pos = asteroid.getPos();
    p.push();
    p.stroke(AsteroidDisplay.asteroidColor);
    p.strokeWeight(AsteroidDisplay.vectorStrokeWeight);
    p.translate(pos);
    p.translate(-10,-10);
    p.scale(0.7);
    p.noFill();
    p.beginShape();
    p.vertex(3,-18);
    
    p.vertex(-18,-54);
    p.vertex(28,-54);
    p.vertex(82,-22);
    p.vertex(82,-2);
    p.vertex(22,16);

    p.vertex(80,52);
    p.vertex(50,86);
    p.vertex(22,64);

    p.vertex(-25,86);
    p.vertex(-50,32);
    p.vertex(-50,-18);
    p.endShape(p.CLOSE);
    p.pop();
  }
  static drawLargeAsteroidType3(
    asteroid:Asteroid
  ):void {
    const p = AsteroidDisplay.p;
    const pos = asteroid.getPos();
    p.push();
    p.stroke(AsteroidDisplay.asteroidColor);
    p.strokeWeight(AsteroidDisplay.vectorStrokeWeight);
    p.translate(pos);
    p.translate(2,-6);
    p.scale(0.7);
    p.noFill();
    p.beginShape();
    p.vertex(-2,-40);
    p.vertex(34,-60);
    p.vertex(72,-20);
    p.vertex(28,-9);
    p.vertex(72,24);
    p.vertex(28,80);
    p.vertex(-18,56);
    p.vertex(-34,78);
    p.vertex(-70,38);
    p.vertex(-48,16);
    p.vertex(-68,-22);
    p.vertex(-22,-60);
    p.endShape(p.CLOSE);
    p.pop();
  }
  static drawMediumAsteroidType1(
    asteroid:Asteroid
  ):void {
    const p = AsteroidDisplay.p;
    const pos = asteroid.getPos();
    p.push();
    p.stroke(AsteroidDisplay.asteroidColor);
    p.strokeWeight(AsteroidDisplay.vectorStrokeWeight);
    p.translate(pos);
    p.scale(0.7);
    p.noFill();
    p.beginShape();
    p.vertex(-2,-22);
    p.vertex(14,-34);
    p.vertex(34,-18);
    p.vertex(16,-9);
    p.vertex(34,12);
    p.vertex(16,36);
    p.vertex(-12,28);
    p.vertex(-18,34);
    p.vertex(-20,36);
    p.vertex(-38,18);
    p.vertex(-28,6);
    p.vertex(-40,-18);
    p.vertex(-15,-35);
    p.endShape(p.CLOSE);
    p.pop();
  }
  static drawMediumAsteroidType2(
    asteroid:Asteroid
  ):void {
    const p = AsteroidDisplay.p;
    const pos = asteroid.getPos();
    p.push();
    p.stroke(AsteroidDisplay.asteroidColor);
    p.strokeWeight(AsteroidDisplay.vectorStrokeWeight);
    p.translate(pos);
    p.translate(0,-15);
    p.scale(0.7);
    p.noFill();
    p.beginShape();
    p.vertex(8,-16);
    p.vertex(34,12);
    p.vertex(18,20); // top right
    p.vertex(36,28); // right top
    p.vertex(18,60); // right middle
    p.vertex(2,25); // right bottom
    p.vertex(4,60); // bottom right edge
    p.vertex(-16,60); // bottom left edge
    p.vertex(-40,20);
    p.vertex(-40,10);
    p.vertex(-22,-16); // top left
    p.endShape(p.CLOSE);
    p.pop();
  }
  static drawMediumAsteroidType3(
    asteroid:Asteroid
  ):void {
    const p = AsteroidDisplay.p;
    const pos = asteroid.getPos();
    p.push();
    p.stroke(AsteroidDisplay.asteroidColor);
    p.strokeWeight(AsteroidDisplay.vectorStrokeWeight);
    p.translate(pos);
    p.scale(0.7);
    p.noFill();
    p.beginShape();
    p.vertex(-2,-22);
    p.vertex(14,-34);
    p.vertex(34,-18);
    p.vertex(16,-9);
    p.vertex(34,12);
    p.vertex(16,36);
    p.vertex(-12,28);
    p.vertex(-18,34);
    p.vertex(-20,36);
    p.vertex(-38,18);
    p.vertex(-28,6);
    p.vertex(-40,-18);
    p.vertex(-15,-35);
    p.endShape(p.CLOSE);
    p.pop();
  }
  static drawSmallAsteroidType1(
    asteroid:Asteroid
  ):void {
    const p = AsteroidDisplay.p;
    const pos = asteroid.getPos();
    p.push();
    p.stroke(AsteroidDisplay.asteroidColor);
    p.strokeWeight(AsteroidDisplay.vectorStrokeWeight);
    p.translate(pos);
    p.translate(-16,8)
    p.scale(0.6);
    p.noFill();
    p.beginShape();
    p.vertex(26,-24); 
    p.vertex(40,-36);
    p.vertex(48,-32);
    p.vertex(40,-16);
    p.vertex(48,-8); 
    p.vertex(36,5); 
    p.vertex(14,5);
    p.vertex(8,0);
    p.vertex(8,-24);
    p.vertex(16,-36);
    p.endShape(p.CLOSE);
    p.pop();
  }
  static drawSmallAsteroidType2(
    asteroid:Asteroid
  ):void {
    const p = AsteroidDisplay.p;
    const pos = asteroid.getPos();
    p.push();
    p.stroke(AsteroidDisplay.asteroidColor);
    p.strokeWeight(AsteroidDisplay.vectorStrokeWeight);
    p.translate(pos);
    p.scale(0.6);
    p.noFill();
    p.beginShape();
    p.vertex(-8, -18);
    p.vertex(5, -18);
    p.vertex(20, -8);
    p.vertex(20, -5);
    p.vertex(2, 2);
    p.vertex(20, 9);
    p.vertex(10, 20);
    p.vertex(2, 15);
    p.vertex(-10, 21);
    p.vertex(-20, 2);
    p.vertex(-20, -8);
    p.vertex(-2, -8);
    p.endShape(p.CLOSE);
    p.pop();
  }
  static draw(asteroid:Asteroid):void {
    if (AsteroidDisplay.p.frameCount % 3 !== 0) {
      if (asteroid.type === AsteroidTypes.LARGE_ASTEROID_1) {
        this.drawLargeAsteroidType1(asteroid);
      } else if (asteroid.type === AsteroidTypes.LARGE_ASTEROID_2) {
        this.drawLargeAsteroidType2(asteroid);
      } else if (asteroid.type === AsteroidTypes.LARGE_ASTEROID_3) {
        this.drawLargeAsteroidType3(asteroid);
      } else if (asteroid.type === AsteroidTypes.MEDIUM_ASTEROID_1) {
        this.drawMediumAsteroidType1(asteroid);
      } else if (asteroid.type === AsteroidTypes.MEDIUM_ASTEROID_2) {
        this.drawMediumAsteroidType2(asteroid);
      } else if (asteroid.type === AsteroidTypes.MEDIUM_ASTEROID_3) {
        this.drawMediumAsteroidType3(asteroid);
      } else if (asteroid.type === AsteroidTypes.SMALL_ASTEROID_1) {
        this.drawSmallAsteroidType1(asteroid);
      } else if (asteroid.type === AsteroidTypes.SMALL_ASTEROID_2) {
        this.drawSmallAsteroidType2(asteroid);
      }
    }
  }
}
export default AsteroidDisplay;