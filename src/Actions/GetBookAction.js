/**
 * Filters an array of books by name.
 * 
 * @param {Array} books - The array of books.
 * @param {string} name - The name to filter by.
 * @returns {Array} The filtered array of books.
 */
function filterByName(books, name) {
    if (!name) return books;
    return books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
}

/**
 * Filters an array of books by reading status.
 * 
 * @param {Array} books - The array of books.
 * @param {boolean} reading - The reading status to filter by.
 * @returns {Array} The filtered array of books.
 */
function filterByReading(books, reading) {
    if (!reading) return books;
    return books.filter((book) => book.reading === !!parseInt(reading));
}

/**
 * Filters an array of books by finished status.
 * 
 * @param {Array} books - The array of books.
 * @param {boolean} finished - The finished status to filter by.
 * @returns {Array} The filtered array of books.
 */
function filterByFinished(books, finished) {
    if (!finished) return books;
    return books.filter((book) => book.finished === !!parseInt(finished));
}

/**
 * Maps an array of books to an array of simplified book objects.
 * 
 * @param {Array} books - The array of books.
 * @returns {Array} The array of simplified book objects.
 */
function mapBooks(books) {
    return books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
    }));
}

/**
 * Generates a success response with the provided data and status code.
 *
 * @param {Object} data - The data to be included in the response.
 * @param {number} statusCode - The HTTP status code for the response.
 * @param {Object} h - The hapi.js response toolkit.
 * @returns {Object} The hapi.js response object.
 */
function generateSuccessResponse(data, statusCode, h) {
    return h.response({
        status: 'success',
        data
    }).code(statusCode);
}

/**
 * Generates an error response with the provided message and status code.
 *
 * @param {string} message - The error message to be included in the response.
 * @param {number} statusCode - The HTTP status code for the response.
 * @param {Object} h - The hapi.js response toolkit.
 * @returns {Object} The hapi.js response object.
 */
function generateErrorResponse(message, statusCode, h) {
    return h.response({
        status: 'fail',
        message: message
    }).code(statusCode);
}

/**
 * Retrieves a book by its ID from the provided array of books.
 *
 * @param {Array} books - The array of books.
 * @param {string} bookId - The ID of the book to retrieve.
 * @returns {Object} The book object if found, undefined otherwise.
 */
function getBookById(books, bookId) {
    return books.filter((book) => book.id === bookId)[0];
}

module.exports = { filterByName, filterByReading, filterByFinished, mapBooks, generateSuccessResponse, getBookById, generateErrorResponse };