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

// node src/app.js "list" --user "<userName>""
exports.moviesList = async (username) => {
  const user = [username];
  try {
    sql.query(
      "SELECT title FROM movies WHERE userID = (SELECT id FROM users WHERE users.username = ?)",
      user,
      (error, results) => {
        if (error) {
          console.error(error);
        }
        console.log(results);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

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
