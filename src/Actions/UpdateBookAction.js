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
 * Validates the book data for updating a book.
 * 
 * @param {string} name - The name of the book.
 * @param {number} readPage - The number of pages that have been read.
 * @param {number} pageCount - The total number of pages in the book.
 * @param {Object} h - The Hapi.js response toolkit.
 * @returns {Object} The Hapi.js response object with an error message and status code if the book data is invalid, or undefined if the book data is valid.
 */
function validateBookData(name, readPage, pageCount, h) {
    if (!name) {
        return generateErrorResponse('Gagal memperbarui buku. Mohon isi nama buku', 400, h);
    }

    if (readPage > pageCount) {
        return generateErrorResponse('Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount', 400, h);
    }
}

/**
 * Validates the book data for updating a book.
 * 
 * @param {string} name - The name of the book.
 * @param {number} readPage - The number of pages that have been read.
 * @param {number} pageCount - The total number of pages in the book.
 * @param {Object} h - The Hapi.js response toolkit.
 * @returns {Object} The Hapi.js response object with an error message and status code if the book data is invalid, or undefined if the book data is valid.
 */
function generateErrorResponse(message, statusCode, h) {
    return h.response({
        status: 'fail',
        message: message
    }).code(statusCode);
}

/**
 * Updates the book data at the specified index in the books array with the provided updated data.
 * 
 * @param {Array} books - The array of books.
 * @param {number} index - The index of the book to update.
 * @param {Object} updatedData - The updated book data.
 * @returns {Object} The updated book object.
 */
function updateBookData(books, index, updatedData) {
    return {
        ...books[index],
        ...updatedData,
        finished: updatedData.pageCount === updatedData.readPage,
    };
}

module.exports = { findBookIndexById, validateBookData, updateBookData , generateErrorResponse };