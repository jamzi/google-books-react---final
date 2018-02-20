
let options = {
    headers: {
        'Authorization': 'Bearer '
    }
}
let baseUrl = 'https://www.googleapis.com/books/v1';

export function searchBooks(searchTerm, startIndex) {
    let url = `${baseUrl}/volumes?q=${searchTerm}&startIndex=${startIndex}&projection=lite`;

    return fetch(url, options).then((response) => {
        return response.json();
    }).then((response) => {
        return response.items || [];
    });
}

export function getBook(bookId) {
    let url = `${baseUrl}/volumes/${bookId}`;

    return fetch(url, options).then((response) => {
        return response.json();
    }).then((response) => {
        return response || {};
    });
}

export function getRecommendedBooks() {
    let url = `${baseUrl}/volumes/recommended`;

    return fetch(url, options).then((response) => {
        return response.json();
    }).then((response) => {
        return response || {};
    });
}

export function getMyLibraryBookshelves() {
    let url = `${baseUrl}/mylibrary/bookshelves`;

    return fetch(url, options).then((response) => {
        return response.json();
    }).then((response) => {
        return response || {};
    });
}

export function getBooksFromBookshelf(bookshelfId) {
    let url = `${baseUrl}/mylibrary/bookshelves/${bookshelfId}/volumes`;

    return fetch(url, options).then((response) => {
        return response.json();
    }).then((response) => {
        return response || {};
    });
}

export function addBookToBookshelf(shelfId, volumeId) {
    let url = `${baseUrl}/mylibrary/bookshelves/${shelfId}/addVolume?volumeId=${volumeId}`;
    let additionalOptions = options;
    additionalOptions.method = 'POST';

    return fetch(url, options).then((response) => {
        if (response.status === 204) {
            return 'Successfully added book to bookshelf';
        }
        return 'Fail';
    });
}

export function setAccessToken(accessToken) {
    options.headers.Authorization = `Bearer ${accessToken}`;
}