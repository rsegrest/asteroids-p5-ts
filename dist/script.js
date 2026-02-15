/**
 * This is a p5.js sketch made with p5js-template-petr-plus.
 *
 * @license CC0-1.0
 */

(function (p5) {
  "use strict";

  /** Creates a function object to be passed to `new p5()`. */
  const createSketch = (definition) => {
    const methodNames = Object.keys(definition);
    return (p) => {
      methodNames.forEach((methodName) => {
        const method = definition[methodName];
        if (method) p[methodName] = method.bind(undefined, p);
      });
    };
  };

  const LARGE_ASTEROID_1 = "LARGE_ASTEROID_1";
  const LARGE_ASTEROID_2 = "LARGE_ASTEROID_2";
  const LARGE_ASTEROID_3 = "LARGE_ASTEROID_3";
  const MEDIUM_ASTEROID_1 = "MEDIUM_ASTEROID_1";
  const MEDIUM_ASTEROID_2 = "MEDIUM_ASTEROID_2";
  const MEDIUM_ASTEROID_3 = "MEDIUM_ASTEROID_3";
  const SMALL_ASTEROID_1 = "SMALL_ASTEROID_1";
  const SMALL_ASTEROID_2 = "SMALL_ASTEROID_2";

  class AsteroidDisplay {
    constructor(p, scale = 1) {
      AsteroidDisplay.p = p;
      AsteroidDisplay.scale = scale;
    }
    static drawLargeAsteroidType1(asteroid) {
      const p = AsteroidDisplay.p;
      p.push();
      p.stroke(AsteroidDisplay.asteroidColor);
      p.strokeWeight(AsteroidDisplay.vectorStrokeWeight);
      p.translate(asteroid.getPos());
      p.translate(-5, -5);
      p.scale(AsteroidDisplay.scale);
      p.noFill();
      p.beginShape();
      p.vertex(7, -38);
      p.vertex(42, -60); // top right
      p.vertex(78, -32); // right top
      p.vertex(54, 0); // right middle
      p.vertex(80, 34); // right bottom
      p.vertex(28, 76); // bottom right edge
      p.vertex(-32, 76); // bottom left edge
      p.vertex(-60, 45);
      p.vertex(-60, -22);
      p.vertex(-22, -60); // top left
      p.endShape(p.CLOSE);
      p.pop();
    }
    static drawLargeAsteroidType2(asteroid) {
      const p = AsteroidDisplay.p;
      const pos = asteroid.getPos();
      p.push();
      p.stroke(AsteroidDisplay.asteroidColor);
      p.strokeWeight(AsteroidDisplay.vectorStrokeWeight);
      p.translate(pos);
      p.translate(-10, -10);
      p.scale(0.7);
      p.noFill();
      p.beginShape();
      p.vertex(3, -18);
      p.vertex(-18, -54);
      p.vertex(28, -54);
      p.vertex(82, -22);
      p.vertex(82, -2);
      p.vertex(22, 16);
      p.vertex(80, 52);
      p.vertex(50, 86);
      p.vertex(22, 64);
      p.vertex(-25, 86);
      p.vertex(-50, 32);
      p.vertex(-50, -18);
      p.endShape(p.CLOSE);
      p.pop();
    }
    static drawLargeAsteroidType3(asteroid) {
      const p = AsteroidDisplay.p;
      const pos = asteroid.getPos();
      p.push();
      p.stroke(AsteroidDisplay.asteroidColor);
      p.strokeWeight(AsteroidDisplay.vectorStrokeWeight);
      p.translate(pos);
      p.translate(2, -6);
      p.scale(0.7);
      p.noFill();
      p.beginShape();
      p.vertex(-2, -40);
      p.vertex(34, -60);
      p.vertex(72, -20);
      p.vertex(28, -9);
      p.vertex(72, 24);
      p.vertex(28, 80);
      p.vertex(-18, 56);
      p.vertex(-34, 78);
      p.vertex(-70, 38);
      p.vertex(-48, 16);
      p.vertex(-68, -22);
      p.vertex(-22, -60);
      p.endShape(p.CLOSE);
      p.pop();
    }
    static drawMediumAsteroidType1(asteroid) {
      const p = AsteroidDisplay.p;
      const pos = asteroid.getPos();
      p.push();
      p.stroke(AsteroidDisplay.asteroidColor);
      p.strokeWeight(AsteroidDisplay.vectorStrokeWeight);
      p.translate(pos);
      p.scale(0.7);
      p.noFill();
      p.beginShape();
      p.vertex(-2, -22);
      p.vertex(14, -34);
      p.vertex(34, -18);
      p.vertex(16, -9);
      p.vertex(34, 12);
      p.vertex(16, 36);
      p.vertex(-12, 28);
      p.vertex(-18, 34);
      p.vertex(-20, 36);
      p.vertex(-38, 18);
      p.vertex(-28, 6);
      p.vertex(-40, -18);
      p.vertex(-15, -35);
      p.endShape(p.CLOSE);
      p.pop();
    }
    static drawMediumAsteroidType2(asteroid) {
      const p = AsteroidDisplay.p;
      const pos = asteroid.getPos();
      p.push();
      p.stroke(AsteroidDisplay.asteroidColor);
      p.strokeWeight(AsteroidDisplay.vectorStrokeWeight);
      p.translate(pos);
      p.translate(0, -15);
      p.scale(0.7);
      p.noFill();
      p.beginShape();
      p.vertex(8, -16);
      p.vertex(34, 12);
      p.vertex(18, 20); // top right
      p.vertex(36, 28); // right top
      p.vertex(18, 60); // right middle
      p.vertex(2, 25); // right bottom
      p.vertex(4, 60); // bottom right edge
      p.vertex(-16, 60); // bottom left edge
      p.vertex(-40, 20);
      p.vertex(-40, 10);
      p.vertex(-22, -16); // top left
      p.endShape(p.CLOSE);
      p.pop();
    }
    static drawMediumAsteroidType3(asteroid) {
      const p = AsteroidDisplay.p;
      const pos = asteroid.getPos();
      p.push();
      p.stroke(AsteroidDisplay.asteroidColor);
      p.strokeWeight(AsteroidDisplay.vectorStrokeWeight);
      p.translate(pos);
      p.scale(0.7);
      p.noFill();
      p.beginShape();
      p.vertex(-2, -22);
      p.vertex(14, -34);
      p.vertex(34, -18);
      p.vertex(16, -9);
      p.vertex(34, 12);
      p.vertex(16, 36);
      p.vertex(-12, 28);
      p.vertex(-18, 34);
      p.vertex(-20, 36);
      p.vertex(-38, 18);
      p.vertex(-28, 6);
      p.vertex(-40, -18);
      p.vertex(-15, -35);
      p.endShape(p.CLOSE);
      p.pop();
    }
    static drawSmallAsteroidType1(asteroid) {
      const p = AsteroidDisplay.p;
      const pos = asteroid.getPos();
      p.push();
      p.stroke(AsteroidDisplay.asteroidColor);
      p.strokeWeight(AsteroidDisplay.vectorStrokeWeight);
      p.translate(pos);
      p.translate(-16, 8);
      p.scale(0.6);
      p.noFill();
      p.beginShape();
      p.vertex(26, -24);
      p.vertex(40, -36);
      p.vertex(48, -32);
      p.vertex(40, -16);
      p.vertex(48, -8);
      p.vertex(36, 5);
      p.vertex(14, 5);
      p.vertex(8, 0);
      p.vertex(8, -24);
      p.vertex(16, -36);
      p.endShape(p.CLOSE);
      p.pop();
    }
    static drawSmallAsteroidType2(asteroid) {
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
    static draw(asteroid) {
      if (AsteroidDisplay.p.frameCount % 3 !== 0) {
        if (asteroid.type === LARGE_ASTEROID_1) {
          this.drawLargeAsteroidType1(asteroid);
        } else if (asteroid.type === LARGE_ASTEROID_2) {
          this.drawLargeAsteroidType2(asteroid);
        } else if (asteroid.type === LARGE_ASTEROID_3) {
          this.drawLargeAsteroidType3(asteroid);
        } else if (asteroid.type === MEDIUM_ASTEROID_1) {
          this.drawMediumAsteroidType1(asteroid);
        } else if (asteroid.type === MEDIUM_ASTEROID_2) {
          this.drawMediumAsteroidType2(asteroid);
        } else if (asteroid.type === MEDIUM_ASTEROID_3) {
          this.drawMediumAsteroidType3(asteroid);
        } else if (asteroid.type === SMALL_ASTEROID_1) {
          this.drawSmallAsteroidType1(asteroid);
        } else if (asteroid.type === SMALL_ASTEROID_2) {
          this.drawSmallAsteroidType2(asteroid);
        }
      }
    }
  }
  AsteroidDisplay.asteroidColor = "rgb(0,200,0)";
  AsteroidDisplay.vectorStrokeWeight = 1;
  AsteroidDisplay.scale = 1;

  class Asteroid {
    constructor(p, initialPos, size, type, velocity) {
      this.draw = () => {
        throw new Error("Override this method");
      };
      this.p = p;
      this.pos = initialPos;
      this.size = size;
      this.active = true;
      if (velocity) {
        this.velocity = velocity;
      } else {
        this.velocity = p.createVector(Math.random() * 1, Math.random() * 1);
      }
      this.type = type;
    }
    getP() {
      return this.p;
    }
    getPos() {
      return this.pos;
    }
    getVelocity() {
      return this.velocity;
    }
    getIsActive() {
      return this.active;
    }
    setInactive() {
      this.active = false;
    }
    setPos(newPos) {
      this.pos = newPos;
    }
    setVelocity(newVelocity) {
      this.velocity = newVelocity;
    }
    getDistanceTo(point) {
      return this.pos.dist(point);
    }
    getCollisionRadius() {
      return this.size * 0.6;
    }
    getType() {
      return this.type;
    }
    checkCollision(collider) {
      const distance = this.getDistanceTo(collider.getPos());
      const collisionRadius = this.getCollisionRadius();
      return distance < collisionRadius;
    }
  }

  class LargeAsteroid extends Asteroid {
    constructor(p, initialPos, type, scale, velocity) {
      super(p, initialPos, 100 * scale, type, velocity);
    }
    getCollisionRadius() {
      return this.size * 0.8;
    }
    toString() {
      return `LargeAsteroid: pos: ${this.pos}, velocity: ${this.velocity}`;
    }
  }

  /* SoundManager class generated by Google Gemini 3 */
  class SoundManager {
    constructor() {
      this.audioContext = null;
      this.masterGain = null;
      try {
        this.audioContext = new (
          window.AudioContext || window.webkitAudioContext
        )();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.value = 0.3; // Lower volume effectively
        this.masterGain.connect(this.audioContext.destination);
      } catch (e) {
        console.warn("Web Audio API not supported", e);
      }
    }
    static getInstance() {
      if (!SoundManager.instance) {
        SoundManager.instance = new SoundManager();
      }
      return SoundManager.instance;
    }
    ensureAudioContext() {
      if (this.audioContext && this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }
    }
    playOscillator(freq, type, duration, vol = 1) {
      if (!this.audioContext || !this.masterGain) return;
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
      gain.gain.setValueAtTime(vol, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + duration,
      );
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.audioContext.currentTime + duration);
    }
    playThrust() {
      if (!this.audioContext || !this.masterGain) return;

      // Thrust is a filtered noise
      const duration = 0.1;
      const bufferSize = this.audioContext.sampleRate * duration;
      const buffer = this.audioContext.createBuffer(
        1,
        bufferSize,
        this.audioContext.sampleRate,
      );
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.audioContext.createBufferSource();
      noise.buffer = buffer;
      const filter = this.audioContext.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(200, this.audioContext.currentTime);
      const gain = this.audioContext.createGain();
      gain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + duration,
      );
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      noise.start();
    }
    playFire() {
      if (!this.audioContext || !this.masterGain) return;
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.type = "sawtooth"; // Sawtooth or square for retro feel
      osc.frequency.setValueAtTime(1200, this.audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        100,
        this.audioContext.currentTime + 0.2,
      ); // Pitch drop
      gain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.2,
      );
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.audioContext.currentTime + 0.2);
    }
    playBangLarge() {
      this.playNoise(1.5, 50, 0.8);
    }
    playBangMedium() {
      this.playNoise(0.8, 100, 0.6);
    }
    playBangSmall() {
      this.playNoise(0.4, 200, 0.4);
    }
    playSaucerLarge() {
      this.playSaucer(200, 10); // Lower pitch, slower warble
    }
    playSaucerSmall() {
      this.playSaucer(400, 20); // Higher pitch, faster warble
    }
    playSaucer(freq, warbleRate) {
      if (!this.audioContext || !this.masterGain) return;
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      const lfo = this.audioContext.createOscillator();
      const lfoGain = this.audioContext.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      lfo.type = "sine";
      lfo.frequency.value = warbleRate;
      lfoGain.gain.value = 50; // Warble depth
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      gain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.5,
      ); // Short for now
      osc.connect(gain);
      gain.connect(this.masterGain);
      lfo.start();
      osc.start();
      osc.stop(this.audioContext.currentTime + 0.5);
      lfo.stop(this.audioContext.currentTime + 0.5);
    }
    playBeat(pitch) {
      if (!this.audioContext || !this.masterGain) return;
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.type = "triangle";
      const freq = pitch === "low" ? 200 : 250;
      osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);
      gain.gain.setValueAtTime(0.4, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.15,
      );
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      osc.stop(this.audioContext.currentTime + 0.15);
    }
    playNoise(duration, filterFreq, vol) {
      if (!this.audioContext || !this.masterGain) return;
      const bufferSize = this.audioContext.sampleRate * duration;
      const buffer = this.audioContext.createBuffer(
        1,
        bufferSize,
        this.audioContext.sampleRate,
      );
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.audioContext.createBufferSource();
      noise.buffer = buffer;
      const filter = this.audioContext.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(
        filterFreq,
        this.audioContext.currentTime,
      );
      const gain = this.audioContext.createGain();
      gain.gain.setValueAtTime(vol, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + duration,
      );
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      noise.start();
    }
  }
  SoundManager.instance = null;

  class MediumAsteroid extends Asteroid {
    constructor(p, initialPos, type, scale, velocity) {
      super(p, initialPos, 50 * scale, type, velocity);
    }
    toString() {
      return `MediumAsteroid: pos: ${this.pos}, velocity: ${this.velocity}`;
    }
  }

  class Particle {
    constructor(p, position) {
      let velx = Math.random() * 2 - 1;
      let vely = Math.random() * 2 - 1;
      this.p = p;
      this.position = position;
      this.velocity = p.createVector(velx, vely);
      this.lifespan = 100;
    }
    advance() {
      this.lifespan -= 1;
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
    getPos() {
      return this.position;
    }
    getVel() {
      return this.velocity;
    }
    getLifespan() {
      return this.lifespan;
    }
    toString() {
      return `Particle: pos: ${this.position}, vel: ${this.velocity}, lifespan: ${this.lifespan}`;
    }
  }
  class Explosion {
    constructor(p, pos) {
      this.lifespan = 60;
      this.particles = [];
      this.p = p;
      this.pos = this.normalizePosition(pos);
      for (let i = 0; i < 30; i += 1) {
        const newParticle = new Particle(this.p, this.pos.copy());
        this.particles.push(newParticle);
      }
    }
    normalizePosition(pos) {
      const p = this.p;
      let explosionPosition = pos;
      while (explosionPosition.x < 0) {
        explosionPosition.x += p.width;
      }
      while (explosionPosition.y < 0) {
        explosionPosition.y += p.height;
      }
      while (explosionPosition.x > p.width) {
        explosionPosition.x -= p.width;
      }
      while (explosionPosition.y > p.height) {
        explosionPosition.y -= p.height;
      }
      return explosionPosition;
    }

    // return true if still going
    advance() {
      for (let i = 0; i < this.particles.length; i += 1) {
        this.particles[i].advance();
      }
      this.lifespan -= 1;
      if (this.lifespan <= 0) {
        return false;
      }
      return true;
    }
    getParticles() {
      return this.particles;
    }
    getPos() {
      return this.pos;
    }
    toString() {
      return `Explosion: pos: ${this.pos}, lifespan: ${this.lifespan}`;
    }
  }

  class SmallAsteroid extends Asteroid {
    constructor(p, initialPos, type, scale, velocity) {
      super(p, initialPos, 25 * scale, type, velocity);
    }
    toString() {
      return `SmallAsteroid: pos: ${this.pos}, velocity: ${this.velocity}`;
    }
  }

  class ExplosionDisplay {
    constructor(p, scale = 1) {
      ExplosionDisplay.p = p;
      ExplosionDisplay.scale = scale;
    }
    static drawParticle(particle) {
      const p = ExplosionDisplay.p;
      p.push();
      p.fill("#0f0");
      p.noStroke();
      p.translate(particle.getPos().x, particle.getPos().y);
      p.circle(0, 0, 1);
      p.pop();
    }
    static draw(explosion) {
      const p = ExplosionDisplay.p;
      const particles = explosion.getParticles();
      particles.forEach((particle) => {
        if (p.frameCount % 3 !== 0) {
          ExplosionDisplay.drawParticle(particle);
        }
      });
    }
  }
  ExplosionDisplay.scale = 1;

  class AsteroidController {
    constructor(p, scale = 1) {
      this.asteroids = [];
      this.explosions = [];
      this.getRandomAsteroidSpawnPosition = () => {
        const x = Math.random() * this.p.width;
        let y = (Math.random() * this.p.height) / 2;
        if (y > this.p.height / 4) {
          y += this.p.height / 2;
        }
        return this.p.createVector(x, y);
      };
      this.getRandomVector = (scalar) => {
        return this.p.createVector(
          Math.random() * scalar * 2 - scalar,
          Math.random() * scalar * 2 - scalar,
        );
      };
      this.getNumActiveAsteroids = () => {
        let asteroidCount = 0;
        for (let i = 0; i < this.asteroids.length; i++) {
          if (this.asteroids[i].getIsActive()) {
            asteroidCount += 1;
          }
        }
        return asteroidCount;
      };
      this.spawnAsteroidWave = (levelNum) => {
        for (let i = 0; i < 4; i++) {
          this.spawnLargeAsteroid(
            this.getRandomAsteroidSpawnPosition(),
            this.getRandomVector(1),
          );
        }
      };
      this.reposition = (position) => {
        let newPos = position;
        if (position.x < 0) {
          newPos.x = newPos.x + this.p.width;
        }
        if (position.y < 0) {
          newPos.y = newPos.y + this.p.height;
        }
        if (position.x > this.p.width) {
          newPos.x = newPos.x - this.p.width;
        }
        if (position.y > this.p.height) {
          newPos.y = newPos.y - this.p.height;
        }
        return newPos;
      };
      this.spawnLargeAsteroid = (position, velocity) => {
        const newPos = this.reposition(position);
        const largeAsteroidTypes = [
          LARGE_ASTEROID_1,
          LARGE_ASTEROID_2,
          LARGE_ASTEROID_3,
        ];
        const randomIndex = Math.floor(
          Math.random() * largeAsteroidTypes.length,
        );
        this.asteroids.push(
          new LargeAsteroid(
            this.p,
            newPos,
            largeAsteroidTypes[randomIndex],
            this.scale,
            velocity,
          ),
        );
      };
      this.spawnMediumAsteroid = (position, velocity) => {
        const newPos = this.reposition(position);
        const mediumAsteroidTypes = [
          MEDIUM_ASTEROID_1,
          MEDIUM_ASTEROID_2,
          MEDIUM_ASTEROID_3,
        ];
        this.asteroids.push(
          new MediumAsteroid(
            this.p,
            newPos,
            mediumAsteroidTypes[
              Math.floor(Math.random() * mediumAsteroidTypes.length)
            ],
            this.scale,
            velocity,
          ),
        );
      };
      this.spawnSmallAsteroid = (position, velocity) => {
        const newPos = this.reposition(position);
        const smallAsteroidTypes = [SMALL_ASTEROID_1, SMALL_ASTEROID_2];
        const randomIndex = Math.floor(
          Math.random() * smallAsteroidTypes.length,
        );
        const asteroidType = smallAsteroidTypes[randomIndex];
        this.asteroids.push(
          new SmallAsteroid(this.p, newPos, asteroidType, this.scale, velocity),
        );
      };
      this.breakUpAsteroid = (asteroid, index) => {
        const position = asteroid.getPos();
        const velocity = asteroid.getVelocity();
        this.asteroids.splice(index, 1);
        if (asteroid instanceof LargeAsteroid) {
          // Divergent velocities for medium asteroids
          const v1 = velocity
            .copy()
            .rotate(this.p.PI / 6)
            .mult(1.5);
          const v2 = velocity
            .copy()
            .rotate(-this.p.PI / 6)
            .mult(1.5);

          // Offset positions slightly to prevent overlap
          const p1 = position.copy().add(v1.copy().setMag(15));
          const p2 = position.copy().add(v2.copy().setMag(15));
          this.spawnMediumAsteroid(p1, v1);
          this.spawnMediumAsteroid(p2, v2);
          SoundManager.getInstance().playBangLarge();
        } else if (asteroid instanceof MediumAsteroid) {
          // Divergent velocities for small asteroids
          const v1 = velocity
            .copy()
            .rotate(this.p.PI / 6)
            .mult(1.5);
          const v2 = velocity
            .copy()
            .rotate(-this.p.PI / 6)
            .mult(1.5);
          const p1 = position.copy().add(v1.copy().setMag(10));
          const p2 = position.copy().add(v2.copy().setMag(10));
          this.spawnSmallAsteroid(p1, v1);
          this.spawnSmallAsteroid(p2, v2);
          SoundManager.getInstance().playBangMedium();
        } else if (asteroid instanceof SmallAsteroid) {
          asteroid.setInactive();
          SoundManager.getInstance().playBangSmall();
        }
      };
      this.advance = () => {
        this.asteroids.forEach((asteroid) => {
          const newPositionX = asteroid.getPos().x + asteroid.getVelocity().x;
          const newPositionY = asteroid.getPos().y + asteroid.getVelocity().y;
          asteroid.setPos(this.p.createVector(newPositionX, newPositionY));
          if (asteroid.getPos().x > this.p.width) {
            asteroid.getPos().x = 0;
          } else if (asteroid.getPos().x < 0) {
            asteroid.getPos().x = this.p.width;
          }
          if (asteroid.getPos().y > this.p.height) {
            asteroid.getPos().y = 0;
          } else if (asteroid.getPos().y < 0) {
            asteroid.getPos().y = this.p.height;
          }
          AsteroidDisplay.draw(asteroid);
        });
        this.explosions.forEach((explosion, index) => {
          explosion.advance();
          ExplosionDisplay.draw(explosion);
        });
      };
      this.checkPlayerCollisions = (player) => {
        let collided = false;
        this.asteroids.forEach((asteroid, index) => {
          if (asteroid.checkCollision(player)) {
            collided = true;
            this.breakUpAsteroid(asteroid, index);
            this.breakUpAsteroid(asteroid, index);
            player.setIsResetting(true);
            SoundManager.getInstance().playBangLarge(); // Ship explosion
          }
        });
        return collided;
      };
      this.checkBulletCollisions = (bullets) => {
        var _a;
        for (let i = 0; i < bullets.length; i++) {
          for (let j = 0; j < this.asteroids.length; j++) {
            if (this.asteroids[j].checkCollision(bullets[i])) {
              const explosionPosition = this.asteroids[j].getPos();
              this.explosions.push(new Explosion(this.p, explosionPosition));
              const asteroidType =
                (_a = this.asteroids[j]) === null || _a === void 0
                  ? void 0
                  : _a.getType();
              this.breakUpAsteroid(this.asteroids[j], j);
              return {
                bullet: bullets[i],
                index: i,
                asteroidType,
              };
            }
          }
        }
        return null;
      };
      this.getAsteroids = () => {
        return this.asteroids;
      };
      this.addExplosion = (explosion) => {
        this.explosions.push(explosion);
      };
      this.p = p;
      this.scale = scale;
      this.asteroidDisplay = new AsteroidDisplay(p, scale);
      this.explosionDisplay = new ExplosionDisplay(p, scale);
    }
    toString() {
      let asteroidList = "[";
      this.asteroids.forEach((asteroid) => {
        asteroidList += "\n\t" + asteroid.toString();
      });
      asteroidList += "\n]";
      return `AsteroidController: asteroids: ${this.asteroids}`;
    }
  }

  class BulletDisplay {
    constructor(p, scale = 1) {
      BulletDisplay.p = p;
      BulletDisplay.scale = scale;
    }
    static draw(bullet) {
      const p = BulletDisplay.p;
      const pos = bullet.getPos();
      const rot = bullet.getRot();
      p.push();
      p.translate(pos.x, pos.y);
      p.rotate(rot);
      if (bullet.checkIfDead()) {
        p.fill("rgb(0,128,255)");
        p.stroke("rgb(0,128,255)");
        p.circle(0, 0, 3);
        p.point(0, 0);
      } else if (bullet.getOwner() === "saucer") {
        // Saucer bullets: Thicker, brighter (white), larger radius
        console.log("saucer bullet");

        // p.stroke(255);
        // p.strokeWeight(2);
        p.fill("rgb(128,255,128)");
        p.circle(0, 0, 6); // Significantly larger
        p.fill(255);
        p.point(0, 0);
      } else {
        p.stroke("rgb(0,64,0)");
        p.fill("rgb(128,255,128)");
        p.circle(0, 0, 3);
        p.point(0, 0);
      }
      p.pop();
    }
  }
  BulletDisplay.scale = 1;

  class PlayerController {
    constructor(playerDisplay, playerModel, playerNumber = 1) {
      this.playerNumber = 1;
      this.playerDisplay = playerDisplay;
      this.playerModel = playerModel;
      this.playerNumber = playerNumber;
    }
    reset() {
      this.playerModel.reset();
      this.playerDisplay.draw(this.playerModel);
    }
    advance() {
      this.playerModel.advance();
      if (!this.playerModel.getIsResetting()) {
        this.playerDisplay.draw(this.playerModel);
      }
      const bullets = this.playerModel.getBullets();
      for (let i = 0; i < bullets.length; i++) {
        BulletDisplay.draw(bullets[i]);
      }
    }
  }

  class Bullet {
    constructor(p, pos, vel, rot, owner = "player") {
      this.scale = 1;
      this.distTravelled = 0;
      this.p = p;
      this.pos = pos;
      this.vel = vel;
      this.rot = rot;
      this.maxDist = p.width;
      this.owner = owner;
    }
    getOwner() {
      return this.owner;
    }
    getPos() {
      return this.pos;
    }
    getRot() {
      return this.rot;
    }
    getVel() {
      return this.vel;
    }
    checkIfDead() {
      return this.distTravelled >= this.maxDist;
    }
    update() {
      this.pos.add(this.vel);
      this.distTravelled += this.vel.mag();
      if (this.pos.x > this.p.width) {
        this.pos.x = 0;
      } else if (this.pos.x < 0) {
        this.pos.x = this.p.width;
      }
      if (this.pos.y > this.p.height) {
        this.pos.y = 0;
      } else if (this.pos.y < 0) {
        this.pos.y = this.p.height;
      }
    }
    setPos(newPos) {
      this.pos = newPos;
    }
  }

  class PlayerShip {
    constructor(p, scale = 1) {
      this.bullets = [];
      this.thrust = 0.5;
      this.scale = 1;
      this.coolDown = 0; // wait before firing again
      this.isResetting = false;
      this.p = p;
      this.scale = scale;
      this.rot = 0; // this.p.HALF_PI/2
      this.velocity = this.p.createVector(0, 0);
      this.pos = p.createVector(400, 400);
    }
    getBullets() {
      return this.bullets;
    }
    removeBullet(bullet, index) {
      this.bullets.splice(index, 1);
    }
    moveCW() {
      this.rot += this.p.HALF_PI / 20;
    }
    moveCCW() {
      this.rot -= this.p.HALF_PI / 20;
    }
    addThrust() {
      const thrustVector = this.p.createVector(
        this.thrust * Math.cos(this.rot),
        this.thrust * Math.sin(this.rot),
      );
      this.velocity.x += thrustVector.x;
      this.velocity.y += thrustVector.y;
      SoundManager.getInstance().playThrust();
    }
    hyperspace() {
      this.velocity.x = 0;
      this.velocity.y = 0;
      this.pos.x = Math.random() * this.p.width;
      this.pos.y = Math.random() * this.p.height;
    }
    addBullet() {
      if (this.coolDown === 0) {
        this.bullets.push(
          new Bullet(
            this.p,
            this.p.createVector(this.pos.x, this.pos.y),
            this.p.createVector(Math.cos(this.rot) * 5, Math.sin(this.rot) * 5),
            this.rot,
            "player",
          ),
        );
        SoundManager.getInstance().playFire();
        this.coolDown = 16;
      }
    }
    getPos() {
      return this.pos;
    }
    getRot() {
      return this.rot;
    }
    getScale() {
      return this.scale;
    }
    getColor() {
      return "#00FF00";
    }
    reset() {
      this.pos = this.p.createVector(this.p.width / 2, this.p.height / 2);
      this.rot = 0;
      this.velocity = this.p.createVector(0, 0);
      this.isResetting = false;
    }
    advance() {
      this.pos.x += this.velocity.x;
      this.pos.y += this.velocity.y;
      if (this.pos.x > this.p.width) {
        this.pos.x = 0;
      } else if (this.pos.x < 0) {
        this.pos.x = this.p.width;
      }
      if (this.pos.y > this.p.height) {
        this.pos.y = 0;
      } else if (this.pos.y < 0) {
        this.pos.y = this.p.height;
      }
      this.velocity.mag() > 0.1
        ? this.velocity.mult(0.99)
        : this.velocity.mult(0);
      for (let i = this.bullets.length - 1; i >= 0; i--) {
        const thisBullet = this.bullets[i];
        thisBullet.update();
        if (thisBullet.checkIfDead()) {
          this.removeBullet(thisBullet, i);
        }
      }
      if (this.coolDown > 0) {
        this.coolDown -= 1;
      }
    }
    setIsResetting(isResetting) {
      this.isResetting = isResetting;
    }
    getIsResetting() {
      return this.isResetting;
    }
    drawAfterBurner() {
      const p = this.p;
      const rot = this.rot;
      this.thrust;
      p.push();
      p.scale(this.scale);
      p.stroke(255);
      p.noFill();
      p.strokeWeight(2);
      p.translate(this.pos.x, this.pos.y);
      p.rotate(rot);
      p.fill(255);
      p.triangle(-10, -5, -10, 5, -15, 0);
      p.pop();
    }
    checkCollision(entity) {
      const dist = p5.Vector.dist(this.pos, entity.getPos());
      return dist < 15; // Approximate radius
    }
  }

  class PlayerDisplay {
    constructor(p, scale = 1) {
      this.p = p;
      this.scale = scale;
    }
    draw(player) {
      const p = this.p;
      const pos = player.getPos();
      const rotation = player.getRot();
      const color = player.getColor();
      if (p.frameCount % 3 !== 0) {
        PlayerDisplay.drawPlayer(p, pos, rotation, this.scale, color);
      }
    }
  }
  PlayerDisplay.drawPlayer = (p, position, rotation = 0, scale, color) => {
    p.push();
    p.stroke(color);
    p.strokeWeight(scale * 0.7);
    p.translate(position);
    p.scale(scale);
    p.rotate(p.HALF_PI + rotation);
    p.noFill();
    p.beginShape();
    p.vertex(0, -10);
    p.vertex(-7.5, 10);
    p.vertex(-5, 5);
    p.vertex(5, 5);
    p.vertex(7.5, 10);
    p.endShape(p.CLOSE);
    p.pop();
  };

  class LivesDisplay {
    constructor(p, scale = 1) {
      this.p = p;
      this.scale = scale;
    }
    draw(numLives) {
      const p = this.p;
      p.push();
      for (let i = 0; i < numLives; i++) {
        if (p.frameCount % 3 === 0) {
          p.stroke("#0a0");
          p.strokeWeight(p.frameCount % 2);
          PlayerDisplay.drawPlayer(
            p,
            p.createVector(115 + i * 16 * this.scale, 135 * this.scale),
            -p.HALF_PI,
            this.scale,
            "#0a0",
          );
        }
      }
      p.pop();
    }
  }

  class ScoreDisplay {
    constructor(p, font, scale = 1) {
      this.draw = (score) => {
        const p = this.p;
        const font = this.font;
        p.push();
        p.translate(10 * this.scale, 10 * this.scale);
        if (p.frameCount % 3 === 0) {
          p.strokeWeight((p.frameCount % 2) * (this.scale * 1.5));
          p.fill("#0f0"); // 2f2 / afa
          p.textFont(font);
          p.textSize(20 * this.scale);
          p.text(score.toString(), 100 * this.scale, 100 * this.scale);
        }
        p.pop();
      };
      this.p = p;
      this.font = font;
      this.scale = scale;
    }
  }

  class FooterDisplay {
    constructor(p, font, scale = 1) {
      this.p = p;
      this.font = font;
      this.scale = scale;
    }
    draw() {
      const p = this.p;
      if (this.p.frameCount % 3 !== 0) {
        const font = this.font;
        p.fill("rgb(0,128,0)");
        p.noStroke();
        p.textFont(font);
        p.textSize(12);
        p.text(
          "\u00a9 2023, 2026 Rick Segrest",
          p.width / 2 - 72,
          p.height - 30 * this.scale,
        );
      }
    }
  }

  const ScoreValues = {
    LARGE_ASTEROID: 20,
    MEDIUM_ASTEROID: 50,
    SMALL_ASTEROID: 100,
    LARGE_SAUCER: 200,
    SMALL_SAUCER: 1000,
    OTHER_PLAYER_SHIP: 500,
  };

  const SaucerSizeDescription = {
    SMALL: "SMALL",
    LARGE: "LARGE",
  };
  const SaucerSizeRadius = {
    SMALL: 20, // Doubled from 10
    LARGE: 40, // Doubled from 20
  };
  class SaucerModel {
    constructor(p, size, scale) {
      this.bullets = [];
      this.toRemove = false;
      this.shootCooldown = 0;
      this.p = p;
      this.sizeDescription = size;
      this.sizeRadius = SaucerSizeRadius[size];
      this.scale = scale;

      // Spawn logic: always spawns on left or right edge
      const isLeft = Math.random() > 0.5;
      this.position = p.createVector(
        isLeft ? 0 : p.width,
        Math.random() * p.height,
      );

      // Move horizontally across
      this.velocity = p.createVector(
        isLeft ? 2 : -2,
        Math.random() - 0.5, // Slight vertical drift
      );
      if (this.sizeDescription === SaucerSizeDescription.LARGE) {
        SoundManager.getInstance().playSaucerLarge();
      } else {
        SoundManager.getInstance().playSaucerSmall();
      }
    }
    update(playerPos, score) {
      this.position.add(this.velocity);

      // Wrap vertical
      if (this.position.y < 0) this.position.y += this.p.height;
      if (this.position.y > this.p.height) this.position.y -= this.p.height;

      // Remove if off screen horizontally
      if (this.position.x < 0 || this.position.x > this.p.width) {
        this.toRemove = true;
      }

      // Shooting logic
      if (this.shootCooldown > 0) {
        this.shootCooldown--;
      } else {
        this.shoot(playerPos, score);

        // Random cooldown between 2-4 seconds (at 60fps)
        this.shootCooldown = 120 + Math.random() * 120;
      }

      // Update bullets
      for (let i = this.bullets.length - 1; i >= 0; i--) {
        const bullet = this.bullets[i];
        bullet.update();
        if (bullet.checkIfDead()) {
          this.bullets.splice(i, 1);
        }
      }
    }
    shoot(playerPos, score) {
      const p = this.p;
      let rot = 0;
      if (this.sizeDescription === SaucerSizeDescription.LARGE) {
        // Random direction
        rot = Math.random() * p.TWO_PI;
      } else {
        // Aim at player with error based on score
        const angleToPlayer = p5.Vector.sub(playerPos, this.position).heading();

        // Accuracy improves as score increases
        // Score 0 -> +/- 45 degrees error (PI/4)
        // Score 40000 -> 0 degrees error
        const accuracyFactor = Math.min(score, 40000) / 40000;
        const maxError = (p.PI / 4) * (1 - accuracyFactor);
        const error = (Math.random() - 0.5) * 2 * maxError;
        rot = angleToPlayer + error;
      }
      this.bullets.push(
        new Bullet(
          p,
          this.position.copy(),
          p.createVector(Math.cos(rot) * 4, Math.sin(rot) * 4), // Slower than player bullets
          rot,
          "saucer",
        ),
      );
      SoundManager.getInstance().playFire();
    }
    getBullets() {
      return this.bullets;
    }
    removeBullet(index) {
      this.bullets.splice(index, 1);
    }
    getX() {
      return this.position.x;
    }
    getY() {
      return this.position.y;
    }
    getPos() {
      return this.position;
    }
    getSize() {
      return this.sizeDescription;
    }
    isToRemove() {
      return this.toRemove;
    }
    getCollisionRadius() {
      return this.sizeRadius * this.scale;
    }
  }

  class SaucerDisplay {
    constructor(p, scale) {
      SaucerDisplay.p = p;
      SaucerDisplay.scale = scale;
    }
    draw(saucer) {
      if (saucer.getSize() === "LARGE") {
        SaucerDisplay.drawLargeSaucer(saucer);
      } else {
        SaucerDisplay.drawSmallSaucer(saucer);
      }
    }
    static draw(saucer, sizeScale) {
      // larger size space ship
      const drawSpaceShip = (p) => {
        p.push();
        p.stroke(0, 255, 0);
        p.strokeWeight(1);
        p.translate(saucer.getX(), saucer.getY());
        p.scale(SaucerDisplay.scale * sizeScale * 0.3); // Reduce size by 70%
        p.noFill();
        p.quad(-55, 7, 55, 7, 25, 22, -25, 22);
        p.quad(-55, 7, 55, 7, 20, -10, -20, -10);
        p.quad(20, -10, -20, -10, -10, -30, 10, -30);
        p.pop();
      };
      drawSpaceShip(SaucerDisplay.p);
    }
    static drawLargeSaucer(saucer) {
      this.draw(saucer, 1.5);
    }
    static drawSmallSaucer(saucer) {
      this.draw(saucer, 0.7);
    }
  }
  SaucerDisplay.scale = 1;

  class LineDebris {
    constructor(p, pos, vel, length, scale, color) {
      this.life = 120; // 2 seconds at 60fps
      this.p = p;
      this.pos = pos.copy();
      this.vel = vel.copy();
      this.rot = p.random(p.TWO_PI);
      this.rotSpeed = p.random(-0.1, 0.1);
      this.length = length;
      this.scale = scale;
      this.color = color;
    }
    update() {
      this.pos.add(this.vel);
      this.rot += this.rotSpeed;
      this.life--;
    }
    draw() {
      const p = this.p;
      p.push();
      p.translate(this.pos.x, this.pos.y);
      p.rotate(this.rot);
      p.scale(this.scale); // Use the provided scale directly
      p.stroke(this.color);
      p.strokeWeight(2); // This will be affected by scale if I scale before?
      // usually we want stroke weight to be consistent screen pixels or relative?
      // p5.strokeWeight is affected by scale.
      p.line(-this.length / 2, 0, this.length / 2, 0);
      p.pop();
    }
    isDead() {
      return this.life <= 0;
    }
  }

  // import { AsteroidType } from '../type/AsteroidType';
  class SaucerController {
    constructor(p, scale) {
      this.saucer = null;
      this.spawnTimer = 0;

      //   private asteroidController:AsteroidController;
      this.debris = [];
      this.p = p;
      this.scale = scale;

      //    this.asteroidController = asteroidController;
      this.saucerDisplay = new SaucerDisplay(p, scale);
      this.resetSpawnTimer();
    }
    resetSpawnTimer() {
      // Spawn every 10-20 seconds (at 60fps)
      this.spawnTimer = 600 + Math.random() * 600;
    }
    spawnSaucer(score) {
      // Determine size based on score
      // Score > 40000 -> only small saucers
      let size;
      if (score >= 40000) {
        size = SaucerSizeDescription.SMALL;
      } else {
        // Otherwise random, but biased towards large
        size =
          Math.random() > 0.3
            ? SaucerSizeDescription.LARGE
            : SaucerSizeDescription.SMALL;
      }
      this.saucer = new SaucerModel(this.p, size, this.scale);
    }
    advance(playerShip, score) {
      // Spawning logic
      if (!this.saucer) {
        if (this.spawnTimer > 0) {
          this.spawnTimer--;
        } else {
          this.spawnSaucer(score);
        }
      }

      // Update active saucer
      if (this.saucer) {
        this.saucer.update(playerShip.getPos(), score);
        this.saucerDisplay.draw(this.saucer);

        // Draw bullets
        const bullets = this.saucer.getBullets();
        for (let i = 0; i < bullets.length; i++) {
          BulletDisplay.draw(bullets[i]);
        }
        if (this.saucer.isToRemove()) {
          this.saucer = null;
          this.resetSpawnTimer();
        } else {
          this.checkCollisions(playerShip);
        }
      }

      // Update and draw debris
      for (let i = this.debris.length - 1; i >= 0; i--) {
        const d = this.debris[i];
        d.update();
        d.draw();
        if (d.isDead()) {
          this.debris.splice(i, 1);
        }
      }
    }
    checkCollisions(playerShip) {
      if (!this.saucer) return;

      // 1. Saucer Bullets vs Player
      const saucerBullets = this.saucer.getBullets();
      for (const bullet of saucerBullets) {
        if (playerShip.checkCollision(bullet));
      }

      // 2. Player Bullets vs Saucer
      const playerBullets = playerShip.getBullets();
      for (let i = 0; i < playerBullets.length; i++) {
        const bullet = playerBullets[i];
        if (bullet && this.checkSaucerCollision(bullet)) {
          playerShip.removeBullet(bullet, i);
          this.destroySaucer(true); // Player killed saucer
          return;
        }
      }

      // 3. Saucer vs Player Ship
      if (this.checkSaucerCollision(playerShip)) {
        this.destroySaucer(true);

        // Player death needs to be triggered.
        // We might need a better way to report this up to GameController.
      }

      // 4. Saucer vs Asteroids (Optional)
      /*
            const asteroids = this.asteroidController.getAsteroids();
            for (const asteroid of asteroids) {
                if (this.checkSaucerCollision(asteroid)) {
                    this.destroySaucer(false);
                    // Break asteroid too?
                    return;
                }
            }
            */
    }
    checkSaucerCollision(entity) {
      if (!this.saucer) return false;
      const dist = p5.Vector.dist(this.saucer.getPos(), entity.getPos());
      return dist < this.saucer.getCollisionRadius(); // Simple collision
    }
    destroySaucer(byPlayer) {
      var _a, _b;
      if (!this.saucer) return;
      if (byPlayer) {
        if (this.saucer.getSize() === SaucerSizeDescription.LARGE) {
          (_a = GameController.getInstance()) === null || _a === void 0
            ? void 0
            : _a.scoreLargeSaucer();
        } else {
          (_b = GameController.getInstance()) === null || _b === void 0
            ? void 0
            : _b.scoreSmallSaucer();
        }
      }
      SoundManager.getInstance().playBangLarge(); // Reuse explosion sound
      this.createDebris(this.saucer.getPos());
      this.saucer = null;
      this.resetSpawnTimer();
    }
    createDebris(pos) {
      const p = this.p;

      // Pre-calculate debris scale matching the saucer's visual scale (0.3 of global scale)
      const debrisScale = this.scale * 0.3;
      const color = "#00FF00"; // Green for saucer
      // Create debris segments approximating the saucer shape
      // Top line
      this.debris.push(
        new LineDebris(
          p,
          pos.copy().add(0, -30),
          p.createVector(Math.random() - 0.5, Math.random() - 0.5),
          20,
          debrisScale,
          color,
        ),
      );

      // Mid line
      this.debris.push(
        new LineDebris(
          p,
          pos.copy().add(0, -10),
          p.createVector(Math.random() - 0.5, Math.random() - 0.5),
          40,
          debrisScale,
          color,
        ),
      );

      // Base line
      this.debris.push(
        new LineDebris(
          p,
          pos.copy().add(0, 7),
          p.createVector(Math.random() - 0.5, Math.random() - 0.5),
          110,
          debrisScale,
          color,
        ),
      );

      // Bottom line
      this.debris.push(
        new LineDebris(
          p,
          pos.copy().add(0, 22),
          p.createVector(Math.random() - 0.5, Math.random() - 0.5),
          50,
          debrisScale,
          color,
        ),
      );

      // Add a few random angled pieces
      for (let i = 0; i < 4; i++) {
        this.debris.push(
          new LineDebris(
            p,
            pos.copy().add(Math.random() * 40 - 20, Math.random() * 20 - 10),
            p.createVector(Math.random() * 2 - 1, Math.random() * 2 - 1),
            30,
            debrisScale,
            color,
          ),
        );
      }
    }

    // Helper for GameController to check collisions
    checkCollisionWithPlayer(playerShip) {
      if (!this.saucer) return false;

      // Check saucer body
      if (this.checkSaucerCollision(playerShip)) {
        this.destroySaucer(true); // Count as kill? Or just crash. Let's say crash.
        return true;
      }

      // Check bullets
      const bullets = this.saucer.getBullets();
      for (let i = 0; i < bullets.length; i++) {
        const bullet = bullets[i];
        const dist = p5.Vector.dist(bullet.getPos(), playerShip.getPos());
        if (dist < 15) {
          // Player radius approx
          this.saucer.removeBullet(i);
          return true;
        }
      }
      return false;
    }
  }

  class GameController {
    constructor(p, font) {
      // game controller member variables
      this.numLives = 3;
      this.score = 0;
      this.lastBonus = 0;
      this.level = 1;
      this.playerDebris = [];
      this.rackupScore = (score) => {
        this.score += score;
        if (this.score - this.lastBonus >= 10000) {
          this.lastBonus = this.score;
          this.numLives += 1;
        }
      };
      this.p = p;
      this.scale = p.width / 1200;
      this.pShip = new PlayerShip(p, this.scale);
      this.font = font;
      this.footerDisplay = new FooterDisplay(p, font, this.scale);
      this.playerDisplay = new PlayerDisplay(p, this.scale);
      this.bulletDisplay = new BulletDisplay(p, this.scale);
      this.asteroidController = new AsteroidController(p, this.scale);
      this.saucerController = new SaucerController(p, this.scale); // , this.asteroidController);
      this.playerController = new PlayerController(
        this.playerDisplay,
        this.pShip,
      );
      this.scoreDisplay = new ScoreDisplay(p, font);
      this.livesDisplay = new LivesDisplay(p);
      this.level = 1;
      this.spawnWave();
    }
    spawnWave() {
      this.asteroidController.spawnAsteroidWave(this.level);
    }
    moveCCW() {
      this.getPShip().moveCCW();
    }
    moveCW() {
      this.getPShip().moveCW();
    }
    addThrust() {
      this.getPShip().addThrust();
    }
    addBullet() {
      this.getPShip().addBullet();
    }
    hyperspace() {
      this.getPShip().hyperspace();
    }
    addAsteroidScore(asteroidType) {
      if (
        asteroidType === LARGE_ASTEROID_1 ||
        asteroidType === LARGE_ASTEROID_2 ||
        asteroidType === LARGE_ASTEROID_3
      ) {
        this.scoreLargeAsteroid();
      } else if (
        asteroidType === MEDIUM_ASTEROID_1 ||
        asteroidType === MEDIUM_ASTEROID_2 ||
        asteroidType === MEDIUM_ASTEROID_3
      ) {
        this.scoreMediumAsteroid();
      } else if (
        asteroidType === SMALL_ASTEROID_1 ||
        asteroidType === SMALL_ASTEROID_2
      ) {
        this.scoreSmallAsteroid();
      } else {
        throw new Error("Error: unknown asteroid type");
      }
      return;
    }
    scoreLargeAsteroid() {
      this.rackupScore(ScoreValues.LARGE_ASTEROID);
    }
    scoreMediumAsteroid() {
      this.rackupScore(ScoreValues.MEDIUM_ASTEROID);
    }
    scoreSmallAsteroid() {
      this.rackupScore(ScoreValues.SMALL_ASTEROID);
    }
    scoreLargeSaucer() {
      this.rackupScore(ScoreValues.LARGE_SAUCER);
    }
    scoreSmallSaucer() {
      this.rackupScore(ScoreValues.SMALL_SAUCER);
    }
    scoreDefeatPlayer() {
      this.rackupScore(ScoreValues.OTHER_PLAYER_SHIP);
    }
    resetScore() {
      this.score = 0;
    }
    checkKeys() {
      const p = this.p;
      if (p.keyIsDown(p.LEFT_ARROW)) {
        this.moveCCW();
      } else if (p.keyIsDown(p.RIGHT_ARROW)) {
        this.moveCW();
      } else if (p.keyIsDown(p.UP_ARROW)) {
        this.addThrust();
      } else if (p.keyIsDown(32)) {
        this.addBullet();
      }

      // Ensure audio context is running on any key interaction
      if (p.keyIsPressed) {
        SoundManager.getInstance().ensureAudioContext();
      }
    }
    canReset() {
      var _a;
      const theAsteroids = this.asteroidController.getAsteroids();
      const spawnPoint = this.p.createVector(
        this.p.width / 2,
        this.p.height / 2,
      );
      for (let i = 0; i < theAsteroids.length; i += 1) {
        if (
          ((_a = theAsteroids[i]) === null || _a === void 0
            ? void 0
            : _a.getDistanceTo(spawnPoint)) !== null &&
          theAsteroids[i].getDistanceTo(spawnPoint) < 100
        ) {
          return false;
        }
      }
      return true;
    }
    advance() {
      this.checkKeys();
      this.scoreDisplay.draw(this.score);
      this.livesDisplay.draw(this.numLives);
      this.pShip.advance();
      this.asteroidController.advance();
      this.saucerController.advance(this.pShip, this.score);
      this.playerController.advance();
      if (!this.pShip.getIsResetting()) {
        this.playerDisplay.draw(this.pShip);
      } else {
        if (this.canReset()) {
          this.pShip.reset();
        }
      }
      this.footerDisplay.draw();
      const collision = this.asteroidController.checkBulletCollisions(
        this.pShip.getBullets(),
      );
      if (collision !== null) {
        this.pShip.removeBullet(collision.bullet, collision.index);
        this.addAsteroidScore(collision.asteroidType);
        this.checkIfLevelComplete();
      }
      const playerCollision = this.asteroidController.checkPlayerCollisions(
        this.pShip,
      );
      if (playerCollision) {
        const explosionPos = this.pShip.getPos();
        this.asteroidController.addExplosion(
          new Explosion(this.p, explosionPos),
        );
        this.createPlayerDebris(explosionPos);
        this.numLives -= 1;
        this.pShip.setIsResetting(true);
        if (this.canReset()) {
          this.pShip.reset();
        }
      }
      if (this.saucerController.checkCollisionWithPlayer(this.pShip)) {
        const explosionPos = this.pShip.getPos();
        this.asteroidController.addExplosion(
          new Explosion(this.p, explosionPos),
        );
        this.numLives -= 1;
        this.pShip.setIsResetting(true);
        if (this.canReset()) {
          this.pShip.reset();
        }
      }

      // Update and draw player debris
      for (let i = this.playerDebris.length - 1; i >= 0; i--) {
        const d = this.playerDebris[i];
        d.update();
        d.draw();
        if (d.isDead()) {
          this.playerDebris.splice(i, 1);
        }
      }
    }
    createPlayerDebris(pos) {
      const p = this.p;
      const color = "#00FF00";
      const debrisScale = this.scale; // Player debris uses full scale? Or adjusted?
      // PlayerDisplay uses this.scale for drawing. LineDebris uses scale direct.
      // So passing this.scale is correct.
      // But wait, LineDebris might not support "scale" affecting the length if I pass length in pixels.
      // In SaucerController I passed `debrisScale` which was `this.scale * 0.3`.
      // The lengths in `createPlayerDebris` should be relative to the ship size.
      // Ship vertices are around -10 to 10.
      // Left wing
      this.playerDebris.push(
        new LineDebris(
          p,
          pos.copy().add(-5, 0),
          p.createVector(Math.random() - 0.5, Math.random() - 0.5),
          15,
          debrisScale,
          color,
        ),
      );

      // Right wing
      this.playerDebris.push(
        new LineDebris(
          p,
          pos.copy().add(5, 0),
          p.createVector(Math.random() - 0.5, Math.random() - 0.5),
          15,
          debrisScale,
          color,
        ),
      );

      // Nose
      this.playerDebris.push(
        new LineDebris(
          p,
          pos.copy().add(0, -5),
          p.createVector(Math.random() - 0.5, Math.random() - 0.5),
          10,
          debrisScale,
          color,
        ),
      );

      // Random bits
      for (let i = 0; i < 3; i++) {
        this.playerDebris.push(
          new LineDebris(
            p,
            pos.copy(),
            p.createVector(Math.random() * 2 - 1, Math.random() * 2 - 1),
            10,
            debrisScale,
            color,
          ),
        );
      }
    }
    checkIfLevelComplete() {
      const asteroidLength = this.asteroidController.getNumActiveAsteroids();
      if (asteroidLength === 0) {
        this.level += 1;
        this.asteroidController.spawnAsteroidWave(this.level);
      }
    }
    static createInstance(p, font) {
      if (GameController.instance === null) {
        GameController.instance = new GameController(p, font);
      }
      return GameController.instance;
    }
    static getInstance() {
      if (
        GameController.instance !== null ||
        GameController.instance !== undefined
      ) {
        return GameController.instance;
      }
      return null;
    }
    static resetInstance() {
      var _a, _b;
      const p =
        (_a = GameController.instance) === null || _a === void 0
          ? void 0
          : _a.p;
      const font =
        (_b = GameController.instance) === null || _b === void 0
          ? void 0
          : _b.font;
      GameController.instance = null;
      GameController.instance = new GameController(p, font);
      return GameController.instance;
    }
    getPlayerController() {
      return this.playerController;
    }
    getAsteroidController() {
      return this.asteroidController;
    }
    getBulletDisplay() {
      return this.bulletDisplay;
    }
    getFooterDisplay() {
      return this.footerDisplay;
    }
    getPlayerDisplay() {
      return this.playerDisplay;
    }
    getScoreDisplay() {
      return this.scoreDisplay;
    }
    getLivesDisplay() {
      return this.livesDisplay;
    }
    getScore() {
      return this.score;
    }
    getNumLives() {
      return this.numLives;
    }
    setNumLives(numLives) {
      this.numLives = numLives;
    }
    getPShip() {
      return this.pShip;
    }
  }
  GameController.instance = null;

  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }

  // static fromString
  Point.from2DArray = (arr) => {
    if (arr.length !== 2) {
      console.warn("Error: Array length is not 2");
      return null;
    }
    if (!arr[0] || !arr[1]) {
      console.warn("Error: x or y is null");
      return null;
    }
    return new Point(arr[0], arr[1]);
  };

  class SVGObject {
    constructor(type, style = null) {
      this.type = type;
      this.getStyle = () => {
        return this.style;
      };
      this.setStyle = (style) => {
        this.style = style;
      };
      this.setFillColor = (fillColor) => {
        this.style.fillColor = fillColor;
      };
      this.setStrokeColor = (strokeColor) => {
        this.style.strokeColor = strokeColor;
      };
      this.setStrokeWeight = (strokeWeight) => {
        this.style.strokeWeight = strokeWeight;
      };
      this.style = style || {};
    }
  }

  //  => {
  //   return "abstract toSVGString";
  // };
  //  {
  //   return "abstract toString";
  // };
  // abstract makeSound(input : string) : string;
  SVGObject.process = (element, renderer) => {
    throw "abstract process element : " + element + ", " + renderer;
  };
  SVGObject.processList = (doc, renderer) => {
    throw "abstract process doc : " + doc + ", " + renderer;
  };
  SVGObject.draw = (renderer, elements) => {
    throw "abstract draw : " + renderer + ", " + elements;
  };
  SVGObject.drawList = (renderer, elements) => {
    throw "abstract drawList : " + renderer + ", " + elements;
  };
  SVGObject.setStyle = (renderer, style) => {
    if (style.fillColor) {
      renderer.fill(style.fillColor);
    }
    if (style.strokeColor) {
      renderer.stroke(style.strokeColor);
    }
    if (style.strokeWeight) {
      renderer.strokeWeight(style.strokeWeight);
    }
  };

  var SVGObjectType;
  (function (SVGObjectType) {
    SVGObjectType["ARC"] = "arc";
    SVGObjectType["LINE"] = "line";
    SVGObjectType["TEXT"] = "text";
    SVGObjectType["PATH"] = "path";
    SVGObjectType["LINK"] = "link";
    SVGObjectType["RECT"] = "rect";
    SVGObjectType["IMAGE"] = "image";
    SVGObjectType["CIRCLE"] = "circle";
    SVGObjectType["MARKER"] = "marker";
    SVGObjectType["ELLIPSE"] = "ellipse";
    SVGObjectType["POLYGON"] = "polygon";
    SVGObjectType["UNKNOWN"] = "unknown";
    SVGObjectType["POLYLINE"] = "polyline";
    SVGObjectType["BEZIER_CURVE"] = "bezierCurve";
  })(SVGObjectType || (SVGObjectType = {}));
  var SVGObjectType$1 = SVGObjectType;

  class SVGArc extends SVGObject {
    // public center: Point;
    // public radius: number;
    // public startAngle: number;
    // public endAngle: number;
    constructor(params) {
      super(SVGObjectType$1.ARC, params.style);
      this.endPosition = null;
      this.toSVGString = () => {
        var _a, _b;
        return `A ${this.radiusX} ${this.radiusY} ${this.xAxisRotation} 0 0 ${(_a = this.endPosition) === null || _a === void 0 ? void 0 : _a.x} ${(_b = this.endPosition) === null || _b === void 0 ? void 0 : _b.y}`;

        // return `M ${this.center.x} ${this.center.y} m -${this.radius}, 0 a ${
        //   this.radius
        // },${this.radius} 0 1,0 ${this.radius * 2},0 a ${this.radius},${
        //   this.radius
        // } 0 1,0 -${this.radius * 2},0`;
      };
      this.toString = () => {
        return `Arc from (${this.center.x}, ${this.center.y}) with x-radius ${this.radiusX} & y-radius ${this.radiusY}`;
      };
      this.center = params.center;
      this.radiusX = params.rx;
      this.radiusY = params.ry;
      this.xAxisRotation = params.xAxisRotation;
      if (params.endPosition) {
        this.endPosition = params.endPosition;
      }

      // this.center = params.center;
      // this.radius = params.radius;
      // this.startAngle = params.startAngle;
      // this.endAngle = params.endAngle;
    }
  }
  SVGArc.create = (params) => {
    return new SVGArc(params);
  };
  SVGArc.processList = (doc) => {
    const arcs = [];
    if (doc) {
      const svgElementList = doc.querySelectorAll("path");
      for (const arcData of svgElementList) {
        SVGArc.process(arcData);
      }
    }
    return arcs;
  };

  // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
  // a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
  // TODO: Pass A|a string only, from path
  SVGArc.processFromString = (str) => {
    // const dString = element?.getAttribute("d");
    if (str) {
      const dArray = str.split(" ");
      if (dArray.length === 7) {
        const center = new Point(100, 100);
        const rx = parseFloat(dArray[1]);
        const ry = parseFloat(dArray[2]);
        const xAxisRotation = parseFloat(dArray[3]);

        // const largeArcFlag = 0; // parseFloat(dArray[4] as string);
        // const sweepFlag = 0; // parseFloat(dArray[5] as string);
        if (dArray[0] === "A") {
          // set end position
          const x = parseFloat(dArray[6]);
          const y = parseFloat(dArray[7]);
          const endPosition = new Point(x, y);
          return new SVGArc({
            center,
            rx,
            ry,
            xAxisRotation,
            endPosition,
          });
        }

        // else if (dArray[0] === "a") {
        //   const dx = parseFloat(dArray[6] as string);
        //   const dy = parseFloat(dArray[7] as string);
        // }
      }
    }
    return null;
  };

  // Find the Center:
  // The center isn’t directly given in SVG.
  // You’d need to use the SVG start point (x1, y1), SVG end point (x2, y2),
  // startPoint: { x: 10, y: 315 }
  // endPoint: { x: 162.55, y: 162.45 }
  // rx, ry: { 30, 50 }
  // x-axis-rotation,
  // (LATER: ) and flags
  // to compute it.
  //
  // This involves solving a system of equations
  // (beyond simple arithmetic,
  // often requiring trigonometry and matrix transformations).
  //
  // Libraries like svg-arc-to-center-param (in JavaScript)
  // can help, or you can approximate for simple cases.
  // Start and End Angles:
  // Once you have the center (cx, cy),
  // calculate the angle of the start point (x1, y1)
  // and end point (x2, y2) relative to the center using atan2(y - cy, x - cx).
  // Adjust for x-axis-rotation by rotating the angles if nonzero.
  // Sweep Direction:
  // SVG sweep-flag = 1 means clockwise; p5.js goes counterclockwise by default. If sweep-flag = 0, swap the start and stop angles to reverse direction.
  // Large Arc Flag:
  // In p5.js, the arc length is determined purely by start and stop. Use the large-arc-flag to decide if the angle difference should exceed 180 degrees.
  // h,k is center of ellipse
  // x_m is x-midpoint
  // y_m is y-midpoint
  SVGArc.getMidpoint = (x1, y1, x2, y2) => {
    const x_m = (x1 + x2) / 2;
    const y_m = (y1 + y2) / 2;
    return { x_m, y_m };
  };
  SVGArc.getAdjustedCoordinates = (xRotTheta, x1, y1, x2, y2) => {
    const { x_m, y_m } = SVGArc.getMidpoint(x1, y1, x2, y2);
    const x1_prime =
      Math.cos(xRotTheta) * (x1 - x_m) - Math.sin(xRotTheta) * (y1 - y_m);
    const y1_prime =
      -Math.sin(xRotTheta) * (x1 - x_m) + Math.cos(xRotTheta) * (y1 - y_m);
    return { x1_prime, y1_prime };
  };
  SVGArc.computeLambda = (xRotTheta, x1, y1, x2, y2, radiusX, radiusY) => {
    // a is semi-major axis / x-radius
    // b is semi-minor axis / y-radius
    const a = radiusX;
    const b = radiusY;
    const { x1_prime, y1_prime } = SVGArc.getAdjustedCoordinates(
      xRotTheta,
      x1,
      y1,
      x2,
      y2,
    );
    const lhs = Math.pow(x1_prime, 2) / Math.pow(a, 2);
    const rhs = Math.pow(y1_prime, 2) / Math.pow(b, 2);
    const equationResult = lhs + rhs;
    const lambda = Math.sqrt(1 / equationResult);
    return lambda;
  };
  SVGArc.computeCenterOffset = (
    xRotTheta,
    x1,
    y1,
    x2,
    y2,
    radiusX,
    radiusY,
  ) => {
    const lambda = SVGArc.computeLambda(
      xRotTheta,
      x1,
      y1,
      x2,
      y2,
      radiusX,
      radiusY,
    );
    const { x1_prime, y1_prime } = SVGArc.getAdjustedCoordinates(
      xRotTheta,
      x1,
      y1,
      x2,
      y2,
    );
    const a = radiusX;
    const b = radiusY;

    // plus or minus, depending on the arc's direction
    const cx_prime = (lambda * (y1_prime * a)) / b;
    const cy_prime = (lambda * (x1_prime * b)) / a;
    return { cx_prime, cy_prime };
  };
  SVGArc.transformBack = (xRotTheta, x1, y1, x2, y2, radiusX, radiusY) => {
    const { x_m, y_m } = SVGArc.getMidpoint(x1, y1, x2, y2);
    const { cx_prime, cy_prime } = SVGArc.computeCenterOffset(
      xRotTheta,
      x1,
      y1,
      x2,
      y2,
      radiusX,
      radiusY,
    );
    const h =
      x_m + (cx_prime * Math.cos(xRotTheta) - cy_prime * Math.sin(xRotTheta));
    const k =
      y_m + (cx_prime * Math.sin(xRotTheta) + cy_prime * Math.cos(xRotTheta));
    return { h, k };
  };
  SVGArc.draw = (renderer, element) => {
    const arc = element;
    renderer.push();
    renderer.noFill();
    renderer.strokeWeight(arc.getStyle().strokeWeight || 1);
    renderer.stroke(arc.getStyle().strokeColor || "white");

    // renderer.beginShape();
    // renderer.vertex(arc.center.x, arc.center.y);
    // renderer.vertex(arc.center.x - arc.radius, arc.center.y);
    // renderer.arc(arc.center.x, arc.center.y);
    // .arc
    // arc.center.x,
    // arc.center.y,
    // arc.radius * 2,
    // arc.radius * 2,
    // arc.startAngle,
    // arc.endAngle
    // ();
    renderer.endShape();
    renderer.pop();
  };
  SVGArc.drawList = (renderer, elements) => {
    for (const arc of elements) {
      SVGArc.draw(renderer, arc);
    }
  };

  class SVGBezierCurve extends SVGObject {
    constructor(params) {
      super(SVGObjectType$1.BEZIER_CURVE, params.style);
      this.toSVGString = () => {
        return `M ${this.p1.x} ${this.p1.y} C ${this.cp1.x} ${this.cp1.y} ${this.cp2.x} ${this.cp2.y} ${this.p2.x} ${this.p2.y}`;
      };
      this.toString = () => {
        return `Bezier Curve from (${this.p1.x}, ${this.p1.y}) to (${this.p2.x}, ${this.p2.y}) with control points (${this.cp1.x}, ${this.cp1.y}) and (${this.cp2.x}, ${this.cp2.y})`;
      };
      this.p1 = params.p1;
      this.cp1 = params.cp1;
      this.cp2 = params.cp2;
      this.p2 = params.p2;
    }
  }
  SVGBezierCurve.create = (params) => {
    return SVGFactory.createBezierCurve(params);
  };

  var _a$5;
  class SVGCircle extends SVGObject {
    constructor(params) {
      super(SVGObjectType$1.CIRCLE, params.style);
      this.toSVGString = () => {
        return `M ${this.center.x} ${this.center.y} m -${this.radius}, 0 a ${this.radius},${this.radius} 0 1,0 ${this.radius * 2},0 a ${this.radius},${this.radius} 0 1,0 -${this.radius * 2},0`;
      };
      this.toString = () => {
        return `Circle at (${this.center.x}, ${this.center.y}) with radius ${this.radius}`;
      };
      this.center = params.center;
      this.radius = params.radius;
    }
  }
  _a$5 = SVGCircle;
  SVGCircle.create = (params) => {
    return new _a$5(params);
  };
  SVGCircle.processList = (doc) => {
    const circles = [];
    if (doc) {
      const svgElementList = doc.querySelectorAll("circle");
      for (const lineData of svgElementList) {
        const circle = _a$5.process(lineData);
        if (circle) {
          circles.push(circle);
        }
      }
    }
    return circles;
  };
  SVGCircle.process = (element) => {
    const rString =
      element === null || element === void 0
        ? void 0
        : element.getAttribute("r");
    const cxString =
      element === null || element === void 0
        ? void 0
        : element.getAttribute("cx");
    const cyString =
      element === null || element === void 0
        ? void 0
        : element.getAttribute("cy");
    let radius;
    let cx;
    let cy;
    if (rString && cxString && cyString) {
      radius = parseFloat(rString);
      cx = parseFloat(cxString);
      cy = parseFloat(cyString);
      if (
        typeof radius === "number" &&
        typeof cx === "number" &&
        typeof cy === "number"
      ) {
        const circle = SVGFactory.createCircle({
          center: new Point(cx, cy),
          radius,
        });
        return circle;
      }
    }
    return null;
  };
  SVGCircle.drawList = (renderer, elements) => {
    for (const element of elements) {
      SVGObject.setStyle(renderer, element.getStyle());
      if (elements.length > 0) {
        for (const c of elements) {
          const circle = c;
          _a$5.draw(renderer, circle);
        }
      }
    }
  };
  SVGCircle.draw = (renderer, element) => {
    renderer.push();
    renderer.fill("green");
    renderer.stroke("white");
    renderer.strokeWeight(1);
    const circleObj = element;
    renderer.circle(circleObj.center.x, circleObj.center.y, circleObj.radius);
    renderer.pop();
  };

  var _a$4;
  class SVGEllipse extends SVGObject {
    constructor(
      params,
      // center: Point,
      // rx: number,
      // ry: number,
      // style: SVGStyle | null = null
    ) {
      super(SVGObjectType$1.ELLIPSE, params.style);
      this.toSVGString = () => {
        return `M ${this.center.x} ${this.center.y} m -${this.radiusX}, 0 a ${this.radiusX},${this.radiusY} 0 1,0 ${this.radiusX * 2},0 a ${this.radiusX},${this.radiusY} 0 1,0 -${this.radiusX * 2},0`;
      };
      this.toString = () => {
        return `Ellipse at (${this.center.x}, ${this.center.y}) with radii ${this.radiusX} and ${this.radiusY}`;
      };
      this.center = params.center;
      this.radiusX = params.radiusX;
      this.radiusY = params.radiusY;
    }
  }
  _a$4 = SVGEllipse;
  SVGEllipse.create = (params) => {
    return new _a$4(params);
  };
  SVGEllipse.processList = (doc) => {
    const ellipses = [];
    if (doc) {
      const svgElementList = doc.querySelectorAll("ellipse");
      for (const ellipseData of svgElementList) {
        const ellipse = _a$4.process(ellipseData);
        if (ellipse) {
          ellipses.push(ellipse);
        }
      }
    }
    return ellipses;
  };
  SVGEllipse.process = (element) => {
    // static processLine = (line: Element): SVGLine | null => {
    const cx =
      element === null || element === void 0
        ? void 0
        : element.getAttribute("cx");
    const cy =
      element === null || element === void 0
        ? void 0
        : element.getAttribute("cy");
    const rx =
      element === null || element === void 0
        ? void 0
        : element.getAttribute("rx");
    const ry =
      element === null || element === void 0
        ? void 0
        : element.getAttribute("ry");
    let centerPt;
    let radiusX;
    let radiusY;
    if (
      typeof cx === "string" &&
      typeof cy === "string" &&
      typeof rx === "string" &&
      typeof ry === "string"
    ) {
      centerPt = new Point(parseFloat(cx), parseFloat(cy));
      radiusX = parseFloat(rx);
      radiusY = parseFloat(ry);
      if (
        centerPt &&
        typeof radiusX === "number" &&
        typeof radiusY === "number"
      ) {
        const params = {
          center: centerPt,
          radiusX,
          radiusY,
        };
        const ellipse = SVGFactory.createEllipse(params);
        return ellipse;
      }
    }
    return null;

    // };
  };
  SVGEllipse.draw = (renderer, element) => {
    renderer.push();
    const ellipse = element;
    renderer.stroke("white");
    renderer.strokeWeight(3);
    renderer.ellipse(
      ellipse.center.x,
      ellipse.center.y,
      ellipse.radiusX,
      ellipse.radiusY,
    );
    renderer.pop();
  };
  SVGEllipse.drawList = (renderer, elements) => {
    for (const element of elements) {
      SVGObject.setStyle(renderer, element.getStyle());
      if (elements.length > 0) {
        for (const el of elements) {
          const ellipse = el;
          _a$4.draw(renderer, ellipse);
        }
      }
    }
  };

  // if (fs.existsSync(path)) {
  //   // File exists in path
  // } else {
  //   // File doesn't exist in path
  // }
  class SVGImage extends SVGObject {
    constructor(params) {
      super(SVGObjectType$1.IMAGE, params.style);
      this.img = null;
      this.toSVGString = () => {
        return `<image x="${this.position.x}" y="${this.position.y}" width="${this.width}" height="${this.height}" xlink:href="${this.href}" />`;
      };
      this.toString = () => {
        return `Image at (${this.position.x}, ${this.position.y}) with width ${this.width} and height ${this.height}`;
      };
      this.href = params.href;

      // this.img = renderer.loadImage(params.href);
      this.width = params.width;
      this.height = params.height;
      this.position = params.position;
    }
  }
  SVGImage.create = (params) => {
    return new SVGImage(params);
  };
  SVGImage.processList = (doc, renderer) => {
    if (renderer === null) {
      return [];
    }
    const images = [];
    if (doc) {
      const svgElementList = doc.querySelectorAll("image");
      for (const imageData of svgElementList) {
        const image = SVGImage.process(imageData, renderer);
        if (image) {
          images.push(image);
        }
      }
    }
    return images;
  };
  SVGImage.process = (element, renderer) => {
    if (!renderer || renderer === null) {
      return null;
    }
    const href =
      element === null || element === void 0
        ? void 0
        : element.getAttribute("href");
    const xString =
      (element === null || element === void 0
        ? void 0
        : element.getAttribute("x")) || null;
    const yString =
      (element === null || element === void 0
        ? void 0
        : element.getAttribute("y")) || null;
    const widthString =
      (element === null || element === void 0
        ? void 0
        : element.getAttribute("width")) || null;
    const heightString =
      (element === null || element === void 0
        ? void 0
        : element.getAttribute("height")) || null;
    let x = 0;
    let y = 0;
    let w = null;
    let h = null;
    if (xString) {
      x = parseFloat(xString) || 0;
    }
    if (yString) {
      y = parseFloat(yString) || 0;
    }
    if (widthString) {
      w = parseFloat(widthString);
    }
    if (heightString) {
      h = parseFloat(heightString);
    }
    if (
      href &&
      typeof x === "number" &&
      typeof y === "number" &&
      typeof w === "number" &&
      typeof h === "number"
    ) {
      const imgPath = "w3examples/image/" + href;
      const imgData = {
        href: imgPath,
        position: new Point(x, y),
        width: w,
        height: h,
      };
      const image = SVGFactory.createImage(imgData);
      renderer.loadImage(imgPath, (loadedImg) => {
        image.img = loadedImg;
      });
      return image;
    }
    return null;
  };
  SVGImage.drawList = (renderer, elements) => {
    elements.forEach((element) => {
      SVGImage.draw(renderer, element);
    });
  };
  SVGImage.draw = (renderer, element) => {
    if (element.type === SVGObjectType$1.IMAGE) {
      const svgImage = element;
      if (svgImage.img) {
        renderer.push();
        renderer.image(
          svgImage.img,
          svgImage.position.x,
          svgImage.position.y,
          svgImage.width,
          svgImage.height,
        );
        renderer.pop();
      } else {
        console.warn("Image not loaded");
      }
    }
  };

  var _a$3;
  class SVGLine extends SVGObject {
    constructor(params) {
      super(SVGObjectType$1.LINE, params.style);
      this.toSVGString = () => {
        return `M ${this.p1.x} ${this.p1.y} L ${this.p2.x} ${this.p2.y}`;
      };
      this.toString = () => {
        return `Line from (${this.p1.x}, ${this.p1.y}) to (${this.p2.x}, ${this.p2.y})`;
      };
      this.p1 = params.p1;
      this.p2 = params.p2;
    }
  }
  _a$3 = SVGLine;
  SVGLine.create = (params) => {
    return new _a$3(params);
  };
  SVGLine.processList = (doc) => {
    const lines = [];
    if (doc) {
      const svgElementList = doc.querySelectorAll("line");
      for (const lineData of svgElementList) {
        const line = _a$3.process(lineData);
        if (line) {
          lines.push(line);
        }
      }
    }
    return lines;
  };
  SVGLine.process = (element) => {
    // static processLine = (line: Element): SVGLine | null => {
    const x1String =
      element === null || element === void 0
        ? void 0
        : element.getAttribute("x1");
    const y1String =
      element === null || element === void 0
        ? void 0
        : element.getAttribute("y1");
    const x2String =
      element === null || element === void 0
        ? void 0
        : element.getAttribute("x2");
    const y2String =
      element === null || element === void 0
        ? void 0
        : element.getAttribute("y2");
    let x1;
    let y1;
    let x2;
    let y2;
    if (x1String && y1String && x2String && y2String) {
      x1 = parseFloat(x1String);
      y1 = parseFloat(y1String);
      x2 = parseFloat(x2String);
      y2 = parseFloat(y2String);
      if (
        typeof x1 === "number" &&
        typeof y1 === "number" &&
        typeof x2 === "number" &&
        typeof y2 === "number"
      ) {
        const line = SVGFactory.createLine({
          p1: new Point(x1, y1),
          p2: new Point(x2, y2),
        });
        return line;
      }
    }
    return null;
  };
  SVGLine.draw = (renderer, element) => {
    renderer.push();
    const line = element;
    renderer.stroke("white");
    renderer.strokeWeight(3);
    renderer.line(line.p1.x, line.p1.y, line.p2.x, line.p2.y);
    renderer.pop();
  };
  SVGLine.drawList = (renderer, elements) => {
    for (const element of elements) {
      SVGObject.setStyle(renderer, element.getStyle());
      if (elements.length > 0) {
        for (const ln of elements) {
          const line = ln;
          _a$3.draw(renderer, line);
        }
      }
    }
  };

  var _a$2;

  // import SVGLine from "./SVGLine";
  class SVGPath extends SVGObject {
    constructor(params) {
      super(SVGObjectType$1.PATH, params.style);
      this.lines = [];
      this.arcs = [];

      // MOVE TO FUNCTION?
      this.startPoint = null;
      this.points = [];
      this.toSVGString = () => {
        return `<path d="${this.points
          .map((point) => `${point.x},${point.y}`)
          .join(" ")}" />`;
      };
      this.toString = () => {
        return `Path with ${this.points.length} lines:\n\t${this.points}`;
      };
      if (params.lines) {
        this.lines = params.lines;
      }
      if (params.points) {
        this.points = params.points;
      }
      if (params.arcs) {
        this.arcs = params.arcs;
      }
    }
  }
  _a$2 = SVGPath;
  SVGPath.create = (params) => {
    return new _a$2(params);
  };
  SVGPath.process = (element) => {
    var _b, _c, _d;
    const instructionsAsStringList =
      ((_b =
        element === null || element === void 0
          ? void 0
          : element.getAttribute("d")) === null || _b === void 0
        ? void 0
        : _b.split(" ")) || null;
    const points = []; // don't use
    const lines = [];
    const arcs = [];
    if (instructionsAsStringList) {
      let currentPenPoint = null;
      for (let p = 0; p < instructionsAsStringList.length; p += 1) {
        let param = instructionsAsStringList[p];
        if (param && param !== "") {
          if (param.includes("M")) {
            param = param.replace("M", "");
            const nextParamStr = instructionsAsStringList[p + 1];
            if (nextParamStr && typeof nextParamStr === "string") {
              const x = parseFloat(param);
              const y = parseFloat(nextParamStr);
              if (typeof x === "number" && typeof y === "number") {
                currentPenPoint = new Point(x, y);
              }
            }
          } else if (param.includes("L")) {
            // CREATE LINE
            const lineStart = currentPenPoint;
            const lineEndXStr = param.replace("L", "");
            const lineEndYStr = instructionsAsStringList[p + 1];
            if (
              lineStart &&
              lineEndXStr &&
              lineEndYStr &&
              typeof lineEndXStr === "string" &&
              typeof lineEndYStr === "string"
            ) {
              const p2x = parseFloat(lineEndXStr);
              const p2y = parseFloat(lineEndYStr);
              if (typeof p2x === "number" && typeof p2y === "number") {
                const lineParams = {
                  style: {},
                  p1: lineStart,
                  p2: new Point(p2x, p2y),
                };
                currentPenPoint = new Point(p2x, p2y);
                lines.push(SVGLine.create(lineParams));
                p += 1;
              }
            }
          }
          if (param.includes("A") || param.includes("a")) {
            // create an arc with next 7 numbers
            const arcInstructions = instructionsAsStringList
              .slice(p, p + 7)
              .join(" ");
            const arc = SVGArc.processFromString(arcInstructions);
            if (arc) {
              arcs.push(arc);
            }
            p += 7;
          }
          if (param === "Z") {
            const lastPt =
              (_c = lines[lines.length - 1]) === null || _c === void 0
                ? void 0
                : _c.p2;
            const firstPt =
              (_d = lines[0]) === null || _d === void 0 ? void 0 : _d.p1;
            if (lastPt && firstPt) {
              const lineParams = {
                style: {},
                p1: lastPt,
                p2: firstPt,
              };
              lines.push(SVGLine.create(lineParams));
            }
          }
        }
      }
      return _a$2.create({ style: {}, points, lines, arcs });
    }
    return null;
  };
  SVGPath.processList = (doc) => {
    const pathList = [];
    if (doc) {
      const svgElementList = doc.querySelectorAll("path");
      for (const pathData of svgElementList) {
        const path = _a$2.process(pathData);
        if (path) {
          pathList.push(path);
        }
      }
    }
    return pathList;
  };
  SVGPath.drawList = (renderer, elements) => {
    if (elements.length > 0) {
      for (const path of elements) {
        _a$2.draw(renderer, path);
      }
    }
  };
  SVGPath.draw = (renderer, element) => {
    const path = element;
    if (path.lines.length > 0) {
      for (let i = 0; i < path.lines.length; i += 1) {
        const line = path.lines[i];
        if (line) {
          SVGLine.draw(renderer, line);
        }
      }
    }
    if (path.arcs.length > 0) {
      for (let i = 0; i < path.arcs.length; i += 1) {
        const arc = path.arcs[i];
        if (arc) {
          SVGArc.draw(renderer, arc);
        }
      }
    }
    renderer.pop();
  };

  class SVGRect extends SVGObject {
    constructor(params) {
      super(SVGObjectType$1.RECT, params.style);
      this.toSVGString = () => {
        return `<rect x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" />`;
      };
      this.toString = () => {
        return `Rectangle at (${this.x}, ${this.y}) with width ${this.width} and height ${this.height}`;
      };
      this.x = params.x;
      this.y = params.y;
      this.width = params.width;
      this.height = params.height;
    }
  }
  SVGRect.create = (params) => {
    return new SVGRect(params);
  };
  SVGRect.processList = (doc) => {
    const rectList = [];
    if (doc) {
      const elements = doc.getElementsByTagName("rect");
      for (let i = 0; i < elements.length; i++) {
        const rectData = elements[i];
        if (rectData) {
          const rect = SVGRect.process(rectData);
          if (rect) {
            rectList.push(rect);
          }
        }
      }
    }
    return rectList;
  };
  SVGRect.process = (element) => {
    const xString =
      (element === null || element === void 0
        ? void 0
        : element.getAttribute("x")) || "0";
    const yString =
      (element === null || element === void 0
        ? void 0
        : element.getAttribute("y")) || "0";
    const widthString =
      element === null || element === void 0
        ? void 0
        : element.getAttribute("width");
    const heightString =
      element === null || element === void 0
        ? void 0
        : element.getAttribute("height");
    let x;
    let y;
    let width;
    let height;
    if (widthString && heightString) {
      x = parseFloat(xString);
      y = parseFloat(yString);
      width = parseFloat(widthString);
      height = parseFloat(heightString);
      if (
        typeof x === "number" &&
        typeof y === "number" &&
        typeof width === "number" &&
        typeof height === "number"
      ) {
        const params = {
          x,
          y,
          width,
          height,
        };
        const rect = SVGFactory.createRect(params);
        return rect;
      }
    }
    return null;
  };
  SVGRect.drawList = (renderer, elements) => {
    for (const element of elements) {
      SVGObject.setStyle(renderer, element.getStyle());
      if (elements.length > 0) {
        for (const rect of elements) {
          SVGRect.draw(renderer, rect);

          // renderer.push();
          // renderer.beginShape();
          // renderer.rect(rect.x, rect.y, rect.width, rect.height);
          // renderer.endShape(renderer.CLOSE);
          // renderer.pop();
        }
      }
    }
  };
  SVGRect.draw = (renderer, element) => {
    renderer.push();
    const rect = element;
    renderer.rect(rect.x, rect.y, rect.width, rect.height);
    renderer.pop();
  };

  class SVGText extends SVGObject {
    constructor(params) {
      super(SVGObjectType$1.TEXT, params.style);
      this.content = "";
      this.toSVGString = () => {
        return `<text x="${this.x}" y="${this.y}">${this.content}</text>`;
      };
      this.toString = () => {
        return `Text at (${this.x}, ${this.y}) with content ${this.content}`;
      };
      this.x = params.x;
      this.y = params.y;
      this.content = params.content;
    }
  }
  SVGText.create = (params) => {
    return new SVGText(params);
  };

  class SVGFactory {}
  SVGFactory.createPolygon = (params) => {
    return new SVGPolygon(params);
  };
  SVGFactory.createCircle = (params) => {
    return new SVGCircle(params);
  };
  SVGFactory.createLine = (params) => {
    const newLine = new SVGLine(params);
    return newLine;
  };
  SVGFactory.createPath = (params) => {
    const newPath = new SVGPath(params);
    return newPath;
  };
  SVGFactory.createEllipse = (params) => {
    return new SVGEllipse(params);
  };
  SVGFactory.createArc = (params) => {
    return new SVGArc(params);
  };
  SVGFactory.createRect = (params) => {
    return new SVGRect(params);
  };
  SVGFactory.createBezierCurve = (params) => {
    return new SVGBezierCurve(params);
  };
  SVGFactory.createText = (params) => {
    return new SVGText(params);
  };
  SVGFactory.createImage = (params) => {
    return new SVGImage(params);
  };

  // converts this.points string to 2D this.ptArray of numbers
  // example input: [ "290.48,136.58", "260.63,221.47", "174.8,255.06", "230.31,331.09", "309.61,247.59", "352.99,284.91", "401.03,211.68", "", "", "360.92,142.64", ""]
  SVGFactory.pointStringListToPointObjArray = (pointsAsStringList) => {
    const ptArray = [];
    if (pointsAsStringList) {
      for (const pt of pointsAsStringList) {
        const xyArray = pt.split(",");
        if (xyArray.length > 1) {
          const [x, y] = pt.split(",");
          if (x && y) {
            if (typeof x === "string" && typeof y === "string") {
              const xNum = parseFloat(x);
              const yNum = parseFloat(y);
              if (isNaN(xNum) || isNaN(yNum)) {
                console.warn("Error: x or y is not a number");
                return [];
              }
              const ptObj = Point.from2DArray([xNum, yNum]);
              if (ptObj) ptArray.push(ptObj);
            }
          }
        }
      }
    }
    return ptArray;
  };

  var _a$1;
  class SVGPolygon extends SVGObject {
    constructor(params) {
      super(SVGObjectType$1.POLYGON, params.style);
      this.toSVGString = () => {
        return `<polygon points="${this.points
          .map((point) => `${point.x},${point.y}`)
          .join(" ")}" />`;
      };
      this.toString = () => {
        return `Polygon with ${this.points.length} points`;
      };
      this.points = params.points;
    }
  }
  _a$1 = SVGPolygon;
  SVGPolygon.create = (points) => {
    return SVGFactory.createPolygon({ points });
  };
  SVGPolygon.processList = (doc) => {
    const polygons = [];
    if (doc) {
      const svgElementList = doc.querySelectorAll("polygon");
      for (const poly of svgElementList) {
        const polygon = _a$1.process(poly);
        if (polygon) {
          polygons.push(polygon);
        }
      }
    }
    return polygons;
  };
  SVGPolygon.process = (element) => {
    var _b;
    const pointsAsStringList =
      ((_b =
        element === null || element === void 0
          ? void 0
          : element.getAttribute("points")) === null || _b === void 0
        ? void 0
        : _b.split(" ")) || null;
    let ptArray;
    if (pointsAsStringList) {
      ptArray = SVGFactory.pointStringListToPointObjArray(pointsAsStringList);
      if (ptArray) {
        const polygon = SVGFactory.createPolygon({
          points: ptArray,
        });
        return polygon;
      }
    }
    return null;
  };
  SVGPolygon.draw = (renderer, element) => {
    renderer.push();
    const polygon = element;
    const ptArray = polygon.points;
    renderer.beginShape();
    for (const pt of ptArray) {
      renderer.vertex(pt.x, pt.y);
    }
    renderer.endShape(renderer.CLOSE);
    renderer.pop();
  };
  SVGPolygon.drawList = (renderer, elements) => {
    for (const element of elements) {
      SVGObject.setStyle(renderer, element.getStyle());
      if (elements.length > 0) {
        for (const pg of elements) {
          const polygon = pg;
          _a$1.draw(renderer, polygon);
        }
      }
    }
  };

  var _a;

  // import Point from "./primitives/Point";
  // import SVGFactory from "./SVGFactory";
  // import SVGBezierCurve from "./primitives/SVGBezierCurve";
  // import SVGText from "./primitives/SVGText";
  // Root directory for loading files is dist/
  // TODO: Process Circle
  // TODO: Process Ellipse
  // TODO: Process Line
  // TODO: Process Arc
  // TODO: Process Rect
  // TODO: Process Bezier Curve
  // : Generate Shape
  // : Get Fill, Stroke, Stroke Weight
  // : Generate Polygon on screen
  // const svgDataString =
  //   '<?xml version="1.0" encoding="utf-8"?>\
  // <!-- Generator: Adobe Adobe Illustrator 24.2.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\
  // <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="792px" height="612px" viewBox="0 0 792 612" style="enable-background:new 0 0 792 612;" xml:space="preserve">\
  // <style type="text/css">\
  // 	.st0{fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;}\
  // </style>\
  // <polygon class="st0" points="290.48,136.58 260.63,221.47 174.8,255.06 230.31,331.09 309.61,247.59 352.99,284.91 401.03,211.68 \
  // 	360.92,142.64 "/>\
  // </svg>';
  class SVGLoader {
    // TODO:
    // private static bezierCurves: SVGBezierCurve[] = [];
    // private static textObjects: SVGText[] = [];
    // private static svgLinesElementList: any | any[] = [];
    constructor(p) {
      _a.p = p;
    }

    // Pulls Polygon XML data from SVG
    static processSVG(data) {
      var _b;
      const svgString =
        data === null || data === void 0 ? void 0 : data.join("\n");
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgString, "image/svg+xml");

      // Get class from polygon, lines, circles
      // const svgElementClass =
      (_b = this.svgPolygonElementList[0]) === null || _b === void 0
        ? void 0
        : _b.getAttribute("class");
      doc.querySelectorAll("style");

      // TODO: Save in style list with class name
      // const svgClassData = poly.getAttribute("class");
      // const svgStyle = this.proscessSVGStyle(svgStyleData);
      this.polygons.push(...SVGPolygon.processList(doc));
      this.lines.push(...SVGLine.processList(doc));
      this.circles.push(...SVGCircle.processList(doc));
      this.rects.push(...SVGRect.processList(doc));
      this.paths.push(...SVGPath.processList(doc));
      this.ellipses.push(...SVGEllipse.processList(doc));
      this.images.push(...SVGImage.processList(doc, this.p));
    }
  }
  _a = SVGLoader;
  SVGLoader.styles = [];
  SVGLoader.polygons = [];
  SVGLoader.lines = [];
  SVGLoader.circles = [];
  SVGLoader.rects = [];
  SVGLoader.ellipses = [];
  SVGLoader.arcs = [];
  SVGLoader.paths = [];
  SVGLoader.images = [];
  SVGLoader.svgPolygonElementList = [];
  SVGLoader.getStyleByName = (name) => {
    for (const style of _a.styles) {
      if (style.name === name) {
        return style;
      }
    }
    return null;
  };

  // callback after loadStrings -- process all XML from SVG
  SVGLoader.handleSvgData = (data) => {
    _a.processSVG(data); // populates this.polygons (Raw SVG Elements)
  };

  // called from PRELOAD
  SVGLoader.loadSVG = (filename = null) => {
    if (filename) {
      _a.p.loadStrings(
        filename,
        (data) => _a.handleSvgData(data), // callback
      );
    }
  };
  SVGLoader.processSVGStyle = (
    svgStyleData,
    // svgStyleName: string,
    // svgStyleData: string
  ) => {
    var _b, _c, _d, _e;
    const style = {};
    if (svgStyleData.length > 0) {
      // TODO: match style name to polygon class
      let styleName =
        ((_c =
          (_b = svgStyleData[0]) === null || _b === void 0
            ? void 0
            : _b.innerHTML) === null || _c === void 0
          ? void 0
          : _c.split("{")[0]) || ""; // .st0
      styleName = styleName.replace(/[\t\n\r]/gm, "");
      const styleAttributesString =
        ((_e =
          (_d = svgStyleData[0]) === null || _d === void 0
            ? void 0
            : _d.innerHTML) === null || _e === void 0
          ? void 0
          : _e.split("{")[1]) || ""; // fill: #FFFFFF; stroke: #000000; stroke-miterlimit: 10;
      style.name = styleName;
      const styleAttributes = styleAttributesString.split(";");
      if (styleAttributes && styleAttributes.length > 0) {
        for (const attr of styleAttributes) {
          const [key, value] = attr.split(":");
          if (key === "fill") {
            if (value) {
              style.fillColor = value;
            }
          } else if (key === "stroke") {
            if (value) {
              style.strokeColor = value;
            }
          } else if (key === "stroke-width") {
            if (value) {
              style.strokeWeight = parseFloat(value);
            }
          }
        }
      }
    }
    return style;
  };
  SVGLoader.drawAll = () => {
    SVGPolygon.drawList(_a.p, _a.polygons);
    SVGLine.drawList(_a.p, _a.lines);
    SVGCircle.drawList(_a.p, _a.circles);
    SVGRect.drawList(_a.p, _a.rects);
    SVGPath.drawList(_a.p, _a.paths);
    SVGEllipse.drawList(_a.p, _a.ellipses);
    SVGImage.drawList(_a.p, _a.images);
    SVGArc.drawList(_a.p, _a.arcs);
  };
  SVGLoader.registerRenderer = (p) => {
    _a.p = p;
  };

  var __awaiter =
    (undefined && undefined.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P
          ? value
          : new P(function (resolve) {
              resolve(value);
            });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done
            ? resolve(result.value)
            : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
  let font;
  let gameController;
  const preload = (p) =>
    __awaiter(void 0, void 0, void 0, function* () {
      font = yield p.loadFont("./font/hyperspace-font/HyperspaceBold-GM0g.ttf");
      SVGLoader.registerRenderer(p);
    });

  // Disable default browser behavior-- scrolling with arrow keys
  // Source - https://stackoverflow.com/a/8916697
  // Posted by Zeta, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-02-12, License - CC BY-SA 4.0
  window.addEventListener(
    "keydown",
    function (e) {
      if (
        ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
          e.code,
        ) > -1
      ) {
        e.preventDefault();
      }
    },
    false,
  );
  const keyPressed = (p) => {
    if (p.keyCode === 72 || p.keyCode === 104) {
      gameController.hyperspace();
    }
  };

  /** This is a setup function. */
  const setup = (p) => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    gameController = GameController.createInstance(p, font);
  };

  const draw = (p) => {
    p.background(10);
    gameController.advance();
    SVGLoader.drawAll();
  };

  const sketch = createSketch({
    preload,
    setup,
    draw,
    keyPressed,
  });
  new p5(sketch);
})(p5);
