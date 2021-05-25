import cloud from "./blackCloud.png";

class App {
  constructor() {
    // screen setting
    this.canvas = document.getElementById("app");
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.statusElm = document.getElementById("status");
    this.inputElm = document.getElementById("input");
    this.inputWordElm = document.getElementById("inputWord");
    this.startElm = document.getElementById("start");
    this.resultElm = document.getElementById("result");
    this.finalScoreElm = document.getElementById("finalScore");
    this.playElm = document.getElementById("play");
    // game setting
    this.defaultSpeed = 3;
    this.speedVariable = 3;
    this.defaultSpawnInterval = 2000;
    this.life = 10;
    this.spawnT = undefined;
    this.scoreT = undefined;
    // game data
    this.words = [];
    this.keywords = [
      "고양이",
      "강아지",
      "거북이",
      "토끼",
      "뱀",
      "사자",
      "호랑이",
      "표범",
      "치타",
      "하이에나",
      "기린",
      "코끼리",
      "코뿔소",
      "하마",
      "악어",
      "펭귄",
      "부엉이",
      "올빼미",
      "곰",
      "돼지",
      "소",
      "닭",
      "독수리",
      "타조",
      "고릴라",
      "오랑우탄",
      "침팬지",
      "원숭이",
      "코알라",
      "캥거루",
      "고래",
      "상어",
      "칠면조",
      "직박구리",
      "쥐",
      "청설모",
      "메추라기",
      "앵무새",
      "삵",
      "스라소니",
      "판다",
      "오소리",
      "오리",
      "거위",
      "백조",
      "두루미",
      "고슴도치",
      "두더지",
      "우파루파",
      "맹꽁이",
    ];
    this.onScreenKeywords = [];
    this.score = 0;

    // event listener
    this.resize();
    this.inputWordElm.addEventListener("keydown", this.handleInput.bind(this));
    this.playElm.addEventListener("click", this.start.bind(this));
    window.addEventListener("resize", this.resize.bind(this), false);
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }
  handleInput(e) {
    if (e.code === "Enter") {
      const inputText = this.inputWordElm.value;
      this.removeWord(inputText);
      this.inputWordElm.value = "";
    }
  }
  scoring() {
    this.scoreT = setInterval(() => {
      this.score += 1;
      if (this.score % 15 === 0) {
        this.defaultSpawnInterval /= 2;
      }
    }, 1000);
  }
  spawnWord() {
    this.spawnT = setTimeout(() => {
      this.addWord();
      this.spawnWord();
    }, this.defaultSpawnInterval + Math.floor((Math.random() - 0.5) * 1000));
  }
  addWord() {
    const candidate = this.keywords.filter(
      (keyword) => !this.onScreenKeywords.includes(keyword)
    );
    const text = candidate[Math.floor(Math.random() * candidate.length)];
    this.onScreenKeywords.push(text);
    this.makeWord(text);
  }
  makeWord(text) {
    const elm = document.createElement("div");
    elm.classList.add("word");
    elm.innerHTML = `<span>${text}</span>`;
    const img = document.createElement("img");
    img.src = cloud;
    elm.appendChild(img);
    const pos = {
      bottom: -20,
      left: Math.random() * (this.width - 160),
    };
    const word = {
      elm: elm,
      pos: pos,
      text: text,
      speed: this.defaultSpeed + Math.random() * this.speedVariable,
    };
    this.words.push(word);
    this.canvas.appendChild(elm);
  }
  removeWord(text) {
    const wordIdx = this.words.findIndex((word) => word.text === text);
    if (wordIdx < 0) {
      return;
    }
    const onScreenIdx = this.onScreenKeywords.findIndex(
      (word) => word.text === text
    );
    this.canvas.removeChild(this.words[wordIdx].elm);
    this.words.splice(wordIdx, 1);
    this.onScreenKeywords.splice(onScreenIdx, 1);
  }
  update() {
    this.words.forEach((word) => {
      word.pos.bottom += word.speed;
      if (word.pos.bottom > this.height - 210) {
        this.life -= 1;
        this.removeWord(word.text);
        this.showStatus();
      }
    });
  }
  move() {
    this.words.forEach((word) => {
      word.elm.style.bottom = word.pos.bottom + "px";
      word.elm.style.left = word.pos.left + "px";
    });
  }
  showStatus() {
    // life info
    this.statusElm.innerHTML = `
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z" />
      </svg>
      <span>${this.life}</span>
      `;
  }
  init() {
    this.inputElm.style.display = "block";
    this.startElm.style.display = "none";
    this.inputWordElm.focus();
  }
  start() {
    this.init();
    this.showStatus();
    this.addWord();
    this.spawnWord();
    this.scoring();
    window.requestAnimationFrame(this.animate.bind(this));
  }
  gameover() {
    clearTimeout(this.spawnT);
    clearInterval(this.scoreT);
    this.finalScoreElm.innerHTML = `최종 점수 : ${this.score} 초`;
    this.resultElm.style.display = "flex";
  }
  animate(t) {
    this.update();
    this.move();
    if (this.life > 0) {
      window.requestAnimationFrame(this.animate.bind(this));
    } else {
      this.gameover();
    }
  }
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
}

window.onload = () => {
  const app = new App();
};
