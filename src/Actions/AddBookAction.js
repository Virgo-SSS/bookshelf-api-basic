const { nanoid } = require("nanoid");

/**
 * Validates the payload for adding a book.
 * 
 * @param {Object} payload - The payload to validate.
 * @param {string} payload.name - The name of the book.
 * @param {number} payload.pageCount - The total number of pages in the book.
 * @param {number} payload.readPage - The number of pages that have been read.
 * @returns {Object} An object containing a boolean indicating whether the payload is valid and, if not, a message and status code.
 */
function validatePayload(payload) {
    const { name, pageCount, readPage } = payload;

    if (!name) {
        return {
            isValid: false,
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
            code: 400
        };
    }

    if (readPage > pageCount) {
        return {
            isValid: false,
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
            code: 400
        };
    }

    return { isValid: true };
}

/**
 * Creates a new book object.
 * 
 * @param {Object} payload - The payload to create the book from.
 * @returns {Object} The newly created book object.
 */
function createBook(payload) {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = payload;
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    return {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished: pageCount === readPage,
        reading,
        insertedAt,
        updatedAt
    };
}

/**
 * Generates a success response with the provided data, message, status code, and Hapi.js response toolkit.
 * 
 * @param {Object} data - The data to be included in the response.
 * @param {string} message - The message to be included in the response.
 * @param {number} statusCode - The HTTP status code for the response.
 * @param {Object} h - The Hapi.js response toolkit.
 * @returns {Object} The Hapi.js response object with the provided data, message, and status code.
 */
function generateSuccessResponse(data, message, statusCode, h) {
    return h.response({
        status: 'success',
        message,
        data
    }).code(statusCode);
}

/**
 * Generates an error response with the provided message, status code, and Hapi.js response toolkit.
 * 
 * @param {string} message - The message to be included in the response.
 * @param {number} statusCode - The HTTP status code for the response.
 * @param {Object} h - The Hapi.js response toolkit.
 * @returns {Object} The Hapi.js response object with the provided message and status code.
 */
function generateErrorResponse(message, statusCode, h) {
    return h.response({
        status: 'fail',
        message
    }).code(statusCode);
}

module.exports = { validatePayload, createBook , generateSuccessResponse, generateErrorResponse };