const router = require("express").Router();
const {User, Movie, UserRating, Favorite, WatchedMovie, WatchNext} = require("../../models");

// GET /api/users
router.get("/", (req, res) => {
    User.findAll({
        attributes: {exclude: ["password"]}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/users/id
router.get("/:id", (req, res) => {
    User.findOne({
        where: {id: req.params.id},
        include: [
            {
                model: Movie,
                attributes: ["title"],
                through: UserRating,
                as: "user_ratings"
            },
            {
                model: Movie,
                attributes: ["title"],
                through: Favorite,
                as: "favorites"
            },
            {
                model: Movie,
                attributes: ["title"],
                through: WatchedMovie,
                as: "watched_movies"
            },
            {
                model: Movie,
                attributes: ["title"],
                through: WatchNext,
                as: "watch_nexts"
            }
        ]
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: "No user found with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/users 
router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT /api/users/favorite
router.put("/favorite", (req, res) => {
    Favorite.create({
        user_id: req.body.user_id,
        movie_id: req.body.movie_id
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// PUT /api/users/watched-movies
router.put("/watched-movies", (req, res) => {
    WatchedMovie.create({
        user_id: req.body.user_id,
        movie_id: req.body.movie_id
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// PUT /api/users/watch-next
router.put("/watch-next", (req, res) => {
    WatchNext.create({
        user_id: req.body.user_id,
        movie_id: req.body.movie_id
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// PUT /api/users/id
router.put("/:id", (req, res) => {
    // expects {username: 'bob', email: 'bob@gmail.com', password: 'password1234'}

    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
        where: {id: req.params.id},
        individualHooks: true
    })
        .then(dbUserData => {
            if(!dbUserData[0]) {
                res.status(404).json({message: "No user found with this ID"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err});
        });
});

// DELETE /api/users/id
router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: "No user found with this ID"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err});
        });
});

module.exports = router;