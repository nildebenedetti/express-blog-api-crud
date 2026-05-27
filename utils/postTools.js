
// creazione id progressivo
const idProgressiveEnumerator = (postArray) => {
    const lastPost = postArray[postArray.length - 1];
    const lastPostId = lastPost.id;
    return lastPostId + 1;
};



//creazione slug da name + validazione duplicati
const craftSlug = (reqBody, postArray) => {
    // prendiamo il nome del post da post
    // creiamo la slug e la facciamo con un replace all spazio vs -
    // togliamo tutti i caratteri speciali ???
    const postTitle = reqBody.title; 
    let slug = postTitle
    .trim() // rimuove spazi iniziali o finali
    .toLowerCase() // rende in minuscolo
    .replace(/[^a-zA-Z0-9\s]/g, '') // buongiorno RegEx potentissimaaa
    .replaceAll(" ", "-");

    // per evitare la creazione di duplicati devo 
    // crearmi un increment a 0 e poi impostare un do while

    let increment = 0;
    let finalSlug;
    let postwithSameSlug;

    do {

        // qui mi metto lo slug che viene aggiornato ad ogni giro di check
        finalSlug = slug + ((increment === 0) ? '' : `-${increment}`)

        // CERCA SE c`è uno slug uguale a questo,
            // SE C'É increment++
        postwithSameSlug = postArray.find(post => {
            return post.slug === finalSlug;
        });

        increment++;
    } while (postwithSameSlug !== undefined); // FALLO FINO A QUANDO non ce ne sono più

    return finalSlug; // RESTITUISCI LO SLUG + "-increment"
}

// generare data e ora di pubblicazione
const generateCurrentTime = () => {
    const currentTime = new Date();
    return currentTime.toISOString();
};

export {
    idProgressiveEnumerator,
    craftSlug,
    generateCurrentTime
};

