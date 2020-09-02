const User = require('./User');
const Movie = require('./Movie');
const UserRating = require('./UserRating');
const Favorite = require('./Favorite');
const WatchedMovie = require('./WatchedMovie');
const WatchNext = require('./WatchNext');

// Allow a user to make a rating for a movie
User.belongsToMany(Movie, {
    through: UserRating,
    as: "user_ratings",
    foreignKey: "user_id"
});
Movie.belongsToMany(User, {
    through: UserRating,
    as: "user_ratings",
    foreignKey: "movie_id"
});

// Allow a user to save a favorite movie
User.belongsToMany(Movie, {
    through: Favorite,
    as: "favorites",
    foreignKey: "user_id"
});
Movie.belongsToMany(User, {
    through: Favorite,
    as: "favorites",
    foreignKey: "movie_id"
});

// Allow a user to save a watched movie
User.belongsToMany(Movie, {
    through: WatchedMovie,
    as: "watched_movies",
    foreignKey: "user_id"
});
Movie.belongsToMany(User, {
    through: WatchedMovie,
    as: "watched_movies",
    foreignKey: "movie_id"
});

// Allow a user to save a movie to watch next
User.belongsToMany(Movie, {
    through: WatchNext,
    as: "watch_nexts",
    foreignKey: "user_id"
});
Movie.belongsToMany(User, {
    through: WatchNext,
    as: "watch_nexts",
    foreignKey: "movie_id"
});

module.exports = {User, Movie, UserRating, Favorite, WatchedMovie, WatchNext};
