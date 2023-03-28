audio = "";
status = "";
objects = "";



function setup(){
    canvas = createCanvas(500,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500,400);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML = "Detecting objects";

}
function modelLoaded(){
    console.log("model is successfully loaded and ready to use");
    status = true;
    objectDetector.detect(video,gotResults);
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
function draw(){
    image(video,0,0,500,400);
    if (status !=""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML= "Objects detected";
            if(objects[i].label == "person"){
                document.getElementById("labelstatus").innerHTML = "Baby found"
                audio.stop();
                fill(r,g,b);
                stroke(r,g,b);
                noFill()
                rect(objects[i].x,objects[i].y,objects[i].width ,objects[i].height);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            }

            else {
                document.getElementById("labelstatus").innerHTML = "Baby not found";
                audio.play();
            }
            
        }
        if (objects.length<0){
            document.getElementById("labelstatus").innerHTML = "Baby not found";
            audio.play();
        }

    }
}
function preload(){
    audio = loadSound("emergency-alarm-with-reverb-29431.mp3");
}