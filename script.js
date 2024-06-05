const movieSection = document.getElementById("movie-section");
const topPick = document.getElementById("top-pick");
const searchBtn = document.getElementById("search-btn");
const search = document.getElementById("search");
const API = "https://www.omdbapi.com/?i=tt3896198&apikey=a1cd784a";
const spinner = document.getElementById("spinner");
// const DisplayMovies = async () => {
//   let response = await axios(API);
//   let data = response.data;
//   const Title = document.createElement("p");
//   const Poster = document.createElement("img");
//   Title.textContent = `${data.Title}`;
//   topPick.style.backgroundImage = `url(${data.Poster})`;
//   //   Poster.src = `${data.Poster}`;
//   //     Poster.alt = `${data.Title}`;
//   //   Poster.classList.add("Hero-Poster");
//   document.getElementById("top-pick").appendChild(Title);
//   //   document.getElementById("top-pick").appendChild(Poster);
// };
// DisplayMovies();

const searchAPI = "https://www.omdbapi.com/?i=tt3896198&apikey=a1cd784a";
const searchMovie = async () => {
  spinner.classList.remove("hidden");
  let userinput = search.value;
  userinput = userinput.trim();
  let response = await axios(`${searchAPI}&s=${userinput}`);
  console.log(response);
  try {
    if (response.status === 200) {
      spinner.classList.add("hidden");
      let data = response.data.Search;
      data.forEach((element) => {
        const MovieContainer = document.createElement("div");
        MovieContainer.id = "movie-card";
        MovieContainer.className = "movie-card";
        const Title = document.createElement("p");
        Title.className = "title";
        const Poster = document.createElement("img");
        Poster.className = "poster";
        Title.textContent = `${element.Title}`;
        Poster.alt = `${element.Title}`;
        if (element.Poster === "N/A") {
          Poster.src = "https://via.placeholder.com/400";
        } else {
          Poster.src = `${element.Poster}`;
        }
        movieSection.append(MovieContainer);
        MovieContainer.append(Title);
        MovieContainer.append(Poster);
      });
    } else if (response.message === "Network Error") {
      console.log("Network Error");
      console.log(response);
    }
  } catch (error) {
    console.warn(error);
  }
};
const userValue = document.getElementById("user-value");
searchBtn.addEventListener("click", () => {
  let value = search.value.trim();
  if (value !== "") {
    userValue.textContent = `Search Results Of "${value}"`;
    movieSection.innerHTML = "";
    searchMovie();
  } else {
    movieSection.innerHTML = "<div class='start'>No Result Found.</div>";
  }
});
