const seedUsers = require("./user-seeds");
const seedMovies = require("./movie-seeds");
const seedUserRatings = require("./userRating-seeds");
const seedFavorites = require("./favorite-seeds");
const seedWatched = require("./watched-seeds");
const seedWatchNext = require("./watchNext-seeds");
const sequelize = require("../config/connection");

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");

    await seedUsers();
    console.log("\n----- USERS SEEDED -----\n");
  
    await seedMovies();
    console.log("\n----- MOVIES SEEDED -----\n");
  
    await seedUserRatings();
    console.log("\n----- USER RATINGS SEEDED -----\n");
  
    await seedFavorites();
    console.log("\n----- USER FAVORITES SEEDED -----\n");
  
    await seedWatched();
    console.log("\n----- USER WATCHED MOVIES SEEDED -----\n");
  
    await seedWatchNext();
    console.log("\n----- USER WATCH NEXT SEEDED -----\n");
  
    process.exit(0);
  };
  
  seedAll();