var lastPage = 1
var func = 'getPopularMovies'

$(function() {
    $("li").click(function() {
        $("li").removeClass("active");
        $(this).addClass("active");
    });
});


function handleWithPagination(page, action) {
    if (page) {
        TheMovieDbController[func](page).then((response) => {
            lastPage = response.total_pages
            if (page > response.total_pages || page == response.total_pages - 1 || page == response.total_pages - 2 || page == response.total_pages - 3) {
                page = response.total_pages - 3
            }

            document.getElementById('first-page').setAttribute("onclick", `handleWithPagination(${page})`)
            document.getElementById('first-page').textContent = page
            document.getElementById('first-page').focus()
            document.getElementById('first-page').parentElement.className = "page-item active"
            document.getElementById('second-page').setAttribute("onclick", `handleWithPagination(${page+1})`)
            document.getElementById('second-page').textContent = page + 1
            document.getElementById('second-page').parentElement.className = "page-item"
            document.getElementById('third-page').setAttribute("onclick", `handleWithPagination(${page+2})`)
            document.getElementById('third-page').textContent = page + 2
            document.getElementById('third-page').parentElement.className = "page-item"
            document.getElementById('previous').parentElement.className = "page-item"
            document.getElementById('next').parentElement.className = "page-item"
            $('html,body').scrollTop(0);
        })
    }

    if (!page && action === "previous") {
        const page = Number(document.getElementById('first-page').textContent || 2) - 1
        handleWithPagination(page)
    } else if (!page && action === "next") {
        const page = Number(document.getElementById('first-page').textContent || 2) + 1
        handleWithPagination(page)
    }

}