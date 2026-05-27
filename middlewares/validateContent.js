function validateContent(request, response, next) {
    const body = request.body;
    const { content } = body;
    const realContent = content.trim();
   // CONTENT obbligatorio e
    // deve essere tra i 150 e gli 800 caratteri 
    if (realContent === '') {
        response.status(400)
            .json({
                error: 'il campo title è obbligatorio: procedi con línserimento di un valore valido'
            });
            return;
    } else if (realContent.length < 150 || realContent.length > 800) {
        response.status(400)
            .json({
                error: 'il campo content deve avere una lunghezza minima di 150 caratteri e una massima di 800, spazi inclusi.'
            });
        return;
    };
    request.realContent = realContent;
    next();
}

export default validateContent;