const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");

router.use("/api", apiRoutes);
router.use(homeRoutes)

// Give 404 for any route not defined
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;