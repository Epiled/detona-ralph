const configGame = {
  view: {
    music: document.querySelector('[data-music]'),
    sound: document.querySelector('[data-sound]'),
  },
  values: {
    volumeMusic: .5,
    volumeSound: .5,
  },
  actions: {
    hit: playHit,
    music: playTheme,
  }
}

let music = new Audio('src/assets/sounds/theme.mp4');
let sound = new Audio('src/assets/sounds/hit.m4a');

const handleVolumeMusic = (e) => {
  configGame.values.volumeMusic = e.target.value;
  music.volume = configGame.values.volumeMusic;
  music.play();
}

const handleVolumeSound = (e) => {
  configGame.values.volumeSound = e.target.value
  sound.volume = configGame.values.volumeSound;
  sound.play();
}

function playTheme() {
  music.loop = true;
  music.volume = configGame.values.volumeMusic;
  music.play();
}

function playHit() {
  let sound = new Audio('src/assets/sounds/hit.m4a');
  sound.volume = configGame.values.volumeSound;
  sound.play();
}

configGame.view.sound.addEventListener('change', handleVolumeSound);
configGame.view.sound.addEventListener('click', handleVolumeSound);

configGame.view.music.addEventListener('change', handleVolumeMusic);
configGame.view.music.addEventListener('click', handleVolumeMusic);

export default configGame;
