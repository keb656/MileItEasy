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
const verseElement = document.getElementById('verse');
const refElement = document.getElementById('reference');
const questionElement = document.getElementById('question');
const chageLang = document.getElementById('langBtn');
const downloadImg = document.getElementById('downBtn');
const captureArea = document.getElementById("container");
const hiddenIcons = document.querySelectorAll(".no-capture"); // 숨길 아이콘 선택

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
}

function engToKor(){
  verseElement.textContent = korData;
  refElement.textContent = sourceKorData;
  questionElement.textContent = questionKorData;

  verseElement.classList.add('fade-in');
  refElement.classList.add('fade-in');
  questionElement.classList.add('fade-in');
}

function korToEng(){
  
  verseElement.textContent = engData;
  refElement.textContent = sourceEngData;
  questionElement.textContent = questionEngData;

  verseElement.classList.add('fade-in');
  refElement.classList.add('fade-in');
  questionElement.classList.add('fade-in');
}


function imgDownload() {

  if (!captureArea) {
    console.error("❌ 캡처 영역을 찾을 수 없습니다!");
    return;
  }

  hiddenIcons.forEach(icon => icon.style.opacity = "0"); // 캡처 전에 숨김

  domtoimage.toSvg(captureArea)
    .then(function (svgDataUrl) {
      const img = new Image();
      img.src = svgDataUrl;

      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width * 3;
        canvas.height = img.height * 3;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const pngDataUrl = canvas.toDataURL("image/png");

        saveImg(pngDataUrl, "MileItEasy-WordCard.png");

        // ✅ 캡처 후 아이콘 다시 보이게 복구
        hiddenIcons.forEach(icon => icon.style.opacity = "1");
      };
    })
    .catch(function (error) {
      console.error("이미지 저장 중 오류 발생:", error);
    });

  function saveImg(uri, filename) {
    const link = document.createElement("a");
    link.href = uri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}