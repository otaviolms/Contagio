function People(estado, size) {
    this.pos = createVector(random(0, width), random(0, height))
    this.vel = createVector()
    this.acc = createVector()
    this.estado = estado
    this.size = size
    this.sizeContagio
    this.timeUltimoContagio
    this.timeContagio

    this.applyForce = function (force) {
        this.acc.add(force);
    }

    this.update = function () {
        let limit
        if(people.estado == 2){
            limit = 0.05
        } else {
            limit = 0.08
        }
        
        // if (this.pos.x + (this.size / 2) > width/2) {
        //     this.pos.x = 0 + (this.size / 2)
        // } else if (this.pos.x - (this.size / 2) <= 0) {
        //     this.pos.x = width/2 - (this.size / 2)
        // }
        
        // if (this.pos.y + (this.size / 2) > height) {
        //     this.pos.y = 0 + (this.size / 2)
        // } else if (this.pos.y - (this.size / 2) <= 0) {
        //     this.pos.y = height - (this.size / 2)
        // }
        let dirX = limit
        let dirY = limit

        if (this.pos.x + (this.size / 2) > width/2) {
            this.pos.x = width/2 - (this.size / 2)
            dirX = limit
        } else if (this.pos.x - (this.size / 2) <= 0) {
            this.pos.x = 0 + (this.size / 2)
            dirX = -limit
        }
        
        if (this.pos.y + (this.size / 2) > height) {
            this.pos.y = height - (this.size / 2)
            dirY = limit
        } else if (this.pos.y - (this.size / 2) <= 0) {
            this.pos.y = 0 + (this.size / 2)
            dirY = -limit
        }
        
        this.applyForce(createVector(random(-dirX, dirX), random(-dirY, dirY)));
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.vel.limit(1);

        if(millis() > this.timeContagio + tempoTotalDoenca){
            this.estado = 3
        }
        
    }

    this.show = function () {
        switch(this.estado){
            case 2:
                stroke(color('#c0392b'))
                noFill()
                this.sizeContagio = (sin(millis() * 0.005) * 5) + tamanhoContagio
                ellipse(this.pos.x, this.pos.y, this.sizeContagio);
                fill(color('#e74c3c'));
                break
            default:
            case 1:
                stroke(color('#bdc3c7'))
                fill(color('#ecf0f1'));
                break
            case 3:
                stroke(color('#7f8c8d'))
                fill(color('#95a5a6'));
                break
        }
        
        ellipse(this.pos.x, this.pos.y, this.size);
    }

    this.contaminar = function () {
        if(millis() > this.timeUltimoContagio + delayContagio){
            let fatorContaminacao = random()
            console.log('Fator contaminação: ' + fatorContaminacao + ' | Chances: ' + chancesContagio)
            if(fatorContaminacao <= chancesContagio){
                this.definirDoente()
            }
        } else {
            this.timeUltimoContagio = millis()
        }
    }

    this.definirDoente = function () {
        this.timeContagio = millis()
        this.estado = 2;
    }
    
    this.checkContagio = function(){
        for(let people of peoples){
            let d = dist(this.pos.x, this.pos.y, people.pos.x, people.pos.y);
            if ((people.estado == 1) && d < (this.sizeContagio / 2) + this.size) {
                people.contaminar()
            }
        }
    }
}
