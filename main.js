const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");

const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");

const playListButton = document.getElementById("playlist");

const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");

const currentProgress = document.getElementById("current-progress");

let index;

let loop = true;

const songsList = [
  {
    name: "Shape of My Heart",
    link: "assets/Sting - Shape of My Heart Leon.mp3",
    artist: "Sting",
    image: "assets/sting.jpeg",
  },

  {
    name: "Ömrümüz Yine Geçiyor",
    link: "assets/Ömrümüz Yine Geçiyor.mp3",
    artist: "Ali Barokas",
    image: "assets/alibarokas.jpeg",
  },

  {
    name: "Varsa Yoksa",
    link: "assets/Birkan Nasuhoğlu  Elçin Orçun - Varsa Yoksa Official Video.mp3",
    artist: "Birkan Nasuhoğlu / Elçin Orçun",
    image: "assets/varsayoksa.jpeg",
  },

  {
    name: "Uyursam Geçer Mİ?",
    link: "assets/Eskitilmiş Yaz - Uyursam Geçer Mi Official Video.mp3",
    artist: "Eskitilmiş Yaz",
    image: "assets/uyursamgecer mı.jpg",
  },

  {
    name: "Sıcak Şarap",
    link: "assets/Batuhan Kordel - Sıcak Şarap.mp3",
    artist: "Batuhan Kordel",
    image: "assets/sıcaksarap.jpg",
  },
];

const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};

const setSong = (arrayIndex) => {
  let { name, link, artist, image } = songsList[arrayIndex];

  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  audio.onloadeddata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
  };

  playListContainer.classList.add("hide");
  playAudio();
};

const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};

const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

const nextSong = () => {
  if (!loop) {
    if (index == songsList.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
    setSong(index);
    playAudio();
  } else {
    let randIndex = Math.floor(Math.random() * songsList.length);
    //console.log(randIndex)
    setSong(randIndex);
    playAudio();
  }
};

const previousSong = () => {
  if (index > 0) {
    pauseAudio();
    index -= 1;
  } else {
    index = songsList.length - 1;
  }
  setSong(index);
  playAudio();
};

audio.onended = () => {
  nextSong();
};

progressBar.addEventListener("click", (event) => {
  let coordStart = progressBar.getBoundingClientRect().left;

  let coordEnd = event.clientX;
  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;

  currentProgress.style.width = progress * 100 + "%";

  audio.currentTime = progress * audio.duration;

  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
});

//karistir butonu
shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active");
    loop = true;
    console.log("karistirma kapali");
  } else {
    shuffleButton.classList.add("active");
    loop = false;
    console.log("karistirma acik");
  }
});

repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    loop = false;
    console.log("tekrar kapali");
  } else {
    repeatButton.classList.add("active");
    loop = true;
    console.log("tekrar acik");
  }
});

const initializePlayList = () => {
  for (const i in songsList) {
    playListSongs.innerHTML += `<li class="playlistSong"
    onclick="setSong(${i})">
    <div class="playlist-image-container">
     <img src="${songsList[i].image}"/>
     </div>
     <div class="playlist-song-details">
      <span id="playlist-song-name">
       ${songsList[i].name}
       </span>
       <span id="playlist-song-artist-album">
       ${songsList[i].artist}
       </span>
      </div>
     </li>`;
  }
};

playListButton.addEventListener("click", () => {
  playListContainer.classList.remove("hide");
});

closeButton.addEventListener("click", () => {
  playListContainer.classList.add("hide");
});

playButton.addEventListener("click", playAudio);

pauseButton.addEventListener("click", pauseAudio);
nextButton.addEventListener("click", nextSong);

prevButton.addEventListener("click", previousSong);

setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
}, 1000);

audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

//ekran yuklenildiginde
window.onload = () => {
  index = 0;
  setSong(index);
  pauseAudio();
  initializePlayList();
};
