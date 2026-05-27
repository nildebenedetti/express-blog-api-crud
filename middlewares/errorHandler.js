function errorHandler(error, request, response, next) {
    //unico middleware della vita con 4 parametri
    console.group(error);

    response.status(500)
    .json({
        error:'errore fatale, un lampo di disperazione illumina la tua schermta!',
        result: null
    })
}

export default errorHandler;