export const API_URL = "https://api.rawg.io/api/";
export const KEY = "?key=b72ad280349c4c51ac307a72948f2b00";
export const PAGE_SIZING = "&page_size=9";

const date = new Date();
const day = `${date.getDate()}`.padStart(2, 0);
const month = `${date.getMonth() + 1}`.padStart(2, 0);
const year = date.getFullYear();

export const currentDate = function () {
  return `${year}-${month}-${day}`;
};

export const lastYear = function () {
  return `${year - 1}-${month}-${day}`;
};

export const upcomingYear = function () {
  return `${year + 1}-${month}-${day}`;
};

// export const POPULAR_GAMES_API = `${API_URL}games${KEY}&dates=${lastYear()},${currentDate()}${PAGE_SIZING}&ordering=-rating`;
export const POPULAR_GAMES_API = `${API_URL}games${KEY}${PAGE_SIZING}`;
export const NEW_GAMES_API = `${API_URL}games${KEY}&dates=${lastYear()},${currentDate()}${PAGE_SIZING}&ordering=-added`;
export const UPCOMING_GAMES_API = `${API_URL}games${KEY}&dates=${currentDate()},${upcomingYear()}${PAGE_SIZING}&ordering=-added`;
export const GAMES_API = `${API_URL}games${KEY}`;

export const GAMES_DETAIL = (game_id) => `${API_URL}games/${game_id}${KEY}`;
export const SEARCH_GAME_URL = (game_name) =>
  `${API_URL}games${KEY}&search=${game_name}${PAGE_SIZING}&ordering=-rating`;
