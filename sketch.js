var qtdPeople = 500
var peoples = []
var proporcao = 1
var velocidade = 1
var tamanho = 4
var widthCanvas = 600
var heightCanvas = 300
var chancesContagio = 1
var delayContagio = 200
var tamanhoContagio = 20
var tempoTotalDoenca = 10000

var peoplesSaudaveis = 0
var peoplesContaminadas = 0
var peoplesNaoContaminaveis = 0

var historico = []

function setup() {
    // createCanvas(window.innerWidth / proporcao, window.innerHeight / proporcao);
    // createCanvas(window.innerWidth, window.innerHeight);
    createCanvas(widthCanvas, heightCanvas);

    for(let i = 0; i < qtdPeople; i++){
        peoples[i] = new People(1, tamanho, velocidade)
        if(i == 0)
            peoples[i].definirDoente()
    }
}

function draw() {
    background(color('#34495e'));
    // background(200, 100, 100);
    
    for(people of peoples){
        if(people.estado == 2){
            people.checkContagio()
        }
        people.update()
        people.show()
    }
    
    push()
    strokeWeight(2)
    fill(color('#95a5a6'))
    noStroke()
    rect(300, 0, 300, 300)
    stroke(color('#ecf0f1'))
    contarEstados()
    desenharGrafico()
    line(300, 0, 300, 300)
    pop()

}

function contarEstados(){
    peoplesSaudaveis = 0
    peoplesContaminadas = 0
    peoplesNaoContaminaveis = 0
    for(people of peoples){
        switch(people.estado){
            case 1:
            default:
                peoplesSaudaveis++
                break
            case 2:
                peoplesContaminadas++
                break
            case 3:
                peoplesNaoContaminaveis++
                break
        }
    }
    historico.push({
        'peoplesSaudaveis' : peoplesSaudaveis,
        'peoplesContaminadas' : peoplesContaminadas,
        'peoplesNaoContaminaveis' : peoplesNaoContaminaveis
    })
}

function desenharGrafico(){
    push()
    let timeTotal = 20000
    let timeGraph = millis() % timeTotal
    // let posX = map(timeGraph, 0, timeTotal, 300, 600)
    noStroke()
    beginShape();
    fill(color('#ecf0f1'))
    vertex(300, 0)
    for(frame in historico){
        let posX = map(frame, 0, historico.length, 300, 600)
        let posYGrupo1 = map(historico[frame].peoplesSaudaveis, 0, peoples.length, 0, 300)
        vertex(posX, posYGrupo1)
    }
    vertex(600, 0)
    endShape(CLOSE);
    
    beginShape();
    fill(color('#e74c3c'))
    vertex(300, 300)
    for(frame in historico){
        let posX = map(frame, 0, historico.length, 300, 600)
        let posYGrupo1 = map(historico[frame].peoplesContaminadas, 0, peoples.length, 300, 0)
        vertex(posX, posYGrupo1)
    }
    vertex(600, 300)
    endShape(CLOSE);

    // beginShape();
    // fill(color('#bdc3c7'))
    // vertex(300, 0)
    // for(frame in historico){
    //     let posX = map(frame, 0, historico.length, 300, 600)
    //     let posYGrupo1 = map(historico[frame].peoplesContaminadas, 0, peoples.length, 0, 300)
    //     vertex(posX, posYGrupo1)
    // }
    // vertex(600, 0)
    // endShape(CLOSE);
    // rect(posX, posYGrupo1, 10, 10);

    pop()
}


// function windowResized() {
//     // background(255, 255, 255);
//     resizeCanvas(windowWidth, windowHeight);
// }