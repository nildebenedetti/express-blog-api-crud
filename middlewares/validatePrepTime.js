function validatePrepTime(request, response, next) {
    const body = request.body;
    const { prep_time } = body;
    const realPrepTime = Number(prep_time);
    // validazioni
    // PREP TIME deve essere un numero positivo 
    if (isNaN(realPrepTime)) {
        response.status(400)
            .json({
                error: 'Prep_time non corretto: inserire un numero!'
            })
        return;
    } else if (realPrepTime <= 0) {
        response.status(400)
            .json({
                error: 'ripigliati... hai inserito un valore negativo'
            });
        return;
    };
    request.realPrepTime = realPrepTime;
    next();
}
export default validatePrepTime;