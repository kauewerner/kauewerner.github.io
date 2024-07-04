class LetterElement {
    constructor(letter,position,color,fillColor){
        this.letter = letter;
        this.position = position;
        this.color = color;
        this.fillColor = fillColor;
        this.fontSize = fontSize;
        this.initialPosition = {
            x: position.x,
            y: position.y
        };
        this.currentPosition = position;
        this.frequency = {
            x: 10*Math.random(),
            y: 10*Math.random()
        };
        this.phase = {
            x: 2*PI*Math.random(),
            y: 2*PI*Math.random()
        };
        this.delta = {
            x: 1*Math.random(),
            y: 1*Math.random()
        };
        this.drawElement();
    }

    drawElement(){
        fill(this.fillColor);
        stroke(this.color);
        line(this.initialPosition.x,this.initialPosition.y,
            this.position.x,this.position.y);
        rect(this.position.x - this.fontSize/2,this.position.y - this.fontSize/2,this.fontSize);
        textAlign(CENTER);
        noStroke();
        fill(this.color);
        text(this.letter,this.position.x,this.position.y + fontSize*0.3);
    }

    updateRandomFluctuation(t){
        this.position.x = this.currentPosition.x + 
            this.delta.x*Math.sin(2*PI*this.frequency.x*t + this.phase.x
            );
        this.position.y = this.currentPosition.y + 
            this.delta.y*Math.sin(2*PI*this.frequency.y*t + this.phase.y
            );
        this.drawElement();
    }

    updateCurrentPosition(newPosition,dx,dy,color){
        let distance = {
            x: this.currentPosition.x - newPosition.x,
            y: this.currentPosition.y - newPosition.y
        };
        this.color = color;

        if(Math.abs(distance.x) > fontSize){
            if(distance.x < 0){
                this.currentPosition.x += dx;
            } else {
                this.currentPosition.x -= dx;
            }
        }

        if(Math.abs(distance.y) > fontSize){
            if(distance.y < 0){
                this.currentPosition.y += dy;
            } else {
                this.currentPosition.y -= dy;
            }
        }
    }
    
}