let options = {
    headers: {
        'Authorization': 'Bearer '
    }
}
let baseUrl = 'https://www.googleapis.com/books/v1';

export function searchBooks(searchTerm, startIndex) {
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    let url = `${baseUrl}/volumes?q=${encodedSearchTerm}&startIndex=${startIndex}&projection=lite`;

    const error = new Error();
    return fetch(url, options)
        .then((response) => {
            if (response.ok) { 
                return response.json(); 
            }
            else {
                error.message = `Error searching for books with term: ${searchTerm}`;
                throw error;
            }
        })
        .then((response) => {
            return response.items || [];
        });
}

export function getBook(bookId) {
    let url = `${baseUrl}/volumes/${bookId}`;

    const error = new Error();
    return fetch(url, options)
        .then((response) => {
            if (response.ok) { 
                return response.json(); 
            }
            else {
                error.message = `Error getting a book with id: ${bookId}`;
                throw error;
            }
        })
        .then((response) => { 
            return response || {}; 
        });
}

export function getRecommendedBooks() {
    let url = `${baseUrl}/volumes/recommended`;

    const error = new Error();
    return fetch(url, options)
        .then((response) => {
            if (response.ok) { 
                return response.json(); 
            }
            else { 
                error.message = `Error getting recommended books`;
                throw error;
            }
        })
        .then((response) => { 
            return response || {}; 
        })
}

export function getMyLibraryBookshelves() {
    let url = `${baseUrl}/mylibrary/bookshelves`;

    const error = new Error();
    return fetch(url, options)
        .then((response) => {
            if (response.ok) { 
                return response.json(); 
            }
            else { 
                error.message = `Error getting my library bookshelves`;
                throw error;
            }
        })
        .then((response) => { 
            return response || {}; 
        });
}

export function getBooksFromBookshelf(bookshelfId) {
    let url = `${baseUrl}/mylibrary/bookshelves/${bookshelfId}/volumes`;

    const error = new Error();
    return fetch(url, options)
        .then((response) => {
            if (response.ok) { 
                return response.json(); 
            }
            else { 
                error.message = `Error getting books from bookshelf with id: ${getBookshelfName(bookshelfId)}`;
                throw error;
            }
        })
        .then((response) => { 
            return response.items || []; 
        });
}

export function addBookToBookshelf(bookshelfId, volumeId) {
    let url = `${baseUrl}/mylibrary/bookshelves/${bookshelfId}/addVolume?volumeId=${volumeId}`;
    const additionalOptions = Object.assign({}, options, {
        method: 'POST'
    });

    let bookshelfName = getBookshelfName(bookshelfId);

    const error = new Error();
    return fetch(url, additionalOptions)
        .then((response) => {
            if (response.ok) { 
                return response; 
            }
            else { 
                error.message = `Error adding book: ${volumeId} to a bookshelf: ${getBookshelfName(bookshelfId)}`;
                throw error;
            }
        })
        .then((response) => {
            if (response.status === 204) {
                return `Successfully added book to ${bookshelfName}`;
            }
        });
}

export function removeBookFromBookshelf(bookshelfId, volumeId) {
    let url = `${baseUrl}/mylibrary/bookshelves/${bookshelfId}/removeVolume?volumeId=${volumeId}`;
    const additionalOptions = Object.assign({}, options, {
        method: 'POST'
    });

    let bookshelfName = getBookshelfName(bookshelfId);

    const error = new Error();
    return fetch(url, additionalOptions)
        .then((response) => {
            if (response.ok) { 
                return response; 
            }
            else { 
                error.message = `Error removing book: ${volumeId} from a bookshelf: ${this.getBookshelfName(bookshelfId)}`;
                throw error;
            }
        })
        .then((response) => {
            if (response.status === 204) {
                return `Successfully added book to ${bookshelfName}`;
            }
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