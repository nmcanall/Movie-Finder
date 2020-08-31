const router = require("express").Router();

const apiRoutes = require("./api");

router.use("/api", apiRoutes);

// Give 404 for any route not defined
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;