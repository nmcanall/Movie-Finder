const router = require("express").Router();
const {Movie} = require("../../models");

// GET /api/users
router.get("/", (req, res) => {
    Movie.findAll()
        .then(dbMovieData => res.json(dbMovieData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/movies/id
router.get("/:id", (req, res) => {
    Movie.findOne({
        where: {id: req.params.id}
    })
        .then(dbMovieData => {
            if(!dbMovieData) {
                res.status(404).json({message: "No movie found with this id"});
                return;
            }
            res.json(dbMovieData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/movies
router.post("/", (req, res) => {
    Movie.create({
        title: req.body.title,
        description: req.body.description,
        average_score: req.body.average_score
    })
        .then(dbMovieData => {
            res.json(dbMovieData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT /api/users/id
router.put("/:id", (req, res) => {

    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    Movie.update(
        {
            title: req.body.title,
            description: req.body.description,
            average_score: req.body.average_score
        }, 
        {
            where: {id: req.params.id}
        }
    )
        .then(dbMovieData => {
            if(!dbMovieData[0]) {
                res.status(404).json({message: "No movie found with this ID"});
                return;
            }
            res.json(dbMovieData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err});
        });
});

// DELETE /api/movies/id
router.delete("/:id", (req, res) => {
    Movie.destroy(
        {
            where: {id: req.params.id}
        }
    )
        .then(dbMovieData => {
            if(!dbMovieData) {
                res.status(404).json({message: "No movie found with this ID"});
                return;
            }
            res.json(dbMovieData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;