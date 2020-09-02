const router = require("express").Router();
const {Movie, User, UserRating} = require("../../models");
const sequelize = require("../../config/connection");

// GET /api/users
router.get("/", (req, res) => {
    Movie.findAll({
        attributes: [
            "id",
            "title",
            "description",
            [
                sequelize.literal('(SELECT COUNT(*) FROM user_rating WHERE movie.id = user_rating.movie_id)'),
                'total_ratings'
            ],
            // [
            //     Need to add scores then devide by total_ratings (remember 0 error handling),
            //     'average_rating'
            // ]
        ]
    })
        .then(dbMovieData => res.json(dbMovieData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/movies/id
router.get("/:id", (req, res) => {
    Movie.findOne({
        where: {id: req.params.id}, 
        attributes: [
            "id",
            "title",
            "description",
            [
                sequelize.literal('(SELECT COUNT(*) FROM user_rating WHERE movie.id = user_rating.movie_id)'),
                'total_ratings'
            ],
            // [
            //     // Need to add scores then devide by total_ratings (remember 0 error handling),
            //     sequelize.literal('(SELECT AVG(user-rating_score) FROM user_rating WHERE movie.id = user_rating.movie_id)'),
            //     'average_rating'
            // ]
        ]
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
        description: req.body.description
    })
        .then(dbMovieData => {
            res.json(dbMovieData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/movies/add-score
router.put("/add-rating", (req, res) => {
    UserRating.create({
        user_id: req.body.user_id,
        movie_id: req.body.movie_id,
        score: req.body.score
    })
        .then(() => {
            return Movie.findOne({
                where: {id: req.body.movie_id},
                attributes: [
                    "id",
                    "title",
                    "description",
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM user_rating WHERE movie.id = user_rating.movie_id)'),
                        'total_ratings'
                    ],
                    // [
                    //     // Need to add scores then devide by total_ratings (remember 0 error handling),
                    //     sequelize.literal('(SELECT AVG(*) FROM user_rating WHERE movie.id = user_rating.movie_id)',
                    //     'average_rating')
                    // ]
                ]
            })
        })
        .then(dbMovieData => res.json(dbMovieData))
        .catch(err => res.json(err));
});

// PUT /api/users/id
router.put("/:id", (req, res) => {

    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    Movie.update(
        {
            title: req.body.title,
            description: req.body.description
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