// JSON 데이터 로드
let data;
fetch('data.json')
  .then(response => response.json())
  .then(json => data = json);

const musicBtn = document.getElementById('music-btn');
const timerBtn = document.getElementById('timer-btn');
const envelopeImg = document.getElementById('envelope-img');
const reloadBtn = document.getElementById('reload-btn');

let timer;
let musicPlaying = false;
let countdown;

const backgroundMusic = new Audio('assets/background-music.mp3');

// 배경음악 버튼 기능
musicBtn.addEventListener('click', () => {
  if (musicPlaying) {
    backgroundMusic.pause();
    musicPlaying = false;
  } else {
    backgroundMusic.play();
    musicPlaying = true;
  }
  musicBtn.classList.toggle('active', musicPlaying);
});

// 3분 타이머 버튼 기능
timerBtn.addEventListener('click', () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
    timerBtn.innerText = 'Tea Timer';
    timerBtn.classList.remove('active');
  } else {
    countdown = 180;
    timerBtn.classList.add('active');
    timer = setInterval(() => {
      countdown--;
      timerBtn.innerText = `Time Left: ${countdown}s`;
      if (countdown <= 0) {
        clearInterval(timer);
        timerBtn.innerText = 'Tea Timer';
        timer = null;
        timerBtn.classList.remove('active');
      }
    }, 1000);
  }
});

// 화면 전환 기능
envelopeImg.addEventListener('click', () => {
  document.getElementById('screen-1').classList.toggle('active');
  document.getElementById('screen-2').classList.toggle('active');
  loadRandomVerse();
});

reloadBtn.addEventListener('click', loadRandomVerse);

// 성경 말씀과 질문 로드 기능
function loadRandomVerse() {
  const randomIndex = Math.floor(Math.random() * data.length);
  const { 말씀, 구절, 질문 } = data[randomIndex];

  const verseEl = document.getElementById('verse');
  const refEl = document.getElementById('reference');
  const questionEl = document.getElementById('question');

  verseEl.classList.add('fade-out');
  refEl.classList.add('fade-out');
  questionEl.classList.add('fade-out');

  setTimeout(() => {
    verseEl.textContent = 말씀;
    refEl.textContent = 구절;
    questionEl.textContent = 질문;

    verseEl.classList.remove('fade-out');
    verseEl.classList.add('fade-in');
    refEl.classList.remove('fade-out');
    refEl.classList.add('fade-in');
    questionEl.classList.remove('fade-out');
    questionEl.classList.add('fade-in');
  }, 500);
}
