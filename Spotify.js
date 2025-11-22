const SONGS_INDEX_URL = "http://127.0.0.1:5500/Spotify/songs/";

async function getSongs() {
  const res = await fetch(SONGS_INDEX_URL);
  const html = await res.text();
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;
  const anchors = Array.from(wrapper.getElementsByTagName("a"));
  const songs = anchors
    .map(a => a.href)
    .filter(h => typeof h === "string" && h.endsWith(".mp3"));
  return songs;
}


function formatDuration(sec) {
  if (!isFinite(sec) || isNaN(sec) || sec <= 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

//This code is use when we add songs in our songs directory. Usings this code we add songs in our website
async function addSongs() {
  let cardContainer = document.querySelector(".cardCont"); // Fix: access first element
  let songs = await getSongs();

  for (const src of songs) {
    const filename = src.split("/").pop().replace(".mp3", "");
    const imgUrl = `${SONGS_INDEX_URL}${filename}.jpg`;
    const audio = new Audio(src);
    const card = document.createElement("div");
    card.setAttribute("class", "card");

    card.innerHTML = `
      <a href="${src}" class="card-link" data-src="${src}">
        <img width="150" src="${imgUrl}" alt="${filename}" onerror="this.src='https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1PEfVA.img?w=768&h=432'">
        <h5>${filename}</h5>
        <p>hits to boost your mood and fill you with...</p>
        <p>Duration: <span class="dur">${formatDuration()}</span></p>
      </a>
    `;
      

    cardContainer.appendChild(card);
  }
}

async function progress() {
  let songs = await getSongs();

  const progressBar = document.querySelector("#progressBar");

  // Update progress as the song plays
  currentAudio.addEventListener("timeupdate", () => {
    const percent = (currentAudio.currentTime / currentAudio.duration) * 100;
    progressBar.value = percent;
  });

  const endTime = document.getElementById("endTime");
  for (const song of songs) {
    const audio = new Audio(song);
    const duration = `${Math.floor(audio.duration / 60)}:${Math.floor(audio.duration % 60).toString().padStart(2, '0')}`;
    
    endTime.innerHTML = `<p> ${duration} </p>`
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
    
    currentAudio = new Audio(songs[currentIndex]);
    currentAudio.play();
    progress();
    play.addEventListener("click", () => {
      
      play.style.display = "none";
      pause.style.display = "inline";
    });


  } else if (currentAudio.paused) {
    pause.addEventListener("click", () => {
      pause.style.display = "none";
      play.style.display = "inline";
    });
    currentAudio.play();
    progress();

  } else {
    pause.addEventListener("click", () => {
      pause.style.display = "inline";
      play.style.display = "none";
    });
    currentAudio.pause();
    progress();
  }

}

//Next Songs Function
async function nextSong() {
  let songs = await getSongs();
  if (songs.length === 0) return;

  if (currentAudio) {
    currentAudio.pause();
    progress();
    currentAudio.currentTime = 0;
  }

  currentIndex = (currentIndex + 1) % songs.length; // Loop to start if at end
  currentAudio = new Audio(songs[currentIndex]);
  currentAudio.play();
  progress();
}

//Previous Songs Funtion
async function previouSong() {
  let songs = await getSongs();
  if (songs.length === 0) {
    return;
  }
  if (currentAudio) {
    currentAudio.pause();
    progress();
    currentAudio.currentTime = 0;
  }
  if (currentIndex < 0) {
    currentAudio.pause();
    currentIndex = songs.length - 1
    currentAudio = new Audio(songs[currentIndex]);
    currentAudio.play();
    progress();
  }
  else {
    currentIndex = (currentIndex - 1) % songs.length;
    currentAudio = new Audio(songs[currentIndex]);
    currentAudio.play();
    progress();
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