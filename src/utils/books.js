
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

    let bookshelfName = getBookshelfName(shelfId);

    return fetch(url, options).then((response) => {
        if (response.status === 204) {
            return `Successfully added book to ${bookshelfName}`;
        }
        return `Cannot add book to ${bookshelfName}`;
    });
}

export function removeBookFromBookshelf(shelfId, volumeId) {
    let url = `${baseUrl}/mylibrary/bookshelves/${shelfId}/removeVolume?volumeId=${volumeId}`;
    let additionalOptions = options;
    additionalOptions.method = 'POST';

    let bookshelfName = getBookshelfName(shelfId);

    return fetch(url, options).then((response) => {
        if (response.status === 204) {
            return `Successfully removed book from ${bookshelfName}`;
        }
        return `Cannot remove book from ${bookshelfName}`;
    });
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