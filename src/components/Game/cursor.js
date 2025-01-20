export default class Cursor {
  constructor() {
    this.initCustomCursor();
  }

  initCustomCursor() {
    const hammer = document.createElement("div");
    hammer.classList.add("custom-cursor");
    document.body.appendChild(hammer);

    document.addEventListener("mousemove", (event) => {
      hammer.style.left = `${event.pageX}px`; // отслеживает движения мыши на веб-странице
      hammer.style.top = `${event.pageY}px`; //     и обновляет положение элемента hammer
    });
  }
}
