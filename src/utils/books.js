const accessToken = localStorage.getItem('access_token') || '';
const options = {
    headers: {
        'Authorization': 'Bearer ' + accessToken
    }
}
const baseUrl = 'https://www.googleapis.com/books/v1/volumes';

export function searchBooks(searchTerm, startIndex) {
    let url = `${baseUrl}?q=${searchTerm}&startIndex=${startIndex}&projection=lite`;

    return fetch(url, options).then((response) => {
        return response.json();
    }).then((response) => {
        return response.items || [];
    });
}

export function getBook(bookId) {
    let url = `${baseUrl}/${bookId}`;

    return fetch(url, options).then((response) => {
        return response.json();
    }).then((response) => {
        return response || {};
    });
}

export function getRecommendedBooks() {
    let url = `${baseUrl}/recommended`;

    return fetch(url, options).then((response) => {
        return response.json();
    }).then((response) => {
        return response || {};
    });
}