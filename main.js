song=""

leftwristx= 0
leftwristy= 0
rightwristx= 0
rightwristy= 0

scoreleftwrist= 0
scorerightwrist=0

function preload(){
    song= loadSound("music.mp3")
    song2= loadSound("music2.mp3")
}

function play(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}

function setup(){
    canvas= createCanvas(600,400)
    canvas.center()
    video= createCapture(VIDEO)
    video.hide()
    posenet= ml5.poseNet(video,modelloaded)
    posenet.on('pose', gotPoses)
}

function draw(){
    image(video,0,0,600,400)
    if(scorerightwrist>0.2){
        fill("blue")
        stroke("blue")
        circle(rightwristx,rightwristy,20)
        if(rightwristy>0 &&  rightwristy<=100){
            document.getElementById("speed").innerHTML= "speed=0.5"
            song.rate(0.5)}
            
            else if(rightwristy>0 &&  rightwristy<=100){
                document.getElementById("speed").innerHTML= "speed=0.5"
                song.rate(0.5)
                
            }
            else if(rightwristy>100 &&  rightwristy<=200){
                document.getElementById("speed").innerHTML= "speed=1"
                song.rate(1) 
            
                
            }

            else if(rightwristy>200 &&  rightwristy<=300){
                document.getElementById("speed").innerHTML= "speed=1.5"
                song.rate(1.5) 
        }

        else if(rightwristy>300 &&  rightwristy<=400){
                document.getElementById("speed").innerHTML= "speed=2"
                song.rate(2) 
        }

        
        else if(rightwristy>400 &&  rightwristy<=500){
            document.getElementById("speed").innerHTML= "speed=2.5"
            song.rate(2.5) 
    }


    }

    if(scoreleftwrist>0.2){

    
    fill("red")
    stroke("red")
    circle(leftwristx,leftwristy,20)
    isnumber= Number(leftwristy)
    remove_decimal= floor(isnumber)
    volume= remove_decimal/500
    document.getElementById("volume").innerHTML= "volume="+volume
    song.setVolume(volume)
    }

}

function modelloaded(){
    console.log("posenet is loaded")
}

function gotPoses(results){
    if(results.length>0){
        console.log(results)
        leftwristx= results[0].pose.leftWrist.x
        leftwristy= results[0].pose.leftWrist.y
        rightwristx= results[0].pose.rightWrist.x
        rightwristy= results[0].pose.rightWrist.y
        scoreleftwrist= results[0].pose.keypoints[9].score
        console.log("scoreleftwrist:"+scoreleftwrist)
        scorerightwrist= results[0].pose.keypoints[10].score
        console.log("scorerightwrist:"+scorerightwrist)
    }
}

