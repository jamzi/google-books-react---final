export const auth = {
    isAuthenticated() {
        return !!localStorage.getItem('access_token');
    },
    signout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('access_token');
    }
}

export function searchBooks(searchTerm, startIndex) {
    const accessToken = localStorage.getItem('access_token');
    let options = {};
    if (accessToken) {
        options = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        }
    }
    let url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${startIndex}&projection=lite`;

    return fetch(url, options).then((response) => {
        return response.json();
    }).then((response) => {
        return response.items || [];
    });
}

export function getBook(bookId) {
    const accessToken = localStorage.getItem('access_token');
    let options = {};
    if (accessToken) {
        options = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        }
    }
    let url = `https://www.googleapis.com/books/v1/volumes/${bookId}`;

    return fetch(url, options).then((response) => {
        return response.json();
    }).then((response) => {
        return response || {};
    });
}

export function getRecommendedBooks() {
    const accessToken = localStorage.getItem('access_token');
    let options = {};
    if (accessToken) {
        options = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
        }
    }
    let url = `https://www.googleapis.com/books/v1/volumes/recommended`;

    return fetch(url, options).then((response) => {
        return response.json();
    }).then((response) => {
        return response || {};
    });
}