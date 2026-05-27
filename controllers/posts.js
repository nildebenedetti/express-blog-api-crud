import { posts } from '../contents/posts.js';
import { idProgressiveEnumerator, craftSlug, generateCurrentTime } from '../utils/postTools.js';
import validateId from '../middlewares/validateId.js';
import validateTitle from '../middlewares/validateTitle.js';
import validateContent from '../middlewares/validateContent.js';
import validatePrepTime from '../middlewares/validatePrepTime.js';

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
        postsFiltered = postsFiltered.filter(post => {
            // Teniamo il post solo se il suo tempo è INFERIORE o UGUALE al massimo richiesto
            return post.prep_time <= maxPrepTimeReal;
        });
    }
    response.json(postsFiltered)
}

// function logic per show route

function show(request, response) {
    const realId = request.realId; //recupero realId da middleware verificaId
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

    const postFound = posts.find(post => {
        return post.id === realId;
    });

    if (!postFound) {
        response.status(404).json({
            error: `post con id ${realId} non trovato`
        })
        return;
    }
    response.json({
        error: 'nessun errore!',
        content: postFound
    })
    return;
};

// function logic per create route

function create(request, response) {
    const realTitle = request.realTitle;
    const realContent = request.realContent;
    const realPrepTime = request.realPrepTime;
    // prendo quello che ci serve per creare il post da dati utente
    let body = request.body;
    const { image, tags, published } = body;
    // mi creo il mio oggetto
    const newPost = {
        id: idProgressiveEnumerator(posts),
        realTitle,
        slug: '',
        realContent,
        image: null,
        published,
        tags,
        realPrepTime,
        created_at: generateCurrentTime()
    }

    const newPostSlug = craftSlug(body, posts);
    newPost.slug = newPostSlug;

    posts.push(newPost);

    response.status(201).json({
        success: true,
        message: 'test post eseguito con successo!',
        data: newPost
    })
};

// function logic per put route

function put(request, response) {
    let body = request.body;
    const { tags, prep_time, published } = request.body;
    const cleanId = request.realId; //recupero realId da middleware verificaId
    const cleanContent = request.realContent;
    const cleanTitle = request.realTitle;
    const cleanPrepTime = request.realPrepTime;

    const postFound = posts.find(post => {
        return post.id === cleanId;
    });
    if (!postFound) {
        response.status(404).json({
            error: `post con id ${cleanId} non trovato`
        });
        return;
    }

    // mi creo il mio oggetto
    const postFoundIndex = posts.indexOf(postFound);

    const postOld = posts[postFoundIndex];

    const postUpdated = {
        id:postOld.id,
        slug: postOld.slug,
        created_at:postOld.created_at,
        image: postOld.image,   // Tiene l'id, lo slug vecchio e la data di creazione
        title: cleanTitle,
        content: cleanContent,
        image: null,
        tags: tags,
        prep_time: cleanPrepTime,
        published: published
    };

    posts.splice(postFoundIndex, 1, postUpdated);

    response.status(200)
        .json({
            message: `modificati tutti i campi!`,
            response: postUpdated
        });

}

// function logic per delete route

function destroy(request, response) {
    const realId = request.realId; //recupero realId da middleware verificaId
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
    create,
    destroy
};