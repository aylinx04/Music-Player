const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const playerBGPlay = document.getElementById("player-bg-playbtn");
const playerBGPause = document.getElementById("player-bg-pausebtn");
const cd = document.getElementById("cd");
const nextBtn = document.getElementById("nextbtn");
const prevBtn = document.getElementById("prevbtn");
const progress = document.getElementById("progress");
const audio = document.getElementById("audio");
const currentTimeEl = document.getElementById("current-time");
const totalTimeEl = document.getElementById("total-time");

const jsmediatags = require("jsmediatags");
const fs = require("fs");

const songs = fs.readdirSync("./music").filter(f => f.endsWith(".mp3"));

let currentSong = 0;
let cdInterval = null;
let cdState = false;

function toggleUI(isPlaying) {
    playBtn.style.display = isPlaying ? "none" : "block";
    pauseBtn.style.display = isPlaying ? "block" : "none";

    playerBGPlay.style.display = isPlaying ? "none" : "block";
    playerBGPause.style.display = isPlaying ? "block" : "none";
}

function formatTime(t) {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
}

function loadSong(i) {
    const song = songs[i];
    audio.src = `music/${song}`;

    jsmediatags.read(`music/${song}`, {
        onSuccess: tag => {
            titleEl.textContent = tag.tags.title || song.replace(".mp3", "");
            artistEl.textContent = tag.tags.artist || "Unknown Artist";
        },
        onError: () => {
            titleEl.textContent = song.replace(".mp3", "");
            artistEl.textContent = "Unknown Artist";
        }
    });
}

function startCD() {
    clearInterval(cdInterval);

    cdInterval = setInterval(() => {
        cd.src = cdState
            ? "IconsNew/CD1.png"
            : "IconsNew/CD2.png";

        cdState = !cdState;
    }, 200);
}

function stopCD() {
    clearInterval(cdInterval);
}

function play() {
    audio.play();
    toggleUI(true);
    startCD();
}

function pause() {
    audio.pause();
    toggleUI(false);
    stopCD();
}

function changeSong(dir) {
    currentSong = (currentSong + dir + songs.length) % songs.length;
    loadSong(currentSong);
    play();
}

playBtn.onclick = play;
pauseBtn.onclick = pause;

nextBtn.onclick = () => changeSong(1);
prevBtn.onclick = () => changeSong(-1);

audio.addEventListener("loadedmetadata", () => {
    totalTimeEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    currentTimeEl.textContent = formatTime(audio.currentTime);
    progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

loadSong(currentSong);