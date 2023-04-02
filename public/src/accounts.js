function findAccountById(accounts, id) {
  if (accounts == null) return null;
  return accounts.find((account) => account.id === id );
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() < accountB.name.last.toLowerCase()? -1 : 1);
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((accumulator, { borrows }) => accumulator + (borrows.filter(borrower => borrower.id === account.id)).length, 0 );
}

function isBookCheckoutByAccount({borrows}, accountId) {
  return borrows.find(borrower => borrower.id === accountId && !borrower.returned) != undefined
}

function findAuthorById(authors, id) {
  return authors.find(author => author.id === id)
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;

  // we filter the books array to find the ones that haven't been returned by the account. Then we map to the model we want.
  const checkoutdBooks = books.filter(book => isBookCheckoutByAccount(book, accountId));
  const mapped = checkoutdBooks.map(book => {
    const author = findAuthorById(authors, book.authorId);
    return { ...book, author };
  });
  return mapped;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
