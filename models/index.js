const User = require('./User');
const Movie = require('./Movie');
const UserRating = require('./UserRating');
const Favorite = require('./Favorite');
const WatchedMovie = require('./WatchedMovie');
const WatchNext = require('./WatchNext');

User.hasMany(UserRating, {foreignKey: 'user_id'});
User.hasMany(Favorite, {foreignKey: 'user_id'});
User.hasMany(WatchedMovie, {foreignKey: 'user_id'});
User.hasMany(WatchNext, {foreignKey: 'user_id'});

Movie.hasMany(UserRating, {foreignKey: 'movie_id'});
Movie.hasMany(Favorite, {foreignKey: 'user_id'});
Movie.hasMany(WatchedMovie, {foreignKey: 'user_id'});
Movie.hasMany(WatchNext, {foreignKey: 'user_id'});

module.exports = {User, Movie, UserRating, Favorite, WatchedMovie, WatchNext};
