const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const nextButton = document.querySelector(".controls button.forward");
const prevButton = document.querySelector(".controls button.backward");
const songName = document.querySelector(".music-player h1");
const artistName = document.querySelector(".music-player p");

const songs = [
  {
    title: "Sundo",
    name: "Imago / Alternative Rock · OPM",
    source: "Sundo.mp3",
    description: "I chose this because kahit hindi ako laging sad, the song fits that chill, “okay lang mag-senti kahit walang reason” vibe. The music sounds gentle pero emotional, parang may naghahanap sa’yo, tapos finally, you’re found. It’s usually my go-to kapag gusto ko mag-reflect or just vibe at night.",
  },
  {
    title: "Cry",
    name: "Cigarettes After Sex / Dream Pop · Ambient",
    source: "Cry.mp3",
    description: "This song is my mood whenever gusto kong malungkot — may ganun talaga na phases kahit anong mood mo. Chill tempo and soft vocals na parang lullaby pero may sadness na beautiful din. I chose it kasi top tier CAS, perfect kapag gusto mo mag-reflect deeply.",
  },
  {
    title: "Dreaming",
    name: "Han Hee Jung / K-Indie · Ballad",
    source: "Dreaming.mp3",
    description: "Current fave ko ‘to, lagi kong pinapakinggan sa jeep while thinking about life or romanticizing moments. Hindi ko maintindihan lahat ng lyrics, pero the calming piano and gentle vocals make it perfect to zone out and relax. Sobrang chill, parang kasama mo siya sa quiet moments.",
  },
  {
    title: "I Love You, I'm Sorry",
    name: "Gracie Abrams / Indie Pop",
    source: "ILoveYou,I'mSorry.mp3",
    description: "Second all-time fave ko ito. Parang pag iniwan ako ng partner, expect na paulit-ulit ito sa isip ko. Raw and honest ang lyrics, tapos Gracie’s soft voice makes the pain real pero comforting din. Pinili ko siya kasi perfect sa love, regret, and vulnerability na feeling na f na f talaga.",
  },
  {
    title: "Somebody's Pleasure",
    name: "Aziz Hedra / R&B · Soul",
    source: "Somebody'sPleasure.mp3",
    description: "This is my all-time favorite — from the start 'til the end, every lyric hits right. Aziz’s raw voice and the soulful beat are perfect kapag feeling deep and reflective. The extended version lets me fully soak in the emotions, parang it's me n music.",
  },
];

let currentSongIndex = 3; // You can set this to any value 0-4

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;

  song.addEventListener("loadeddata", () => {});
}

song.addEventListener("timeupdate", () => {
  if (!song.paused) {
    progress.value = song.currentTime;
  }
});

song.addEventListener("loadedmetadata", () => {
  progress.max = song.duration;
  progress.value = song.currentTime;
});

song.addEventListener("ended", () => {
  currentSongIndex = (swiper.activeIndex + 1) % songs.length;
  updateSongInfo();
  swiper.slideTo(currentSongIndex);
  playSong();
});

function pauseSong() {
  song.pause();
  controlIcon.classList.remove("fa-pause");
  controlIcon.classList.add("fa-play");
}

function playSong() {
  song.play();
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
}

function playPause() {
  if (song.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", () => {
  song.currentTime = progress.value;
});

progress.addEventListener("change", () => {
  playSong();
});

nextButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});

prevButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  playPause();
});

updateSongInfo();

document.querySelectorAll('.swiper-slide').forEach((slide, idx) => {
  const descSpan = slide.querySelector('.desc');
  if (descSpan && songs[idx]) {
    descSpan.textContent = songs[idx].description;
  }
});

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  centeredSlides: true,
  initialSlide: 3,
  slidesPerView: "auto",
  grabCursor: true,
  spaceBetween: 40,
  speed: 600, // Smoother slide transition (ms)
  coverflowEffect: {
    rotate: 25,
    stretch: 0,
    depth: 50,
    modifier: 1,
    slideShadows: false,
  },
  navigation: {
    nextEl: ".forward",
    prevEl: ".backward",
  },
});

swiper.on("slideChange", () => {
  currentSongIndex = swiper.activeIndex;
  updateSongInfo();
  playPause();
});

// Intro modal logic
document.getElementById('close-intro').onclick = function() {
  document.getElementById('intro-modal').style.display = 'none';
};

document.querySelectorAll('.swiper-slide').forEach((slide) => {
  slide.addEventListener('click', function(e) {
    // Remove show-desc from all slides
    document.querySelectorAll('.swiper-slide').forEach(s => s.classList.remove('show-desc'));
    // Add to clicked slide
    this.classList.add('show-desc');
    e.stopPropagation();
  });
});

// Hide description when clicking outside
document.body.addEventListener('click', function() {
  document.querySelectorAll('.swiper-slide').forEach(s => s.classList.remove('show-desc'));
});
