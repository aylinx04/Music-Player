const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const nextBtn = document.getElementById("nextbtn");
const prevBtn = document.getElementById("prevbtn");
const cd = document.getElementById("cd");
const audio = document.getElementById("audio");

let frame = 1;
let interval = null;

const songs = [
    {
        file: "music/I'll See You There Tomorrow.mp3",
        title: "I'll See You There Tomorrow",
        artist: "TXT"
    },
    {
        file: "music/New Jeans.mp3",
        title: "New Jeans",
        artist: "NewJeans"
    },
    {
        file: "music/Tinnitus.mp3",
        title: "Tinnitus",
        artist: "TXT"
    }
];

let currentSong = 0;

function loadSong(index) {
    audio.src = songs[index].file;
    audio.load();

    titleEl.textContent = songs[index].title;
    artistEl.textContent = songs[index].artist;
}

function playSong() {
    audio.play();
}

function stopCD() {
    clearInterval(interval);
    interval = null;
}

function startCD() {
    stopCD();
    frame = 1;

    interval = setInterval(() => {
        cd.src = frame === 1
            ? "PlayerIcons/CD2.png"
            : "PlayerIcons/CD1.png";

        frame = frame === 1 ? 2 : 1;
    }, 200);
}

function changeSong(index) {
    currentSong = index;

    if (currentSong >= songs.length) currentSong = 0;
    if (currentSong < 0) currentSong = songs.length - 1;

    loadSong(currentSong);
    audio.currentTime = 0; // nur hier reset
    audio.play();

    playBtn.style.display = "none";
    pauseBtn.style.display = "block";

    startCD();
}

nextBtn.onclick = () => changeSong(currentSong + 1);
prevBtn.onclick = () => changeSong(currentSong - 1);

playBtn.onclick = () => {
    playBtn.style.display = "none";
    pauseBtn.style.display = "block";
    playSong();
    startCD();
};

pauseBtn.onclick = () => {
    pauseBtn.style.display = "none";
    playBtn.style.display = "block";
    audio.pause();
    stopCD();
};

loadSong(currentSong);