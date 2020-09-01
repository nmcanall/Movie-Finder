const router = require("express").Router();

const userRoutes = require("./user-routes.js");
// const userRatingRoutes = require("./user-rating-routes.js"); 
const movieRoutes = require("./movie-routes.js");

router.use("/users", userRoutes);
// router.use("/user-data", userDataRoutes);
// router.use("/user-ratings", userRatingRoutes);
router.use("/movies", movieRoutes);

module.exports = router;