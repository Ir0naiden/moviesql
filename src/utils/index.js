const sql = require("../db/connection");

// node src/app.js "add user" --user "BryanP" --pass liverpoo
exports.addUser = (username, pass) => {
  const user = [pass, username];
  try {
    sql.query("INSERT INTO users SET username = ?", username);
    sql.query(
      "INSERT INTO passwords SET pass = ?, userID = (SELECT id FROM users WHERE username = ?)",
      user
    );
  } catch (error) {
    console.log(error);
  }
};

// node src/app.js "add movie" --title "First Reformed" --actor "Ethan Hawke" --rating 0 --category "Thriller" --user "BobbyP"
exports.addMovie = (title, actor, rating, category, username) => {
  const movie = [title, actor, rating, category, username];
  try {
    sql.query(
      "INSERT INTO movies SET title = ?, actor = ?, rating = ?, category = ?, userID = (SELECT id FROM users WHERE username = ?)",
      movie
    );
  } catch (error) {
    console.log(error);
  }
};

// exports.moviesList = (user) => {
//   const list = [user];
//   try {
//     sql.query(
//       "SELECT userID,GROUP_CONCAT(title) FROM movies GROUP BY userID WHERE userID = (SELECT id FROM users WHERE username = ?)",
//       list
//     );
//     console.log(`${list} has added ${row.movieList} to their watchlist`);
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.moviesList = async (username, pass) => {
//   try {
//       const user = [username, pass];
//       sql.query("SELECT title, actor, watched, rating, genre, director FROM movies INNER JOIN users ON movies.movieID = movies.userID WHERE userID = (SELECT id FROM users INNER JOIN passwords ON users.id = passwords.userID WHERE users.username = ? AND passwords.pass = ?)", user, (error, results) => {
//           if (error) return console.error(error);
//          else console.log(results)})
//   } catch (error) {
//       console.log(error)
//   }
// }

// exports.moviesList = (user) => {
//   const list = [user];
//   try {
//     sql.query(
//       "SELECT count(*) AS movieList FROM movies WHERE userID = (SELECT id FROM users WHERE username = ?);",
//       list,
//       (err, results, fields) => {
//         Object.keys(results).forEach((key) => {
//           let row = results[key];
//           console.log(`${list} has added ${row.movieList} movies`);
//         });
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// node src/app.js "update movie" --watched "<boolean>" --rating <Number> --title "<movieName>" --user "<userName>" --pass "<password>"
exports.updateMovie = (watched, rating, title, user, pass) => {
  const update = [watched, rating, title, user, pass];
  try {
    sql.query(
      "UPDATE movies SET watched = ?, rating = ? WHERE title = ? AND userID = (SELECT id FROM users INNER JOIN passwords ON users.id = passwords.userID WHERE users.username = ? AND passwords.pass = ?)",
      update
    );
  } catch (error) {
    console.log(error);
  }
};

// node src/app.js "delete movie" --title "<movieName>" --user "<userName>" --pass "<password>"
exports.deleteMovie = (title, user, pass) => {
  const remove = [title, user, pass];
  try {
    sql.query(
      "DELETE FROM movies WHERE title = ? AND userID = (SELECT id FROM users INNER JOIN passwords ON users.id = passwords.userID WHERE users.username = ? AND passwords.pass = ?)",
      remove
    );
  } catch (error) {
    console.log(error);
  }
};
