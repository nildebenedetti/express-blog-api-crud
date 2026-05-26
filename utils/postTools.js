const idProgressiveEnumerator = () => {
    const lastPost = posts[posts.length - 1];
    const lastPostId = lastPost.id;
    return lastPostId + 1;
};

export {
    idProgressiveEnumerator
};