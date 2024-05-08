/**
 * Finds the index of a book in the books array by its ID.
 * 
 * @param {Array} books - The array of books.
 * @param {string} bookId - The ID of the book to find.
 * @returns {number} The index of the book in the books array, or -1 if the book is not found.
 */
function findBookIndexById(books, bookId) {
    return books.findIndex((book) => book.id === bookId);
}

/**
 * Generates a Hapi.js response with the provided status, message, and HTTP status code.
 * 
 * @param {Object} h - The Hapi.js response toolkit.
 * @param {string} status - The status to be included in the response.
 * @param {string} message - The message to be included in the response.
 * @param {number} code - The HTTP status code for the response.
 * @returns {Object} The Hapi.js response object with the provided status, message, and HTTP status code.
 */
function generateResponse(h, status, message, code) {
    return h.response({
        status: status,
        message: message
    }).code(code);
}
module.exports = { findBookIndexById, generateResponse };