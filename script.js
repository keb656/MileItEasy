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
const chageLang = document.getElementById('langBtn');
const downloadImg = document.getElementById('downBtn');

let timer;
let musicPlaying = false;
let countdown;
let minutes;
let seconds;

let lang = 'kr';
let korData;
let engData;
let sourceKorData;
let sourceEngData;
let questionKorData;
let questionEngData;

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
    swal.fire({title:"티 타이머 시작", text:"3분 후 알려드릴게요", confirmButtonColor: "#F2D888"});
    countdown = 180;
    timerBtn.classList.add('active');
    timer = setInterval(() => {
      countdown--;
      minutes = String(Math.floor(countdown / 60)).padStart(2, '0'); //add
      seconds = String(countdown % 60).padStart(2, '0'); //add
      timerBtn.innerText = `${minutes}:${seconds}`; //`${countdown}`
      if (countdown <= 0) {
        clearInterval(timer);
        swal.fire({title: "티 타이머 종료", text:"차가 맛있게 우려졌어요", icon:"success", confirmButtonColor: "#F2D888"});
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

chageLang.addEventListener('click', () => {
    if (lang == 'kr') {
      korToEng();
      lang = 'en';
    } else {
      engToKor();
      lang = 'kr';
    }
  }
);

downloadImg.addEventListener('click', () => {
  imgDownload();
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
  const { 한국어, eng, 출처, src, 질문, qst} = getRandomScripture();

  korData = 한국어;
  engData = eng;
  sourceKorData = 출처;
  sourceEngData = src;
  questionKorData = 질문;
  questionEngData = qst;
  console.log(korData, engData, sourceKorData, sourceEngData, questionKorData, questionEngData);
  engToKor();

 /*
  setTimeout(() => {
    verseEl.textContent = 한국어;
    refEl.textContent = 출처;
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

function engToKor(){
  verseEl.textContent = korData;
  refEl.textContent = sourceKorData;
  questionEl.textContent = questionKorData;

  verseEl.classList.add('fade-in');
  refEl.classList.add('fade-in');
  questionEl.classList.add('fade-in');
}

function korToEng(){
  verseEl.textContent = engData;
  refEl.textContent = sourceEngData;
  questionEl.textContent = questionEngData;

  verseEl.classList.add('fade-in');
  refEl.classList.add('fade-in');
  questionEl.classList.add('fade-in');
}


function imgDownload(){

  html2canvas(document.getElementById("container"), {color:"rgba(0,0,0,0)", foreignObjectRendering: false}).then(function(canvas) {
    var el = document.createElement("a")
    el.href = canvas.toDataURL("image/jpeg")
    el.download = 'mile-it-easy.jpg' //다운로드 할 파일명 설정
    el.click()
    })

  }
