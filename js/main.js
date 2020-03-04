window.onload = () => {
  if (window.innerWidth < 993) {
    const sidenav = document.getElementById("options");
    sidenav.classList.add("sidenav");
    M.Sidenav.init(sidenav);
  }
};

function closeSidenav(event) {
  const options = document.getElementById("options");
  if (event.key === "Escape" && options.className.includes("sidenav")) {
    M.Sidenav.getInstance(options).close();
  }
}

window.addEventListener("keydown", closeSidenav);

window.addEventListener("resize", () => {
  if (window.innerWidth < 993) {
    const sidenav = document.getElementById("options");
    sidenav.classList.add("sidenav");
    M.Sidenav.init(sidenav);
  } else {
    const sidenav = document.getElementById("options");
    sidenav.classList.remove("sidenav");
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const sideNavElem = document.querySelectorAll(".sidenav");
  M.Sidenav.init(sideNavElem);
  const tooltippedElems = document.querySelectorAll(".tooltipped");
  M.Tooltip.init(tooltippedElems, {
    enterDelay: 0,
    exitDelay: 0,
    inDuration: 0,
    outDuration: 0
  });
  const dropdowns = document.querySelectorAll(".dropdown-trigger");
  M.Dropdown.init(dropdowns, {
    constrainWidth: false,
    hover: true,
    alignment: "left"
  });
});

function toggleOptions() {
  const options = document.getElementById("options");
  if (options.className.includes("sidenav")) {
    M.Sidenav.getInstance(document.getElementById("options")).open();
  } else {
    if ([...options.classList].includes("hide")) {
      options.classList.remove("hide");
      [...document.getElementsByClassName("notes")].forEach(note => {
        note.classList.remove("l4");
        note.classList.add("l3");
      });
    } else {
      options.classList.add("hide");
      [...document.getElementsByClassName("notes")].forEach(note => {
        note.classList.remove("l3");
        note.classList.add("l4");
      });
    }
  }
}

function changeCardColor(color) {
  let card;
  while (true) {
    if (!card) card = this.parentElement;
    card = card.parentElement;
    if (card.className == "card") break;
  }
  card.style.backgroundColor = color;
  const selected = card.getElementsByClassName("active-color")[0];
  selected.classList.remove("active-color");
  this.innerHTML = selected.innerHTML;
  selected.innerHTML = "";
  this.classList.add("active-color");
}
