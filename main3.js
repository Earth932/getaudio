navigator.mediaDevices
  .getUserMedia({ audio: true, video: { width: 1280, height: 720 } })
  .then(function (stream) {
    var video = document.querySelector("video");
    video.srcObject = stream;
    video.onloadedmetadata = function (e) {
      video.play();
      console.log("media connect");
    };
    audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    microphone = audioContext.createMediaStreamSource(stream);
    javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

    analyser.smoothingTimeConstant = 0.8;
    analyser.fftSize = 1024;

    microphone.connect(analyser);
    analyser.connect(javascriptNode);
    javascriptNode.connect(audioContext.destination);
    javascriptNode.onaudioprocess = function () {
      var array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      var values = 0;

      var length = array.length;
      for (var i = 0; i < length; i++) {
        values += array[i];
      }

      var average = values / length;

      // log show audio connect
      console.log("audio connect");

      // log show volume average
      //console.log(Math.round(average));
      // colorPids(average);
    };
  })
  .catch(function (err) {
    /* handle the error */
  });
