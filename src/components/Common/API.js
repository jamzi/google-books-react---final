export function fetchBooks(searchTerm) {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`;
    
    return fetch(url).then((response) => {
        return response.json();
    }).then((response) => {
        return response.items || [];
    });
}