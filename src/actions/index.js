export const submitSearch = (query) =>({
    type: 'SUBMIT',
    payload: query
});
export const clearSearch = () => ({
    type: 'CLEAR',
})
export const favourite = (title) => ({
    type: 'FAVOURITE',
    payload: title
})