
function verificaId(request, response, next) {
    const { id } = request.params;
    const realId = Number(id.trim()); // normalizzo id a numero
    if (isNaN(realId)) {
        response.status(400)
            .json({
                error: 'Id non corretto: inserire un numero valido!'
            })
        return;
    } else if (realId <= 0) {
        response.status(400)
            .json({
                error: 'ripigliati... hai inserito un valore negativo'
            })
        return;
    }
    request.realId = realId;
    next();

}

export default verificaId;