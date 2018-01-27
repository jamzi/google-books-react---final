export function searchBooks(searchTerm) {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&projection=lite`;
    
    return fetch(url).then((response) => {
        return response.json();
    }).then((response) => {
        return response.items || [];
    });
}

export function getBook(bookId) {
    let url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;
    
    return fetch(url).then((response) => {
        return response.json();
    }).then((response) => {
        return response || {};
    });
}