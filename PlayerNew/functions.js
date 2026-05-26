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

const songs = [
    "I'll See You There Tomorrow.mp3",
    "New Jeans.mp3",
    "Tinnitus.mp3"
];

let currentSong = 0;
let interval = null;
let frame = 1;

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function loadSong(index) {
    const song = songs[index];

    audio.src = `music/${song}`;

    titleEl.textContent = song.replace(".mp3", "");
    artistEl.textContent = "Unknown Artist";
}

function startCD() {
    clearInterval(interval);

    interval = setInterval(() => {
        cd.src = frame === 1
            ? "IconsNew/CD2.png"
            : "IconsNew/CD1.png";

        frame = frame === 1 ? 2 : 1;
    }, 200);
}

function stopCD() {
    clearInterval(interval);
}

function playMusic() {
    audio.play();

    playBtn.style.display = "none";
    pauseBtn.style.display = "block";
    playerBGPlay.style.display = "none";
    playerBGPause.style.display = "block";

    startCD();
}

function pauseMusic() {
    audio.pause();

    pauseBtn.style.display = "none";
    playBtn.style.display = "block";
    playerBGPlay.style.display = "block";
    playerBGPause.style.display = "none";

    stopCD();
}

function changeSong(direction) {
    currentSong += direction;

    if (currentSong >= songs.length)
        currentSong = 0;

    if (currentSong < 0)
        currentSong = songs.length - 1;

    loadSong(currentSong);
    playMusic();
}

playBtn.onclick = playMusic;
pauseBtn.onclick = pauseMusic;

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