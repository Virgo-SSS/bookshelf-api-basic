const addBookAction = require('./Actions/AddBookAction');
const getBookAction = require('./Actions/GetBookAction');
const updateBookAction = require('./Actions/UpdateBookAction');
const deleteBookAction = require('./Actions/DeleteBookAction');
const books = require('./books');

/**
 * Add book handler
 * @param {Object} request
 * @param {Object} h
 * @returns {Object} response
 */
function addBookHandler(request, h) {
    const validationResult = addBookAction.validatePayload(request.payload);

    if (!validationResult.isValid) {
        return h.response({
            status: 'fail',
            message: validationResult.message
        }).code(validationResult.code);
    }

    const book = addBookAction.createBook(request.payload);
    books.push(book);

    const isSuccess = books.filter((book) => book.name === request.payload.name).length > 0;

    if (isSuccess) {
        return addBookAction.generateSuccessResponse({
            bookId: book.id
        },'Buku berhasil ditambahkan', 201, h);
    } 

    return addBookAction.generateErrorResponse("Buku gagal ditambahkan", 500, h);
}

/**
 * Get all books handler
 * @param {Object} request
 * @param {Object} h
 * @returns {Object} response
 */
function getAllBooksHandler(request, h) {
    // get query parameters
    const { name, reading, finished } = request.query;

    // filter books
    let filteredBooks = books;
    filteredBooks = getBookAction.filterByName(filteredBooks, name);
    filteredBooks = getBookAction.filterByReading(filteredBooks, reading);
    filteredBooks = getBookAction.filterByFinished(filteredBooks, finished);

    // map books
    const mappedBooks = getBookAction.mapBooks(filteredBooks);

    // return response
    return getBookAction.generateSuccessResponse({
        books: mappedBooks
    }, 200, h);
}

/**
 * Get book detail handler
 * @param {Object} request
 * @param {Object} h
 * @returns {Object} response
 */
function getBookDetailHandler(request, h) {
    // get bookId from request parameters
    const { bookId } = request.params;

    // filter book by bookId
    const book = getBookAction.getBookById(books, bookId);

    // return response
    if (book !== undefined) {
        return getBookAction.generateSuccessResponse({
            book
        }, 200, h);
    }
    
    // return error response if book is not found
    return getBookAction.generateErrorResponse('Buku tidak ditemukan', 404, h);
}


/**
 * Edit book by id handler
 * @param {Object} request
 * @param {Object} h
 * @returns {Object} response
 */
function editBookByIdHandler(request, h) {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = updateBookAction.findBookIndexById(books, bookId);

    if (index !== -1) {
        const errorResponse = updateBookAction.validateBookData(name, readPage, pageCount, h);
        if (errorResponse) return errorResponse;

        books[index] = updateBookAction.updateBookData(books, index, { name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt });

        return h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui'
        }).code(200);
    }

    return updateBookAction.generateErrorResponse('Gagal memperbarui buku. Id tidak ditemukan', 404, h);
}

/**
 * Delete book by id handler
 * @param {Object} request
 * @param {Object} h
 * @returns {Object} response
 */
function deleteBookByIdHandler(request, h) {
    const { bookId } = request.params;
    const index = deleteBookAction.findBookIndexById(books, bookId);

    if (index !== -1) {
        books.splice(index, 1);
        return deleteBookAction.generateResponse(h, 'success', 'Buku berhasil dihapus', 200);
    }

    return deleteBookAction.generateResponse(h, 'fail', 'Buku gagal dihapus. Id tidak ditemukan', 404);
}

// export all functions
module.exports = {
    addBookHandler,
    getAllBooksHandler,
    getBookDetailHandler,
    editBookByIdHandler,
    deleteBookByIdHandler
}