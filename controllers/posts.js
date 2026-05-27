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
    const realId = request.realId; //recupero realId da middleware verificaId
    const postFound = posts.find(post => {
        return post.id === realId;
    });
    if (!postFound) {
        response.status(404).json({
            error: `post con id ${realId} non trovato`
        });
        return;
    }

    let body = request.body;
    const { title, content, image, tags, prep_time, published } = body;
    const realPrepTime = Number(prep_time);
    const realContent = content.trim();
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
    }
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


    // mi creo il mio oggetto
    const postFoundIndex = posts.indexOf(postFound);

    const postOld = posts[postFoundIndex];

    const postUpdated = {
        ...postOld,       // Tiene l'id, lo slug vecchio e la data di creazione
        title: realTitle,
        content: realContent,
        image: null,
        tags: tags,
        prep_time: realPrepTime,
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