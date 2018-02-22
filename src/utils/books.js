
let options = {
    headers: {
        'Authorization': 'Bearer '
    }
}
let baseUrl = 'https://www.googleapis.com/books/v1';

export function searchBooks(searchTerm, startIndex) {
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    let url = `${baseUrl}/volumes?q=${encodedSearchTerm}&startIndex=${startIndex}&projection=lite`;

    return fetch(url, options)
        .then(handleErrors)
        .then((response) => { return response.json(); })
        .then((response) => { return response.items || []; })
        .catch(error => console.log(error));
}

export function getBook(bookId) {
    let url = `${baseUrl}/volumes/${bookId}`;

    return fetch(url, options)
        .then(handleErrors)
        .then((response) => { return response.json(); })
        .then((response) => { return response || {}; })
        .catch(error => console.log(error));
}

export function getRecommendedBooks() {
    let url = `${baseUrl}/volumes/recommended`;

    return fetch(url, options)
        .then(handleErrors)
        .then((response) => { return response.json(); })
        .then((response) => { return response || {}; })
        .catch(error => console.log(error));
}

export function getMyLibraryBookshelves() {
    let url = `${baseUrl}/mylibrary/bookshelves`;

    return fetch(url, options)
        .then(handleErrors)
        .then((response) => { return response.json(); })
        .then((response) => { return response || {}; })
        .catch(error => console.log(error));
}

export function getBooksFromBookshelf(bookshelfId) {
    let url = `${baseUrl}/mylibrary/bookshelves/${bookshelfId}/volumes`;

    return fetch(url, options)
        .then(handleErrors)
        .then((response) => { return response.json(); })
        .then((response) => { return response.items || []; })
        .catch(error => console.log(error));
}

export function addBookToBookshelf(shelfId, volumeId) {
    let url = `${baseUrl}/mylibrary/bookshelves/${shelfId}/addVolume?volumeId=${volumeId}`;
    const additionalOptions = Object.assign({}, options, {
        method: 'POST'
    });

    let bookshelfName = getBookshelfName(shelfId);

    return fetch(url, additionalOptions)
        .then(handleErrors)
        .then((response) => { 
            if (response.status === 204) {
                return `Successfully added book to ${bookshelfName}`;
            }
        })
        .catch(error => console.log(error));
}

export function removeBookFromBookshelf(shelfId, volumeId) {
    let url = `${baseUrl}/mylibrary/bookshelves/${shelfId}/removeVolume?volumeId=${volumeId}`;
    const additionalOptions = Object.assign({}, options, {
        method: 'POST'
    });

    let bookshelfName = getBookshelfName(shelfId);

    return fetch(url, additionalOptions)
        .then(handleErrors)
        .then((response) => { 
            if (response.status === 204) {
                return `Successfully added book to ${bookshelfName}`;
            }
        })
        .catch(error => console.log(error));
}

export function getBookshelfName(id) {
    let name = '';

    switch (id) {
        case 0:
            name = 'Favorites';
            break;
        case 1:
            name = 'Purchased';
            break;
        case 2:
            name = 'To read';
            break;
        case 3:
            name = 'Reading now';
            break;
        case 4:
            name = 'Have read';
            break;
        case 5:
            name = 'Reviewed';
            break;
        case 6:
            name = 'Recently viewed';
            break;
        case 7:
            name = 'My Google eBooks';
            break;
        case 8:
            name = 'Books for you';
            break;
        case 9:
            name = 'Browsing history';
            break;
        default:
            name = '';
            break;
    }
    return name;
}

export function setAccessToken(accessToken) {
    options.headers.Authorization = `Bearer ${accessToken}`;
}

function handleErrors(response) {
    if (!response.ok && response.status !== 404) {
        throw Error(response.statusText);
    }
    return response;
}