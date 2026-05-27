function notFound(request, response, next) {
    response.status(404)
    .json({
        error:'líndirizzo non esiste... torna sui tuoi passi',
        results: null
    })
}

export default notFound;