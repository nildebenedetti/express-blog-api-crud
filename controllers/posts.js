import { posts } from '../contents/posts.js';

// function logic per index route 

function index(request, response) {
    // usiamo il destrucrutring per prendere il parametro dalla request
    const {
        tags: tag,
        maxPrepTime } = request.query;

    const maxPrepTimeReal = parseInt(maxPrepTime); // converto d stringa a intero

    let postsFiltered = posts
    // altrimenti parte tutto il mio viaggione

    const realTag = tag.trim().toLowerCase(); // puliamo la query

    if (tag !== undefined) {
        postsFiltered = postsFiltered.filter(post => {
            // cicliamo l`array dei tag dentro il post (!!!) e restituiamo 
            // tutti i current che mtchano il tag, anche parzialmente

            for (let i = 0; i < post.tags.length; i++) {
                const currentTag = post.tags[i].toLowerCase();
                if (currentTag.includes(realTag)) {
                    return true;
                };
            }
            return false;
        });
    }

    if (!isNaN(maxPrepTimeReal)) {
        postsFiltered = postsFiltered.filter( post => {
            // Teniamo il post solo se il suo tempo è INFERIORE o UGUALE al massimo richiesto
            return post.prep_time <= maxPrepTimeReal;
        });
    }
    response.json(postsFiltered)
}

// function logic per show route

function show(request, response) {
    const { id } = request.params; // destructuring di id da parametri della callback response

    const realId = Number(id.trim()); // normalizzo id a numero

    // se líd ricevuto e numberizzato non è un numero
    // allora response.status(400) BAD REQUEST
    // e restituiamo un json con errore esplicativo ID NON CORRETTO
    // concludo con early return
    // se id negativo
    // allora response.status(400) BAD REQUEST
    // e restituiamo un json con errore esplicativo ID Negativo
    // altrimenti FACCIO LA FIND su posts
    // se il risultato è undefined lancio errore 404: id non presente
    // se trovato, la mia response saara'un json con object: post e msg: post trovato con successo

    if (isNaN(realId)) {
        response.status(400)
            .json({
                error: 'Id non corretto: inserire un numero!'
            })
        return;
    } else if (realId <= 0) {
        response.status(400)
            .json({
                error: 'ripigliati... hai inserito un valore negativo'
            })
        return;
    }

    const postFound = posts.find(post => {
        return post.id === realId;
    });

    if (!postFound) {
        response.status(404).json({
            error: `post con id ${realId} non trovato`
        })
    }
    response.json({
        error: 'nessun errore!',
        content: postFound
    })
    return;
};

// function logic per create route


function create(request, response) {
    const newPost = request.body;
    console.log("Dati ricevuti da User", newPost);

    response.status(201).json({
        success:true,
        message:'test post eseguito con successo!',
        data:newPost
    })
};

// function logic per put route

function put(request, response) {
    const { id } = request.params; // destructuring di id da parametri della callback response

    const realId = Number(id.trim()); // normalizzo id a numero

    if (isNaN(realId)) {
        response.status(400)
            .json({
                error: 'Id non corretto: inserire un numero!'
            })
        return;
    } else if (realId <= 0) {
        response.status(400)
            .json({
                error: 'ripigliati... hai inserito un valore negativo'
            })
        return;
    }
    const postFound = posts.find(post => {
        return post.id === realId;
    });
    if (!postFound) {
        response.status(404).json({
            error: `post con id ${realId} non trovato`
        })
    }
    response.json({
        message: `modificati tutti i campi di post!`,
        response: postFound
    });

};

// function logic per path

function patch(request, response) {
    const { id } = request.params; // destructuring di id da parametri della callback response

    const realId = Number(id.trim()); // normalizzo id a numero

    if (isNaN(realId)) {
        response.status(400)
            .json({
                error: 'Id non corretto: inserire un numero!'
            })
        return;
    } else if (realId <= 0) {
        response.status(400)
            .json({
                error: 'ripigliati... hai inserito un valore negativo'
            })
        return;
    }
    const postFound = posts.find(post => {
        return post.id === realId;
    });
    if (!postFound) {
        response.status(404).json({
            error: `post con id ${realId} non trovato`
        })
    }
    response.json({
        message: `modificato il campo richiesto per il post!`,
        response: postFound
    });

};

// function logic per delete route

function destroy(request, response) {
    const { id } = request.params; // destructuring di id da parametri della callback response

    const realId = Number(id.trim()); // normalizzo id a numero

    if (isNaN(realId)) {
        response.status(400)
            .json({
                error: 'Id non corretto: inserire un numero!'
            })
        return;
    } else if (realId <= 0) {
        response.status(400)
            .json({
                error: 'ripigliati... hai inserito un valore negativo'
            })
        return;
    }
    // facciamo con la findIndex: se lo trova restituisce indice di id, altrimenti -1
    // se trovato, faccimo la splice
    //se non trovato lanciamo 404
    const postIndex = posts.findIndex(post => post.id === realId);

    if (postIndex === -1) {
        response.status(404).json({
            message: `nessun post con id ${realId}`
        })
    } else {
        // faccio la splice su index
        posts.splice(postIndex, 1);
        response.send(204);
    }
};

export {
    index,
    show,
    put,
    patch,
    create,
    destroy
};