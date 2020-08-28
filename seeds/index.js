const seedUsers = require('./user-seeds')
const seedUserData = require('./userData-seeds')
const seedMovies = require('./movie-seeds')
const seedUserRatings = require('./userRating-seeds')
const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
  
    await seedUserData();
    console.log('\n----- USERDATA SEEDED -----\n');
  
    await seedMovies();
    console.log('\n----- MOVIES SEEDED -----\n');
  
    await seedUserRatings();
    console.log('\n----- USER RATINGS SEEDED -----\n');
  
    process.exit(0);
  };
  
  seedAll();