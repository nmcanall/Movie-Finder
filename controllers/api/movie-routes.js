const router = require("express").Router();
const {Movie, UserRating} = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

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
        where: {id: req.params.id}, 
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
router.post("/", withAuth, async (req, res) => {
    try {   
        const movieCheck = await Movie.findOne({
            where: {
                title: req.body.title,
                date: req.body.date
            }
        });
        if (movieCheck) {
            res.json({movie_id: movieCheck.id});
        }
        else{
            const newMovie = await Movie.create({
                title: req.body.title,
                date: req.body.date,
                description: req.body.description,
                image_url: req.body.image_url
            })
            res.json(newMovie)
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// POST /api/movies/add-score
router.post("/add-rating", withAuth, async (req, res) => {
    try{    
        await UserRating.create({
            user_id: req.body.user_id,
            movie_id: req.body.movie_id,
            score: req.body.score
        })
        const [results,metadata] = await sequelize.query(
            `SELECT AVG(score) as average FROM user_rating WHERE movie_id = ${req.body.movie_id}`
        )
        const newAverage = results[0].average
        console.log(newAverage)
        Movie.update(
                {
                    average_score: newAverage
                },
                {
                    where: {id: req.body.movie_id},
                }
        ).then(average_score => {
            const message = {message: `Rating created! Average score for movie ${req.movie_id} is now ${average_score}`}
            console.log(message)
            res.json(message)
        })
        .catch(err => {
            console.log(":er", err)
            res.json(err)
        })
       
    }
    catch(err){
    res.json(err);
    }
});


// PUT /api/movies/id
router.put("/:id", withAuth, (req, res) => {

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
router.delete("/:id", withAuth, (req, res) => {
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