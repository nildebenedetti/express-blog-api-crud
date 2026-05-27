function validateTags(request, response, next) {
    const body = request.body;
    const { tags } = body;
    // tags deve essere un array di stringhe
    if (!Array.isArray(tags) || tags.length === 0 || tags.some(tag => {
        return typeof tag !== 'string'
    })) {
        response.status(400)
            .json({
                error: 'il campo tags deve essere un array di stringhe, non vuoto'
            });
        return;
    }
    next();
}

export default validateTags;