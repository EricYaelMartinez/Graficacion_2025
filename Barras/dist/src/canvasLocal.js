export class CanvasLocal {
    constructor(g, canvas) {
        this.rWidth = 10; // si hay mas barras, necesitas mas ancho logico
        this.rHeight = 8; //
        this.canvas = canvas;
        this.graphics = g;
        //this.rWidth = 12;
        //this.rHeight= 8;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.pixelSize = 1; //Calcula el tamaño el pixel Logico
        this.centerX = 0;
        this.centerY = 0;
    }
    setEscalaSegunBarras(numBarras) {
        this.rWidth = numBarras * 2 + 4;
        //this.maxX = this.canvas.width - 1;
        //this.maxY = this.canvas.height -1;
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
        this.centerX = this.maxX * 0.1;
        this.centerY = this.maxY * 0.875;
    }
    iX(x) { return Math.round(this.centerX + x / this.pixelSize); } //Convierte una cordenada logica X a coordenada deixeles 
    iY(y) { return Math.round(this.centerY - y / this.pixelSize); } //Convierte una cordenada Y a coordenada de pixeles(Eje invertido) 
    drawLine(x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.closePath();
        this.graphics.stroke();
    }
    drawRmboide(x1, y1, x2, y2, x3, y3, x4, y4, color) {
        // Color de relleno
        this.graphics.fillStyle = color;
        // Comenzamos la ruta de dibujo, o path
        this.graphics.beginPath();
        // Mover a la esquina superior izquierda
        this.graphics.moveTo(x1, y1);
        // Dibujar la línea hacia la derecha
        this.graphics.lineTo(x2, y2);
        // Ahora la que va hacia abajo
        this.graphics.lineTo(x3, y3); // A 80 porque esa es la altura
        // La que va hacia la izquierda
        this.graphics.lineTo(x4, y4);
        // Y dejamos que la última línea la dibuje JS
        this.graphics.closePath();
        // Hacemos que se dibuje
        this.graphics.stroke();
        // Lo rellenamos
        this.graphics.fill();
    }
    fx(x) {
        return Math.sin(x * 2.5);
    }
    maxH(h) {
        let max = h[0];
        for (let i = 1; i < h.length; i++) {
            if (max < h[i])
                max = h[i];
        }
        let res;
        let pot = 10;
        //se calcula la potencia de 10 mayor al max para redondear el maximo de la grafica.
        while (pot < max) {
            pot *= 10;
        }
        pot /= 10;
        res = Math.ceil(max / pot) * pot;
        return res;
    }
    barra(x, y, alt) {
        this.drawLine(this.iX(x), this.iY(0), this.iX(x - 0.5), this.iY(0.5));
        this.drawLine(this.iX(x - 0.5), this.iY(0.5), this.iX(x - 0.5), this.iY(y + alt));
        this.drawLine(this.iX(x - 0.5), this.iY(y + alt), this.iX(x), this.iY(y + alt - 0.5));
        this.drawLine(this.iX(x), this.iY(y + alt - 0.5), this.iX(x + 0.5), this.iY(y + alt));
        this.drawLine(this.iX(x + 0.5), this.iY(y + alt), this.iX(x + 0.5), this.iY(0.5));
        this.drawLine(this.iX(x + 0.5), this.iY(0.5), this.iX(x), this.iY(0));
        this.drawLine(this.iX(x), this.iY(0), this.iX(x), this.iY(y + alt - 0.5));
        this.graphics.strokeStyle = 'gray';
        this.drawLine(this.iX(x - 0.5), this.iY(y + alt), this.iX(x - 0.5), this.iY(this.rHeight - 2));
        this.drawLine(this.iX(x), this.iY(y + alt - 0.5), this.iX(x), this.iY(this.rHeight - 2.5));
        this.drawLine(this.iX(x + 0.5), this.iY(y + alt), this.iX(x + 0.5), this.iY(this.rHeight - 2));
        this.drawLine(this.iX(x - 0.5), this.iY(this.rHeight - 2), this.iX(x), this.iY(this.rHeight - 1.5));
        this.drawLine(this.iX(x + 0.5), this.iY(this.rHeight - 2), this.iX(x), this.iY(this.rHeight - 1.5));
        this.drawLine(this.iX(x - 0.5), this.iY(this.rHeight - 2), this.iX(x), this.iY(this.rHeight - 2.5));
        this.drawLine(this.iX(x + 0.5), this.iY(this.rHeight - 2), this.iX(x), this.iY(this.rHeight - 2.5));
        this.graphics.strokeStyle = 'black';
    }
    paint(h, eti, colors) {
        //let h: number[] = [27,50,75,10,14,70, 90];
        //let eti: string[] = ['matematicas', 'fisica', 'Computacion', 'Ecologia', 'Odontologia', 'Derecho', 'Arquitectura'];
        //let colors: string[]= ['#6fd635', 'blue', 'green', '#f76d3a', 'red', '#08bf98', '#d4de0b'];
        this.setEscalaSegunBarras(h.length);
        const maxEsc = this.maxH(h);
        // Líneas horizontales del eje Y
        for (let i = 0; i <= 4; i++) {
            const y = 6 * i / 4;
            this.graphics.strokeStyle = 'gray';
            this.drawLine(this.iX(0.5), this.iY(y), this.iX(h.length * 2), this.iY(y));
            this.graphics.strokeStyle = 'black';
            this.graphics.strokeText((maxEsc * i / 4).toFixed(0), this.iX(-0.5), this.iY(y));
        }
        // Barras
        for (let i = 0; i < h.length; i++) {
            const x = i * 2 + 0.5;
            const altura = 6 * h[i] / maxEsc;
            this.graphics.strokeStyle = 'black';
            this.graphics.fillStyle = colors[i];
            // Parte frontal
            this.graphics.fillRect(this.iX(x), this.iY(altura), this.iX(1) - this.iX(0), this.iY(0) - this.iY(altura));
            // Parte superior (romboide)
            this.drawRmboide(this.iX(x), this.iY(altura), this.iX(x + 1), this.iY(altura), this.iX(x + 1.3), this.iY(altura + 0.2), this.iX(x + 0.3), this.iY(altura + 0.2), colors[i]);
            // Parte lateral
            this.drawRmboide(this.iX(x + 1), this.iY(altura), this.iX(x + 1.3), this.iY(altura + 0.2), this.iX(x + 1.3), this.iY(0.2), this.iX(x + 1), this.iY(0), colors[i]);
            // Etiqueta debajo de la barra
            this.graphics.fillStyle = 'black';
            this.graphics.strokeText(eti[i], this.iX(x), this.iY(-0.5));
        }
        const leyendaInicoY = 5;
        const saltoLeyenda = 0.8;
        for (let y = 0; y < h.length; y++) {
            const posY = leyendaInicoY - y * saltoLeyenda;
            this.graphics.fillStyle = colors[y];
            this.graphics.fillRect(this.iX(h.length * 2 + 0.5), this.iY(posY), 10, 10);
            this.graphics.fillStyle = 'black';
            this.graphics.strokeText(eti[y], this.iX(h.length * 2 + 1), this.iY(posY - 0.1));
        }
    }
}
