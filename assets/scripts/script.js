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
    title: 'Filler',
    artist: 'Minor Threat',
    coverPath: 'assets/images/minor.jpg',
    discPath: 'assets/music/minor/Filler.mp3',
    duration: '1:32',
  },
  {
    title: 'I Dont Wanna Hear It',
    artist: 'Minor Threat',
    coverPath: 'assets/images/minor.jpg',
    discPath: 'assets/music/minor/2.mp3',
    duration: '1:16',
  },
  {
    title: 'Seeing Red',
    artist: 'Minor Threat',
    coverPath: 'assets/images/minor.jpg',
    discPath: 'assets/music/minor/3.mp3',
    duration: '1:05',
  },
    {
    title: 'Straight Edge',
    artist: 'Minor Threat',
    coverPath: 'assets/images/minor.jpg',
    discPath: 'assets/music/minor/Straight Edge.mp3',
    duration: '0:47',
  },
    {
    title: 'Small Man, Big Mouth',
    artist: 'Minor Threat',
    coverPath: 'assets/images/minor.jpg',
    discPath: 'assets/music/minor/Small Man, Big Mouth.mp3',
    duration: '0:57',
  },
    {
    title: 'Screaming at a Wall',
    artist: 'Minor Threat',
    coverPath: 'assets/images/minor.jpg',
    discPath: 'assets/music/minor/Screaming at a Wall.mp3',
    duration: '1:34',
  },
    
    {
    title: 'Bottled Violence',
    artist: 'Minor Threat',
    coverPath: 'assets/images/minor.jpg',
    discPath: 'assets/music/minor/Bottled Violence.mp3',
    duration: '0:56',
  },
     {
    title: 'Minor Threat',
    artist: 'Minor Threat',
    coverPath: 'assets/images/minor.jpg',
    discPath: 'assets/music/minor/Minor Threat.mp3',
    duration: '0:56',
  },
    {
    title: 'Stand Up',
    artist: 'Minor Threat',
    coverPath: 'assets/images/minor.jpg',
    discPath: 'assets/music/minor/Stand Up.mp3',
    duration: '0:56',
  },
     {
    title: '12XU',
    artist: 'Minor Threat',
    coverPath: 'assets/images/minor.jpg',
    discPath: 'assets/music/minor/12XU.mp3',
    duration: '0:56',
  },
     {
    title: 'In My Eyes',
    artist: 'Minor Threat',
    coverPath: 'assets/images/minor.jpg',
    discPath: 'assets/music/minor/In My Eyes.mp3',
    duration: '0:56',
  },
     {
    title: 'Out of Step',
    artist: 'Minor Threat',
    coverPath: 'assets/images/minor.jpg',
    discPath: 'assets/music/minor/Out of Step.mp3',
    duration: '0:56',
  },
     {
    title: 'Guilty of Being White',
    artist: 'Minor Threat',
    coverPath: 'assets/images/minor.jpg',
    discPath: 'assets/music/minor/Guilty of Being White.mp3',
    duration: '0:56',
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
