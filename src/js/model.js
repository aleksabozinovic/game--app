import {
  POPULAR_GAMES_API,
  NEW_GAMES_API,
  UPCOMING_GAMES_API,
  SEARCH_GAME_URL,
} from "./config.js";
import * as helper from "./helper.js";

export const state = [];

const openWindow2 = document.querySelector(".open__window");
const overlay = document.querySelector(".overlay");

export const loadPopularGame = async function () {
  try {
    const parentElement = document.querySelector(".popular__games--div");
    const data = await helper.getJSON(`${POPULAR_GAMES_API}`);

    const { results } = data;

    results.forEach((results) => {
      helper.generateView(results, parentElement);
    });
  } catch (err) {
    throw err;
  }
};

export const upcomingGames = async function () {
  try {
    const parentElement = document.querySelector(".upcoming__games--div");
    const data = await helper.getJSON(`${UPCOMING_GAMES_API}`);

    const { results } = data;

    results.forEach((results) => {
      helper.generateView(results, parentElement);
    });
  } catch (err) {
    throw err;
  }
};
export const newGames = async function () {
  try {
    const parentElement = document.querySelector(".new__games--div");
    const data = await helper.getJSON(`${NEW_GAMES_API}`);

    const { results } = data;

    results.forEach((results) => {
      helper.generateView(results, parentElement);
    });
  } catch (err) {
    throw err;
  }
};
export const openWindow = async function (el) {
  const closestEl = el.target.closest(".game__div");

  if (!closestEl) return;

  closestEl.classList.add("active");
  overlay.classList.remove("hidden");
  openWindow2.classList.remove("hidden");
  helper.cardView(el);
};

export const closeWindow = function (el) {
  const gameDiv = document.querySelectorAll(".game__div");

  gameDiv.forEach((element) => element.classList.remove("active"));
  el.target.classList.add("hidden");
  openWindow2.classList.add("hidden");
  openWindow2.innerHTML = ``;
};

export const loadSearchResults = async function (el) {
  try {
    const parentElement = document.querySelector(".search__games--div");
    const searchedH1 = document.querySelector(".searched__games .games__h1");
    let inputResults = document.querySelector(".nav__input");

    const data = await helper.getJSON(`${SEARCH_GAME_URL(inputResults.value)}`);

    inputResults.value = "";

    searchedH1.classList.remove("hidden");

    const { results } = data;

    parentElement.innerHTML = "";

    results.forEach((results) => {
      helper.generateView(results, parentElement);
    });
  } catch (err) {
    throw err;
  }
};

export const clearSearchedGames = function () {
  const parentElement = document.querySelector(".search__games--div");
  const searchedH1 = document.querySelector(".searched__games .games__h1");
  searchedH1?.classList.add("hidden");

  parentElement.innerHTML = "";
};

const init = function () {
  loadPopularGame();
  upcomingGames();
  newGames();
};
init();
