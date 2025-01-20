export default class Score {
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
