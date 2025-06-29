const canvas = document.getElementById('canvas1') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

interface MouseData {
  radius: number;
  x?: number;
  y?: number;
}

class Particle {
  effect: Effect;
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  size: number;
  vx: number;
  vy: number;
  ease: number;
  friction: number;
  dx: number;
  dy: number;
  distance: number;
  force: number;
  angle: number;

  constructor(effect: Effect, x: number, y: number, color: string) {
    this.effect = effect;
    this.x = Math.random() * this.effect.width;
    this.y = 0;
    this.originX = Math.floor(x);
    this.originY = Math.floor(y);
    this.color = color;
    this.size = this.effect.gap;
    this.vx = 0;
    this.vy = 0;
    this.ease = 0.3;
    this.friction = 0.98;
    this.dx = 0;
    this.dy = 0;
    this.distance = 0;
    this.force = 0;
    this.angle = 0;
  }

  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.size, this.size);
  }

  update(): void {
    this.dx = (this.effect.mouse.x ?? 0) - this.x;
    this.dy = (this.effect.mouse.y ?? 0) - this.y;
    this.distance = this.dx * this.dx + this.dy * this.dy;
    this.force = -this.effect.mouse.radius / this.distance;

    if (this.distance < this.effect.mouse.radius) {
      this.angle = Math.atan2(this.dy, this.dx);
      this.vx += this.force * Math.cos(this.angle);
      this.vy += this.force * Math.sin(this.angle);
    }

    this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
    this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
  }

  warp(): void {
    this.x = Math.random() * this.effect.width;
    this.y = Math.random() * this.effect.height;
    this.vx = 0;
    this.vy = 0;
    this.ease = 0.4;
  }
}

class Effect {
  width: number;
  height: number;
  particleArray: Particle[];
  image: HTMLImageElement;
  centerX: number;
  centerY: number;
  x: number;
  y: number;
  gap: number;
  mouse: MouseData;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.particleArray = [];
    this.image = document.getElementById('imagen1') as HTMLImageElement;
    this.centerX = this.width * 0.5;
    this.centerY = this.height * 0.5;
    this.x = this.centerX - this.image.width * 0.5;
    this.y = this.centerY - this.image.height * 0.5;
    this.gap = 2;
    this.mouse = {
      radius: 3000,
      x: undefined,
      y: undefined,
    };

    window.addEventListener('mousemove', (event: MouseEvent) => {
      this.mouse.x = event.x;
      this.mouse.y = event.y;
    });
  }

  init(context: CanvasRenderingContext2D): void {
    context.drawImage(this.image, this.x, this.y);
    const pixels = context.getImageData(0, 0, this.width, this.height).data;

    for (let y = 0; y < this.height; y += this.gap) {
      for (let x = 0; x < this.width; x += this.gap) {
        const index = (y * this.width + x) * 4;
        const red = pixels[index];
        const green = pixels[index + 1];
        const blue = pixels[index + 2];
        const alpha = pixels[index + 3];
        const color = `rgb(${red},${green},${blue})`;

        if (alpha > 0) {
          this.particleArray.push(new Particle(this, x, y, color));
        }
      }
    }
  }

  draw(context: CanvasRenderingContext2D): void {
    this.particleArray.forEach((particle) => particle.draw(context));
  }

  update(): void {
    this.particleArray.forEach((particle) => particle.update());
  }

  warp(): void {
    this.particleArray.forEach((particle) => particle.warp());
  }
}

const effect = new Effect(canvas.width, canvas.height);
effect.init(ctx);

function animate(): void {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.draw(ctx);
  effect.update();
  requestAnimationFrame(animate);
}

animate();

const warpButton = document.getElementById('warpButton') as HTMLButtonElement;
warpButton.addEventListener('click', () => {
  effect.warp();
});
