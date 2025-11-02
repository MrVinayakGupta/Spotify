async function getSongs() {
  let a = await fetch("http://127.0.0.1:5500/Spotify/songs/");
  let response = await a.text();
  // console.log(response);
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];

  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href);
    }
  }


  return songs;
}


async function addSongs() {
  let cardContainer = document.getElementsByClassName("cardCont")[0]; // Fix: access first element
  let songs = await getSongs();

  for (const song of songs) {
    cardContainer.innerHTML += `
      <div class="card">
        <a href="${song}">
          <img width="150"
            src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1PEfVA.img?w=768&h=432&m=6&x=610&y=168&s=341&d=341">
          <h5>Happy hits!</h5>
          <p>hits to boost your mood and fill you with...</p>
        </a>
      </div>`;
  }
}

let currentAudio = null;
let currentIndex = 0;
//Play Pause Function
async function playMusic() {
  let songs = await getSongs();
  let play = document.getElementById("play")
  let pause = document.getElementById("pause")
  // .addEventListener("click", function () {


  if (!currentAudio) {
    // for (let i = 0; i < songs.length; i++) {
    currentAudio = new Audio(songs[currentIndex]);
    currentAudio.play();
    // play.style.display = "none";
    // pause.style.display = "inline";
    // }
  } else if (currentAudio.paused) {
    currentAudio.play();
    // play.style.display = "none";
    // pause.style.display = "inline";

  } else {
    currentAudio.pause();
    // play.style.display = "inline";
    // pause.style.display = "none";
  }
  // });

}

//Next Songs Function
async function nextSong() {
  let songs = await getSongs();
  if (songs.length === 0) return;

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentIndex = (currentIndex + 1) % songs.length; // Loop to start if at end
  currentAudio = new Audio(songs[currentIndex]);
  currentAudio.play();
}

//Previous Songs Funtion
async function previouSong() {
  let songs = await getSongs();
  if (songs.length === 0) {
    return;
  }
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  if (currentIndex < 0) {
    currentAudio.pause();
    currentIndex = songs.length - 1
    currentAudio = new Audio(songs[currentIndex]);
    currentAudio.play();
  }
  else {
    currentIndex = (currentIndex - 1) % songs.length;
    currentAudio = new Audio(songs[currentIndex]);
    currentAudio.play();
  }
}


async function main() {
  let songs = await getSongs();

  //For Play and Pause
  let play = document.getElementById("play").addEventListener("click", function () {
    playMusic(); //calling Play Pause Function
  });

  //For Next songs
  let next = document.getElementById("nextSong").addEventListener("click", function () {
    nextSong(); //calling Next songs Function
  });

  //For Previes songs
  let previes = document.getElementById("previouSong").addEventListener("click", function () {
    previouSong(); //calling Previos Songs Funtion
  });

}

main();
addSongs();