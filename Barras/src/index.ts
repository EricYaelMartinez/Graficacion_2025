import { CanvasLocal } from './canvasLocal.js';

let canvas: HTMLCanvasElement;
let graphics: CanvasRenderingContext2D;

canvas = <HTMLCanvasElement>document.getElementById('circlechart');
graphics = canvas.getContext('2d');

const miCanvas:CanvasLocal = new CanvasLocal(graphics, canvas);

const h = [27, 50, 75, 10, 14, 70, 90];
const eti = ['Matemáticas', 'Física', 'Computación', 'Ecología', 'Odontología', 'Derecho', 'Arquitectura'];
const colors = ['#6fd635', 'blue', 'green', '#f76d3a', 'red', '#08bf98', '#d4de0b'];

function redibujar() {
    console.log('Redibujando...', h, eti, colors);
  graphics.clearRect(0, 0, canvas.width, canvas.height);
  miCanvas.paint(h, eti, colors);
}

document.getElementById('agregar')?.addEventListener('click', () => {
    event.preventDefault();
  const etiquetaInput = document.getElementById('etiqueta') as HTMLInputElement;
  const valorInput = document.getElementById('valor') as HTMLInputElement;
  const colorInput = document.getElementById('color') as HTMLInputElement;

  const nuevaEtiqueta = etiquetaInput.value;
  const nuevoValor = parseFloat(valorInput.value);
  const nuevoColor = colorInput.value;

  if (nuevaEtiqueta && !isNaN(nuevoValor)) {
    eti.push(nuevaEtiqueta);
    h.push(nuevoValor);
    colors.push(nuevoColor);
    redibujar();
  }
});

document.getElementById('eliminar')?.addEventListener('click', () => {
  if (eti.length > 0) {
    eti.pop();
    h.pop();
    colors.pop();
    redibujar();
  }
});

// Dibujo inicial
redibujar();