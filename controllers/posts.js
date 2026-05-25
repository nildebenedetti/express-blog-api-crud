import { posts } from '../contents/posts.js';

// function logic per index route 

function index(request, response) {
    // usiamo il destrucrutring per prendere il parametro dalla request
    const { tags: tag } = request.query;

    // SE tag é uguale a undefined vuol dire che nella query non c'e, non sto cercando 
    // nulla: quindi passiamo tutta la lista e adios
    if (tag === undefined) {
        response.json(posts);
        return; // Ci fermiamo qui
    };

    // altrimenti parte tutto il mio viaggione

    const realTag = tag.trim().toLowerCase(); // puliamo la query

    const postsFiltered = posts.filter(post => {
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
    response.json(postsFiltered)
};

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
    response.json({
        message: 'creato un nuovo post!'
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