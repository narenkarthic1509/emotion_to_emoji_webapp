prediction_1 = "";
prediction_2 = "";

Webcam.set({
   height : 300,
   width : 350,
   Image_format : 'png',
   png_quality : 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_Snapshot(){
    Webcam.snap(function(data_uri){
      document.getElementById("result").innerHTML = "<img id = 'captured_image' src = '"+ data_uri +"'/>";
    });
}

console.log('ml5 version : ',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/WdP6Wv_6B/model.json',modelLoaded);

function modelLoaded(){
console.log(modelLoaded);
}


function speak(){
   var synth = window.speechSynthesis;
   var speak_data_1 = "the first prediction is : " + prediction_1;
   var speak_data_2 = "the second prediction is : " + prediction_2;
   var utter_this = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
   synth.speak(utter_this);
}

function check(){
   image = document.getElementById('captured_image');
   classifier.classify(image,gotResult);
}

function gotResult(error,result){
   if(error){
      console.log(error);
   }
   else{
      console.log(result)
      document.getElementById("result_emoji_name").innerHTML = result[0].label;
      document.getElementById("result_emoji_name2").innerHTML = result[1].label;
      prediction_1 = result[0].label;
      prediction_2 = result[1].label;
      speak();

      if(result[0].label == "happy"){
         document.getElementById("update_emoji").innerHTML = "&#128512;";
      }

      if(result[0].label == "sad"){
         document.getElementById("update_emoji").innerHTML = "&#128546;";
      }

      if(result[0].label == "angry"){
         document.getElementById("update_emoji").innerHTML = "&#128545;";
      }

      if(result[1].label == "happy"){
         document.getElementById("update_emoji2").innerHTML = "&#128512;";
      }

      if(result[1].label == "sad"){
         document.getElementById("update_emoji2").innerHTML = "&#128546;";
      }

      if(result[1].label == "angry"){
         document.getElementById("update_emoji2").innerHTML = "&#128545;";
      }
   }
}

