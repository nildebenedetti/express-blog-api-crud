function validatePublish(request, response, next) {
    const body = request.body;
    const { published } = body;
        // published deve essere boolean
    if (typeof published !== 'boolean') {
        response.status(400)
        .json({
            error: "published deve corrispondere obbligatoriamente a 'true' oppure 'false'"
        });
        return;
    }
    next();
}

export default validatePublish;