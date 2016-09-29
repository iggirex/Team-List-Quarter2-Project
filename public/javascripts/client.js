console.log("WE are in CLIENT")
$(function(){
  var socket = io()
//if you want jQuery in your file, the entire file has to be wrapped in a jQuery function

    $("#messageForm").submit(function(e){
      e.preventDefault();
      // $("#chatDiv").append("<p>"+$("#m").val()+"</p>")
      socket.emit("send message", $("#m").val());
      $("#m").val("");
        })

    $("#startVideo").click(function(e){
      console.log("button just got clicked")
      e.preventDefault();
      socket.emit("start button");
            })

    socket.on("new message", function(msg){
        console.log("THIS IS MSG@@@@: ", msg.message, "THis is type of msg", typeof msg)
        $("#chatDiv").append($("<div><strong>"+msg+"</strong></p></div>"))
    })

    // var webrtc = new SimpleWebRTC(options);
// webrtc.on('startFeed', function (sessionId) {
//   console.log("WE have received emission")
//   var webrtc = new SimpleWebRTC({
//       // the id/element dom element that will hold "our" video
//       localVideoEl: 'localVideo',
//       // the id/element dom element that will hold remote videos
//       remoteVideosEl: 'remoteVideos',
//       // immediately ask for camera access
//       autoRequestMedia: true
//   });
// })

socket.on("startFeed", function(msg){
    console.log("Inside socke.on startFeed")
    var webrtc = new SimpleWebRTC({
    // the id/element dom element that will hold "our" video
    localVideoEl: 'localVideo',
    // the id/element dom element that will hold remote videos
    remoteVideosEl: 'remoteVideos',
    // immediately ask for camera access
    autoRequestMedia: true
    });
  })

    webrtc.on('startFeed', function () {
        // you can name it anything
        webrtc.joinRoom('your awesome room name');
    });

    // we have to wait until it's ready
    // webrtc.on('readyToCall', function () {
    //     // you can name it anything
    //     webrtc.joinRoom('your awesome room name');
    // });
})
