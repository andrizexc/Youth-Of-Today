const cover = document.getElementById('cover');
const disc = document.getElementById('disc');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
let songIndex = 0;

// Songs info
const songs = [
  {
    title: 'Straight Edge',
    artist: 'Minor Threat',
    coverPath: 'assets/images/straight.jpg',
    discPath: 'assets/music/Compilations/Minor Threat - Straight Edge.mp3',
    duration: '1:32',
  },
     {
    title: 'Salad Days',
    artist: 'Minor Threat',
    coverPath: 'assets/images/straight.jpg',
    discPath: 'assets/music/Compilations/Minor Threat - Salad Days.mp3',
    duration: '1:32',
  },
  
     {
    title: 'Slogan On A Shirt',
    artist: '7 Seconds',
    coverPath: 'assets/images/straight.jpg',
    discPath: 'assets/music/Compilations/7 Seconds - Slogan On A Shirt.mp3',
    duration: '1:32',
  },
  
     {
    title: 'Young Till I Die',
    artist: '7 Seconds',
    coverPath: 'assets/images/straight.jpg',
    discPath: 'assets/music/Compilations/7 Seconds - Young Till I Die.mp3',
    duration: '1:32',
  },
  
     {
    title: 'Break Down the Walls',
    artist: 'Youth of Today',
    coverPath: 'assets/images/straight.jpg',
    discPath: 'assets/music/Compilations/Youth of Today - Break Down the Walls.mp3',
    duration: '1:32',
  },
  
     {
    title: 'No More',
    artist: 'Youth of Today',
    coverPath: 'assets/images/straight.jpg',
    discPath: 'assets/music/Compilations/Youth of Today - No More.mp3',
    duration: '1:32',
  },
  
     {
    title: 'Start Today',
    artist: 'Gorilla Biscuits',
    coverPath: 'assets/images/straight.jpg',
    discPath: 'assets/music/Compilations/Gorilla Biscuits - Start Today.mp3',
    duration: '1:32',
  },
  
     {
    title: 'New Direction',
    artist: 'Gorilla Biscuits',
    coverPath: 'assets/images/straight.jpg',
    discPath: 'assets/music/Compilations/Gorilla Biscuits - New Direction.mp3',
    duration: '1:32',
  },
  
     {
    title: 'Armed With A Mind',
    artist: 'Have Heart',
    coverPath: 'assets/images/straight.jpg',
    discPath: 'assets/music/Compilations/Have Heart - Armed With A Mind.mp3',
    duration: '1:32',
  },
      {
    title: 'Watch Me Rise',
    artist: 'Have Heart',
    coverPath: 'assets/images/straight.jpg',
    discPath: 'assets/music/Compilations/Have Heart- Watch Me Rise.mp3',
    duration: '1:32',
  },
      {
    title: '05 The Unbreakable',
    artist: 'Have Heart',
    coverPath: 'assets/images/straight.jpg',
    discPath: 'assets/music/Compilations/Have Heart - 05 The Unbreakable.mp3',
    duration: '1:32',
  },
      {
    title: 'Can_t Live Through Me',
    artist: 'In My Eyes',
    coverPath: 'assets/images/straight.jpg',
    discPath: 'assets/music/Compilations/In My Eyes - Can_t Live Through Me.mp3',
    duration: '1:32',
  },
      {
    title: 'the truth',
    artist: 'Champion',
    coverPath: 'assets/images/straight.jpg',
    discPath: 'assets/music/Compilations/Champion- the truth.mp3',
    duration: '1:32',
  },
  
  
    
];

// Load song initially
loadSong(songs[songIndex]);

// Load the given song
function loadSong(song) {
  cover.src = song.coverPath;
  disc.src = song.discPath;
  title.textContent = song.title;
  artist.textContent = song.artist;
  duration.textContent = song.duration;
}

// Toggle play and pause
function playPauseMedia() {
  if (disc.paused) {
    disc.play();
  } else {
    disc.pause();
  }
}

// Update icon
function updatePlayPauseIcon() {
  if (disc.paused) {
    play.classList.remove('fa-pause');
    play.classList.add('fa-play');
  } else {
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
  }
}

// Update progress bar
function updateProgress() {
  progress.style.width = (disc.currentTime / disc.duration) * 100 + '%';

  let minutes = Math.floor(disc.currentTime / 60);
  let seconds = Math.floor(disc.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  timer.textContent = `${minutes}:${seconds}`;
}

// Reset the progress
function resetProgress() {
  progress.style.width = 0 + '%';
  timer.textContent = '0:00';
}

// Go to previous song
function gotoPreviousSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex = songIndex - 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow) {
    playPauseMedia();
  }
}

// Go to next song
function gotoNextSong(playImmediately) {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex = songIndex + 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow || playImmediately) {
    playPauseMedia();
  }
}

// Change song progress when clicked on progress bar
function setProgress(ev) {
  const totalWidth = this.clientWidth;
  const clickWidth = ev.offsetX;
  const clickWidthRatio = clickWidth / totalWidth;
  disc.currentTime = clickWidthRatio * disc.duration;
}

// Play/Pause when play button clicked
play.addEventListener('click', playPauseMedia);

// Various events on disc
disc.addEventListener('play', updatePlayPauseIcon);
disc.addEventListener('pause', updatePlayPauseIcon);
disc.addEventListener('timeupdate', updateProgress);
disc.addEventListener('ended', gotoNextSong.bind(null, true));

// Go to next song when next button clicked
prev.addEventListener('click', gotoPreviousSong);

// Go to previous song when previous button clicked
next.addEventListener('click', gotoNextSong.bind(null, false));

// Move to different place in the song
progressContainer.addEventListener('click', setProgress);
