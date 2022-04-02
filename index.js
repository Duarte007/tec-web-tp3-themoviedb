const getPopularMovies = () => {
  const url =
    "https://api.themoviedb.org/3/movie/popular?api_key=86d40ddd2005404ed8a970a382d19c23";

  fetch(url, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      let textHTML = "";
      const prefixImage = "https://image.tmdb.org/t/p/w500/";
      data.results.forEach((movie) => {
        textHTML = `
        <div class="card" style="width: 18rem">
        <img src="${
          prefixImage + movie.poster_path
        }" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
           ${movie.overview}
          </p>
          <a href="#" class="btn btn-primary">Mais detalhes...</a>
        </div>
        `;

        document.getElementById("movies").innerHTML += textHTML;
      });
    });
};
document.body.onload = getPopularMovies;
