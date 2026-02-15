import Bullet from '../model/Bullet';

describe('Bullet', () => {
  let p: any;
  let pos: any;
  let vel: any;

  beforeEach(() => {
    p = {
      width: 800,
      height: 600,
      createVector: (x: number, y: number) => ({ x, y, add: function(v: any) { this.x += v.x; this.y += v.y; return this; }, mag: () => Math.sqrt(x*x + y*y) }),
    };
    pos = { x: 400, y: 300, add: function(v: any) { this.x += v.x; this.y += v.y; return this; } };
    vel = { x: 10, y: 0, mag: () => 10 };
  });

  it('should update position', () => {
    const bullet = new Bullet(p, pos, vel, 0);
    bullet.update();
    expect(bullet.getPos().x).toBe(410);
    expect(bullet.getPos().y).toBe(300);
  });

  it('should wrap around right edge', () => {
    pos.x = 805;
    const bullet = new Bullet(p, pos, vel, 0);
    bullet.update();
    // In the update, pos adds vel first. 805 + 10 = 815. 
    // Then checks > width (800). Sets to 0.
    expect(bullet.getPos().x).toBe(0);
  });

  it('should wrap around left edge', () => {
    pos.x = -5;
    vel.x = -10;
    vel.mag = () => 10;
    const bullet = new Bullet(p, pos, vel, 0);
    bullet.update();
    // -5 + -10 = -15. < 0. Sets to width (800).
    expect(bullet.getPos().x).toBe(800);
  });

  it('should die after traveling screen width', () => {
    const bullet = new Bullet(p, pos, vel, 0);
    // Move 80 times * 10 = 800 distance.
    for(let i=0; i<80; i++) {
        bullet.update();
    }
    expect(bullet.checkIfDead()).toBe(true);
  });
    
  it('should live before traveling screen width', () => {
    const bullet = new Bullet(p, pos, vel, 0);
    // Move 79 times * 10 = 790 distance.
    for(let i=0; i<79; i++) {
        bullet.update();
    }
    expect(bullet.checkIfDead()).toBe(false);
  });

});
