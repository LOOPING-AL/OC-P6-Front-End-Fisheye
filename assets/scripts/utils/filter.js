import { domElements } from "../domElements/domElements.js";

export function useFilter(e) {
  const choices = ["Popularité", "Date", "Titre"];
  if (domElements.filter?.childElementCount === 1) {
    domElements.filterIcon?.classList.add("open");
    choices.forEach((choice, id) => {
      if (choice !== domElements.filter.children[0].outerText) {
        const separation = document.createElement("div");
        separation.classList.add("filter-choices-separation");
        separation.id = "list";
        domElements.filter.appendChild(separation);

        const div = document.createElement("div");
        div.classList.add("filter-choices-choice");
        div.id = "list";
        div.textContent = choices[id];
        domElements.filter.appendChild(div);
      }
    });
    return;
  }
  if (choices.includes(e.target.textContent)) {
    document.querySelectorAll("#list").forEach((choice) => {
      choice.style.animationName = "disappear-animate";
    });
    domElements.filterIcon?.classList.remove("open");
    setTimeout(() => {
      while (domElements.filter?.children.length > 1)
        domElements.filter?.children[1].remove();
    }, 200);
    domElements.theChoice.innerHTML = e.target.textContent;
    return;
  }
}
