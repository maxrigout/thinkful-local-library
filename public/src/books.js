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
  const result = [];
  for (let i = 0; i < book.borrows.length && i < 10; i++) {
    const borrow = book.borrows[i];
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
