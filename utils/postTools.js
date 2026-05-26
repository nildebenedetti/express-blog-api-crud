
// creazione id progressivo
const idProgressiveEnumerator = () => {
    const lastPost = posts[posts.length - 1];
    const lastPostId = lastPost.id;
    return lastPostId + 1;
};

export {
    idProgressiveEnumerator
};

//creazione slug da name + validazione duplicati
// N.B: nelle validazioni vedi di trimmare il title!!!
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

    return slug;
}