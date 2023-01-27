var objectDetect;
var confirma = false;
var objeto = [];
var somAlarme;


function preload() {
    somAlarme = loadSound("alarme.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO, 400, 400)
    video.center()
    video.hide()
}

function iniciar() {
    objectDetect = ml5.objectDetector("cocossd", modelload)
}

function modelload() {
    
    console.log("model load!")
    confirma = true
}

function gotpose(error, result) {
    if (error) {
        console.log("não foi identificado nada")
    } else {
        console.log(result);
        objeto = result
    }
}

function draw() {
    image(video, 0, 0, 600, 500)

    if (confirma == true) {


        var randowNumeberRed = random(0, 255)
        var randowNumeberGreen = random(0, 255)
        var randowNumeberBlue = random(0, 255)

        objectDetect.detect(video, gotpose)
        for (i = 0; i < objeto.length; i++) {

            if ("person" == objeto[i].label) {

                document.getElementById("bebeEncontrado").innerHTML = "Status: Detectou Bebê"
                somAlarme.stop()
            }else if("person" != objeto[i].label) {
                somAlarme.play()
                document.getElementById("bebeEncontrado").innerHTML = "Status: Não Detectou Bebê"
            }
            if(0>objeto) {
                document.getElementById("bebeEncontrado").innerHTML = "Status: Não Detectou Bebê"
                somAlarme.play()
            }

            fill(randowNumeberRed, randowNumeberGreen, randowNumeberBlue)
            percent = floor(objeto[i].confidence * 100)
            text(objeto[i].label + " " + percent + "%", objeto[i].x, objeto[i].y)

            noFill()
            stroke(randowNumeberRed, randowNumeberGreen, randowNumeberBlue)
            rect(objeto[i].x, objeto[i].y, objeto[i].width, objeto[i].height)


        }
        console.log(objeto)
    }


  


}