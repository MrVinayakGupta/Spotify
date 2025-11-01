async function getSongs() {
  let a = await fetch("http://127.0.0.1:5500/Spotify/songs/");
  let response = await a.text();
  // console.log(response);
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  console.log(as);
  let songs = [];

  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href);
    }
  }
  return songs;
}

async function main() {
  let songs = await getSongs();
  console.log(songs);


  let currentAudio = null;
  let currentIndex = 0;

  //For Play and Pause
  let play = document.getElementById("play").addEventListener("click", function () {

    const button = document.getElementById("playPauseBtn");

    if (!currentAudio) {
      // for (let i = 0; i < songs.length; i++) {
        currentAudio = new Audio(songs[currentIndex]);
        currentAudio.play();
        button.textContent = "Pause ⏸️";
      // }
    } else if (currentAudio.paused) {
      currentAudio.play();
      button.textContent = "Pause ⏸️";
    } else {
      currentAudio.pause();
      button.textContent = "Play ▶️";
    }
  });

  //For Next songs
  let next = document.getElementById("nextSong").addEventListener("click", function (event) {
    if (event.target.id === 'nextSong') {
      currentAudio.pause();
      currentAudio = new Audio(songs[currentIndex + 1]);
      currentAudio.play();

    }
    return currentAudio;
  });

  //For Previes songs
  let previes = document.getElementById("previeSongs").addEventListener("click", function (event) {
    if(event.target.id === 'previeSongs'){
      currentAudio.pause();
      currentAudio = new Audio (songs[currentIndex - 1]);
      currentAudio.play();
    }
  })

  // for (let i = 0; i < songs.length; i++) {
  //     const audio = new Audio(songs[i]);
  //     audio.play();
  //     function pauseAudio() {
  //         audio = document.getElementById('play');
  //         audio.pause();
  //     }
  // }
  // });


}

main();