prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="image_captured" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version:",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/C7BynFZc1/model.json',modelLoaded);

function modelLoaded() {
    console.log("Model Loaded Successfully!");
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "The Prediction Is "+prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}


function check() {
    img = document.getElementById("image_captured");
    classifier.classify(img, gotResults);
 
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "Peace"){
            document.getElementById("result_emoji").innerHTML = "&#128076;";
            document.getElementById("quote").innerHTML = "That was a great victory";
            document.getElementById("quote").value="";

        }
        if(results[0].label == "ok"){
            document.getElementById("result_emoji").innerHTML = "&#128077";
            document.getElementById("quote").innerHTML = "The food is great ";
            document.getElementById("quote").value="";
        }
        if(results[0].label == "Ox"){
            document.getElementById("result_emoji").innerHTML = "&#128002;";
            document.getElementById("quote").innerHTML = "Hit problems like an ox";
            document.getElementById("quote").value="";
        }
        if(results[0].label == "Thums up"){
            document.getElementById("result_emoji").innerHTML = "&#9994;";
            document.getElementById("quote").innerHTML = "Gud job";
            document.getElementById("quote").value="";
         
        }
        if(results[0].label == "Horse"){
         
            document.getElementById("result_emoji").innerHTML = "&#128014;";
            document.getElementById("quote").innerHTML = "Run like a horse";
            document.getElementById("quote").value="";
        }
     
       
    }
}