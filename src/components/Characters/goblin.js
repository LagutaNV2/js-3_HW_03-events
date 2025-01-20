import "./character.css";

export default class Goblin {
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
    this.cells.forEach((cell) => {
      cell.addEventListener("click", (event) =>
        this.handleCellClick(event, cell),
      );
    });

    console.log("Goblin initialized with:", {
      boardEl: this.boardEl,
      score: this.score,
      onMissCallback: this.onMissCallback,
    });
  }

  // Используем new URL(): для создания объекта URL из указанной строки и базового пути:
  //  Первый аргумент — относительный путь к ресурсу
  //  Второй аргумент - import.meta.url:
  //    специальный объект, доступный в модульной системе JavaScript (ES Modules);
  //    представляет полный URL текущего JavaScript-файла, в котором выполнен этот код.
  createCharacter() {
    const img = document.createElement("img");
    img.src = new URL("./goblin.png", import.meta.url);
    img.classList.add("character", "invisible");

    // Обработчик клика на самого гоблина:
    // Гоблин считается "попавшим" только при клике по самому изображению, а не по ячейке.
    // Предотвращает всплытие:
    //     клик на гоблина вызовет сначала его обработчик (this.hit()),
    //     а затем обработчик ячейки (impactField):
    img.addEventListener("click", (event) => {
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
