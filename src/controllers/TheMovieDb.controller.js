let timeout

const TheMovieDbController = {
    getPopularMovies: (page = 1) => {
        return TheMovieDbService.getPopularMovies(page).then(response => {
            document.getElementById("movies").innerHTML = ""
            lastPage = response.total_pages
            response.results.forEach((movie) => {
                TheMovieDbController.appendMovieCard(movie.title, movie.overview, movie.poster_path, movie.release_date)
            });
            return response
        })
    },
    getUpcomingMovies: (page = 1) => {
        return TheMovieDbService.getUpcomingMovies(page).then(response => {
            document.getElementById("movies").innerHTML = ""
            response.results.forEach((movie) => {
                TheMovieDbController.appendMovieCard(movie.title, movie.overview, movie.poster_path, movie.release_date)
            });
            return response
        })
    },
    getTopRatedMovies: (page = 1) => {
        return TheMovieDbService.getTopRatedMovies(page).then(response => {
            document.getElementById("movies").innerHTML = ""
            response.results.forEach((movie) => {
                TheMovieDbController.appendMovieCard(movie.title, movie.overview, movie.poster_path, movie.release_date)
            });
            return response
        })
    },
    getMoviesByFilter: (page = 1) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            const filter = document.getElementById('search-input').value
            TheMovieDbService.getMoviesByFilter(filter, page).then(response => {
                document.getElementById("movies").innerHTML = ""
                response.results && response.results.forEach((movie) => {
                    TheMovieDbController.appendMovieCard(movie.title, movie.overview, movie.poster_path, movie.release_date)
                });
            })
        }, 300)
    },
    appendMovieCard: (title, overview, posterPath, releaseDate) => {
        const prefixImage = "https://image.tmdb.org/t/p/w500/";
        let textHTML = "";

        overview = overview.length > 200 ? overview.substring(0, 200) + '...' : overview.substring(0, overview.length)

        textHTML = `
        <div class="card" style="width: 18rem">
            <img src="${
                prefixImage + posterPath
            }" class="card-img-top" alt="..." />
            <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <h6>Data de lançamento: ${moment(releaseDate).format('DD/MM/YYYY')}</h6>
            <p class="card-text">
                ${overview}
            </p>
            <a href="#" class="btn btn-primary">Mais detalhes...</a>
        </div>
        `;

        document.getElementById("movies").innerHTML += textHTML;
    }
}