// b72ad280349c4c51ac307a72948f2b00;
import * as model from "./model.js";
//

const searchDiv = document.querySelector(".nav__search--div");
const searchButton = document.querySelector(".nav__search");
const burger = document.querySelector(".burger");

const showGame = async function () {
  try {
    await model.init;
  } catch (err) {
    console.error(err);
  }
};

const searchGame = async function (query) {
  await model.loadSearchResults(query);
};

const showCard = async function () {
  const games = document.querySelectorAll(".games");
  const overlay = document.querySelector(".overlay");

  games.forEach((e) => {
    e.addEventListener("click", (el) => {
      model.openWindow(el);
    });
  });
  overlay.addEventListener("click", (el) => {
    model.closeWindow(el);
  });
};

const searchView = function (e) {
  const input = e.target.firstElementChild.value;

  if (input === "") {
    model.clearSearchedGames();
    return;
  }
  searchGame();
};

searchDiv.addEventListener("submit", function (e) {
  e.preventDefault();
  searchView(e);
});

searchButton.addEventListener("submit", function (e) {
  e.preventDefault();
  searchView(e);
});

// BURGER
const listElement = document.querySelectorAll(".nav__ul li ");
listElement.forEach((element) =>
  element.addEventListener("click", () => {
    document.querySelector(".nav__ul").classList.toggle("open");
    document.querySelector(".nav__search--div").classList.toggle("open");
    document.querySelector(".popular__games").classList.toggle("open");
    burger.classList.toggle("open");
  })
);
const openBurger = function (e) {
  e.target.classList.toggle("open");
  listElement.forEach((element) => {
    element.classList.toggle("open");
  });
  document.querySelector(".nav__search--div").classList.toggle("open");
  document.querySelector(".popular__games").classList.toggle("open");
  document.querySelector(".nav__ul").classList.toggle("open");
};

const init = function () {
  showGame();
  showCard();
  burger.addEventListener("click", (e) => openBurger(e));
};
init();
