const apiKEY = window.API_KEY;
let currentMovies = [];

async function fetchAndDisplayMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    currentMovies = data.results;
    displayMovies(currentMovies);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

function displayMovies(movies) {
  const cardsContainer = document.querySelector(".cards");
  cardsContainer.innerHTML = "";

  movies.forEach((movie) => {
    let div = document.createElement("div");
    div.classList.add(
      "flex",
      "card",
      "shadow",
      "hover:shadow-2xl",
      "bg-amber-50",
      "transition-all",
      "duration-100",
      "hover:scale-105",
      "flex-col",
      "p-2",
      "rounded-lg",
      "cursor-pointer"
    );

    div.dataset.movieId = movie.id;

    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/500x750?text=No+Poster";

    div.innerHTML = `
      <div class="w-full h-64 overflow-hidden rounded-t-lg">
        <img class="thumb w-full h-full object-cover" src="${posterUrl}" alt="${
      movie.title
    }" />
      </div>
      <div class="p-2">
        <h2 class="title text-xl font-medium truncate">${movie.title}</h2>
        <div class="flex justify-between mt-2">
          <p class="font-bold text-sm">${
            movie.release_date ? movie.release_date.substring(0, 4) : "N/A"
          }</p>
          <p class="text-yellow-500 font-bold">⭐ ${movie.vote_average.toFixed(
            1
          )}</p>
        </div>
      </div>`;

    div.addEventListener("click", () => {
      console.log("Clicked movie ID:", movie.id);
    });

    cardsContainer.appendChild(div);
  });
}

function handleSearch() {
  const searchInput = document.querySelector("input[type='text']");
  const searchTerm = searchInput.value.trim();

  if (searchTerm.length > 0) {
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKEY}&query=${encodeURIComponent(
      searchTerm
    )}`;
    fetchAndDisplayMovies(searchUrl);
  } else {
    const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKEY}`;
    fetchAndDisplayMovies(popularUrl);
  }
}

function filterMovies() {
  const searchInput = document.querySelector("input[type='text']");
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm.length > 0) {
    const filteredMovies = currentMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm)
    );
    displayMovies(filteredMovies);
  } else {
    displayMovies(currentMovies);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKEY}`;
  fetchAndDisplayMovies(popularUrl);

  const searchButton = document.querySelector("button");
  searchButton.addEventListener("click", handleSearch);

  const searchInput = document.querySelector("input[type='text']");
  searchInput.addEventListener("input", filterMovies);
});
