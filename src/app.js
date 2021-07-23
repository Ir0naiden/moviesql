require("./db/connection");

const yargs = require("yargs");
const command = process.argv[2];
const {
  addUser,
  addMovie,
  moviesList,
  updateMovie,
  deleteMovie,
} = require("./utils/index");
const title = yargs.argv.title;
const actor = yargs.argv.actor;
const watched = yargs.argv.watched;
const rating = yargs.argv.rating;
const category = yargs.argv.category;
const pass = yargs.argv.pass;
const user = yargs.argv.user;

const app = () => {
  if (command === "add user") {
    addUser(user, pass);
  } else if (command === "add movie") {
    addMovie(title, actor, rating, category, user);
  } else if (command === "list") {
    moviesList(user);
  } else if (command === "update movie") {
    updateMovie(watched, rating, title, user, pass);
  } else if (command === "delete movie") {
    deleteMovie(title, user, pass);
  }
};

app();
