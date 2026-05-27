function validateTitle(request, response, next) {
    const body = request.body;
    const { title } = body;
    const realTitle = title.trim(); // titolo nazista
    // TITLE obbligatorio e 
    // deve essere tra i 4 e i 50 caratteri
    if (realTitle === '') {
        response.status(400)
            .json({
                error: 'il campo title è obbligatorio: procedi con línserimento di un valore valido'
            });
        return;
    } else if (realTitle.length < 4 || realTitle.length > 50) {
        response.status(400)
            .json({
                error: 'il titolo deve essere tra i 4 e i 50 caratteri spazi inclusi'
            });
        return;
    };
    request.realTitle = realTitle;
    next();
}

export default validateTitle;