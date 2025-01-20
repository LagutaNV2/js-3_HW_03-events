import "./game.css";
import Score from "./score";
import Goblin from "../Characters/goblin";
import Cursor from "./cursor";

export default class Game {
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
    alert(
      `Игра окончена! Total misses: ${this.score.misses}, Total hits: ${this.score.hits}`,
    );
    window.location.reload(); // Перезапуск игры
  }
}
