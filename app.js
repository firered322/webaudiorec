// set up basic variables for app

var record = document.querySelector(".record");
var stop = document.querySelector(".stop");
var soundClips = document.querySelector(".sound-clips");
var canvas = document.querySelector(".visualizer");
var mainSection = document.querySelector(".main-controls");

stop.disabled = true;

var audioCtx = new (window.AudioContext || webkitAudioContext)();
var canvasCtx = canvas.getContext("2d");

// Audio recording

if (navigator.mediaDevices.getUserMedia) {
  console.log("getUserMedia supported.");

  var constraints = { audio: true };
  var chunks = [];

  var onSuccess = function(stream) {
    var mediaRecorder = new MediaRecorder(stream);

    visualize(stream);
    record.onclick = function() {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log("recorder started");
      record.style.background = "red";

      stop.disabled = false;
      record.disabled = true;
    };

    stop.onclick = function() {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log("recorder stopped");
      record.style.background = "";
      record.style.color = "";
      stop.disabled = true;
      record.disabled = false;
    };

    mediaRecorder.onstop = function(e) {
      console.log("data available after MediaRecorder.stop() called.");

      var clipName = prompt(
        "Enter a name for your sound clip?",
        "My unnamed clip"
      );
      console.log(clipName);
      var clipContainer = document.createElement("article");
      var clipLabel = document.createElement("p");
      var audio = document.createElement("audio");
      var deleteButton = document.createElement("button");

      clipContainer.classList.add("clip");
      audio.setAttribute("controls", "");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete";

      if (clipName === null) {
        clipLabel.textContent = "My unnamed clip";
      } else {
        clipLabel.textContent = clipName;
      }

      clipContainer.appendChild(audio);
      clipContainer.appendChild(clipLabel);
      clipContainer.appendChild(deleteButton);
      soundClips.appendChild(clipContainer);

      audio.controls = true;
      var blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
      chunks = [];
      var audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;
      console.log("recorder stopped");

      deleteButton.onclick = function(e) {
        evtTgt = e.target;
        evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
      };

      clipLabel.onclick = function() {
        var existingName = clipLabel.textContent;
        var newClipName = prompt("Enter a new name for your sound clip?");
        if (newClipName === null) {
          clipLabel.textContent = existingName;
        } else {
          clipLabel.textContent = newClipName;
        }
      };
    };

    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    };
  };

  var onError = function(err) {
    console.log("The following error occured: " + err);
  };

  navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
} else {
  console.log("getUserMedia not supported on your browser!");
}

function visualize(stream) {
  var source = audioCtx.createMediaStreamSource(stream);

  var analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);

  source.connect(analyser);

  draw();

  function draw() {
    WIDTH = canvas.width;
    HEIGHT = canvas.height;

    requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = "rgb(200, 200, 200)";
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(0, 0, 0)";

    canvasCtx.beginPath();

    var sliceWidth = (WIDTH * 1.0) / bufferLength;
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {
      var v = dataArray[i] / 128.0;
      var y = (v * HEIGHT) / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  }
}

window.onresize = function() {
  canvas.width = mainSection.offsetWidth;
};

window.onresize();


/////////////////////////////////////////////////////////////////////////


var context;
	var cntText;
	var cnt=0;
	var start=0;
	var mydata = [160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190,
					160,130,190,130,160,130,190,160,130,160,190,160,130,160,190];
	
	function init()
	{
	 context= myCanvas.getContext('2d');
	 cntText=document.getElementById("data");
	 context.fillStyle = "#737373";
     context.fill();
	 
	}
	function drawLine(x1,y1,x2,y2,color)
	{
		context.beginPath();
		context.moveTo(x1,y1);
		context.lineTo(x2,y2);
		context.strokeStyle = color;
		context.lineWidth = 1;
		context.stroke();
	}
	
	
	function move()
	{
		 var j=0;
		var lastx=0;
		var lasty=160;
		var pos=0;
		cleareData();
		start=cnt;
		if(cnt>120)
		{
			start=120;
			pos=cnt-120;
		}
		for(i=0;i<start;i++)
		{
			var p=i*5;
			drawLine(lastx,lasty,p,mydata[pos],"#000000");
			lastx=p;
			lasty=mydata[pos];
			pos++;
		}
		cnt=cnt+1;
	}
	
	function cleareData()
	{
		context.clearRect(0, 0, 600, 600);
		for(i=0;i<600;i++)
		 {
		 
			drawLine(i,0,i,300,"#CCCCCC");
			i=i+19
		 }
		 
		 for(i=0;i<300;i++)
		 {
		 
			drawLine(0,i,600,i,"#CCCCCC");
			i=i+19
		 }
		 drawLine(0,160,600,160,"#000000");
	 }
	setInterval(move, 120);
init();