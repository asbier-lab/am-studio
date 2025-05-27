import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const CellSketch = ({ cellImageSrc }) => {
  const sketchRef = useRef(null);
  const myP5 = useRef(null);

  useEffect(() => {
    if (myP5.current) return;

    const Sketch = (p) => {
      let cells = [];
      let cellImage = null;
      let isMobileDevice = false; // Flag, um mobile Geräte zu erkennen

      // Variablen für das Ziehen von Zellen auf Mobilgeräten
      let draggingCell = null;
      let offsetX, offsetY;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(sketchRef.current);
        p.noStroke();
        p.noCursor();

        // Überprüfe die Bildschirmbreite, um festzustellen, ob es sich um ein mobiles Gerät handelt
        if (p.windowWidth <= 768) { // Verwende 768px als gängigen Breakpoint für Mobilgeräte
          isMobileDevice = true;
        }

        p.loadImage(cellImageSrc, (img) => {
          cellImage = img;

          // Erstelle die initialen Zellen
          for (let i = 0; i < 6; i++) {
            cells.push(new Cell(p.random(p.width), p.random(p.height)));
          }
        });
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        // Aktualisiere das Mobile-Geräte-Flag bei Größenänderung
        isMobileDevice = p.windowWidth <= 768;
      };

      p.draw = () => {
        if (!cellImage) return;

        p.clear();

        // Zeichne Hintergrundlinien (Rauschen)
        p.push();
        p.stroke(220, 220, 220, 15); // Weniger deckend
        for (let i = 0; i < 400; i++) { // Weniger Linien
          const x = p.random(p.width);
          const y = p.random(p.height);
          const length = p.random(3, 8); // Kürzere Linien
          const angle = p.random(p.TWO_PI);
          p.push();
          p.translate(x, y);
          p.rotate(angle);
          p.line(0, 0, length, 0);
          p.pop();
        }
        p.pop();

        // Zeichne Zellen
        for (let cell of cells) {
          cell.update();
          cell.display(cellImage);
        }
      };

      p.mousePressed = () => {
        if (!cellImage) return;

        // Füge nur neue Zellen hinzu, wenn es sich NICHT um ein mobiles Gerät handelt
        // p.touches.length === 0 stellt sicher, dass es ein Mausklick ist, nicht eine Berührung
        if (!isMobileDevice && p.touches.length === 0) {
          for (let i = 0; i < 3; i++) {
            cells.push(new Cell(p.mouseX + p.random(-20, 20), p.mouseY + p.random(-20, 20)));
          }
        }
      };

      // Touch-Event-Handler für mobiles Ziehen
      p.touchStarted = () => {
        if (!isMobileDevice || !cellImage) return; // Nur für Mobilgeräte

        // Überprüfe, ob eine Zelle berührt wurde
        for (let cell of cells) {
          let d = p.dist(cell.x, cell.y, p.touchX, p.touchY);
          if (d < cell.size / 2) { // Berührung innerhalb der Zelle
            draggingCell = cell;
            offsetX = cell.x - p.touchX;
            offsetY = cell.y - p.touchY;
            break; // Nur eine Zelle gleichzeitig ziehen
          }
        }
        // Verhindere Standard-Browserverhalten (z.B. Scrollen), wenn eine Zelle gezogen wird
        if (draggingCell) {
          return false;
        }
      };

      p.touchMoved = () => {
        if (!isMobileDevice || !draggingCell) return; // Nur für Mobilgeräte und wenn eine Zelle gezogen wird
        draggingCell.x = p.touchX + offsetX;
        draggingCell.y = p.touchY + offsetY;
        return false; // Verhindere Standard-Browserverhalten (z.B. Scrollen)
      };

      p.touchEnded = () => {
        if (!isMobileDevice) return; // Nur für Mobilgeräte
        draggingCell = null; // Ziehvorgang beenden
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
          // Bewegung mit Bounce-Effekt
          this.x += this.driftX;
          this.y += this.driftY;
          this.rotation += this.rotSpeed;

          // Bounce am rechten und linken Rand
          if (this.x + this.size / 2 > p.width) {
            this.x = p.width - this.size / 2;
            this.driftX *= -1;
          } else if (this.x - this.size / 2 < 0) {
            this.x = this.size / 2;
            this.driftX *= -1;
          }

          // Bounce am oberen und unteren Rand
          if (this.y + this.size / 2 > p.height) {
            this.y = p.height - this.size / 2;
            this.driftY *= -1;
          } else if (this.y - this.size / 2 < 0) {
            this.y = this.size / 2;
            this.driftY *= -1;
          }

          // Maus-/Touch-Interaktion (Abstoßung)
          // Verwende p.mouseX/Y für Desktop, p.touchX/Y für Mobile, wenn keine Zelle gezogen wird
          let interactionX = p.mouseX;
          let interactionY = p.mouseY;

          // Wenn auf Mobilgerät und keine Zelle gezogen wird, verwende Touch-Koordinaten für die Abstoßung
          if (isMobileDevice && !draggingCell) {
            if (p.touches.length > 0) {
                interactionX = p.touches[0].x;
                interactionY = p.touches[0].y;
            } else {
                // Keine Berührung erkannt, verwende MausX/Y als Fallback (z.B. wenn eine Maus an ein Mobilgerät angeschlossen ist)
                interactionX = p.mouseX;
                interactionY = p.mouseY;
            }
          }

          let d = p.dist(this.x, this.y, interactionX, interactionY);
          if (d < 100) { // Wenn innerhalb des Abstoßungsbereichs
            let angle = p.atan2(this.y - interactionY, this.x - interactionX);
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
  }, [cellImageSrc]);

  return <div ref={sketchRef} className="sketch-container" />;
};

export default CellSketch;
