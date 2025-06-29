var _a, _b;
import { CanvasLocal } from './canvasLocal.js';
let canvas;
let graphics;
canvas = document.getElementById('circlechart');
graphics = canvas.getContext('2d');
const miCanvas = new CanvasLocal(graphics, canvas);
const h = [27, 50, 75, 10, 14, 70, 90];
const eti = ['Matemáticas', 'Física', 'Computación', 'Ecología', 'Odontología', 'Derecho', 'Arquitectura'];
const colors = ['#6fd635', 'blue', 'green', '#f76d3a', 'red', '#08bf98', '#d4de0b'];
function redibujar() {
    console.log('Redibujando...', h, eti, colors);
    graphics.clearRect(0, 0, canvas.width, canvas.height);
    miCanvas.paint(h, eti, colors);
}
(_a = document.getElementById('agregar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    event.preventDefault();
    const etiquetaInput = document.getElementById('etiqueta');
    const valorInput = document.getElementById('valor');
    const colorInput = document.getElementById('color');
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
(_b = document.getElementById('eliminar')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
    if (eti.length > 0) {
        eti.pop();
        h.pop();
        colors.pop();
        redibujar();
    }
});
// Dibujo inicial
redibujar();
