const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

// Play & pause video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

//update play/pause icon
// Nota: Muestra ícono play/pause dependiendo del estado del video
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

// Update progress & Timestamp
function updateProgress() {
  // console.log(video.currentTime);
  // Nota: Muestra la duración total del video
  // console.log(video.duration);
  progress.value = (video.currentTime / video.duration) * 100;

  // Get minutos
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  // Get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  // Nota: Muestra los segundos que se ha reproducido el video.
  timestamp.innerHTML = `${mins}:${secs}`;
}

// Set video time to progress
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop video
// Nota: No existe función video.stop()
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

// ****************************
// Event Listeners
// Nota: Función que cambiara de play/pause según sea su estado
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
// Nota: Continuamente se llama a ésta función mientras se reproduce el video
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);

stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);
// Event Listeners
// ****************************
