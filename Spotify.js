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


    let play = document.getElementById("play").addEventListener("click", function () {
        for (let i = 0; i < songs.length; i++) {
            const audio = new Audio(songs[i]);
            audio.play();
            function pauseAudio() {
                audio = document.getElementById('play');
                audio.pause();
            }
        }
    });


}

main();