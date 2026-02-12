import p5 from 'p5';
import Explosion, { Particle } from '../model/Explosion';

class ExplosionDisplay {
  private static p:p5;
  private static scale:number = 1;

  constructor(p:p5, scale:number = 1) {
    ExplosionDisplay.p = p;
    ExplosionDisplay.scale = scale;
  }
  static drawParticle(particle:Particle) {
    const p = ExplosionDisplay.p;
    p.push();
    p.fill('#0f0');
    p.noStroke();
    p.translate(particle.getPos().x, particle.getPos().y);
    p.circle(0,0,1);
    p.pop();
  }
  
  static draw(explosion:Explosion) {
    const p = ExplosionDisplay.p;
    const particles = explosion.getParticles();
    particles.forEach((particle) => {
      if (p.frameCount % 3 !== 0) {
        ExplosionDisplay.drawParticle(particle);
      }
    });
  }
}
export default ExplosionDisplay;