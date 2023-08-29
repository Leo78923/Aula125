noseX = 0;
noseY = 0;
difference = 0;
rightWristX = 0;
leftWristX = 0;


function setup()
{
    video = createCapture(VIDEO);
    video.size(450, 400);
    canvas = createCanvas(450, 400);
    canvas.position(560, 125);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses); 
}

function modelLoaded()
{
    console.log('PoseNet foi Inicializado');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        noseX = results[0].pose.nose.x + 80;
        noseY = results[0].pose.nose.y + 50;
        console.log("noseX = " + noseX +" noseY = " + noseY);
        
        leftWristX = results[0].pose.leftWrist.X;
        rightWristX = results[0].pose.rightWrist.X; 
        difference = floor(leftWristX - rightWristX);

        console.log("leftwristX = " + leftWristX + " rightwristX = "+ rightWristX + "difference = " + difference);
    }
}

function draw()
{
    background('#1cfb4b');
    document.getElementById("square_side").innerHTML = "Largura e Altura serão = " + difference + "px";
    fill('#6307b7');
    stroke('#1252c9');
    square(noseX, noseY, difference);
}

