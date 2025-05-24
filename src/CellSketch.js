import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import flower_c from './assets/flower_c.gif';

const CellSketch = () => {
  const sketchRef = useRef(null);
  const myP5 = useRef(null);

  useEffect(() => {
    if (myP5.current) return;

    const Sketch = (p) => {
      let cells = [];
      let cellImage = null;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(sketchRef.current);
        p.noStroke();
        p.noCursor();  // <--- Hier native Maus ausblenden!


        p.loadImage(flower_c, (img) => {
          cellImage = img;

          for (let i = 0; i < 20; i++) {
            cells.push(new Cell(p.random(p.width), p.random(p.height)));
          }
        });
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };

      p.draw = () => {
  if (!cellImage) return;

  p.clear();

  for (let cell of cells) {
    cell.update();
    cell.display(cellImage);
  }

p.push();
p.stroke(220, 220, 220, 15); // weniger deckend
for (let i = 0; i < 400; i++) { // weniger Linien
  const x = p.random(p.width);
  const y = p.random(p.height);
  const length = p.random(3, 8); // kürzere Linien
  const angle = p.random(p.TWO_PI);
  p.push();
  p.translate(x, y);
  p.rotate(angle);
  p.line(0, 0, length, 0);
  p.pop();
}
p.pop();


  // Hier nochmal Zellen zeichnen (übermalt Rauschen)
  for (let cell of cells) {
    cell.update();
    cell.display(cellImage);
  }
 

        for (let cell of cells) {
          cell.update();
          cell.display(cellImage);
        }
      };

      p.mousePressed = () => {
        if (!cellImage) return;
        for (let i = 0; i < 3; i++) {
          cells.push(new Cell(p.mouseX + p.random(-20, 20), p.mouseY + p.random(-20, 20)));
        }
      };

      class Cell {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.size = p.random(40, 80);
          this.driftX = p.random(-0.3, 0.3);
          this.driftY = p.random(-0.3, 0.3);
          this.rotation = p.random(p.TWO_PI);
          this.rotSpeed = p.random(-0.01, 0.01);
        }

        update() {
          this.x += this.driftX;
          this.y += this.driftY;
          this.rotation += this.rotSpeed;

          let d = p.dist(this.x, this.y, p.mouseX, p.mouseY);
          if (d < 100) {
            let angle = p.atan2(this.y - p.mouseY, this.x - p.mouseX);
            this.x += p.cos(angle) * 0.6;
            this.y += p.sin(angle) * 0.6;
          }
        }

        display(img) {
          p.push();
          p.translate(this.x, this.y);
          p.rotate(this.rotation);
          p.imageMode(p.CENTER);
          p.image(img, 0, 0, this.size, this.size);
          p.pop();
        }
      }
    };

    myP5.current = new p5(Sketch);

    return () => {
      if (myP5.current) {
        myP5.current.remove();
        myP5.current = null;
      }
    };
  }, []);

  return <div ref={sketchRef} className="sketch-container" />;
};

export default CellSketch;
