
// creazione id progressivo
const idProgressiveEnumerator = () => {
    const lastPost = posts[posts.length - 1];
    const lastPostId = lastPost.id;
    return lastPostId + 1;
};



//creazione slug da name + validazione duplicati
const craftSlug = (post) => {
    // prendiamo il nome del post da post
    // creiamo la slug e la facciamo con un replace all spazio vs -
    // togliamo tutti i caratteri speciali ???
    const postTitle = post.title; 
    let slug =postTitle
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
        postwithSameSlug = posts.find(post => {
            return post.slug === finalSlug;
        });

        increment++;
    } while (postwithSameSlug !== undefined); // FALLO FINO A QUANDO non ce ne sono più

    return finalSlug; // RESTITUISCI LO SLUG + "-increment"
}

export {
    idProgressiveEnumerator,
    craftSlug
};