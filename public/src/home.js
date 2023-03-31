function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter(({ borrows }) => borrows[0].returned == false).length;
}

function getMostCommonGenres(books) {
  const genres = [];
  books.forEach(book => {
    const genre = genres.find(genre => genre.name === book.genre);
    // if we didn't find the genre, we need to add it to the genres array
    if (genre == undefined)
      genres.push({ name: book.genre, count: 1 })
    else
      // increase the count of the genre
      genre.count++;
  });

  // sort the genres by count in descending order
  genres.sort((genreA, genreB) => genreB.count - genreA.count);
  
  // take only 5
  return First5ArrayElements(genres);
}

function getMostPopularBooks(books) {

  // create a new array with only the relevant fields
  const mappedBooks = books.map(({ title, borrows }) => { return { name: title, count: borrows.length } })

  // sort by count
  mappedBooks.sort((a, b) => b.count - a.count)

  // take only 5
  return First5ArrayElements(mappedBooks);
}

function getMostPopularAuthors(books, authors) {
  const authorsScores = [];

  books.forEach(book => {
    const author = authors.find(author => author.id === book.authorId);
    const authorName = `${author.name.first} ${author.name.last}`;
    const scoredAuthor = authorsScores.find(author => author.name === authorName);
    if (scoredAuthor == undefined)
      authorsScores.push({ name: authorName, count: book.borrows.length })
    else
      scoredAuthor.count += book.borrows.length;
  });

  // sort the authors by score
  authorsScores.sort((scoreA, scoreB) => scoreB.count - scoreA.count);

  // take only 5
  return First5ArrayElements(authorsScores);
}

const First5ArrayElements = (array) => {
  const maxResultSize = 5
  const result = [];
  for (let i = 0; i < array.length && i < maxResultSize; i++) {
    result.push(array[i]);
  }
  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
