import { state, closeWindow } from "./model.js";
import { GAMES_DETAIL } from "./config.js";

export const getJSON = async function (url) {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message}`);

  return data;
};

export const generateView = function (results, parentElement) {
  state.push(results);

  const upperName = results.name[0].toUpperCase() + results.name.slice(1);
  if (!results.background_image) return;

  const markup = `

     <div class="game__div" data-id = "${results.id}">
       <h1 class="game__name">${upperName}</h1>
       <p class="release__date">${results.released}</p>
       <img class="game__image" src="${results.background_image}" alt="" />
     </div>
   `;
  parentElement.insertAdjacentHTML("beforeend", markup);
};

const gameDescription = async (elementId) => {
  const res = await fetch(`${GAMES_DETAIL(elementId)}`);
  const data = await res.json();
  if (!res.ok) throw new Error(`${data.message}`);

  return data.description_raw;
};

export const cardView = async function (el) {
  const closestTar = el.target.closest(".game__div").getAttribute("data-id");
  const parentElement = document.querySelector(".open__window");

  const findEl = state.find((e) => {
    return e.id === +closestTar;
  });
  const elementId = findEl.id;
  const getPlatform = (platform) => {
    if (platform.includes("PlayStation")) return "playstation";
    if (platform.includes("Xbox")) return "xbox";
    if (platform.includes("PC")) return "steam";
    if (platform.includes("Nintendo")) return "nintendo";
    if (platform.includes("IOS")) return "apple";
    else return "gamepad";
  };

  const screenShots = findEl.short_screenshots.map(
    (screen) => `<img src="${screen.image}" alt="" />`
  );

  const getStars = () => {
    const stars = [];
    const rating = Math.floor(findEl.rating);

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          `<img alt="star" key=${i} src=./src/img/platforms/star-full.png></img>`
        );
      } else {
        stars.push(
          `<img alt="star" key=${i} src = ./src/img/platforms/star-empty.png></img>`
        );
      }
    }
    return stars.join("");
  };

  const markup = `
            <div class="window__div">
            <div class = "iks"></div>
              <div class="window__first">
                <div class = "window__first__div">
                  <h1 class="window__game--name">${findEl.name}</h1>
                  <div class="window__rating">
                    <p>Ratings: <span>${findEl.rating}</span></p>
                    <div>
                   ${getStars()}
                    </div>
                  </div>
                </div>
                <div class="window__platforms">
                  <h1>Platforms</h1>
                  <div>
                    ${findEl.parent_platforms
                      .map((data) => {
                        return `<img src="./src/img/platforms/${getPlatform(
                          data.platform.name
                        )}.svg" alt="" />`;
                      })
                      .join(" ")}
                  </div>
                </div>
              </div>
                <img src="${
                  findEl.background_image
                }" alt="" class="window__main--image" />
                <div class ="game__description">
                <h1>About Game</h1>
                  <p>${await gameDescription(elementId)}</p>
                </div>
                <div class="window__description">

                  <div class = "window__tags">
                    <h1>Tags</h1>
                    <p>${findEl.platforms.map(
                      (element) => element.platform.name
                    )}</p>
                  </div>
                  <div class = "window__score">
                  <h1>Metascore</h1>
                  <p>${findEl.metacritic}</p>
                  </div>
                </div>
                <div class="window__description--next">
                  <div class = "window__genre">
                    <h1>Genre</h1>
                    <p>${findEl.genres.map((element) => element.name)}</p>
                  </div>
                  <div class = "window__date">
                  <h1>Release date</h1>
                  <p>${findEl.released}</p>
                  </div>
                </div>
                <div class="window__screenshots">
                  ${screenShots.join("")}
                </div>
            </div>
            `;
  parentElement.insertAdjacentHTML("beforeend", markup);
  const iks = document.querySelector(".iks");
  iks.addEventListener("click", function (el) {
    document.querySelector(".overlay").classList.toggle("hidden");
    closeWindow(el);
  });
};

export const searchResults = function () {
  return inputResults;
};
