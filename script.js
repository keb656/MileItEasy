// JSON 데이터 로드
let data;
fetch('data.json')
  .then(response => response.json())
  .then(json => {
    data = json;
  }
  );

const musicBtn = document.getElementById('music-btn');
const timerBtn = document.getElementById('timer-btn');
const envelopeImg = document.getElementById('envelope-img');
const reloadBtn = document.getElementById('reload-btn');
const scr1 = document.getElementById('screen-1');
const scr2 = document.getElementById('screen-2');
const verseEl = document.getElementById('verse');
const refEl = document.getElementById('reference');
const questionEl = document.getElementById('question');

let timer;
let musicPlaying = false;
let countdown;
let minutes;
let seconds;

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
    timerBtn.innerText = 'TIMER';
    timerBtn.classList.remove('active');
  } else {
    swal.fire({title:"티 타이머를 시작합니다", text:"3분 후 알려드릴게요", confirmButtonColor: "#F2D888"});
    countdown = 180;
    timerBtn.classList.add('active');
    timer = setInterval(() => {
      countdown--;
      minutes = String(Math.floor(countdown / 60)).padStart(2, '0'); //add
      seconds = String(countdown % 60).padStart(2, '0'); //add
      timerBtn.innerText = `${minutes}:${seconds}`; //`${countdown}`
      if (countdown <= 0) {
        clearInterval(timer);
        swal.fire({title: "티 타이머가 종료되었습니다", text:"차가 맛있게 우려졌어요", icon:"success", confirmButtonColor: "#F2D888"});
        timerBtn.innerText = 'TIMER';
        timer = null;
        timerBtn.classList.remove('active');
      }
    }, 1000);
  }
});

// 화면 전환 기능
envelopeImg.addEventListener('click', () => {
  scr1.style.display = 'none';
  scr1.classList.remove('fade-out');
  //document.getElementById('screen-2').classList.toggle('active');
  loadRandomVerse();
  scr2.style.display = 'block';
  scr2.classList.add('fade-in');
});

//reloadBtn.addEventListener('click', loadRandomVerse);
reloadBtn.addEventListener('click', () => {
  scr1.style.display = 'block';
  scr1.classList.add('fade-in');
  scr2.style.display = 'none';
  scr2.classList.remove('fade-out');
});

function getRandomScripture() {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}
// 성경 말씀과 질문 로드 기능
function loadRandomVerse() {
  const { 말씀, 구절, 질문 } = getRandomScripture();

  verseEl.textContent = 말씀;
  refEl.textContent = 구절;
  questionEl.textContent = 질문;

  verseEl.classList.add('fade-in');
  refEl.classList.add('fade-in');
  questionEl.classList.add('fade-in');
 /*
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
  */
}
