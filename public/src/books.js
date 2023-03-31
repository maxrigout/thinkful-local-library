function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOut = books.filter(({ borrows }) => !borrows[0].returned);
  const returned = books.filter(({ borrows }) => borrows[0].returned);
  return [ checkedOut, returned ];
}

function getBorrowersForBook(book, accounts) {
  const maxReturnSize = 10;
  const result = [];
  for (let index = 0; index < book.borrows.length && index < maxReturnSize; index++) {
    const borrow = book.borrows[index];
    const returned = borrow.returned;
    const account = accounts.find(account => account.id === borrow.id);
    result.push({ ...account, returned });
  }
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
