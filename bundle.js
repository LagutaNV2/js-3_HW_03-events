/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 336:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "2dbd01ce16c0fa83cb67.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			792: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

;// CONCATENATED MODULE: ./src/components/Game/score.js
class Score {
  constructor() {
    this.hits = 0; // Количество попаданий
    this.misses = 0; // Количество промахов
  }
  increment() {
    this.hits += 1;
    console.log(`Hit! Total hits: ${this.hits}`);
  }
  miss(onMissCallback) {
    this.misses += 1;
    console.log(`Missed! Total misses: ${this.misses}`);
    if (this.misses >= 5 && typeof onMissCallback === "function") {
      onMissCallback();
    } else {
      console.warn("onMissCallback is not a valid function:", onMissCallback);
    }
  }
}
;// CONCATENATED MODULE: ./src/components/Characters/goblin.js

class Goblin {
  constructor(boardEl, score, onMissCallback) {
    this.boardEl = boardEl;
    this.characterImg = this.createCharacter();
    this.cells = Array.from(boardEl.querySelectorAll(".impactField"));
    this.currentCell = null;
    this.intervalId = null;
    this.score = score;
    this.onMissCallback = onMissCallback; // Коллбэк для промахов
    this.wasClicked = false; // Флаг, указывающий, был ли гоблин кликнут

    // Добавляем обработчики кликов на все ячейки
    this.cells.forEach(cell => {
      cell.addEventListener("click", event => this.handleCellClick(event, cell));
    });
    console.log("Goblin initialized with:", {
      boardEl: this.boardEl,
      score: this.score,
      onMissCallback: this.onMissCallback
    });
  }

  // Используем new URL(): для создания объекта URL из указанной строки и базового пути:
  //  Первый аргумент — относительный путь к ресурсу
  //  Второй аргумент - import.meta.url:
  //    специальный объект, доступный в модульной системе JavaScript (ES Modules);
  //    представляет полный URL текущего JavaScript-файла, в котором выполнен этот код.
  createCharacter() {
    const img = document.createElement("img");
    img.src = new URL(/* asset import */ __webpack_require__(336), __webpack_require__.b);
    img.classList.add("character", "invisible");

    // Обработчик клика на самого гоблина:
    // Гоблин считается "попавшим" только при клике по самому изображению, а не по ячейке.
    // Предотвращает всплытие:
    //     клик на гоблина вызовет сначала его обработчик (this.hit()),
    //     а затем обработчик ячейки (impactField):
    img.addEventListener("click", event => {
      event.stopPropagation(); // Останавливает всплытие события
      this.hit();
    });
    return img;
  }
  startMoving() {
    console.log("Starting Goblin movement...");
    this.intervalId = setInterval(() => this.move(), 1000);
  }
  move() {
    // Скрываем гоблина
    if (this.currentCell) {
      this.currentCell.classList.remove("visible");
      if (!this.wasClicked) {
        this.score.miss(this.onMissCallback); // Учитываем промах
        console.log("Missed Goblin! Total misses:", this.score.misses);
      }
    }

    // Сбрасываем флаг кликов
    this.wasClicked = false;

    // Выбираем случайную ячейку для гоблина
    const randomIndex = Math.floor(Math.random() * this.cells.length);
    this.currentCell = this.cells[randomIndex];
    this.currentCell.appendChild(this.characterImg);
    this.characterImg.classList.remove("invisible");
    this.characterImg.classList.add("visible");
    console.log("Goblin moved to:", this.currentCell);
  }
  handleCellClick(event, cell) {
    if (cell === this.currentCell) {
      // Если кликнули на ячейку с гоблином, метод `hit` уже обрабатывает это
      console.log("Clicked on Goblin's cell., event:", event);
      return;
    }

    // Если кликнули на пустую ячейку
    console.log("Missed! Clicked wrong cell:", cell, event);
    // this.score.miss(this.onMissCallback);
  }
  hit() {
    if (!this.characterImg.classList.contains("invisible")) {
      this.wasClicked = true; // Устанавливаем флаг, что гоблин был кликнут
      this.characterImg.classList.add("invisible"); // Скрываем гоблина
      this.score.increment(); // Увеличиваем счет попаданий
      console.log("Hit Goblin! Total hits:", this.score.hits);
    }
  }
}
;// CONCATENATED MODULE: ./src/components/Game/cursor.js
class Cursor {
  constructor() {
    this.initCustomCursor();
  }
  initCustomCursor() {
    const hammer = document.createElement("div");
    hammer.classList.add("custom-cursor");
    document.body.appendChild(hammer);
    document.addEventListener("mousemove", event => {
      hammer.style.left = `${event.pageX}px`; // отслеживает движения мыши на веб-странице
      hammer.style.top = `${event.pageY}px`; //     и обновляет положение элемента hammer
    });
  }
}
;// CONCATENATED MODULE: ./src/components/Game/game.js




class Game {
  constructor() {
    this.boardEl = null;
    this.goblin = null;
    this.score = null;
    this.intervalId = null;
    // this.missed = 0;
  }
  init() {
    console.log("Initializing game...");
    this.addGameField();
    this.score = new Score();
    new Cursor();
    // this.goblin = new Goblin(this.boardEl, this.score, () => this.endGame());
    this.goblin = new Goblin(this.boardEl, this.score, this.endGame.bind(this));
    this.goblin.startMoving();
  }

  // Метод для добавления игрового поля в DOM
  addGameField() {
    const container = document.createElement("div");
    container.classList.add("game-container");
    for (let i = 0; i < 16; i++) {
      const cell = document.createElement("div");
      cell.classList.add("impactField");
      cell.dataset.index = i;
      container.appendChild(cell);
    }
    document.body.appendChild(container); // Добавляем игровое поле в тело документа
    this.boardEl = container; // Сохраняем ссылку на поле в свойстве `boardEl`
  }
  endGame() {
    console.log("Game Over! Clearing interval:", this.goblin.intervalId);
    clearInterval(this.goblin.intervalId); // Останавливаем перемещение гоблина
    alert(`Игра окончена! Total misses: ${this.score.misses}, Total hits: ${this.score.hits}`);
    window.location.reload(); // Перезапуск игры
  }
}
;// CONCATENATED MODULE: ./src/js/app.js
// TODO: write code here

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game();
  game.init();
});
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
})();

/******/ })()
;