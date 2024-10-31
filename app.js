let timer;
let isRunning = false;
let timeLeft = 180; // 3분 (180초)
const timerDisplay = document.getElementById('timer');
const music = document.getElementById('backgroundMusic');

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // 색상 변경
    if (isRunning) {
        timerDisplay.style.color = '#3B8DBF'; // 타이머 시작 시 색상
    } else {
        timerDisplay.style.color = '#26201E'; // 타이머 멈춤 시 색상
    }
}

document.getElementById('startTimer').addEventListener('click', function() {
    if (!isRunning) {
        isRunning = true;
        music.play(); // 음악 자동 재생
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                alert("타이머가 끝났습니다!");
            }
        }, 1000);
        updateTimerDisplay();
    }
});

document.getElementById('pauseTimer').addEventListener('click', function() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        updateTimerDisplay();
    }
});

document.getElementById('resetTimer').addEventListener('click', function() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = 180; // 타이머 초기화
    updateTimerDisplay();
});

function getRandomScripture() {
    const randomIndex = Math.floor(Math.random() * scriptures.length);
    return scriptures[randomIndex];
  }

  document.getElementById('scripture').textContent = getRandomScripture();

document.getElementById('newScripture').addEventListener('click', function() {
    // 무작위 성경 말씀 표시 로직 추가 (이전 코드 참고)
    const scripture = getRandomScripture(); // getRandomScripture() 함수 필요
    document.getElementById('scripture').textContent = scripture;
});

document.getElementById('musicToggle').addEventListener('click', function() {
    if (music.paused) {
        music.play();
        this.textContent = "음악 끄기";
    } else {
        music.pause();
        this.textContent = "음악 켜기";
    }
});

// 초기 상태 업데이트
updateTimerDisplay();
